const express = require("express");
const router = express.Router();
const { purchaseOrderDecisionViewService } = require("services");

router.get("/", async (req, res) => {
  const datas =
    await purchaseOrderDecisionViewService.getAllAggPurchaseOrderDecisionView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data =
    await purchaseOrderDecisionViewService.getAggPurchaseOrderDecisionView(id);
  res.json(data);
});

module.exports = router;
