const { Router } = require("express");
const { save } = require("../save_json");
let favouriteNumber = require("../number.json");
const add = require("../add");
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

const router = new Router();

router.get("/sum/:number1/:number2", async (req, res) => {
  let my_file = await s3.getObject({
    Bucket: "cyclic-fine-puce-alligator-gear-eu-north-1",
    Key: "number.json",
  }).promise()
  const favNumber = JSON.parse(my_file.Body)?.favouriteNumber;
  const {number1, number2} = req.params;
  if(number1 == null || number2 == null) {
    res.status(400).send("Not provided numbers");
    return;
  }
  if(isNaN(parseInt(number1)) || isNaN(parseInt(number2))) {
    res.status(400).send("Numbers needs to be integer");
    return;
  }
  let result = add(parseInt(number1), parseInt(number2));
  if(favNumber != null) {
    result = add(result, favNumber )
  }
  res.json({
    status: "success",
    result: result,
  });
});

router.get("/content", async (req, res) => {
  let my_file = await s3.getObject({
    Bucket: "cyclic-fine-puce-alligator-gear-eu-north-1",
    Key: "content.json",
  }).promise()
  const newContent = JSON.parse(my_file.Body)?.content;

  res.json({
    status: "success",
    result: newContent,
  });
});

router.post("/favNumber", async (req, res) => {
  const {number} = req.body;
  if(number == null ) {
    res.status(400).send("Not provided number");
    return;
  }
  if(isNaN(parseInt(number))) {
    res.status(400).send("The number needs to be integer");
    return;
  }
  await save({
    favouriteNumber: number
  }, "number.json");
  res.json({
    status: "success",
    newFavouriteNumber: number,
  });
});

router.post("/newcontent", async (req, res) => {
  let newcontent = req.body;
  if(newcontent == null ) {
    res.status(400).send("newcontent is null");
    return;
  }
  await save({
    content: newcontent
  }, "content.json");
  res.json({
    status: "success",
    content: newcontent,
  });
});


module.exports = router;