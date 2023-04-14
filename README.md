<!--
title: 'AWS NodeJS Example'
description: 'This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->


# Serverless Framework AWS NodeJS Example

This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework. The deployed function does not include any event definitions as well as any kind of persistence (database). For more advanced configurations check out the [examples repo](https://github.com/serverless/examples/) which includes integrations with SQS, DynamoDB or examples of functions that are triggered in `cron`-like manner. For details about configuration of specific `events`, please refer to our [documentation](https://www.serverless.com/framework/docs/providers/aws/events/).

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying aws-node-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-project-dev (112s)

functions:
  hello: aws-node-project-dev-hello (1.5 kB)
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
serverless invoke --function hello
```

Which should result in response similar to the following:

```json
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": {}\n}"
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function hello
```

Which should result in response similar to the following:

```
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": \"\"\n}"
}
```
# FTP Server configuration

https://linuxbeast.com/tutorials/aws/install-s3fs-and-mount-s3-bucket-on-ubuntu-18-04/
https://www.digitalocean.com/community/tutorials/how-to-set-up-vsftpd-for-a-user-s-directory-on-ubuntu-18-04
https://github.com/kman46/ftpsetup
https://github.com/s3fs-fuse/s3fs-fuse

mount.sh
```shell

#!/usr/bin/env bash

S3BUCKETNAME=building-manager-s3fs
S3BUCKETREGION=eu-west-1
FTPUSERNAME=ftpuser

#=======================

EC2METALATEST=http://169.254.169.254/latest
EC2METAURL=$EC2METALATEST/meta-data/iam/security-credentials/
EC2ROLE=`curl -s $EC2METAURL`
sudo s3fs $S3BUCKETNAME \
-o use_cache=/tmp,iam_role="$EC2ROLE",allow_other /home/$FTPUSERNAME/ftp/files \
-o url="https://s3-$S3BUCKETREGION.amazonaws.com" \
-o nonempty
```