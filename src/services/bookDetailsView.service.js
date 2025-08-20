const {
  getAllBookDetailsView,
  getBookDetailsView,
} = require("aggregates/bookDetailsView.aggregate");

const getAllAggBookDetailsView = async () => {
  try {
    const data = await getAllBookDetailsView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggBookDetailsView = async (id) => {
  try {
    const data = await getBookDetailsView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return {};
  }
};

module.exports = { getAllAggBookDetailsView, getAggBookDetailsView };
