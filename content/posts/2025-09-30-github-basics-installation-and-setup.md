---
title: "GitHub Basics - Installation and Setup"
description: "Getting Started With the Version Control System"
tags: ["Hacktoberfest", "Beginner", "Github"]
date: "2025-10-05"
cover: "https://github.blog/wp-content/uploads/2024/05/GitHub-for-beginners.png?fit=1600%2C840" # Optional
author:
  name: "holygrimm"
social:
  "github": "holygrimm"
---


# Install Git

## Linux

### Step 1.1: Update the system

Run these commands in the terminal to update the Linux system:
```
sudo apt update
sudo apt upgrade
```

### Step 1.2: Install Git
You likely have git installed already, but to make sure that we have the most up-to-date version of git, run the following commands:
```
sudo add-apt-repository ppa:git-core/ppa
sudo apt update
sudo apt install git
```

### Step 1.3: Verify version
Make sure your Git version is at least 2.28 by running this command:
```
git --version
```

## MacOS

### Step 1.0: Install Homebrew

First, you’ll need to install Homebrew. Make sure you have checked the requirements here. Once you meet the requirements, copy and paste the following into your terminal:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Step 1.1: Update Git
MacOS already comes with a version of Git, but you should update to the latest version. In the terminal, type
```
brew install git
```
This will install the latest version of Git. Easy, right?

### Step 1.2: Verify version
If you have just installed and/or updated Git from the previous step, first close that terminal window.

Open a new terminal window and then make sure your Git version is at least 2.28 by running this command:
```
git --version
```

## Windows 

For Windows head over to the [Git website](https://git-scm.com/downloads) and download the software.

After installation, you can use either GUI or CLI

## Setup

### Step 2.1: Setup Git
For Git to work properly, we need to let it know who we are so that it can link a local Git user (you) to GitHub. When working on a team, this allows people to see what you have committed and who committed each line of code.

The commands below will configure Git. Be sure to enter your own information inside the quotes (but include the quotation marks)!
```bash
git config --global user.name "Your Name"
git config --global user.email "yourname@example.com"
```
GitHub recently changed the default branch on new repositories from master to main. Change the default branch for Git using this command:
```
git config --global init.defaultBranch main
```
To enable colorful output with git, type
```
git config --global color.ui auto
```
To verify that things are working properly, enter these commands and verify whether the output matches your name and email address.
```
git config --get user.name
git config --get user.email
```

### Step 2.3: Create an SSH key
An SSH key is a cryptographically secure identifier. It’s like a really long password used to identify your machine. GitHub uses SSH keys to allow you to upload to your repository without having to type in your username and password every time.

First, we need to see if you have an Ed25519 algorithm SSH key already installed. Type this into the terminal and check the output with the information below:
```
ls ~/.ssh/id_ed25519.pub
```
If a message appears in the console containing the text “No such file or directory”, then you do not yet have an Ed25519 SSH key, and you will need to create one. If no such message has appeared in the console output, you can proceed to step 2.4.

To create a new SSH key, run the following command inside your terminal.
```
ssh-keygen -t ed25519 -C "your@email.com"
```

### Step 2.4: Link your SSH key with GitHub
Now, you need to tell GitHub what your SSH key is so that you can push your code without typing in a password every time.

First, you’ll navigate to where GitHub receives our SSH key. Log into GitHub and click on your profile picture in the top right corner. Then, click on Settings in the drop-down menu.

Next, on the left-hand side, click the SSH and GPG keys. Then, click the green button in the top right corner that says New SSH Key. Name your key something that is descriptive enough for you to remember where it came from. Leave this window open while you do the next steps.

Now you need to copy your public SSH key. To do this, we’re going to use a command called cat to read the file to the console. (Note that the .pub file extension is essential in this case.)
```bash
cat ~/.ssh/id_ed25519.pub
```
Highlight and copy the output, which starts with ssh-ed25519 and ends with your email address.

Now, go back to GitHub in your browser window and paste the key you copied into the key field. Keep the key type as Authentication Key and then, click Add SSH key. You’re done! You’ve successfully added your SSH key!

# Conclusion

You’ve completed the basic installations section, good job! As you progress through the Paths there will be other tools to install, so keep an eye out!

You probably felt like you were way in over your head, and you probably didn’t understand much of what you were doing. That’s 100% normal. Hang in there. You can do this! And we’ve got your back.