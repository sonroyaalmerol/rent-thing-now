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
});

// export type definition of API
export type AppRouter = typeof appRouter;
