# Hello World Chatbot

Code base for basic Hello World chatbot based on AWS Lex service and AWS Lambda

![](https://s3.amazonaws.com/fastfoodchatbot/media/BasicLexArchitecture.png)

**Table of Contents**

- [What do I need to put into Lex to get started?](#get-started-with-Lex)
- [What do I need for AWS Lambda?](#get-started-with-Lambda)
- [How do I test this to get started?](#start-testing-your-bot)

## Get started with Lex

Using the AWS console, create your first Lex bot and give it a unique name.

## Get started with Lambda

1) Create a new blank lambda function.
2) Copy the code in the /src folder into the lambda function.
3) Save.

## Start testing your bot

First make sure that your Lambda function is properly setup. 
From the /testdata folder, use the AWS console to test the function with the [request](https://github.com/terrenjpeterson/lex-hello-world/blob/master/testdata/request.json) object.
After invoking, you should receive a response object that looks like [this](https://github.com/terrenjpeterson/lex-hello-world/blob/master/testdata/response.json).

Once the lambda function properly works, then connect it to Lex. This can be done through the console by changing the Fullfillment radio button on the intent and selecting the Lambda function.

For a more advanced bot, please try [this](https://github.com/terrenjpeterson/caloriecounter)
