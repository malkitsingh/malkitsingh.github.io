

# Installing Redis container on the docker 

Assuming you already have docker installed and running, run this command to install redis container

     docker run --name "redis" -e ALLOW_EMPTY_PASSWORD=yes -d -p 6379:6379 bitnami/redis:latest

This will create a container named `redis` which can be connected without password and accessed on the port **6379**

## Connecting to Redis container

In order to connect with this Redis server we need `Redis-Cli` tool on the server/remote system which can be installed using this command on the server

    sudo apt-get install redis-tools

And to test if the local redis server is running and connecting, run this command:

    redis-cli -h 127.0.0.1 -p 6379 ping
    // you can connect without mentioning host
    redis-cli -p 6379 ping




