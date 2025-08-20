const { elasticClient } = require("common/elasticsearch");

const getAllLoanDueNoticeView = async (filter = null) => {
  try {
    const query = filter ? { match: filter } : { match_all: {} };
    const result = await elasticClient.search({
      index: "librarymanagementsystem_loan",
      body: {
        query: query,
        _source: [
          "id",
          "userId",
          "bookId",
          "branchId",
          "status",
          "dueDate",
          "checkedOutAt",
          "renewalCount",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(bookAggregateDataFromIndex(source));

      promises.push(branchAggregateDataFromIndex(source));

      promises.push(memberAggregateDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in loanAggregateData", error);
  }
};

const getLoanDueNoticeView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "librarymanagementsystem_loan",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "userId",
          "bookId",
          "branchId",
          "status",
          "dueDate",
          "checkedOutAt",
          "renewalCount",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(bookAggregateDataFromIndex(source));

      promises.push(branchAggregateDataFromIndex(source));

      promises.push(memberAggregateDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in loanAggregateData", error);
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
      _source: ["id", "title", "authors", "coverImageUrl"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    if (true) {
      source["book"] = aggregation.hits.hits[0]?._source;
    }
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

module.exports = {
  getAllLoanDueNoticeView,
  getLoanDueNoticeView,
  bookAggregateDataFromIndex,
  branchAggregateDataFromIndex,
  memberAggregateDataFromIndex,
};
