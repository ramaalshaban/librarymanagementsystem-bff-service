const {
  getAllFeeAssessmentNotificationView,
  getFeeAssessmentNotificationView,
} = require("aggregates/feeAssessmentNotificationView.aggregate");

const getAllAggFeeAssessmentNotificationView = async () => {
  try {
    const data = await getAllFeeAssessmentNotificationView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggFeeAssessmentNotificationView = async (id) => {
  try {
    const data = await getFeeAssessmentNotificationView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return {};
  }
};

module.exports = {
  getAllAggFeeAssessmentNotificationView,
  getAggFeeAssessmentNotificationView,
};
