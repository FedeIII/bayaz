import { createCookieSessionStorage } from '@remix-run/node';

import { getUser } from './user.server';

// export the whole sessionStorage object
export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session', // use any name you want here
    sameSite: 'lax', // this helps with CSRF
    path: '/', // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [], // replace this with an actual secret
    secure: process.env.NODE_ENV === 'production', // enable this in prod only
  },
});

// you can also export the methods individually for your own usage
export let { getSession, commitSession, destroySession } = sessionStorage;

export async function getSessionUser(request) {
  const session = await getSession(request.headers.get('Cookie'));
  const user = await getUser({ email: session.data.user.email });

  return user;
}
