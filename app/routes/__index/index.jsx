import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const loader = async () => {
  return json({ welcome: process.env.TEST_DEV });
};

export default function Index() {
  const { welcome } = useLoaderData();

  return <p>{welcome || 'Welcome'}</p>;
}
