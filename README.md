### Instruction for developers:

1. Deploying altrp on the local machine
  1. Start
     Need to download the [repository](https://github.com/GTFB/Altrp)
  2. Files
     You need to create an `.env` file in the **altrpnjs** folder with the specified names and contents
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
2. Deploying altrp
  1. File .env
     In the .env file, replace the ${...} variables with the appropriate ones for your system
     `${APP_URL}` \- local address where the site will be opened
     `${APP_KEY}` \- unique key\. You can generate it on the [site](https://generate.plus/en/base64), the length must be specified as 32

      ```
           ${HOST} - host on which altrp starts (127.0.0.1)
           ${PORT} - port to open the site on
           DB_CONNECTION=mysql - type of client 
           ${DB_DATABASE} - name of the database
           ${DB_USERNAME} - user name for the database
           ${DB_PASSWORD} - password for the database
           
           Example  
           ${APP_URL} = http://127.0.0.1
           ${APP_KEY} = gN6L2ptbP0ldpkBd+fkaN2pTIes18km0cQMyIdMowEA=
           ${HOST} = altrp.server
           ${PORT} = 32654
           ${DB_DATABASE} = dev_altrp
           ${DB_USERNAME} = admin
           ${DB_PASSWORD} = qwerty
      
      ```
3. Start
   Open a terminal, go to the **altrpnjs** folder, and run the migration command
   `node ./ace migration:run --force`
   If you get a migration error with this command, you need to repeat the command after migration, you must run the command adding an administrator to the database node `./ace db:seed name=admin email=$email password=$adminPassword` Where `$email` is email of administrator for authorization on the platform, `$adminPassword` is password for administrator for authorization on the platform, you must specify your own parameters! The minimum password length must be 8 characters
   Example command
   `node ./ace db:seed name=admin email=alt@rp.com password=123qweasd`
4. Using platform
   In the browser at `${APP_URL}:${PORT}/admin (127.0.0.1:32654/admin from this example)`, the login panel opens
   Login `$email (alt@rp.com from this example)`
   Password `$adminPassword (asdfg from this example)`

running development scripts
all scripts for frontend are in `package.json` at the root of the project
open the console in this folder
install packages:
`npm install --legacy-peer-deps` launch the necessary script `npm run admin-start` if your `adonis .env` has `PATH_ENV=development` `admin-start` will appear
