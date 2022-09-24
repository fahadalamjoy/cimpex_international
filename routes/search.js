const express = require("express");
const SalesModel = require("../models/salesModel");
const otpModel = require("../models/OtpModel");
const router = express.Router();

// router.get("/",  (req, res) => {
//     const searchField = req.query.name
//     const bodyField = req.params
//     console.log(bodyField)
//     SalesModel.find({"$or":[{customer_name:{$regex:searchField,$options:'$i'}},
//                             {customer_number:{$regex:searchField,$options:'$i'}},
//                             {payment:{$regex:searchField,$options:'$i'}}]})

//     .then(data=>{
//       res.send(data)
//     })
//   });

router.post("/", (req, res) => {
  // const searchField = req.query.name
  const { search, value } = req.body;
  // console.log(search, value);
  if (value === "customer") {
    SalesModel.find({
      $or: [{ customer_name: { $regex: search, $options: "$i" } }],
    }).then((data) => {
      // console.log(data)
      res.send(data);
    });
  }else if(value === "contact"){
    SalesModel.find({
      $or: [{ customer_number: { $regex: search, $options: "$i" } }],
    }).then((data) => {
      res.send(data);
    });
  }else if(value === "invoice_no"){
    SalesModel.find({
      $or: [{ invoice_no: { $regex: search, $options: "$i" } }],
    }).then((data) => {
      res.send(data);
    });
  }else if(value === "payments"){
    SalesModel.find({
      $or: [{ payment: { $regex: search, $options: "$i" } }],
    }).then((data) => {
      res.send(data);
    });
  }else if(value === "address"){
    SalesModel.find({
      $or: [{ address: { $regex: search, $options: "$i" } }],
    }).then((data) => {
      res.send(data);
    });
  } else{
    SalesModel.find()
.then(data=>{
  console.log(data)
res.send(data)
})
  }
 
});
// router.get("/:name", async (req, res) => {
//     try {
//       // var regex =  req.params.name
//       console.log(regex)
//       const Customer = await SalesModel.find({
//         "$or":{"customer_name":{$regex:req.params.name}}
//       })
//       console.log(Customer)
//       if(!Customer){
//         res.status(400).json(error);
//       }
//     } catch (error) {
//       res.status(400).json(error);
//     }
//   });

module.exports = router;
