
const AWS = require('aws-sdk');
const Rekognition =AWS.Rekognition
const DetectTextRequest  =AWS.Rekognition.DetectTextRequest
// Set your AWS credentials
const AWSParameters = {
    accessKeyId: "AKIAY6RCK4EYPWKD6J6G",
    secretAccessKey:"bv5c6vbVCXj8qJFcf624F4rARgfKLwGMNn+4PUq1",
    "region": "us-east-1",
    "bucket": "scannearn"
}
var params = {Bucket: 'scannearn', Key: 'nike.jpg'}
const rekognition = new Rekognition(AWSParameters)

  var params = {
    Image: { /* required */
      S3Object: {
        Bucket: 'scannearn',
        Name: 'zara.png',
       
      }
    }
  };
  const text = rekognition.detectText(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else  {  
    //console.log(data); 
    const jsonParsed = JSON.parse(JSON.stringify(data));
    const textDetect = jsonParsed.TextDetections[0].DetectedText;
    console.log(textDetect);
    return textDetect;          // successful response
    }
  });
  

   // console.log(text.textDetect);
  
  

  
