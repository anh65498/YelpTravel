# Documentation for Developers

### How to sync Mlab with local MongoDB

1. In terminal, run mongod by `$ mongod` and your application `$ node app.js`

- If there's error `SocketException: Address is already in use`, do the following:
    + Search for a list of tasks running on your machine via `$ sudo lsof -iTCP -sTCP:LISTEN -n -P`
    + User column COMMAND, Search for mongod and its PID then type `$sudo kill <mongo_command_pid>`
    + Now start your mongod instance by typing `$ mongod`. It should work now.

2. Log into your MLbb account online. Select a deployment under MongoDB Deployment. There's instruction to connect using the mongo shell. Use your MLab's database username and password (different from the login username and password) in <dbuser> and <dbpassword>

Example: `$ mongo ds261567.mlab.com:61567/heroku_5h8vr1w3 -u <dbuser> -p <dbpassword>`

3. In your online MLab account, you’ll find specific commands on the ‘Tools’ section of your database to import and export. Open a new terminal tab and do the following:

    + To export database from MLab in binary format: `$ mongodump -h ds261567.mlab.com:61567 -d heroku_5h8vr1w3 -u <user> -p <password>`

    + After this command, check the folder `dump` in the current directory, there'd be a folder called `heroku_5h8vr1w3` that contains all the collections from the online Database. 

    + Then, run `$ mongorestore --drop -d YelpTravel_destinations ./dump/heroku_5h8vr1w3/` to replace the content in the local db `YelpTravel_destinations` with the remote db from MLab.

#### Push local changes to Heroku

1. Push your changes to Github
```
$ git add . 
$ git commit -m “message”
$ git push origin master
```

2. Push your code to Heroku
```
$ git push heroku master
```

3. Check for changes on Heroku 
```
$ heroku open
```