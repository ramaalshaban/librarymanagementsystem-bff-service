const { elasticClient } = require("common/elasticsearch");

const {
  analyticsSnapshotViewAggregateData,
} = require("aggregates/analyticsSnapshotView.aggregate");

const runAllRepair = async () => {
  console.group("Repair started at ", new Date());

  await analyticsSnapshotViewRepair();

  console.groupEnd();
};

const analyticsSnapshotViewRepair = async () => {
  try {
    console.group("analyticsSnapshotViewRepair started at ", new Date());
    await checkIndex("librarymanagementsystem_analyticssnapshotview");
    const result = await elasticClient.search({
      index: "librarymanagementsystem_analyticSnapshot",
      body: {
        query: { match_all: {} },
      },
    });

    const ids = result?.hits?.hits.map((hit) => hit._source.id);
    await analyticsSnapshotViewAggregateData(ids);
    console.log("Repair completed for analyticssnapshotview");
  } catch (error) {
    console.error("analyticsSnapshotViewRepair failed at ", new Date(), error);
  } finally {
    console.groupEnd();
  }
};

// check index is exists and create if not exists
const checkIndex = async (index) => {
  const result = await elasticClient.indices.exists({ index });
  if (!result) {
    console.log("Index not found, creating index", index);
    await elasticClient.indices.create({ index });
    return;
  }
  console.log("Index found, skipping creation", index);
};

module.exports = { runAllRepair };
