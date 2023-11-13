const express = require("express");
const router = express.Router();

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });

  // if email not exsist in db then create else InsertMany()
  let eId = await Order.findOne({ email: req.body.email });
  console.log(eId);
  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_Data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server Error" }); // Handle server errors
    }
  }
  else{
    try{
        await Order.findOneAndUpdate({email:req.body.email},
            { $push:{order_data: data}}).then(()=>{
                res.json({success:true})
            })
        }catch(error){
            res.send("Server Error",error.message)
        }
    }
});


// My Order Data
router.post('/myOrderData' , async (req,res)=>{

  try {
    let myData = await Order.findOne({'email':req.body.email}) 
    res.json({orderData:myData})
  } catch (error) {
    res.send("Server Error",error.message)
    
  }

})





module.exports = router;
 