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
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Global npm deps in a non-root user directory
ENV NPM_CONFIG_PREFIX=/app/.npm-global
ENV PATH=$PATH:/app/.npm-global/bin

# Yarn
ENV YARN_VERSION 1.22.4
RUN yarn policies set-version ${YARN_VERSION}

# Copy package.json and package-lock.json/yarn.lock files
COPY package*.json *yarn* ./

# Install npm dependencies
ENV PATH /app/node_modules/.bin:$PATH

RUN yarn && yarn cache clean --force

# ===================================
FROM appbase AS staticbuilder
# ===================================

# Oidc authority
ARG VITE_APP_OIDC_AUTHORITY
ARG VITE_APP_OIDC_CLIENT_ID
ARG VITE_APP_OIDC_SCOPE

# Sentry variables
ARG VITE_APP_SENTRY_DSN
ARG VITE_APP_ENVIRONMENT

# Api url
ARG VITE_APP_API_URI
ARG VITE_APP_CMS_URI
ARG VITE_APP_API_REPORT_URI

# Linkedevents api url
ARG VITE_APP_LINKEDEVENTS_API_URI

# Application's origin (i.e. where this application is hosted)
ARG VITE_APP_ORIGIN

# Release information
ARG VITE_APP_RELEASE
ARG VITE_APP_COMMITHASH
ARG VITE_APP_BUILDTIME

# Use template and inject the environment variables into .prod/nginx.conf
ENV VITE_APP_BUILDTIME=${VITE_APP_BUILDTIME:-""}
ENV VITE_APP_RELEASE=${VITE_APP_RELEASE:-""}
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
FROM nginx:1.22 AS production
# FROM registry.access.redhat.com/ubi9/nginx-122 AS production
# =============================

# Nginx runs with user "nginx" by default
COPY --from=staticbuilder --chown=nginx:nginx /app/build /usr/share/nginx/html
COPY --from=staticbuilder --chown=nginx:nginx /tmp/.prod/nginx.conf /etc/nginx/conf.d/default.conf

# OpenShift write accesses, runtime is created "/var/cache/nginx/client_temp" 
RUN chgrp -R 0 /var/cache/nginx && chmod g+w -R /var/cache/nginx
RUN chgrp -R 0 /run && chmod g+w -R /run

EXPOSE 8080
