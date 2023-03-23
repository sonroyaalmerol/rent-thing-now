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
});

// export type definition of API
export type AppRouter = typeof appRouter;
