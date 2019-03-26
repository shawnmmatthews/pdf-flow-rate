const AWS = require('aws-sdk');
const s3 = new AWS.S3({ params: { Bucket: process.env.BUCKET } });

exports.handler = function(event, context, callback) {
    return 'Firing post based on new S3 being found.'
}