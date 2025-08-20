const { elasticClient } = require("common/elasticsearch");

const getAllBookDetailsView = async (filter = null) => {
  try {
    const query = filter ? { match: filter } : { match_all: {} };
    const result = await elasticClient.search({
      index: "librarymanagementsystem_book",
      body: {
        query: query,
        _source: [
          "id",
          "title",
          "authors",
          "isbn",
          "genre",
          "synopsis",
          "publicationYear",
          "coverImageUrl",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(reviewsAggregateDataFromIndex(source));

      promises.push(reviewStatsStatDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in bookAggregateData", error);
  }
};

const getBookDetailsView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "librarymanagementsystem_book",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "title",
          "authors",
          "isbn",
          "genre",
          "synopsis",
          "publicationYear",
          "coverImageUrl",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(reviewsAggregateDataFromIndex(source));

      promises.push(reviewStatsStatDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in bookAggregateData", error);
  }
};

const reviewsAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_review",
    body: {
      query: {
        match: {
          bookId: source["id"],
        },
      },
      _source: ["id", "userId", "rating", "reviewText", "createdAt"],
    },
  });

  source["reviews"] = aggregation.hits.hits.map((hit) => hit._source);
};

const reviewStatsStatDataFromIndex = async (source) => {
  let aggs = {};

  aggs["count"] = {
    count: {
      field: "id",
    },
  };

  aggs["average"] = {
    average: {
      field: "rating",
    },
  };

  const statObject = await elasticClient.search({
    index: "librarymanagementsystem_review",
    body: {
      size: 0,
      aggs: aggs,
    },
  });

  source["review"] = {};

  source["review"]["reviewCount"] = statObject.aggregations["count"].value;

  source["review"]["averageRating"] = statObject.aggregations["average"].value;
};

module.exports = {
  getAllBookDetailsView,
  getBookDetailsView,
  reviewsAggregateDataFromIndex,

  reviewStatsStatDataFromIndex,
};
