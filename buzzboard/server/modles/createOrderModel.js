const mongoose =  require("mongoose");

const createOrdersSchema = new mongoose.Schema({
    order_id: { type: String, required: [true , "Please add the order id" ]},
    item_name: { type: String, required:  [true , "Please add the item name" ]},
    cost:{type:String,required: [true , "Please add the cost" ]},
    order_date:{type:String,  required: [true , "Please add the order date" ]},
    delivery_date:{type:String, required: [true , "Please add the delivery date" ]}
})

module.exports = mongoose.model('Orders' , createOrdersSchema)