const express = require("express");
const router = express.Router();
const { issueEscalationNotificationViewService } = require("services");

router.get("/", async (req, res) => {
  const datas =
    await issueEscalationNotificationViewService.getAllAggIssueEscalationNotificationView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data =
    await issueEscalationNotificationViewService.getAggIssueEscalationNotificationView(
      id,
    );
  res.json(data);
});

module.exports = router;
