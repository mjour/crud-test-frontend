
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavbarText,
  Spinner,
} from 'reactstrap';
import { client } from '../..';
import { ADD_POST, ALL_POST } from '../../graphql/post';
import { FormHandler } from '../../services/form';
import { notEmpty } from '../../services/object';
import { removeAuth } from '../../services/token';

function NavBar({ name }: { name?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState(false);
  const [addPost, { data, loading, error }] = useMutation(ADD_POST, {
    onCompleted: (val) => {
      if (notEmpty(val)) {
        const prevPosts = client.readQuery({ query: ALL_POST })
        client.writeQuery({
          query: ALL_POST,
          data: {
            getAllPost: [val.addPost, ...prevPosts.getAllPost]
          }
        })
        setPost(!post)
        toast.success('Added new post successfully')
      }
    }
  });

  const toggle = () => setIsOpen(!isOpen);
  const newPostToggle = () => setPost(!post)
  const logOut = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      removeAuth();
    }
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    const formData = FormHandler(e, ['title', 'body']);
    addPost({ variables: { input: formData } })
  }

  return (
    <div className='mb-5'>
      <Navbar color="light" light expand="sm" fixed='top'>
        <NavLink to='/' className='navbar-brand btn me-5 text-dark text-decoration-none'>CRUD</NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Button onClick={newPostToggle} className="me-5">New Post</Button>
            </NavItem>
            {/* <NavItem>
              <NavLink className='btn nav-links' to="/address">Addess</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink className='btn text-decoration-none text-dark' to="/account">Account</NavLink>
            </NavItem>
          </Nav>
          <NavbarText className='btn text-dark' onClick={logOut}>Logout</NavbarText>
        </Collapse>
      </Navbar>



      <Modal isOpen={post} toggle={newPostToggle} centered={true}>
        <ModalHeader toggle={newPostToggle}>New Post</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Title</Label>
              <Input disabled={loading} name="title" placeholder='your title' />
            </FormGroup>
            <FormGroup>
              <Label>Body</Label>
              <Input disabled={loading} name="body" type='textarea' placeholder='your post body' />
              {error && <div className="notification">{error.message}</div>}
            </FormGroup>
            <FormGroup>
              <Button disabled={loading} block color='success' type='submit' >
                {loading && <Spinner size='sm' />} Save
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default NavBar;