import { Form } from '@remix-run/react';

export default function Login() {
  return (
    <Form action="/auth/auth0" method="post" style={{ margin: 'auto' }}>
      <button>Login with Auth0</button>
    </Form>
  );
}
