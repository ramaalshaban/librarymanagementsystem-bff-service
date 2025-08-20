# EVENT API GUIDE

## BFF SERVICE

The BFF service is a microservice that acts as a bridge between the client and backend services. It provides a unified API for the client to interact with multiple backend services, simplifying the communication process and improving performance.

## Architectural Design Credit and Contact Information

The architectural design of this microservice is credited to.  
For inquiries, feedback, or further information regarding the architecture, please direct your communication to:

**Email**:

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this microservice.

## Documentation Scope

Welcome to the official documentation for the BFF Service Event Listeners. This guide details the Kafka-based event listeners responsible for reacting to ElasticSearch index events. It describes listener responsibilities, the topics they subscribe to, and expected payloads.

**Intended Audience**  
This documentation is intended for developers, architects, and system administrators involved in the design, implementation, and maintenance of the BFF Service. It assumes familiarity with microservices architecture, the Kafka messaging system, and ElasticSearch.

**Overview**  
Each ElasticSearch index operation (create, update, delete) emits a corresponding event to Kafka. These events are consumed by listeners responsible for executing aggregate functions to ensure index- and system-level consistency.

## Kafka Event Listeners

### Kafka Event Listener: analyticSnapshot-created

**Event Topic**: `elastic-index-analyticSnapshot-created`

When a `analyticSnapshot` is created in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `analyticsSnapshotViewAggregateData` function to enrich and store the final document in the related index.

**Expected Payload**:

```json
{
  "id": "String"
}
```

### Kafka Event Listener: analyticSnapshot-updated

**Event Topic**: `elastic-index-analyticSnapshot-updated`

When a `analyticSnapshot` is updated in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `analyticsSnapshotViewAggregateData` function to update the enriched document in the related index.

**Expected Payload**:

```json
{
  "id": "String"
}
```

### Kafka Event Listener: analyticSnapshot-deleted

**Event Topic**: `elastic-index-analyticSnapshot-deleted`

When a `analyticSnapshot` is deleted in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `analyticsSnapshotViewAggregateData` function to handle removal or cleanup in the related index.

**Expected Payload**:

```json
{
  "id": "String"
}
```

### Kafka Event Listener: user-created

**Event Topic**: `elastic-index-user-created`

When a `user` is created in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `userReAnalyticsSnapshotView` function to update dependent documents in the related index.

**Expected Payload**:

```json
{
  "id": "String"
}
```

### Kafka Event Listener: user-updated

**Event Topic**: `elastic-index-user-updated`

When a `user` is updated in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `userReAnalyticsSnapshotView` function to re-enrich dependent data in the related index.

**Expected Payload**:

```json
{
  "id": "String"
}
```

### Kafka Event Listener: user-deleted

**Event Topic**: `elastic-index-user-deleted`

When a `user` is deleted from the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `userReAnalyticsSnapshotView` function to handle dependent data cleanup or updates.

**Expected Payload**:

```json
{
  "id": "String"
}
```

### Kafka Event Listener: branch-created

**Event Topic**: `elastic-index-branch-created`

When a `branch` is created in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `branchReAnalyticsSnapshotView` function to update dependent documents in the related index.

**Expected Payload**:

```json
{
  "id": "String"
}
```

### Kafka Event Listener: branch-updated

**Event Topic**: `elastic-index-branch-updated`

When a `branch` is updated in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `branchReAnalyticsSnapshotView` function to re-enrich dependent data in the related index.

**Expected Payload**:

```json
{
  "id": "String"
}
```

### Kafka Event Listener: branch-deleted

**Event Topic**: `elastic-index-branch-deleted`

When a `branch` is deleted from the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `branchReAnalyticsSnapshotView` function to handle dependent data cleanup or updates.

**Expected Payload**:

```json
{
  "id": "String"
}
```
