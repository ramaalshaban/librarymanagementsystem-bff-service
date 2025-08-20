const startAnalyticsSnapshotViewListener = require("./analyticsSnapshotView");

const startListener = async () => {
  console.log("Starting listener");

  await startAnalyticsSnapshotViewListener();
};

module.exports = startListener;
