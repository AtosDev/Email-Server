const express = require("express");
const router = express.Router();

const ShopifyController = require("../../controllers/ShopifyController");

router.post("/getRecentData", ShopifyController.getRecentData);


module.exports = router;