const express = require("express");
const router = express.Router();
const { feeAssessmentNotificationViewService } = require("services");

router.get("/", async (req, res) => {
  const datas =
    await feeAssessmentNotificationViewService.getAllAggFeeAssessmentNotificationView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data =
    await feeAssessmentNotificationViewService.getAggFeeAssessmentNotificationView(
      id,
    );
  res.json(data);
});

module.exports = router;
