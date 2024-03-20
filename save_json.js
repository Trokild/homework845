const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

const save = async (Number, key) => {
  console.log("saving");
  await s3.putObject({
    Body: JSON.stringify(Number, null, 2),
    Bucket: "cyclic-fine-puce-alligator-gear-eu-north-1",
    Key: key,
  }).promise()
};

module.exports = { save };