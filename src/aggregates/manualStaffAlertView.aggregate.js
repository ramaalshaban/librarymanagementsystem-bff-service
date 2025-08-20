const { elasticClient } = require("common/elasticsearch");

const getAllManualStaffAlertView = async (filter = null) => {
  try {
    const query = filter ? { match: filter } : { match_all: {} };
    const result = await elasticClient.search({
      index: "librarymanagementsystem_engagementEvent",
      body: {
        query: query,
        _source: [
          "id",
          "userId",
          "eventType",
          "eventTime",
          "details",
          "bookId",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(userAggregateDataFromIndex(source));

      promises.push(bookAggregateDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in engagementEventAggregateData", error);
  }
};

const getManualStaffAlertView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "librarymanagementsystem_engagementEvent",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "userId",
          "eventType",
          "eventTime",
          "details",
          "bookId",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(userAggregateDataFromIndex(source));

      promises.push(bookAggregateDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in engagementEventAggregateData", error);
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
      _source: ["id", "fullName", "roles"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    if (true) {
      source["user"] = aggregation.hits.hits[0]?._source;
    }
  }
};

const bookAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_book",
    body: {
      query: {
        match: {
          id: source["bookId"],
        },
      },
      _source: ["id", "title"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    if (!!this.bookId) {
      source["book"] = aggregation.hits.hits[0]?._source;
    }
  }
};

module.exports = {
  getAllManualStaffAlertView,
  getManualStaffAlertView,
  userAggregateDataFromIndex,
  bookAggregateDataFromIndex,
};
