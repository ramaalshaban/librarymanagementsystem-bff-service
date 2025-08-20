const runCreateListener = require("./create.listener");
const runUpdateListener = require("./update.listener");
const runDeleteListener = require("./delete.listener");

const startUserListener = require("./user");

const startBranchListener = require("./branch");

const startAnalyticsSnapshotViewListener = async () => {
  console.log("Starting AnalyticsSnapshotView listeners");
  await runCreateListener();
  await runUpdateListener();
  await runDeleteListener();

  await startUserListener();

  await startBranchListener();
};

module.exports = startAnalyticsSnapshotViewListener;
