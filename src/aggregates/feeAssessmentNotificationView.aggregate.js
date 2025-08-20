const { elasticClient } = require("common/elasticsearch");

const getAllFeeAssessmentNotificationView = async (filter = null) => {
  try {
    const query = filter ? { match: filter } : { match_all: {} };
    const result = await elasticClient.search({
      index: "librarymanagementsystem_fee",
      body: {
        query: query,
        _source: [
          "id",
          "userId",
          "loanId",
          "amount",
          "currency",
          "status",
          "reason",
          "note",
          "statusUpdateDate",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(memberAggregateDataFromIndex(source));

      promises.push(loanAggregateDataFromIndex(source));

      promises.push(bookAggregateDataFromIndex(source));

      promises.push(paymentsAggregateDataFromIndex(source));

      promises.push(paymentStatsStatDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in feeAggregateData", error);
  }
};

const getFeeAssessmentNotificationView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "librarymanagementsystem_fee",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "userId",
          "loanId",
          "amount",
          "currency",
          "status",
          "reason",
          "note",
          "statusUpdateDate",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(memberAggregateDataFromIndex(source));

      promises.push(loanAggregateDataFromIndex(source));

      promises.push(bookAggregateDataFromIndex(source));

      promises.push(paymentsAggregateDataFromIndex(source));

      promises.push(paymentStatsStatDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in feeAggregateData", error);
  }
};

const memberAggregateDataFromIndex = async (source) => {
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
      source["member"] = aggregation.hits.hits[0]?._source;
    }
  }
};

const loanAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_loan",
    body: {
      query: {
        match: {
          id: source["loanId"],
        },
      },
      _source: ["id", "bookId", "branchId", "dueDate", "returnedAt"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    if (true) {
      source["loan"] = aggregation.hits.hits[0]?._source;
    }
  }
};

const bookAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_book",
    body: {
      query: {
        match: {
          id: source["loan"],
        },
      },
      _source: ["id", "title", "authors", "coverImageUrl"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    if (true) {
      source["book"] = aggregation.hits.hits[0]?._source;
    }
  }
};

const paymentsAggregateDataFromIndex = async (source) => {
  const aggregation = await elasticClient.search({
    index: "librarymanagementsystem_feePayment",
    body: {
      query: {
        match: {
          feeId: source["id"],
        },
      },
      _source: [
        "id",
        "amountPaid",
        "currency",
        "paymentMethod",
        "paymentStatus",
        "paymentDate",
        "handledByUserId",
      ],
    },
  });

  source["payments"] = aggregation.hits.hits.map((hit) => hit._source);
};

const paymentStatsStatDataFromIndex = async (source) => {
  let aggs = {};

  aggs["count"] = {
    count: {
      field: "id",
    },
  };

  aggs["sum"] = {
    sum: {
      field: "amountPaid",
    },
  };

  const statObject = await elasticClient.search({
    index: "librarymanagementsystem_feePayment",
    body: {
      size: 0,
      aggs: aggs,
    },
  });

  source["feePayment"] = {};

  source["feePayment"]["paymentCount"] = statObject.aggregations["count"].value;

  source["feePayment"]["totalAmountPaid"] =
    statObject.aggregations["sum"].value;
};

module.exports = {
  getAllFeeAssessmentNotificationView,
  getFeeAssessmentNotificationView,
  memberAggregateDataFromIndex,
  loanAggregateDataFromIndex,
  bookAggregateDataFromIndex,
  paymentsAggregateDataFromIndex,

  paymentStatsStatDataFromIndex,
};
