# Managing and Installing Multiple Python Versions Using `pyenv`

## 1. Install `pyenv`

### 1.1 Update Your System

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Dependencies

```bash
sudo apt install -y build-essential libssl-dev zlib1g-dev \
libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \
libncurses5-dev libncursesw5-dev xz-utils tk-dev \
libffi-dev liblzma-dev python3-openssl git
```

### 1.3 Clone the `pyenv` Repository

```bash
curl https://pyenv.run | bash
```

### 1.4 Update Shell Configuration

Add the following lines to your shell configuration file (e.g., `.bashrc`, `.zshrc`, or `.bash_profile`):

```bash
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv virtualenv-init -)"
```

Reload your shell:

```bash
source ~/.bashrc
```

---

## 2. Install Python Versions

### 2.1 List Available Versions

```bash
pyenv install --list
```

### 2.2 Install a Specific Version

```bash
pyenv install 3.x.x
pyenv install 2.x.x
```

### 2.3 Set a Global Version (Default)

```bash
pyenv global 3.x.x
```

### 2.4 Use a Specific Version Locally (for a Project Directory)

```bash
pyenv local 3.x.x
```

---

## 3. Verify Installation

```bash
python --version
