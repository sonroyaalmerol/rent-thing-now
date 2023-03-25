import { Thing, ThingApplication, User } from '@prisma/client';
import dayjs from 'dayjs';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
  apiVersion: '2022-11-15',
});

export const createSession = (thingApplication: (ThingApplication & {
  thing: Thing;
  renter: User;
})) => {
  const numberOfDays = dayjs(thingApplication.endDate).diff(
    thingApplication.startDate,
    'day',
  );

  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'cad',
          product_data: {
            name: thingApplication.thing.title,
          },
          unit_amount: thingApplication.thing.rate * 100,
        },
        quantity: thingApplication.quantity * numberOfDays,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/things/${thingApplication.thing.slug}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/things/${thingApplication.thing.slug}`,
  });
};

export const getSession = (sessionId: string) => stripe.checkout.sessions.retrieve(sessionId);

export default stripe;
