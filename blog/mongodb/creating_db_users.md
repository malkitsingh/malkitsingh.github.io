

# Creating a DB and Users in MondoDB

Step 1– Connect to the instance

    mongo

Step 2 – Create Administrator User

    db.createUser({	user: "username", pwd: "password",roles:[role: "userAdminAnyDatabase" , db:"admin"}]})

Step 3 – Create User for particular database

    db.createUser({	user: "username", pwd: "password",roles:[role: "userAdmin" , db:"dbname"}]})

It is important to enable authorization in `mongo.conf` file to let users login using given set of credentials and to do so you need to edit `mongod.conf` file using this command.

    sudo nano /etc/mongod.conf

Add the line:

    security:
        authorization: "enabled"
then

    sudo service mongod restart

Step 4– Connect to particular DB using given username and password

    mongo --port 27017 -u "dbAdmin" -p "admin123" --authenticationDatabase "admin"

Step 5– Enable connection from remote

To be able to connect to this instance of MongoDB remotely, you need to change the binding in conf file

    net:
        bindIp: 0.0.0.0

Once edited, you must restart the mongo service using

    sudo service mongod restart


## To update user permissions

    db.updateUser( "dbUser",{
                 roles : [ { role: "dbAdmin", db: "readyplayer" },{ role: "readWrite", db: "readyplayer" } ]
                })






