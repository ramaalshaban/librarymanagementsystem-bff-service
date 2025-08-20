const {
  getAllLoanDueNoticeView,
  getLoanDueNoticeView,
} = require("aggregates/loanDueNoticeView.aggregate");

const getAllAggLoanDueNoticeView = async () => {
  try {
    const data = await getAllLoanDueNoticeView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggLoanDueNoticeView = async (id) => {
  try {
    const data = await getLoanDueNoticeView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return {};
  }
};

module.exports = { getAllAggLoanDueNoticeView, getAggLoanDueNoticeView };
