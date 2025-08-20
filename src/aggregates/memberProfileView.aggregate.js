const { elasticClient } = require("common/elasticsearch");

const getAllMemberProfileView = async (filter = null) => {
  try {
    const query = filter ? { match: filter } : { match_all: {} };
    const result = await elasticClient.search({
      index: "librarymanagementsystem_user",
      body: {
        query: query,
        _source: [
          "id",
          "fullName",
          "email",
          "createdAt",
          "roles",
          "preferences",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(currentLoansAggregateDataFromIndex(source));

      promises.push(reservationsAggregateDataFromIndex(source));

      promises.push(recentReviewsAggregateDataFromIndex(source));

      promises.push(loanStatsStatDataFromIndex(source));

      promises.push(feeStatsStatDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in userAggregateData", error);
  }
};

const getMemberProfileView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "librarymanagementsystem_user",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "fullName",
          "email",
          "createdAt",
          "roles",
          "preferences",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(currentLoansAggregateDataFromIndex(source));

      promises.push(reservationsAggregateDataFromIndex(source));

      promises.push(recentReviewsAggregateDataFromIndex(source));

      promises.push(loanStatsStatDataFromIndex(source));

      promises.push(feeStatsStatDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in userAggregateData", error);
  }
};

const currentLoansAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_loan",
    body: {
      query: {
        match: {
          userId: source["id"],
        },
      },
      _source: [
        "id",
        "bookId",
        "branchId",
        "status",
        "checkedOutAt",
        "dueDate",
        "renewalCount",
      ],
    },
  });

  source["currentLoans"] = aggregation.hits.hits.map((hit) => hit._source);
};

const reservationsAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_reservation",
    body: {
      query: {
        match: {
          userId: source["id"],
        },
      },
      _source: [
        "id",
        "bookId",
        "status",
        "requestedAt",
        "queuePosition",
        "branchId",
      ],
    },
  });

  source["reservations"] = aggregation.hits.hits.map((hit) => hit._source);
};

const recentReviewsAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_review",
    body: {
      query: {
        match: {
          userId: source["id"],
        },
      },
      _source: ["id", "bookId", "rating", "reviewText", "createdAt"],
    },
  });

  source["recentReviews"] = aggregation.hits.hits.map((hit) => hit._source);
};

const loanStatsStatDataFromIndex = async (source) => {
  let aggs = {};

  aggs["count"] = {
    count: {
      field: "id",
    },
  };

  aggs["count"] = {
    count: {
      field: "id",
    },
  };

  const statObject = await elasticClient.search({
    index: "librarymanagementsystem_loan",
    body: {
      size: 0,
      aggs: aggs,
    },
  });

  source["loan"] = {};

  source["loan"]["activeLoanCount"] = statObject.aggregations["count"].value;

  source["loan"]["overdueLoanCount"] = statObject.aggregations["count"].value;
};

const feeStatsStatDataFromIndex = async (source) => {
  let aggs = {};

  aggs["count"] = {
    count: {
      field: "id",
    },
  };

  aggs["sum"] = {
    sum: {
      field: "amount",
    },
  };

  const statObject = await elasticClient.search({
    index: "librarymanagementsystem_fee",
    body: {
      size: 0,
      aggs: aggs,
    },
  });

  source["fee"] = {};

  source["fee"]["paidFeeCount"] = statObject.aggregations["count"].value;

  source["fee"]["totalPaidFees"] = statObject.aggregations["sum"].value;
};

module.exports = {
  getAllMemberProfileView,
  getMemberProfileView,
  currentLoansAggregateDataFromIndex,
  reservationsAggregateDataFromIndex,
  recentReviewsAggregateDataFromIndex,

  loanStatsStatDataFromIndex,
  feeStatsStatDataFromIndex,
};
