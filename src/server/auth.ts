import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { type GetServerSidePropsContext } from 'next';
import {
  getServerSession,
} from 'next-auth';

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => getServerSession(ctx.req, ctx.res, authOptions);

export default getServerAuthSession;
