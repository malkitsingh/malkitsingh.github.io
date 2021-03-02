

# Install MongoDB on Amazon Linux 2 using Yum

Step 1– Update Amazon Linux 2

    sudo yum update  -y

Step 2 – Create Yum repository

    sudo nano /etc/yum.repos.d/mongodb-org-4.2.repo

Put the following content inside  `/etc/yum.repos.d/mongodb-org-4.2.repo` file and save and exit.

    [mongodb-org-4.2]
    name=MongoDB Repository
    baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/4.2/x86_64/
    gpgcheck=1
    enabled=1
    gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc

Step 3– Install MongoDB on EC2

    sudo yum install mongodb-org -y




