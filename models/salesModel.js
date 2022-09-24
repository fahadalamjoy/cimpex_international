const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema(
  {
    invoice_no:{type:String,required:false},
    id:{type:String,required:false},
    customer_name: { type: String, required: true },
    customer_number: { type: String, required: true },

    selected_product: { type: [String], required: true },
    unit_price: { type: Number, required: false },
    unit_sold: { type: Number, required: false },
    total: { type: Number, required: false },

    another_product: { type: [String], required: true },
    a_unit_price: { type: Number, required: false },
    a_unit_sold: { type: Number, required: false },
    a_total: { type: Number, required: false },

    address: { type: String, required: false },
    d_charge: { type: Number, required: false },
    i_location: { type: String, required: false },
    advance: { type: Number, required: false },
    discount: { type: Number, required: false },
    shipping_date: { type: String, required: false },
    delivery: { type: String, required: false },
    payment: { type: String, required: false },
    sale_by: { type: String, required: false },
    comments: { type: String, required: false },
    // created: {type: Date, default: Date.now}
    
  },
  { timestamps: true }
);

const SalesModel = mongoose.model("sales", itemsSchema);

module.exports = SalesModel;
