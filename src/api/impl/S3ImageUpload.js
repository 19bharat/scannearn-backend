
const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: "AKIAY6RCK4EYPWKD6J6G",
    secretAccessKey:"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"
});

const fileName = 'adidas2.png';

const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: 'scannearn', // pass your bucket name
         Key: 'adidas2.png', // file will be saved as testBucket/contacts.csv
         Body: JSON.stringify(data, null, 2)
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};

uploadFile();
