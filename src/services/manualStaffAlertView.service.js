const {
  getAllManualStaffAlertView,
  getManualStaffAlertView,
} = require("aggregates/manualStaffAlertView.aggregate");

const getAllAggManualStaffAlertView = async () => {
  try {
    const data = await getAllManualStaffAlertView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggManualStaffAlertView = async (id) => {
  try {
    const data = await getManualStaffAlertView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return {};
  }
};

module.exports = { getAllAggManualStaffAlertView, getAggManualStaffAlertView };
