const cloudinary = require("cloudinary");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const CustomerRev = require("../Model/CustomerReviews");
const User = require("../Model/userModel");

const customerRevCtr = {
  newRev: catchAsyncError(async (req, res) => {
    try {
      // image
      const customerRev = await CustomerRev.create(req.body);

      console.log("customerRev" + customerRev);
      res.status(201).json({
        success: true,
        customerRev,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }),

  getAllCustomerRevs: catchAsyncError(async (req, res, next) => {
    try {
      const revs = await CustomerRev.find();
      let revsLength = revs.length;
      res.status(200).json({
        success: true,
        revsLength,
        revs,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error,
      });
    }
  }),
};

module.exports = customerRevCtr;
