# Node Setup
Install NVM with homebrew

```bash
brew update
brew install nvm
```

If the directory doesn't exist already, make it: mkdir `~/.nvm`

If this line isn't in your bash profile already, add it:

```bash
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

* Note, if you have upgraded mac os x recently and switch to zsh, you may need to do the following:

```bash
echo "source ~/.bash_profile" >> ~/.zshrc
```

The above will load your bash_profile in the zsh shell.

Now, let's get the version of node we want, let's go with the bleeding edge latest:
`nvm install 17.0.1`

# Serverless Setup

If you don't already have it, let's get yarn into the mix, run:
`npm install -g yarn`

Serverless:
`yarn global add sls @sls-next/serverless-component`

# AWS Setup

Create a Free tier AWS account. For your "root" user, go into the IAM server, go to Users on the left nav, click on your user in the table, then click on the "Security Credentials" tab, then the "Create access key" button, and get your access key/secret. You will want to write this down somewhere safe, and we will need to add it to local configs for the aws cli

You might have guessed it, next step, install the aws-cli following [these instructions](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html).

The main thing to do is the following to either do the initial install or upgrade and existing install

```bash
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

Next, we need to setup your aws credentials.
`mkdir ~/.aws` if this directory doesn't exist already.

Next, create a file in that directory called credentials with the following content:

```bash
[default]
aws_access_key_id = YOUR_KEY_HERE
aws_secret_access_key = YOUR_SECRET_HERE

[secondary]
aws_access_key_id = YOUR_OTHER_KEY_HERE
aws_secret_access_key = YOUR_OTHER_SECRET_HERE
```

BTW, the secondary section is optional. AWS allows you to have named profiles which is useful if you say have a personal AWS account, but also work with our Incentify AWS account, or perhaps you work with our developer AWS account, and our production incentify AWS account like Nick and I, named profiles are there to help you with this.

create a file in that directory (`~/.aws`) called config with the following content:

```bash
[default]
region = us-west-2

[profile secondary]
region=us-west-2
```

Now, let's get into next!

`yarn create next-app next-serverless-demo --ts`

Create new pages, Links, Images, CSS modules, etc

`yarn add @apollo/client graphql`

Pre-rendering: Static Generation vs Server Side rendering. Can be defined per page 

# Static Generation uses getStaticProps:
* getStaticProps runs at build time in production, and…
* Inside the function, you can fetch external data and send it as props to the page.