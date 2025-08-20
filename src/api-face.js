const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const authUrl = (process.env.SERVICE_URL ?? "mindbricks.com").replace(
    process.env.SERVICE_SHORT_NAME,
    "auth",
  );

  const config = {
    name: "librarymanagementsystem - bff",
    brand: {
      name: "librarymanagementsystem",
      image: "https://mindbricks.com/favicon.ico",
      moduleName: "bff",
    },
    auth: {
      url: authUrl,
      loginPath: "/login",
      logoutPath: "/logout",
      currentUserPath: "/currentuser",
      authStrategy: "external",
      initialAuth: true,
    },
    dataObjects: [
      {
        name: "Dynamic All Index",
        description: "Dynamic All Index for all elasticsearch index",
        reference: {
          tableName: "Dynamic All Index",
          properties: [],
        },
        endpoints: [
          {
            isAuth: false,
            method: "GET",
            url: "/allIndices",
            title: "All Indices",
            query: [],
            body: {},
            parameters: [],
            headers: [],
          },
          {
            isAuth: false,
            method: "POST",
            url: "/{indexName}/list",
            title: "List",
            query: [
              {
                key: "page",
                value: "1",
                description: "Page number",
                active: true,
              },
              {
                key: "limit",
                value: "10",
                description: "Limit number",
                active: true,
              },
              {
                key: "sortBy",
                value: "createdAt",
                description: "Sort by",
                active: true,
              },
              {
                key: "sortOrder",
                value: "desc",
                description: "Sort order",
                active: true,
              },
              {
                key: "q",
                value: "",
                description: "Search",
                active: false,
              },
            ],
            body: {
              type: "json",
              content: {
                field: {
                  //operator types: match, eq, noteq, range, exists, missing, prefix, wildcard, regexp, match_phrase, match_phrase_prefix
                  operator: "eq",
                  value: "string",
                  //if operator is range, values: [min, max]
                },
              },
            },
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
            ],
            headers: [],
          },
          {
            isAuth: false,
            method: "GET",
            url: "/{indexName}/list",
            title: "List",
            query: [
              {
                key: "page",
                value: "1",
                description: "Page number",
                active: true,
              },
              {
                key: "limit",
                value: "10",
                description: "Limit number",
                active: true,
              },
              {
                key: "sortBy",
                value: "createdAt",
                description: "Sort by",
                active: true,
              },
              {
                key: "sortOrder",
                value: "desc",
                description: "Sort order",
                active: true,
              },
              {
                key: "q",
                value: "",
                description: "Search",
                active: false,
              },
            ],
            body: {},
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
            ],
            headers: [],
          },
          {
            isAuth: false,
            method: "POST",
            url: "/{indexName}/count",
            title: "Count",
            query: [
              {
                key: "q",
                value: "",
                description: "Search",
                active: false,
              },
            ],
            body: {
              type: "json",
              content: {
                field: {
                  //operator types: match, eq, noteq, range, exists, missing, prefix, wildcard, regexp, match_phrase, match_phrase_prefix
                  operator: "eq",
                  value: "string",
                  //if operator is range, values: [min, max]
                },
              },
            },
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
            ],
            headers: [],
          },
          {
            isAuth: false,
            method: "GET",
            url: "/{indexName}/count",
            title: "Count",
            query: [
              {
                key: "q",
                value: "",
                description: "Search",
                active: false,
              },
            ],
            body: {},
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
            ],
            headers: [],
          },
          {
            isAuth: false,
            method: "GET",
            url: "/{indexName}/schema",
            title: "Schema",
            query: [],
            body: {},
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
            ],
            headers: [],
          },
          {
            isAuth: false,
            method: "GET",
            url: "/{indexName}/{id}",
            title: "Get",
            query: [],
            body: {},
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
              {
                key: "id",
                value: "string",
                description: "Id",
              },
            ],
            headers: [],
          },
        ],
      },
    ],
  };

  config.dataObjects.push({
    name: "bookDetailsView",
    description: "",
    reference: {
      tableName: "bookDetailsView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/bookDetailsView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/bookDetailsView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "memberProfileView",
    description: "",
    reference: {
      tableName: "memberProfileView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/memberProfileView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/memberProfileView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "reservationNotificationView",
    description: "",
    reference: {
      tableName: "reservationNotificationView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/reservationNotificationView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/reservationNotificationView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "loanDueNoticeView",
    description: "",
    reference: {
      tableName: "loanDueNoticeView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/loanDueNoticeView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/loanDueNoticeView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "feeAssessmentNotificationView",
    description: "",
    reference: {
      tableName: "feeAssessmentNotificationView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/feeAssessmentNotificationView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/feeAssessmentNotificationView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "personalizedRecommendationView",
    description: "",
    reference: {
      tableName: "personalizedRecommendationView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/personalizedRecommendationView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/personalizedRecommendationView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "manualStaffAlertView",
    description: "",
    reference: {
      tableName: "manualStaffAlertView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/manualStaffAlertView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/manualStaffAlertView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "issueEscalationNotificationView",
    description: "",
    reference: {
      tableName: "issueEscalationNotificationView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/issueEscalationNotificationView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/issueEscalationNotificationView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "purchaseOrderDecisionView",
    description: "",
    reference: {
      tableName: "purchaseOrderDecisionView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/purchaseOrderDecisionView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/purchaseOrderDecisionView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "analyticsSnapshotView",
    description: "",
    reference: {
      tableName: "analyticsSnapshotView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "POST",
        url: "/analyticsSnapshotView/list",
        title: "List",
        query: [
          {
            key: "page",
            value: "1",
            description: "Page number",
            active: true,
          },
          {
            key: "limit",
            value: "10",
            description: "Limit number",
            active: true,
          },
          {
            key: "sortBy",
            value: "createdAt",
            description: "Sort by",
            active: true,
          },
          {
            key: "sortOrder",
            value: "desc",
            description: "Sort order",
            active: true,
          },
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {
          type: "json",
          content: {
            field: {
              //operator types: match, eq, noteq, range, exists, missing, prefix, wildcard, regexp, match_phrase, match_phrase_prefix
              operator: "eq",
              value: "string",
              //if operator is range, values: [min, max]
            },
          },
        },
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/analyticsSnapshotView/list",
        title: "List",
        query: [
          {
            key: "page",
            value: "1",
            description: "Page number",
            active: true,
          },
          {
            key: "limit",
            value: "10",
            description: "Limit number",
            active: true,
          },
          {
            key: "sortBy",
            value: "createdAt",
            description: "Sort by",
            active: true,
          },
          {
            key: "sortOrder",
            value: "desc",
            description: "Sort order",
            active: true,
          },
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "POST",
        url: "/analyticsSnapshotView/count",
        title: "Count",
        query: [
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {
          type: "json",
          content: {
            field: {
              //operator types: match, eq, noteq, range, exists, missing, prefix, wildcard, regexp, match_phrase, match_phrase_prefix
              operator: "eq",
              value: "string",
              //if operator is range, values: [min, max]
            },
          },
        },
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/analyticsSnapshotView/count",
        title: "Count",
        query: [
          {
            key: "q",
            value: "",
            description: "Search",
            active: false,
          },
        ],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/analyticsSnapshotView/schema",
        title: "Schema",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/analyticsSnapshotView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  inject(app, config);
};
