import { useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap'
import { LOGIN_QUERY } from '../../graphql/onboarding';
import { FormHandler } from '../../services/form'

function Login() {
  const [login, { loading, error, data }] = useLazyQuery(LOGIN_QUERY);

  const router = useNavigate();

  useEffect(() => {
    if (data) {
      router('/')
    }
  }, [data, router]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    const data = FormHandler(e, ['email', 'password']);
    login({
      variables: {
        input: data
      }
    })
  }

  return (
    <div className='container vh-100 d-flex flex-column align-items-center justify-content-center'>
      <div className="card">
        <Form className="login-form card-body" onSubmit={handleSubmit}>
          <h3 className="mb-3">Login</h3>
          <FormGroup>
            <Label>Email</Label>
            <Input disabled={loading} required type='email' name="email" placeholder='e.g you@example.com' />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input disabled={loading} required minLength={6} title='password must be at least 6 characters' type='password' name='password' placeholder='e.g you@example.com' />
            {error && <div className='notification'>{error.message}</div>}
          </FormGroup>
          <FormGroup>
            <Button block type='submit' color='success'>
              {loading && <Spinner size='sm' />} Login
            </Button>
          </FormGroup>
          <div className="text-center">
            <Link className="" to='/register'>Sign Up</Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login