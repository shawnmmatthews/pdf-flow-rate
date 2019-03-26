const AWS = require('aws-sdk');
const sqs = new AWS.SQS({
    region: 'us-east-1'
});

exports.handler = function(event, context, callback) {
    const accountId = context.invokedFunctionArn.split(':')[4];
    const queueUrl = 'https://sqs.us-east-1.amazonaws.com/' + accountId + '/MessageQueue';

    // response and status of HTTP endpoint
    const responseBody = {
        message: ''
    };
    const responseCode = 200;

    // SQS message parameters
    const params = {
        MessageBody: event.body,
        QueueUrl: queueUrl
    };

    sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.log('error:', 'failed to send message' + err);
            let responseCode = 500;
        } else {
            console.log('data:', data.MessageId);
            responseBody.message = 'Sent to ' + queueUrl;
            responseBody.messageId = data.MessageId;
        }
        let response = {
            statusCode: responseCode,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responseBody)
        };

        callback(null, response);
    });
}