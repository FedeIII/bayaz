import { Form } from '@remix-run/react';

export default function Login() {
  return (
    <Form
      action="/auth/auth0"
      method="post"
      style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}
    >
      <button style={{ margin: 'auto', padding: '10px 20px' }}>
        Login with Auth0
      </button>
    </Form>
  );
}
