const {
  getAllPersonalizedRecommendationView,
  getPersonalizedRecommendationView,
} = require("aggregates/personalizedRecommendationView.aggregate");

const getAllAggPersonalizedRecommendationView = async () => {
  try {
    const data = await getAllPersonalizedRecommendationView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggPersonalizedRecommendationView = async (id) => {
  try {
    const data = await getPersonalizedRecommendationView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return {};
  }
};

module.exports = {
  getAllAggPersonalizedRecommendationView,
  getAggPersonalizedRecommendationView,
};
