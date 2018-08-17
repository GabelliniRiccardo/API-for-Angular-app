# API for Users App

A simple API written in js. It's useful to manage the request from Users App.

# To access AWS instance:

1) Open an SSH client. (find out how to connect using PuTTY)
2) Locate your private key file (UsersApi.pem). The wizard automatically detects the key you used to launch the instance.
3) Your key must not be publicly viewable for SSH to work. Use this command if needed:

chmod 400 UsersApi.pem

4) Connect to your instance using its Public DNS:

ec2-35-180-140-65.eu-west-3.compute.amazonaws.com

Example:

ssh -i "UsersApi.pem" ubuntu@ec2-35-180-140-65.eu-west-3.compute.amazonaws.com

