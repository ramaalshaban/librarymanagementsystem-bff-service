# REST API GUIDE

## BFF SERVICE

BFF service is a microservice that acts as a bridge between the client and the backend services. It provides a unified API for the client to interact with multiple backend services, simplifying the communication process and improving performance.

## Architectural Design Credit and Contact Information

The architectural design of this microservice is credited to.  
For inquiries, feedback, or further information regarding the architecture, please direct your communication to:

Email:

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this microservice.

## Documentation Scope

Welcome to the official documentation for the BFF Service's REST API. This document is designed to provide a comprehensive guide to interfacing with our BFF Service exclusively through RESTful API endpoints.

**Intended Audience**

This documentation is intended for developers and integrators who are looking to interact with the BFF Service via HTTP requests for purposes such as listing, filtering, and searching data.

**Overview**

Within these pages, you will find detailed information on how to effectively utilize the REST API, including authentication methods, request and response formats, endpoint descriptions, and examples of common use cases.

**Beyond REST**  
It's important to note that the BFF Service also supports alternative methods of interaction, such as gRPC and messaging via a Message Broker. These communication methods are beyond the scope of this document. For information regarding these protocols, please refer to their respective documentation.

---

## Resources

### Elastic Index Resource

_Resource Definition_: A virtual resource representing dynamic search data from a specified index.

---

## Route: List Records

_Route Definition_: Returns a paginated list from the elastic index.
_Route Type_: list  
_Default access route_: _POST_ `/:indexName/list`

### Parameters

| Parameter | Type   | Required | Population      |
| --------- | ------ | -------- | --------------- |
| indexName | String | Yes      | path.param      |
| page      | Number | No       | query.page      |
| limit     | Number | No       | query.limit     |
| sortBy    | String | No       | query.sortBy    |
| sortOrder | String | No       | query.sortOrder |
| q         | String | No       | query.q         |
| filters   | Object | Yes      | body            |

```js
axios({
  method: "POST",
  url: `/${indexName}/list`,
  data: {
    filters: "Object",
  },
  params: {
    page: "Number",
    limit: "Number",
    sortBy: "String",
    sortOrder: "String",
    q: "String",
  },
});
```

## <p>The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.</p>

_Default access route_: _GET_ `/:indexName/list`

### Parameters

| Parameter | Type   | Required | Population      |
| --------- | ------ | -------- | --------------- |
| indexName | String | Yes      | path.param      |
| page      | Number | No       | query.page      |
| limit     | Number | No       | query.limit     |
| sortBy    | String | No       | query.sortBy    |
| sortOrder | String | No       | query.sortOrder |
| q         | String | No       | query.q         |

