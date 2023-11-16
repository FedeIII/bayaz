import { Authenticator } from 'remix-auth';
import { Auth0Strategy } from 'remix-auth-auth0';
import { sessionStorage } from '~/services/session.server';
import { findUserOrCreate } from '~/services/user.server';

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator(sessionStorage);

let auth0Strategy = new Auth0Strategy(
  {
    callbackURL: process.env.AUTH0_CALLBACK_URL,
    clientID: process.env.BACKEND_AUTH0_CLIENT_ID,
    clientSecret: process.env.BACKEND_AUTH0_CLIENT_SECRET,
    domain: process.env.AUTH0_DOMAIN,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    return findUserOrCreate({ email: profile.emails[0].value });
  }
);

authenticator.use(auth0Strategy);
