const express = require("express");
const router = express.Router();
const { personalizedRecommendationViewService } = require("services");

router.get("/", async (req, res) => {
  const datas =
    await personalizedRecommendationViewService.getAllAggPersonalizedRecommendationView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data =
    await personalizedRecommendationViewService.getAggPersonalizedRecommendationView(
      id,
    );
  res.json(data);
});

module.exports = router;
