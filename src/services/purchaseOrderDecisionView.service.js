const {
  getAllPurchaseOrderDecisionView,
  getPurchaseOrderDecisionView,
} = require("aggregates/purchaseOrderDecisionView.aggregate");

const getAllAggPurchaseOrderDecisionView = async () => {
  try {
    const data = await getAllPurchaseOrderDecisionView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggPurchaseOrderDecisionView = async (id) => {
  try {
    const data = await getPurchaseOrderDecisionView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return {};
  }
};

module.exports = {
  getAllAggPurchaseOrderDecisionView,
  getAggPurchaseOrderDecisionView,
};
