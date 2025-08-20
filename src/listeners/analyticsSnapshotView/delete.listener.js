const kafka = require("common/kafka.client.js");
const {
  analyticsSnapshotViewAggregateData,
} = require("aggregates/analyticsSnapshotView.aggregate");

const consumer = kafka.consumer({
  groupId: `analyticsSnapshotView`,
});

const runDeleteListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "librarymanagementsystem-elastic-index-analyticSnapshot-deleted",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        console.log(
          `Received message on ${topic}: ${message.value.toString()}`,
        );

        const data = JSON.parse(message.value.toString());
        await analyticsSnapshotViewAggregateData(data.id);
      } catch (error) {
        console.error(
          "librarymanagementsystem-elastic-index-analyticSnapshot-deleted : ",
          error,
        );
      }
    },
  });
};

module.exports = runDeleteListener;
