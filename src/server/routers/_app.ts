import { router } from '@/server/trpc';
import thingsByCategory from '@/server/routers/thingsByCategory';
import searchForThings from '@/server/routers/searchForThings';
import allThings from '@/server/routers/allThings';
import thingReviewSummary from '@/server/routers/thingReviewSummary';
import thingTotalReviews from '@/server/routers/thingTotalReviews';
import thingReviews from '@/server/routers/thingReviews';
import userCanReviewThing from '@/server/routers/userCanReviewThing';
import userSavedThing from '@/server/routers/userSavedThing';
import userSaveThingToggle from '@/server/routers/userSaveThingToggle';
import userCanRentThing from '@/server/routers/userCanRentThing';
import rentThing from '@/server/routers/rentThing';
import reviewThing from '@/server/routers/reviewThing';
import thingAvailability from '@/server/routers/thingAvailability';
import updateThingImages from '@/server/routers/updateThingImages';
import thingApplicationCount from '@/server/routers/thingApplicationCount';
import thingApplications from '@/server/routers/thingApplications';
import thingApplicationApprove from '@/server/routers/thingApplicationApprove';
import thingApplicationReject from '@/server/routers/thingApplicationReject';
import thingApplicationCanceled from '@/server/routers/thingApplicationCanceled';
import thingCurrentApplication from '@/server/routers/thingCurrentApplication';
import checkApplicationPayment from '@/server/routers/checkApplicationPayment';
import lendThing from '@/server/routers/lendThing';
import updateThing from '@/server/routers/updateThing';
import newSupportRequest from '@/server/routers/newSupportRequest';
import supportRequests from '@/server/routers/supportRequests';
import replySupportRequest from '@/server/routers/replySupportRequest';
import updateProfile from '@/server/routers/updateProfile';

export const appRouter = router({
  thingsByCategory,
  searchForThings,
  allThings,
  thingReviewSummary,
  thingTotalReviews,
  thingReviews,
  userCanReviewThing,
  userSavedThing,
  userSaveThingToggle,
  userCanRentThing,
  rentThing,
  reviewThing,
  thingAvailability,
  updateThingImages,
  thingApplicationCount,
  thingApplications,
  thingApplicationApprove,
  thingApplicationReject,
  thingApplicationCanceled,
  thingCurrentApplication,
  checkApplicationPayment,
  lendThing,
  updateThing,
  newSupportRequest,
  supportRequests,
  replySupportRequest,
  updateProfile,
});

// export type definition of API
export type AppRouter = typeof appRouter;
