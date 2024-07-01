const expressjwt = require("express-jwt");
const { objectId } = require("mongodb");
const Payment = require("../Model/payment")
const User = require("../Model/register")
const { response } = require('express');

function generateTransactionId() {
    // Generate a random number (to be used as part of the transaction ID)
    const randomPart = Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999
  
    // Get the current timestamp in milliseconds (to ensure uniqueness)
    const timestampPart = Date.now(); // Returns the number of milliseconds since January 1, 1970
  
    // Combine the random number and timestamp to create the transaction ID
    const transactionId = `TX${timestampPart}${randomPart}`;
  
    return transactionId;
  }
  const calculateValidityEndDate = (packageType) => {
    const currentDate = new Date();
    let validityEndDate = new Date(currentDate);
  
    switch (packageType) {
      case '6 Months':
        validityEndDate.setMonth(validityEndDate.getMonth() + 6);
        break;
      case '1 Year':
        validityEndDate.setFullYear(validityEndDate.getFullYear() + 1);
        break;
      default:
        throw new Error('Invalid package type');
    }
  // Format the date to dd-mm-yyyy
  const day = String(validityEndDate.getDate()).padStart(2, '0');
  const month = String(validityEndDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = validityEndDate.getFullYear();

  return `${day}-${month}-${year}`;
  };
 exports.payments = async(req, res) =>{
    const {cardno,userId,packagetype,amount,nameoncard} = req.body;
    const transactionid = generateTransactionId();
    const payments = new Payment({
      cardno,
      userId,
      packagetype,
      transactionid,
      amount,
      nameoncard
    });
    payments.save() .then((payed) => {
      if (payed) {
        Payment.findOne({transactionid:transactionid}).then((oldpayment) => {
        if(oldpayment){
          Payment.updateOne({transactionid:transactionid},{$set:{paymentstatus:"success"}}).then((paymentsuccess) => {
          if(paymentsuccess) {
            const validityEndDate = calculateValidityEndDate(packagetype);
            User.findByIdAndUpdate({_id:userId},{$set:{ subscription: "success", validityEndDate: validityEndDate }}).then((completed) => {
              if(completed){
                res.json({ message: "Payment completed successfully", Transactionid:transactionid ,validityexpiry: validityEndDate }); 
              }else{
                res.json({ message: "Payment Not Saved"}); 
              }
          });
          }else{
            res.status(500).json({ message: "Payment failed" }); 
          }
        });
        }else{
          res.status(502).json({ message: "No record found" }); 
        }
      });
    }else{
      res.status(404).json({ message: "Something went wrong" }); // Send a 404 error if not found
    }
  });

 }
 exports.paymentsdetails = async(req, res) =>{
  const userId = req.body.userId;
  try {
    console.log(1)
      // Find user by ID
      const user = await User.findById({ _id: userId });
      if (!user) {
    console.log(2)

          return res.status(404).json({ message: 'User not found' });
          
      }

      // Find payment details for the user
      const payments = await Payment.find({ userId: userId });

      if (payments.length === 0) {
       console.log(3)

          return res.status(201).json({ message: 'No payment records found' });
      }
      console.log(4)
        res.status(200).json({
          user: {
              userId: user._id,
              subscription: user.subscription,
              validityEndDate: user.validityEndDate
          },
          payments: payments
      });
      console.log(user)
      console.log(payments)
  
}catch (error) {
    console.log(5)

      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};
