const Orders = require("../modles/createOrderModel");

// create order route controller
// route orders/create
const createOrder = async (req, res) => {
  console.log(req.body);

  const { order_id, item_name, cost, order_date, delivery_date } = req.body;

  // validating all fields mandatory
    if (!order_id || !item_name || !cost || !order_date || !delivery_date) {
      res.status(400).json({
        message: "all fileds are mandatory",
      });
    } else {

      const isOrderExists = await Orders.findOne({order_id:order_id });
      console.log({isOrderExists});

      // check if the order already exists in the database
      if(!isOrderExists){ 
          const newOrder = await Orders.create({
            order_id: order_id,
            item_name: item_name,
            cost: cost,
            order_date: order_date,
            delivery_date: delivery_date,
          });
          res.status(201).json({ message: "order created", data: newOrder });
        }else{
          res.status(500).json({message:"this order id already exist"})
        }
      }
};

// gget orders route controller
// route orders/list
const getOrders = async (req, res) => {
  const getOrdersList = await Orders.find();

  if (!getOrdersList) {
    res.status(401).json({ message: "no data found" });
  } else {
    res.status(200).json({ message: "get orders list", Orders: getOrdersList });
  }
};

// update order by id route controller
// route orders/update
const updateDeliveryDate = async (req, res) => {
  console.log("update order by id", req.params.id);

  const order = await Orders.findById();
  console.log({ order });

  const deliveryDate = req.body.delivery_date;
  console.log({ deliveryDate });
  const orderId = req.params.id;

  const updateDeliveryDate = await Orders.findByIdAndUpdate(
     orderId,
    {delivery_date : req.body.delivery_date},
    { new: true }
  );

  if (!updateDeliveryDate) {
    res.status(404);
    throw new Error("not updated");
  }

  res.status(200).json({
    message: `order updated successfully`,
    updatedData: updateDeliveryDate,
  });
};

// get order by id route controller
// route orders/search
const getorder = async (req, res) => {
  console.log("get order by id", req.params.id);

  const order = await Orders.findById({ _id: req.params.id });
  console.log("order:", order);

  if (!order) {
    res.status(404);
    throw new Error("Order not found!");
  }
  res.status(200).json({ message: "order fetched", data: order });
};

// delete order route controller
// route orders/delete
const deleteOrder = async (req, res) => {
  console.log("delete order by id", req.params.id);

  const deleteOrder = await Orders.deleteOne({ _id: req.params.id });

  if (!deleteOrder) {
    res.status(401);
    throw new Error("no order found");
  }
  res.status(200).json({ message: `deleted order`, data: deleteOrder });
};

module.exports = {
  createOrder,
  deleteOrder,
  getorder,
  getOrders,
  updateDeliveryDate,
};
