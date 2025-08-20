const express = require("express");
const router = express.Router();
const { manualStaffAlertViewService } = require("services");

router.get("/", async (req, res) => {
  const datas =
    await manualStaffAlertViewService.getAllAggManualStaffAlertView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await manualStaffAlertViewService.getAggManualStaffAlertView(id);
  res.json(data);
});

module.exports = router;
