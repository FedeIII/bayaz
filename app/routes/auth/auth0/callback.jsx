import { authenticator } from '~/utils/auth.server';

export let loader = ({ request }) => {
  return authenticator.authenticate('auth0', request, {
    successRedirect: '/',
    failureRedirect: '/error',
  });
};
