# Dynamic Bash Prompt (`PS1`) Customization

## Overview
The `PS1` variable in Bash controls the command prompt's appearance. This guide covers how to customize `PS1` for different directories, switch back to previous states, and make changes permanent.

## Changing the Prompt
To change the prompt temporarily, use:

```bash
export PS1='APM '
```

This changes the prompt to:
```
APM 
```
However, this change is **temporary** and resets when you restart the terminal.

## Resetting the Prompt to Default
If you want to revert back to the original prompt, use:

```bash
export PS1='\u@\h:\w\$ '
```

This restores the typical format:
```
username@hostname:/current/path$
```

## Setting Different Prompts for Different Paths
You can dynamically change the prompt based on the current working directory by adding this function to your `~/.bashrc`:

```bash
function set_prompt() {
    case "$PWD" in
        /home/user/projects) PS1='[PROJECT] \$ ' ;;
        /var/www) PS1='[WEB] \$ ' ;;
        /etc) PS1='[SYSTEM] \$ ' ;;
        *) PS1='\u@\h:\w\$ ' ;;  # Default prompt
    esac
}

PROMPT_COMMAND=set_prompt
```

This ensures that each time you change directories, the prompt updates accordingly.

### Alternative: Using `cd` to Update the Prompt
Another method is overriding `cd` to update `PS1`:

```bash
function cd() {
    builtin cd "$@" || return  # Run the normal cd command
    
    case "$PWD" in
        /home/user/projects) export PS1='[PROJECT] \$ ' ;;
        /var/www) export PS1='[WEB] \$ ' ;;
        /etc) export PS1='[SYSTEM] \$ ' ;;
        *) export PS1='\u@\h:\w\$ ' ;;  # Default prompt
    esac
}
```

## Making the Change Permanent
To keep custom prompts after restarting the terminal, add them to `~/.bashrc`:

```bash
nano ~/.bashrc
```
Paste the function inside, save, and apply the changes:

```bash
source ~/.bashrc
```

## Other Ways to Reset the Prompt

### 1. Restore a Basic Prompt
```bash
export PS1='\u@\h:\w\$ '
```

### 2. Unset PS1 (Use System Default)
```bash
unset PS1
```

### 3. Reload `.bashrc`
```bash
source ~/.bashrc
```

### 4. Restart the Terminal
Closing and reopening the terminal also resets `PS1` unless you have made permanent changes.

---

This guide helps you personalize your Bash prompt efficiently. 🚀 If you have any questions or want more customizations like colors or Git branch indicators, feel free to explore further! Happy coding! 🎨

