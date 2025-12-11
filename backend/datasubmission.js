const express = require("express")
const router = express.Router()
const datasubmission = require("./users").datasubmission
const protect = require("./authmiddleware")

//router.post("/data-submission", protect, datasubmission);

router.post("/data-submission", protect, async (req, res) => {
  try {
    const submission = await datasubmission.findOneAndUpdate(
      { company: req.user._id },   // ✅ condition (same company)
      { $set: req.body },          // ✅ update fields
      {
        new: true,                 // return updated document
        upsert: true,              // create if not exists
        runValidators: true        // apply schema validation
      }
    );
    // console.log(submission)
    // console.log(req.user.id)
    // const filleddata=await datasubmission.findOne({company:`objectId${req.user.id}`})
    // console.log(filleddata)
    res.status(200).json({
      success: true,
      message: "Data saved successfully",
      submission:submission
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports=router;