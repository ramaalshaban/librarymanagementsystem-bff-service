const {
  getAllReservationNotificationView,
  getReservationNotificationView,
} = require("aggregates/reservationNotificationView.aggregate");

const getAllAggReservationNotificationView = async () => {
  try {
    const data = await getAllReservationNotificationView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggReservationNotificationView = async (id) => {
  try {
    const data = await getReservationNotificationView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return {};
  }
};

module.exports = {
  getAllAggReservationNotificationView,
  getAggReservationNotificationView,
};
