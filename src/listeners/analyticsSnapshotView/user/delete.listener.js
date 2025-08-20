const kafka = require("common/kafka.client.js");
const {
  userReAnalyticsSnapshotView,
} = require("aggregates/analyticsSnapshotView.aggregate");

const consumer = kafka.consumer({
  groupId: `analyticsSnapshotView-user`,
});

const runDeleteListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "librarymanagementsystem-elastic-index-user-deleted",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        console.log(
          `Received message on ${topic}: ${message.value.toString()}`,
        );

        const data = JSON.parse(message.value.toString());
        await userReAnalyticsSnapshotView(data.id);
      } catch (error) {
        console.error(
          "librarymanagementsystem-elastic-index-user-deleted : ",
          error,
        );
      }
    },
  });
};

module.exports = runDeleteListener;
