
### Instruction for developers:

## 1. Deploying altrp on the local machine

  1. Start

     Need to download the [repository](https://github.com/GTFB/Altrp)

  2. Files

     You need to create an `.env` file in the **altrpnjs** folder with the specified names and contents. You can copy the .env.example file to .env

  3. .env

      ```
       APP_ENV=development
       APP_URL=http://${APP_URL}
       NODE_ENV=development
       PATH_ENV=development
       APP_KEY=${APP_KEY}
       HOST=127.0.0.1
       APP_NAME=altrp
       PORT=${PORT}
       FORCE_HTTPS=false
       DRIVE_DISK=local
      
       DB_HOST=127.0.0.1
       DB_CONNECTION=${DB_CONNECTION}
       DB_PORT=3306
       DB_DATABASE=${DB_DATABASE}
       DB_USERNAME=${DB_USERNAME}
       DB_PASSWORD=${DB_PASSWORD}
      
       CACHE_DRIVER=file
       CACHE_PREFIX=altrp_
       CACHE_VIEWS=true
       QUEUE_CONNECTION=sync
       SESSION_DRIVER=cookie
       SESSION_LIFETIME=7200
      
      ```
## 2. Deploying altrp

  1. File .env

     In the .env file, replace the ${...} variables with the appropriate ones for your system.

     `${APP_URL}` \- local address where the site will be opened.

     `${APP_KEY}` \- unique key\. You can generate it in the console by being in the **altrpnjs** folder and running the command: `node ace generate:key`.

      ```
           ${HOST} - host on which altrp starts (127.0.0.1)
           ${PORT} - port to open the site on
           ${DB_CONNECTION} - type of client 
           ${DB_DATABASE} - name of the database
           ${DB_USERNAME} - user name for the database
           ${DB_PASSWORD} - password for the database
           
           Example  
           ${APP_URL} = http://127.0.0.1
           ${APP_KEY} = gN6L2ptbP0ldpkBd+fkaN2pTIes18km0cQMyIdMowEA=
           ${HOST} = 127.0.0.1
           ${PORT} = 46554
           ${DB_CONNECTION} = mysql
           ${DB_HOST} = localhost
           ${DB_PORT} = 3306
           ${DB_DATABASE} = altrp
           ${DB_USERNAME} = root
           ${DB_PASSWORD} = 123456
      
      ```
## 3. Start

Open the console, go to the **altrpnjs** folder, and run the migration command
`node ace migration:run --force`. If you get a migration error with this command, you need to repeat the command.

After migration, you must run the command adding an administrator to the database `node ace db:seed name=admin email=$email password=$password` Where `$email` is the email of administrator for authorization on the platform, `$password` is the password for administrator for authorization on the platform, you must specify your own parameters! The minimum password length must be 8 characters.

For example: `node ace db:seed name=admin email=admin@example.com password=123qweasd`

Next, you need to start the local server. To do this, run the command while in the folder **altrpnjs**: `node ace serve --watch`

## 4. Running development scripts

All scripts for running are in `package.json` at the root of the project. Open the console in this folder. Install packages: `npm install --legacy-peer-deps`.

To launch all scripts needed for development, run the `npm run run-all` at the root of the project.

## 5. Using platform

Go to the browser and open `${APP_URL}:${PORT}/admin (127.0.0.1:46554/admin from this example)`

To log in, use the previously specified email and password:

Login `$email (admin@example.com from this example)`

Password `$password (123qweasd from this example)`