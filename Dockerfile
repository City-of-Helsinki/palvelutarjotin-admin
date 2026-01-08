# ===============================================
FROM registry.access.redhat.com/ubi9/nodejs-20 AS appbase
# ===============================================

# install yarn
USER root
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo
RUN yum -y install yarn

WORKDIR /app

# Offical image has npm log verbosity as info. More info - https://github.com/nodejs/docker-node#verbosity
ENV NPM_CONFIG_LOGLEVEL warn

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=${NODE_ENV:-"production"}
ENV NODE_ENV $NODE_ENV

# Global npm deps in a non-root user directory
ENV NPM_CONFIG_PREFIX=/app/.npm-global
ENV PATH=$PATH:/app/.npm-global/bin

# Yarn
ENV YARN_VERSION 1.22.22
RUN yarn policies set-version ${YARN_VERSION}

# Copy package.json and package-lock.json/yarn.lock files
COPY --chown=default:root package*.json *yarn* ./

# Install npm dependencies
ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install --frozen-lockfile --ignore-scripts && yarn cache clean --force

# =============================
FROM appbase AS development
# =============================

# Set NODE_ENV to development in the development container
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# Enable hot reload by default by polling for file changes.
#
# NOTE: Can be disabled by setting CHOKIDAR_USEPOLLING=false in file `.env`
#       if hot reload works on your system without polling to save CPU time.
ARG CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_USEPOLLING=${CHOKIDAR_USEPOLLING}

# copy in our source code last, as it changes the most
COPY --chown=default:root . .

# Bake package.json start command into the image
CMD ["yarn", "dev", "--no-open", "--host"]

# ===================================
FROM appbase AS staticbuilder
# ===================================

# Oidc authority
ARG VITE_APP_OIDC_AUDIENCES
ARG VITE_APP_OIDC_RETURN_TYPE
ARG VITE_APP_OIDC_SERVER_TYPE
ARG VITE_APP_OIDC_API_CLIENT_ID
ARG VITE_APP_OIDC_AUTHORITY
ARG VITE_APP_OIDC_CLIENT_ID
ARG VITE_APP_OIDC_SCOPE
ARG VITE_APP_OIDC_AUTOMATIC_SILENT_RENEW_ENABLED

# Sentry variables
ARG VITE_APP_SENTRY_ENVIRONMENT
ARG VITE_APP_SENTRY_DSN
ARG VITE_APP_SENTRY_TRACES_SAMPLE_RATE
ARG VITE_APP_SENTRY_TRACE_PROPAGATION_TARGETS
ARG VITE_APP_SENTRY_REPLAYS_SESSION_SAMPLE_RATE
ARG VITE_APP_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE
ARG VITE_APP_CSP_REPORT_URI

# Api url
ARG VITE_APP_API_URI
ARG VITE_APP_CMS_URI
ARG VITE_APP_API_REPORT_URI

# Linkedevents api url
ARG VITE_APP_LINKEDEVENTS_API_URI

# Application's origin (i.e. where this application is hosted)
ARG VITE_APP_ORIGIN

# Helsinki profile URL
ARG VITE_APP_HELSINKI_PROFILE_URL

# Time before user logout if idle
ARG VITE_APP_IDLE_TIMEOUT_IN_MS

ARG NODE_OPTIONS

# Fix FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - 
# JavaScript heap out of memory: https://github.com/vitejs/vite/issues/2433.
ENV NODE_OPTIONS=${NODE_OPTIONS}

# Release information
ARG VITE_APP_SENTRY_RELEASE
ARG VITE_APP_COMMITHASH
ARG VITE_APP_BUILDTIME

# Use template and inject the environment variables into .prod/nginx.conf
ENV VITE_APP_BUILDTIME=${VITE_APP_BUILDTIME:-""}
ENV VITE_APP_RELEASE=${VITE_APP_SENTRY_RELEASE:-""}
ENV VITE_APP_COMMITHASH=${VITE_APP_COMMITHASH:-""}
COPY .prod/nginx.conf.template /tmp/.prod/nginx.conf.template
RUN export APP_VERSION=$(yarn --silent app:version) && \
    envsubst '${APP_VERSION},${VITE_APP_BUILDTIME},${VITE_APP_RELEASE},${VITE_APP_COMMITHASH}' < \
    "/tmp/.prod/nginx.conf.template" > \
    "/tmp/.prod/nginx.conf"

# Copy all files
COPY . /app

# Build
RUN yarn build

# =============================
FROM registry.access.redhat.com/ubi9/nginx-122 AS production
# =============================
# Add application sources to a directory that the assemble script expects them
# and set permissions so that the container runs without root access
ARG PORT

USER root

RUN chgrp -R 0 /usr/share/nginx/html && \
    chmod -R g=u /usr/share/nginx/html

# Copy static build
COPY --from=staticbuilder /app/build /usr/share/nginx/html
# Copy nginx config
COPY --from=staticbuilder /tmp/.prod/nginx.conf  /etc/nginx/nginx.conf

USER 1001

# Run script uses standard ways to run the application
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]

EXPOSE ${PORT:-8080}
