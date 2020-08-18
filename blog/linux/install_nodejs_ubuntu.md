

# Install NodeJs on Ubuntu


## Installing the Distro-Stable Version for Ubuntu
Ubuntu 18.04 contains a version of Node.js in its default repositories that can be used to provide a consistent experience across multiple systems.
To get this version, you can use the `apt` package manager. Refresh your local package index by typing:

     sudo apt-get update
     sudo apt install -y nodejs
     nodejs -v

## Installing Using a PPA
To get a more recent version of Node.js you can add the PPA (personal package archive) maintained by [NodeSource](https://nodesource.com/)

First, install the PPA in order to get access to its contents. From your home directory, use `curl` to retrieve the installation script for your preferred version, making sure to replace `10.x` with your preferred version string (if different):

    cd ~
    curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh

You can inspect the contents of this script with nano (or your preferred text editor):

    nano nodesource_setup.sh

Run the script under sudo:

    sudo bash nodesource_setup.sh

The PPA will be added to your configuration and your local package cache will be updated automatically. After running the setup script from Nodesource, you can install the Node.js package in the same way you did above:

    sudo apt install nodejs
    nodejs -v

## Removing Node.js

You can uninstall Node.js using apt or nvm, depending on the version you want to target. To remove the distro-stable version, you will need to work with the apt utility at the system level.

To remove the distro-stable version, type the following:

    sudo apt remove nodejs

This command will remove the package and retain the configuration files. These may be of use to you if you intend to install the package again at a later point. If you don’t want to save the configuration files for later use, then run the following:

    sudo apt purge nodejs

This will uninstall the package and remove the configuration files associated with it.

As a final step, you can remove any unused packages that were automatically installed with the removed package:

    sudo apt autoremove



