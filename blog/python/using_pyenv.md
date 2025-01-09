

# To manage and install multiple Python versions

Using `pyenv`

1. Install `pyenv`

1.1 Update your system
    
    sudo apt update && sudo apt upgrade -y

1.2 Install dependencies

    sudo apt install -y build-essential libssl-dev zlib1g-dev \
    libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \
    libncurses5-dev libncursesw5-dev xz-utils tk-dev \
    libffi-dev liblzma-dev python3-openssl git

1.3 Clone the `pyenv` repository:

    curl https://pyenv.run | bash

1.4 Update your shell configuration (e.g., .bashrc, .zshrc, or .bash_profile) by adding

    export PATH="$HOME/.pyenv/bin:$PATH"
    eval "$(pyenv init --path)"
    eval "$(pyenv virtualenv-init -)"

Reload your shell:

    source ~/.bashrc


2. Install Python Versions

2.1 List available versions:

    pyenv install --list

2.2 Install a specific version:

    pyenv install 3.x.x
    pyenv install 2.x.x

2.3 Set a global version (default):

    pyenv global 3.x.x

2.4 Use a specific version locally (for a project directory)

    pyenv local 3.x.x

3. Verify Installation

    python --version



