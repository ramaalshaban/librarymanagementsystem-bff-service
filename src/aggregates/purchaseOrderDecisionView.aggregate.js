const { elasticClient } = require("common/elasticsearch");

const getAllPurchaseOrderDecisionView = async (filter = null) => {
  try {
    const query = filter ? { match: filter } : { match_all: {} };
    const result = await elasticClient.search({
      index: "librarymanagementsystem_branchPurchaseOrder",
      body: {
        query: query,
        _source: [
          "id",
          "branchId",
          "requestedByUserId",
          "status",
          "approvalDate",
          "approvedByUserId",
          "items",
          "note",
          "createdAt",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(branchAggregateDataFromIndex(source));

      promises.push(requestedByAggregateDataFromIndex(source));

      promises.push(approvedByAggregateDataFromIndex(source));

      promises.push(bookItemsAggregateDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in branchPurchaseOrderAggregateData", error);
  }
};

const getPurchaseOrderDecisionView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "librarymanagementsystem_branchPurchaseOrder",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "branchId",
          "requestedByUserId",
          "status",
          "approvalDate",
          "approvedByUserId",
          "items",
          "note",
          "createdAt",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(branchAggregateDataFromIndex(source));

      promises.push(requestedByAggregateDataFromIndex(source));

      promises.push(approvedByAggregateDataFromIndex(source));

      promises.push(bookItemsAggregateDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in branchPurchaseOrderAggregateData", error);
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

const requestedByAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_user",
    body: {
      query: {
        match: {
          id: source["requestedByUserId"],
        },
      },
      _source: ["id", "fullName", "email"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    if (true) {
      source["requestedBy"] = aggregation.hits.hits[0]?._source;
    }
  }
};

const approvedByAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_user",
    body: {
      query: {
        match: {
          id: source["approvedByUserId"],
        },
      },
      _source: ["id", "fullName", "email"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    if (!!this.approvedByUserId) {
      source["approvedBy"] = aggregation.hits.hits[0]?._source;
    }
  }
};

const bookItemsAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_book",
    body: {
      query: {
        match: {
          id: source["items"],
        },
      },
      _source: ["id", "title", "authors"],
    },
  });

  source["bookItems"] = aggregation.hits.hits.map((hit) => hit._source);
};

module.exports = {
  getAllPurchaseOrderDecisionView,
  getPurchaseOrderDecisionView,
  branchAggregateDataFromIndex,
  requestedByAggregateDataFromIndex,
  approvedByAggregateDataFromIndex,
  bookItemsAggregateDataFromIndex,
};
