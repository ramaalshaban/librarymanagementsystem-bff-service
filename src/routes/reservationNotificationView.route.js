const express = require("express");
const router = express.Router();
const { reservationNotificationViewService } = require("services");

router.get("/", async (req, res) => {
  const datas =
    await reservationNotificationViewService.getAllAggReservationNotificationView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data =
    await reservationNotificationViewService.getAggReservationNotificationView(
      id,
    );
  res.json(data);
});

module.exports = router;
