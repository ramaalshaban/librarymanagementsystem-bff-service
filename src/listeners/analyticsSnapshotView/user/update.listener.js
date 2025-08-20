const kafka = require("common/kafka.client.js");
const {
  userReAnalyticsSnapshotView,
} = require("aggregates/analyticsSnapshotView.aggregate");

const consumer = kafka.consumer({
  groupId: `analyticsSnapshotView-user`,
});

const runUpdateListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "librarymanagementsystem-elastic-index-user-updated",
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
          "librarymanagementsystem-elastic-index-user-updated : ",
          error,
        );
      }
    },
  });
};

module.exports = runUpdateListener;
