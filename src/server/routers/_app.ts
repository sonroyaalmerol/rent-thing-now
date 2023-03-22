import { router } from '@/server/trpc';
import thingsByCategory from '@/server/routers/thingsByCategory';
import searchForThings from '@/server/routers/searchForThings';
import allThings from '@/server/routers/allThings';
import thingReviews from '@/server/routers/thingReviews';

export const appRouter = router({
  thingsByCategory,
  searchForThings,
  allThings,
  thingReviews,
});

// export type definition of API
export type AppRouter = typeof appRouter;
