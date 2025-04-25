# Setup local Tunnistamo

## Set Tunnistamo hostname

Add the following line to your hosts file (`/etc/hosts` on mac and linux):

    127.0.0.1 tunnistamo-backend

## Create a new OAuth app on GitHub

Go to https://github.com/settings/developers/ and add a new app with the following settings:

- Application name: can be anything, e.g. local tunnistamo
- Homepage URL: http://tunnistamo-backend:8000
- Authorization callback URL: http://tunnistamo-backend:8000/accounts/github/login/callback/

Save. You'll need the created **Client ID** and **Client Secret** for configuring tunnistamo in the next step.

## Install local tunnistamo

Clone https://github.com/City-of-Helsinki/tunnistamo/.

Follow the instructions for setting up tunnistamo locally. Before running `docker-compose up` set the following settings
in tunnistamo roots `docker-compose.env.yaml`:

- SOCIAL_AUTH_GITHUB_KEY: **Client ID** from the GitHub OAuth app
- SOCIAL_AUTH_GITHUB_SECRET: **Client Secret** from the GitHub OAuth app

To get silent renew to work locally you also need to set:

- ALLOW_CROSS_SITE_SESSION_COOKIE=True
  - NOTE: Using this breaks login to Django admin interface, see tunnistamo
    issue [#269](https://github.com/City-of-Helsinki/tunnistamo/issues/269).
  - By leaving out the ALLOW_CROSS_SITE_SESSION_COOKIE=True or setting it to False, you can login to Django admin
    interface but silent renew will not work.

After you've got tunnistamo running locally, ssh to the tunnistamo docker container:

`docker-compose exec django bash`

and execute the following four commands inside your docker container:

```bash
./manage.py add_oidc_client -n palvelutarjotin-admin -t "id_token token" -u "http://localhost:3000/callback" "http://localhost:3000/silent-callback" -i https://api.hel.fi/auth/palvelutarjotin-admin -m github -s dev
./manage.py add_oidc_client -n palvelutarjotin-api -t "code" -u http://localhost:8081/return -i https://api.hel.fi/auth/palvelutarjotin -m github -s dev -c
./manage.py add_oidc_api -n palvelutarjotin -d https://api.hel.fi/auth -s email,profile -c https://api.hel.fi/auth/palvelutarjotin
./manage.py add_oidc_api_scope -an palvelutarjotin -c https://api.hel.fi/auth/palvelutarjotin-admin -n "Palvelutarjotin Admin" -d "Lorem ipsum"
```

Also add http://localhost:3000/ to Post Logout Redirect URIs of palvelutarjotin-admin client on Tunnistamo Django
admin http://tunnistamo-backend:8000/admin/oidc_provider/client/