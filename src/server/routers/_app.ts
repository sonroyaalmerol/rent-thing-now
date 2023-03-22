import { router } from '@/server/trpc';
import thingsByCategory from '@/server/routers/thingsByCategory';
import searchForThings from '@/server/routers/searchForThings';
import allThings from '@/server/routers/allThings';
import thingReviewSummary from '@/server/routers/thingReviewSummary';
import thingTotalReviews from '@/server/routers/thingTotalReviews';

export const appRouter = router({
  thingsByCategory,
  searchForThings,
  allThings,
  thingReviewSummary,
  thingTotalReviews,
});

// export type definition of API
export type AppRouter = typeof appRouter;
