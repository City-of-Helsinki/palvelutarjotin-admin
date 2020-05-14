# palvelutarjotin-admin

Staff interface for Palvelutarjotin

## Deployments

Production environment:
[TODO: Add url when deployed]
Project is automatically deployed to production when adding new relase tag, e.g. release-v0.1.0, to repo

Testing environment:
[TODO: Add url when deployed]
Project is automatically deployed to testing environment when pushing to develop brach

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn codegen`

Generate static types for GraphQL queries by using the schema from the backend server. url to backend server is defined to REACT_ADD_API_URL in .env.development.local

### `yarn storybook`

Runs storybook in development mode
Open [http://localhost:9009](http://localhost:9009) to view it in browser

### `yarn build-storybook`

Exports storybook as a static app

### `yarn deploy-storybook`

Deploys a new version of Storybook. Storybook is used for development and there's no CI/CD pipeline set up.

To verify deployment, open [https://city-of-helsinki.github.io/palvelutarjotin-admin/](https://city-of-helsinki.github.io/palvelutarjotin-admin/) and check that everything is looking ok.

## Setting up development environment locally with docker

### Set tunnistamo hostname

Add the following line to your hosts file (`/etc/hosts` on mac and linux):

    127.0.0.1 tunnistamo-backend

### Create a new OAuth app on GitHub

Go to https://github.com/settings/developers/ and add a new app with the following settings:

- Application name: can be anything, e.g. local tunnistamo
- Homepage URL: http://tunnistamo-backend:8000
- Authorization callback URL: http://tunnistamo-backend:8000/accounts/github/login/callback/

Save. You'll need the created **Client ID** and **Client Secret** for configuring tunnistamo in the next step.

### Install local tunnistamo

Clone https://github.com/City-of-Helsinki/tunnistamo/.

Follow the instructions for setting up tunnistamo locally. Before running `docker-compose up` set the following settings in tunnistamo roots `docker-compose.env.yaml`:

- SOCIAL_AUTH_GITHUB_KEY: **Client ID** from the GitHub OAuth app
- SOCIAL_AUTH_GITHUB_SECRET: **Client Secret** from the GitHub OAuth app

To get silent renew to work locally you also need to set:

- ALLOW_CROSS_SITE_SESSION_COOKIE=True

After you've got tunnistamo running locally, ssh to the tunnistamo docker container:

`docker-compose exec django bash`

and execute the following four commands inside your docker container:

```bash
./manage.py add_oidc_client -n palvelutarjotin-admin -t "id_token token" -u "http://localhost:3000/callback" "http://localhost:3000/silent-callback" -i https://api.hel.fi/auth/palvelutarjotin-admin -m github -s dev
./manage.py add_oidc_client -n palvelutarjotin-api -t "code" -u http://localhost:8081/return -i https://api.hel.fi/auth/palvelutarjotin -m github -s dev -c
./manage.py add_oidc_api -n palvelutarjotin -d https://api.hel.fi/auth -s email,profile -c https://api.hel.fi/auth/palvelutarjotin
./manage.py add_oidc_api_scope -an palvelutarjotin -c https://api.hel.fi/auth/palvelutarjotin-admin -n "Palvelutarjotin Admin" -d "Lorem ipsum"
```

Also add http:localhost:3000/ to Post Logout Redirect URIs of palvelutarjotin-admin client on Tunnistamo Django admin http://tunnistamo-backend:8000/admin/oidc_provider/client/

### Install Palvelutarjotin GraphQl server locally

Clone the repository (https://github.com/City-of-Helsinki/palvelutarjotin). Follow the instructions for running palvelutarjotin with docker. Before running `docker-compose up` set the following settings in palvelutarjotin roots `docker-compose.env.yaml`:

- DEBUG=1
- CORS_ORIGIN_ALLOW_ALL=1
- APPLY_MIGRATIONS=1
- CREATE_SUPERUSER=1
- TOKEN_AUTH_AUTHSERVER_URL=http://tunnistamo-backend:8000/openid

### palvelutarjotin-admin-ui

Copy `cp .env.development.local.example .env.development.local`

Run `docker-compose up`, now the app should be running at `http://localhost:3000/`!
`docker-compose down` stops the container.

OR

Run `yarn && yarn start`

## Debugging

### Debugging project in VS Code

To debug in VS Code:

1. Install the "Debugger for Chrome" extension to VS Code
2. Run `yarn start`
3. Set a breakpoint
4. Run "Chrome" debug configuration in VS Code
5. Reload the project in your browser

### Debugging Tests in VS Code

No plugin is needed.

1. Set a breakpoint
2. Run the "Debug tests" debugger configuration

### Debugging Tests in Chrome

We recommend using VS Code's debugger.

1. Place a `debugger;` statement in any test
2. Run yarn `test:debug`
3. Open `about:inspect` in Chrome
4. Select `inspect` on you process, press Play and you're good to go.

See more detailed instructions here:
https://create-react-app.dev/docs/debugging-tests#debugging-tests-in-chrome

## Docker

`docker-compose up` to start the dockerized environment  
`docker-compose down` stops the container.
