import { router } from '@/server/trpc';
import thingsByCategory from '@/server/routers/thingsByCategory';
import searchForThings from '@/server/routers/searchForThings';

export const appRouter = router({
  thingsByCategory,
  searchForThings,
});

// export type definition of API
export type AppRouter = typeof appRouter;
