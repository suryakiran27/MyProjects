const express = require("express");
const router = express.Router();
const { createOrder, getOrders ,updateDeliveryDate ,getorder ,deleteOrder} = require("../controllers/orderControllers");

router.route("/create").post(createOrder);
router.route("/list").get(getOrders);
router.route("/update/:id").post(updateDeliveryDate);
router.route("/search/:id").get(getorder);
router.route("/delete/:id").get(deleteOrder);

module.exports = router;
