import { useMutation } from '@apollo/client';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap'
import { REGISTER } from '../../graphql/onboarding';
import { FormHandler } from '../../services/form';

function Register() {
  const router = useNavigate();
  const [register, { loading, error }] = useMutation(REGISTER, {
    onCompleted: (val) => {
      if (val) {
        router('/login')
      }
    }
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    const data = FormHandler(e, ['email', 'password', 'name']);
    register({
      variables: {
        input: data
      }
    })
  }

  return (
    <div className='container vh-100 d-flex flex-column align-items-center justify-content-center'>
      <div className="card">
        <Form className="login-form card-body" onSubmit={handleSubmit}>
          <h3 className="mb-3">Register</h3>
          <FormGroup>
            <Label>Name</Label>
            <Input name='name' required disabled={loading} type='text' placeholder='e.g John Doe' />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type='email' required disabled={loading} name='email' placeholder='e.g you@example.com' />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input name='password' minLength={6} required disabled={loading} type='password' placeholder='password (more than 6 chars)' />
          </FormGroup>
          {error && <div className='notification'>{error.message}</div>}
          <FormGroup>
            <Button disabled={loading} block color='success'>
              {loading && <Spinner size='sm' />} Register
            </Button>
          </FormGroup>
          <div className="text-center">
            <Link className="" to='/login'>Login</Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Register