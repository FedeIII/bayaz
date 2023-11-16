import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useAuth0 } from '@auth0/auth0-react';

export const loader = async () => {
  return json({ welcome: process.env.TEST_DEV });
};

export default function Index() {
  const { welcome } = useLoaderData();

  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  if (isLoading) return <p>Loading...</p>;

  return (
    <p>
      {welcome || 'Welcome'} {!!user && user.nickname}{' '}
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
      {!!isAuthenticated && (
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </button>
      )}
    </p>
  );
}
