const express = require("express");
const router = express.Router();
const { loanDueNoticeViewService } = require("services");

router.get("/", async (req, res) => {
  const datas = await loanDueNoticeViewService.getAllAggLoanDueNoticeView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await loanDueNoticeViewService.getAggLoanDueNoticeView(id);
  res.json(data);
});

module.exports = router;
