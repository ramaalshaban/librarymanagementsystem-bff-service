const {
  getAllIssueEscalationNotificationView,
  getIssueEscalationNotificationView,
} = require("aggregates/issueEscalationNotificationView.aggregate");

const getAllAggIssueEscalationNotificationView = async () => {
  try {
    const data = await getAllIssueEscalationNotificationView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggIssueEscalationNotificationView = async (id) => {
  try {
    const data = await getIssueEscalationNotificationView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return {};
  }
};

module.exports = {
  getAllAggIssueEscalationNotificationView,
  getAggIssueEscalationNotificationView,
};
