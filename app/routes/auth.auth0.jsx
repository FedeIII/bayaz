import { redirect } from '@remix-run/node';
import { authenticator } from '~/utils/auth.server';

export let loader = () => redirect('/login');

export let action = ({ request }) => {
  return authenticator.authenticate('auth0', request);
};
