

# Install & configure AWS CLI on MacOS

Step 1 – Visit <a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html" target="_blank">this</a> link and download the installation package.

Step 2 – Setting Access_Key and Private_Key with profile name

    aws configure --profile some_name
    
Put the following details  `AWS Access Key ID`, `AWS Secret Access Key` and `Default region name`.

This will save a named profile which you can use to execute commands through CLI against specific profile (if you have multiple AWS accounts to work with).



Step 3 – Executing command with given profile

    aws ec2 describe-instances --profile some_name

To use a named profile for multiple commands, you can avoid specifying the profile in every command by setting the `AWS_PROFILE` environment variable at the command line

    export AWS_PROFILE=some_name

Step 4 - Test the setup

    aws sts get-caller-identity --profile some_name
    # or if the defaul one is set then
    aws sts get-caller-identity





