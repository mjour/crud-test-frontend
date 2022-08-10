import { useMutation } from '@apollo/client'
import console from 'console'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import { client } from '../..'
import { EDIT_USER } from '../../graphql/account'
import { ME } from '../../graphql/onboarding'
import { FormHandler } from '../../services/form'
import { notEmpty } from '../../services/object'
import './index.css'

interface AccountProps {
  name?: string
  email?: string
  age?: number
}

interface Me {
  me?: AccountProps
}

function Account(props: Me) {
  const [key, setkey] = useState(Math.random());
  const [editUser, { data, loading, error }] = useMutation(EDIT_USER, {
    onCompleted: (val) => {
      if (val) {
        client.writeQuery({
          query: ME,
          data: {
            me: val.editUser
          }
        })
        toast.success('Changed account settings successfully')
      }
    }
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])



  const [accountData, setAccountData] = useState<AccountProps>({ email: '', age: 0, name: '' });

  useEffect(() => {
    if (notEmpty(props)) {
      setAccountData({
        email: props?.me?.email,
        age: props?.me?.age,
        name: props?.me?.name
      });
      setkey(Math.random())
    }
  }, [props])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    const formData = FormHandler(e, ['name', 'age']);
    if (formData.age) formData.age *= 1;
    editUser({ variables: { input: formData } })
  }

  return (
    <div className='card'>
      <Form className='card-body' onSubmit={handleSubmit}>
        <h2 className='mb-4'>My Info</h2>
        <Row>
          <Row className='align-items-end'>
            <Col md={12}>
              <FormGroup>
                <Label>Email</Label>
                <Input value={accountData?.email} disabled={true} name='email' placeholder='your name' />
              </FormGroup>
            </Col>
          </Row>
          <Col md={6}>
            <FormGroup>
              <Label>Name</Label>
              <Input key={key * 1} disabled={loading} defaultValue={accountData?.name} name='name' placeholder='your name' />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Age</Label>
              <Input key={key * 2} disabled={loading} defaultValue={accountData?.age} name='age' placeholder='your age' />
            </FormGroup>
            {error && <div className='notification'>{error.message}</div>}
          </Col>
        </Row>
        <Row className='align-items-end'>
          <Col md={12}>
            <FormGroup>
              <Button disabled={loading} color="success" type='submit' block>
                {loading && <Spinner size='sm' />}  Save
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Account