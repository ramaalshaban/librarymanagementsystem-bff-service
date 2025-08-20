const kafka = require("common/kafka.client.js");
const {
  branchReAnalyticsSnapshotView,
} = require("aggregates/analyticsSnapshotView.aggregate");

const consumer = kafka.consumer({
  groupId: `analyticsSnapshotView-branch`,
});

const runCreateListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "librarymanagementsystem-elastic-index-branch-created",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        console.log(
          `Received message on ${topic}: ${message.value.toString()}`,
        );

        const data = JSON.parse(message.value.toString());
        await branchReAnalyticsSnapshotView(data.id);
      } catch (error) {
        console.error(
          "librarymanagementsystem-elastic-index-branch-created : ",
          error,
        );
      }
    },
  });
};

module.exports = runCreateListener;
