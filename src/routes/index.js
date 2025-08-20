const express = require("express");
const router = express.Router();

const bookDetailsViewRoute = require("./bookDetailsView.route.js");
router.use("/bookDetailsView", bookDetailsViewRoute);

const memberProfileViewRoute = require("./memberProfileView.route.js");
router.use("/memberProfileView", memberProfileViewRoute);

const reservationNotificationViewRoute = require("./reservationNotificationView.route.js");
router.use("/reservationNotificationView", reservationNotificationViewRoute);

const loanDueNoticeViewRoute = require("./loanDueNoticeView.route.js");
router.use("/loanDueNoticeView", loanDueNoticeViewRoute);

const feeAssessmentNotificationViewRoute = require("./feeAssessmentNotificationView.route.js");
router.use(
  "/feeAssessmentNotificationView",
  feeAssessmentNotificationViewRoute,
);

const personalizedRecommendationViewRoute = require("./personalizedRecommendationView.route.js");
router.use(
  "/personalizedRecommendationView",
  personalizedRecommendationViewRoute,
);

const manualStaffAlertViewRoute = require("./manualStaffAlertView.route.js");
router.use("/manualStaffAlertView", manualStaffAlertViewRoute);

const issueEscalationNotificationViewRoute = require("./issueEscalationNotificationView.route.js");
router.use(
  "/issueEscalationNotificationView",
  issueEscalationNotificationViewRoute,
);

const purchaseOrderDecisionViewRoute = require("./purchaseOrderDecisionView.route.js");
router.use("/purchaseOrderDecisionView", purchaseOrderDecisionViewRoute);

const analyticsSnapshotViewRoute = require("./analyticsSnapshotView.route.js");
router.use("/analyticsSnapshotView", analyticsSnapshotViewRoute);

const dynamicRoute = require("./dynamic.route.js");
router.use("/", dynamicRoute);

module.exports = router;
