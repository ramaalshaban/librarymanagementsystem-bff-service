const { elasticClient } = require("common/elasticsearch");

const getAllPersonalizedRecommendationView = async (filter = null) => {
  try {
    const query = filter ? { match: filter } : { match_all: {} };
    const result = await elasticClient.search({
      index: "librarymanagementsystem_recommendation",
      body: {
        query: query,
        _source: [
          "id",
          "userId",
          "bookIds",
          "generatedBy",
          "contextInfo",
          "createdAt",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(userAggregateDataFromIndex(source));

      promises.push(booksAggregateDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in recommendationAggregateData", error);
  }
};

const getPersonalizedRecommendationView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "librarymanagementsystem_recommendation",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "userId",
          "bookIds",
          "generatedBy",
          "contextInfo",
          "createdAt",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(userAggregateDataFromIndex(source));

      promises.push(booksAggregateDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in recommendationAggregateData", error);
  }
};

const userAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_user",
    body: {
      query: {
        match: {
          id: source["userId"],
        },
      },
      _source: ["id", "fullName", "email"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    if (true) {
      source["user"] = aggregation.hits.hits[0]?._source;
    }
  }
};

const booksAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_book",
    body: {
      query: {
        match: {
          id: source["bookIds"],
        },
      },
      _source: ["id", "title", "authors", "coverImageUrl"],
    },
  });

  source["books"] = aggregation.hits.hits.map((hit) => hit._source);
};

module.exports = {
  getAllPersonalizedRecommendationView,
  getPersonalizedRecommendationView,
  userAggregateDataFromIndex,
  booksAggregateDataFromIndex,
};
