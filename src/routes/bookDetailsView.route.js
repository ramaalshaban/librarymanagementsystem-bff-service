const express = require("express");
const router = express.Router();
const { bookDetailsViewService } = require("services");

router.get("/", async (req, res) => {
  const datas = await bookDetailsViewService.getAllAggBookDetailsView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await bookDetailsViewService.getAggBookDetailsView(id);
  res.json(data);
});

module.exports = router;
