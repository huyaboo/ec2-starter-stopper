# EC2 Starter

If you develop on an EC2 instance, it's a good practice to turn off the instance at night to save the resources.  But that means you have to log into the console every morning to turn on the instance--until now!

This is a simple script that uses the Node AWS SDK to turn on a specific instance.

## Deps

1. Node
2. [Set up your AWS credentials file](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html).  This script assumes your [default] profile is where your instance is.  It also assumes it's in us-west-2.  Those assumptions are easy to change in the file.
3. *go into the file and change the instance id on line 6*

## Usage

```sh

node index.js

````

Once this command finishes the instance will be running and you should be able to ssh.

