const {
  getAllMemberProfileView,
  getMemberProfileView,
} = require("aggregates/memberProfileView.aggregate");

const getAllAggMemberProfileView = async () => {
  try {
    const data = await getAllMemberProfileView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggMemberProfileView = async (id) => {
  try {
    const data = await getMemberProfileView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return {};
  }
};

module.exports = { getAllAggMemberProfileView, getAggMemberProfileView };
