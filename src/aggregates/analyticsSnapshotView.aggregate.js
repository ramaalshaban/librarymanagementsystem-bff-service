const { elasticClient } = require("common/elasticsearch");

const analyticsSnapshotViewAggregateData = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];

    const result = await elasticClient.search({
      index: "librarymanagementsystem_analyticSnapshot",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "snapshotType",
          "scopeType",
          "scopeId",
          "timeRange",
          "data",
          "generatedBy",
          "createdAt",
        ],
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(userAggregateDataFromIndex(source));

      promises.push(branchAggregateDataFromIndex(source));

      await Promise.all(promises);

      await elasticClient.index({
        index: "librarymanagementsystem_analyticssnapshotview",
        id: source["id"],
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in analyticSnapshotAggregateData", error);
  }
};

const userAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_user",
    body: {
      query: {
        match: {
          id: source["scopeId"],
        },
      },
      _source: ["id", "fullName", "roles"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    if (this.scopeType === "personal") {
      source["user"] = aggregation.hits.hits[0]?._source;
    }
  }
};

const userReAnalyticsSnapshotView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "librarymanagementsystem_analyticssnapshotview",
      body: {
        query: { terms: { "user.id": idList } },
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(userAggregateDataFromIndex(source));

      await Promise.all(promises);
      await elasticClient.index({
        index: "librarymanagementsystem_analyticssnapshotview",
        id: hit.id,
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in userReAggregateanalyticsSnapshotView", error);
  }
};

const branchAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_branch",
    body: {
      query: {
        match: {
          id: source["scopeId"],
        },
      },
      _source: ["id", "name"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    if (this.scopeType === "branch") {
      source["branch"] = aggregation.hits.hits[0]?._source;
    }
  }
};

const branchReAnalyticsSnapshotView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "librarymanagementsystem_analyticssnapshotview",
      body: {
        query: { terms: { "branch.id": idList } },
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(branchAggregateDataFromIndex(source));

      await Promise.all(promises);
      await elasticClient.index({
        index: "librarymanagementsystem_analyticssnapshotview",
        id: hit.id,
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in branchReAggregateanalyticsSnapshotView", error);
  }
};

module.exports = {
  analyticsSnapshotViewAggregateData,

  userReAnalyticsSnapshotView,
  branchReAnalyticsSnapshotView,

  userAggregateDataFromIndex,
  branchAggregateDataFromIndex,
};
