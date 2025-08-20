const { elasticClient } = require("common/elasticsearch");

const getAllIssueEscalationNotificationView = async (filter = null) => {
  try {
    const query = filter ? { match: filter } : { match_all: {} };
    const result = await elasticClient.search({
      index: "librarymanagementsystem_issueEscalation",
      body: {
        query: query,
        _source: [
          "id",
          "branchId",
          "raisedByUserId",
          "assignedToUserId",
          "status",
          "escalationType",
          "description",
          "log",
          "updatedAt",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(branchAggregateDataFromIndex(source));

      promises.push(raisedByUserAggregateDataFromIndex(source));

      promises.push(assignedToUserAggregateDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in issueEscalationAggregateData", error);
  }
};

const getIssueEscalationNotificationView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "librarymanagementsystem_issueEscalation",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "branchId",
          "raisedByUserId",
          "assignedToUserId",
          "status",
          "escalationType",
          "description",
          "log",
          "updatedAt",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(branchAggregateDataFromIndex(source));

      promises.push(raisedByUserAggregateDataFromIndex(source));

      promises.push(assignedToUserAggregateDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in issueEscalationAggregateData", error);
  }
};

const branchAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_branch",
    body: {
      query: {
        match: {
          id: source["branchId"],
        },
      },
      _source: ["id", "name"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    if (true) {
      source["branch"] = aggregation.hits.hits[0]?._source;
    }
  }
};

const raisedByUserAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_user",
    body: {
      query: {
        match: {
          id: source["raisedByUserId"],
        },
      },
      _source: ["id", "fullName", "email"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    if (true) {
      source["raisedByUser"] = aggregation.hits.hits[0]?._source;
    }
  }
};

const assignedToUserAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_user",
    body: {
      query: {
        match: {
          id: source["assignedToUserId"],
        },
      },
      _source: ["id", "fullName", "email"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    if (!!this.assignedToUserId) {
      source["assignedToUser"] = aggregation.hits.hits[0]?._source;
    }
  }
};

module.exports = {
  getAllIssueEscalationNotificationView,
  getIssueEscalationNotificationView,
  branchAggregateDataFromIndex,
  raisedByUserAggregateDataFromIndex,
  assignedToUserAggregateDataFromIndex,
};
