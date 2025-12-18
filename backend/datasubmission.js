const express = require("express")
const router = express.Router()
const datasubmission = require("./users").datasubmission
const protect = require("./authmiddleware")

//router.post("/data-submission", protect, datasubmission);

const upload = require('./multer');

router.post(
  "/data-submission",
  protect,
  upload.single('document'),
  async (req, res) => {
    try {
      const updateData = {
        ...req.body
      };

      // If PDF uploaded, save path
      if (req.file) {
  updateData.document = req.file.path.replace(/\\/g, '/');
}

      // if (req.file) {
      //   updateData.document = req.file.path;
      // }

      const submission = await datasubmission.findOneAndUpdate(
        { company: req.user._id },
        { $set: updateData },
        {
          new: true,
          upsert: true,
          runValidators: true
        }
      );

      res.status(200).json({
        success: true,
        message: "Data + PDF saved successfully",
        submission
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);




module.exports=router;