```js
axios({
  method: "GET",
  url: `/${indexName}/list`,
  data: {},
  params: {
    page: "Number",
    limit: "Number",
    sortBy: "String",
    sortOrder: "String",
    q: "String",
  },
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Count Records

_Route Definition_: Counts matching documents in the elastic index.
_Route Type_: count  
_Default access route_: _POST_ `/:indexName/count`

### Parameters

| Parameter | Type   | Required | Population |
| --------- | ------ | -------- | ---------- |
| indexName | String | Yes      | path.param |
| q         | String | No       | query.q    |
| filters   | Object | Yes      | body       |

```js
axios({
  method: "POST",
  url: `/${indexName}/count`,
  data: {
    filters: "Object",
  },
  params: {
    q: "String",
  },
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

---

_Default access route_: _GET_ `/:indexName/count`

### Parameters

| Parameter | Type   | Required | Population |
| --------- | ------ | -------- | ---------- |
| indexName | String | Yes      | path.param |
| q         | String | No       | query.q    |

```js
axios({
  method: "GET",
  url: `/${indexName}/count`,
  data: {},
  params: {
    q: "String",
  },
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get Index Schema

_Route Definition_: Returns the schema for the elastic index.
_Route Type_: get  
_Default access route_: _GET_ `/:indexName/schema`

### Parameters

| Parameter | Type   | Required | Population |
| --------- | ------ | -------- | ---------- |
| indexName | String | Yes      | path.param |

```js
axios({
  method: "GET",
  url: `/${indexName}/schema`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Filters

### GET /:indexName/filters

_Route Type_: get

### Parameters

| Parameter | Type   | Required | Population  |
| --------- | ------ | -------- | ----------- |
| indexName | String | Yes      | path.param  |
| page      | Number | No       | query.page  |
| limit     | Number | No       | query.limit |

```js
axios({
  method: "GET",
  url: `/${indexName}/filters`,
  data: {},
  params: {
    page: "Number",
    limit: "Number",
  },
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

### POST /:indexName/filters

_Route Type_: create

### Parameters

| Parameter | Type   | Required | Population |
| --------- | ------ | -------- | ---------- |
| indexName | String | Yes      | path.param |
| filters   | Object | Yes      | body       |

```js
axios({
  method: "POST",
  url: `/${indexName}/filters`,
  data: {
    filterName: "String",
    conditions: "Object",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

### DELETE /:indexName/filters/:filterId

_Route Type_: delete

### Parameters

| Parameter | Type   | Required | Population |
| --------- | ------ | -------- | ---------- |
| indexName | String | Yes      | path.param |
| filterId  | String | Yes      | path.param |

```js
axios({
  method: "DELETE",
  url: `/${indexName}/filters/${filterId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get One Record

_Route Type_: get  
_Default access route_: _GET_ `/:indexName/:id`

### Parameters

| Parameter | Type   | Required | Population |
| --------- | ------ | -------- | ---------- |
| indexName | String | Yes      | path.param |
| id        | ID     | Yes      | path.param |

```js
axios({
  method: "GET",
  url: `/${indexName}/${id}`,
  data: {},
  params: {},
});
```

## The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get All Aggregated Records

_Route Definition_: Retrieves a full list of aggregated view data.
_Route Type_: getlist
_Default access route_: _GET_ `/bookDetailsView`

**Example**:

```js
axios({
  method: "GET",
  url: `/bookDetailsView`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get Single Aggregated Record

_Route Definition_: Retrieves a specific aggregated document by ID.
_Route Type_: get
_Default access route_: _GET_ `/bookDetailsView/:id`

### Parameters

| Parameter | Type | Required | Population |
| --------- | ---- | -------- | ---------- |
| id        | ID   | Yes      | path.param |

```js
axios({
  method: "GET",
  url: `/bookDetailsView/${id}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get All Aggregated Records

_Route Definition_: Retrieves a full list of aggregated view data.
_Route Type_: getlist
_Default access route_: _GET_ `/memberProfileView`

**Example**:

```js
axios({
  method: "GET",
  url: `/memberProfileView`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get Single Aggregated Record

_Route Definition_: Retrieves a specific aggregated document by ID.
_Route Type_: get
_Default access route_: _GET_ `/memberProfileView/:id`

### Parameters

| Parameter | Type | Required | Population |
| --------- | ---- | -------- | ---------- |
| id        | ID   | Yes      | path.param |

```js
axios({
  method: "GET",
  url: `/memberProfileView/${id}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get All Aggregated Records

_Route Definition_: Retrieves a full list of aggregated view data.
_Route Type_: getlist
_Default access route_: _GET_ `/reservationNotificationView`

**Example**:

```js
axios({
  method: "GET",
  url: `/reservationNotificationView`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get Single Aggregated Record

_Route Definition_: Retrieves a specific aggregated document by ID.
_Route Type_: get
_Default access route_: _GET_ `/reservationNotificationView/:id`

### Parameters

| Parameter | Type | Required | Population |
| --------- | ---- | -------- | ---------- |
| id        | ID   | Yes      | path.param |

```js
axios({
  method: "GET",
  url: `/reservationNotificationView/${id}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get All Aggregated Records

_Route Definition_: Retrieves a full list of aggregated view data.
_Route Type_: getlist
_Default access route_: _GET_ `/loanDueNoticeView`

**Example**:

```js
axios({
  method: "GET",
  url: `/loanDueNoticeView`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get Single Aggregated Record

_Route Definition_: Retrieves a specific aggregated document by ID.
_Route Type_: get
_Default access route_: _GET_ `/loanDueNoticeView/:id`

### Parameters

| Parameter | Type | Required | Population |
| --------- | ---- | -------- | ---------- |
| id        | ID   | Yes      | path.param |

```js
axios({
  method: "GET",
  url: `/loanDueNoticeView/${id}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get All Aggregated Records

_Route Definition_: Retrieves a full list of aggregated view data.
_Route Type_: getlist
_Default access route_: _GET_ `/feeAssessmentNotificationView`

**Example**:

```js
axios({
  method: "GET",
  url: `/feeAssessmentNotificationView`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get Single Aggregated Record

_Route Definition_: Retrieves a specific aggregated document by ID.
_Route Type_: get
_Default access route_: _GET_ `/feeAssessmentNotificationView/:id`

### Parameters

| Parameter | Type | Required | Population |
| --------- | ---- | -------- | ---------- |
| id        | ID   | Yes      | path.param |

```js
axios({
  method: "GET",
  url: `/feeAssessmentNotificationView/${id}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get All Aggregated Records

_Route Definition_: Retrieves a full list of aggregated view data.
_Route Type_: getlist
_Default access route_: _GET_ `/personalizedRecommendationView`

**Example**:

```js
axios({
  method: "GET",
  url: `/personalizedRecommendationView`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get Single Aggregated Record

_Route Definition_: Retrieves a specific aggregated document by ID.
_Route Type_: get
_Default access route_: _GET_ `/personalizedRecommendationView/:id`

### Parameters

| Parameter | Type | Required | Population |
| --------- | ---- | -------- | ---------- |
| id        | ID   | Yes      | path.param |

```js
axios({
  method: "GET",
  url: `/personalizedRecommendationView/${id}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get All Aggregated Records

_Route Definition_: Retrieves a full list of aggregated view data.
_Route Type_: getlist
_Default access route_: _GET_ `/manualStaffAlertView`

**Example**:

```js
axios({
  method: "GET",
  url: `/manualStaffAlertView`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get Single Aggregated Record

_Route Definition_: Retrieves a specific aggregated document by ID.
_Route Type_: get
_Default access route_: _GET_ `/manualStaffAlertView/:id`

### Parameters

| Parameter | Type | Required | Population |
| --------- | ---- | -------- | ---------- |
| id        | ID   | Yes      | path.param |

```js
axios({
  method: "GET",
  url: `/manualStaffAlertView/${id}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get All Aggregated Records

_Route Definition_: Retrieves a full list of aggregated view data.
_Route Type_: getlist
_Default access route_: _GET_ `/issueEscalationNotificationView`

**Example**:

```js
axios({
  method: "GET",
  url: `/issueEscalationNotificationView`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get Single Aggregated Record

_Route Definition_: Retrieves a specific aggregated document by ID.
_Route Type_: get
_Default access route_: _GET_ `/issueEscalationNotificationView/:id`

### Parameters

| Parameter | Type | Required | Population |
| --------- | ---- | -------- | ---------- |
| id        | ID   | Yes      | path.param |

```js
axios({
  method: "GET",
  url: `/issueEscalationNotificationView/${id}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get All Aggregated Records

_Route Definition_: Retrieves a full list of aggregated view data.
_Route Type_: getlist
_Default access route_: _GET_ `/purchaseOrderDecisionView`

**Example**:

```js
axios({
  method: "GET",
  url: `/purchaseOrderDecisionView`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get Single Aggregated Record

_Route Definition_: Retrieves a specific aggregated document by ID.
_Route Type_: get
_Default access route_: _GET_ `/purchaseOrderDecisionView/:id`

### Parameters

| Parameter | Type | Required | Population |
| --------- | ---- | -------- | ---------- |
| id        | ID   | Yes      | path.param |

```js
axios({
  method: "GET",
  url: `/purchaseOrderDecisionView/${id}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: List Records

_Route Definition_: Returns a paginated list from the elastic index.
_Route Type_: list  
_Default access route_: _POST_ `/analyticsSnapshotView/list`

### Parameters

| Parameter | Type   | Required | Population      |
| --------- | ------ | -------- | --------------- |
| page      | Number | No       | query.page      |
| limit     | Number | No       | query.limit     |
| sortBy    | String | No       | query.sortBy    |
| sortOrder | String | No       | query.sortOrder |
| q         | String | No       | query.q         |
| filters   | Object | Yes      | body            |

```js
axios({
  method: "POST",
  url: `/analyticsSnapshotView/list`,
  data: {
    filters: "Object",
  },
  params: {
    page: "Number",
    limit: "Number",
    sortBy: "String",
    sortOrder: "String",
    q: "String",
  },
});
```

## The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

_Default access route_: _GET_ `/analyticsSnapshotView/list`

### Parameters

| Parameter | Type   | Required | Population      |
| --------- | ------ | -------- | --------------- |
| page      | Number | No       | query.page      |
| limit     | Number | No       | query.limit     |
| sortBy    | String | No       | query.sortBy    |
| sortOrder | String | No       | query.sortOrder |
| q         | String | No       | query.q         |

```js
axios({
  method: "GET",
  url: `/analyticsSnapshotView/list`,
  data: {},
  params: {
    page: "Number",
    limit: "Number",
    sortBy: "String",
    sortOrder: "String",
    q: "String",
  },
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Count Records

_Route Definition_: Counts matching documents in the elastic index.
_Route Type_: count  
_Default access route_: _POST_ `/analyticsSnapshotView/count`

### Parameters

| Parameter | Type   | Required | Population |
| --------- | ------ | -------- | ---------- |
| q         | String | No       | query.q    |
| filters   | Object | Yes      | body       |

```js
axios({
  method: "POST",
  url: `/analyticsSnapshotView/count`,
  data: {
    filters: "Object",
  },
  params: {
    q: "String",
  },
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

---

_Default access route_: _GET_ `/analyticsSnapshotView/count`

### Parameters

| Parameter | Type   | Required | Population |
| --------- | ------ | -------- | ---------- |
| q         | String | No       | query.q    |

```js
axios({
  method: "GET",
  url: `/analyticsSnapshotView/count`,
  data: {},
  params: {
    q: "String",
  },
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get Index Schema

_Route Definition_: Returns the schema for the elastic index.
_Route Type_: get
_Default access route_: _GET_ `/analyticsSnapshotView/schema`

```js
axios({
  method: "GET",
  url: `/analyticsSnapshotView/schema`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Filters

### GET /analyticsSnapshotView/filters

_Route Type_: get

### Parameters

| Parameter | Type   | Required | Population  |
| --------- | ------ | -------- | ----------- |
| page      | Number | No       | query.page  |
| limit     | Number | No       | query.limit |

```js
axios({
  method: "GET",
  url: `/analyticsSnapshotView/filters`,
  data: {},
  params: {
    page: "Number",
    limit: "Number",
  },
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

### POST /analyticsSnapshotView/filters

_Route Type_: create

### Parameters

| Parameter | Type   | Required | Population |
| --------- | ------ | -------- | ---------- |
| filters   | Object | Yes      | body       |

```js
axios({
  method: "POST",
  url: `/analyticsSnapshotView/filters`,
  data: {
    filters: "Object",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

### DELETE /analyticsSnapshotView/filters/:filterId

_Route Type_: delete

### Parameters

| Parameter | Type | Required | Population |
| --------- | ---- | -------- | ---------- |
| filterId  | ID   | Yes      | path.param |

```js
axios({
  method: "DELETE",
  url: `/analyticsSnapshotView/filters/${filterId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

## Route: Get One Record

_Route Type_: get
_Default access route_: _GET_ `/analyticsSnapshotView/:id`

### Parameters

| Parameter | Type | Required | Population |
| --------- | ---- | -------- | ---------- |
| id        | ID   | Yes      | path.param |

```js
axios({
  method: "GET",
  url: `/analyticsSnapshotView/${id}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a "status": "OK" property.

---
