import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Badge, Button, Spinner } from 'reactstrap'
import { client } from '../..';
import Loader from '../../components/loader';
import { ALL_POST, DELETE_POST } from '../../graphql/post';

interface PostData {
  id: number
  title: string
  body: string
}

function Index() {

  const { loading, error, data } = useQuery(ALL_POST);
  const [currentDel, setCurrentDel] = useState(0)
  const [deletFunc, { data: _, loading: deleteLoading, error: __ }] = useMutation(DELETE_POST, {
    onCompleted: (val) => {
      if (val?.deletePost) {
        const prevPosts = client.readQuery({ query: ALL_POST })
        client.writeQuery({
          query: ALL_POST,
          data: {
            getAllPost: prevPosts.getAllPost.filter((item: PostData) => item.id !== currentDel)
          }
        })
      } else {
        toast.error('Failed to delete post!');
      }
    }
  })

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error])

  const deletePost = async (id: number) => {
    setCurrentDel(id)
    deletFunc({ variables: { id } })
  }

  return (
    <div>
      <h2 className='text-center mb-5'> My Posts</h2>
      <div className="row">
        {
          loading ? <Loader height='40vh' /> : data?.getAllPost?.length ? data?.getAllPost?.map((item: PostData, idx: number) =>
            <div key={idx} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body d-flex">
                  <div className="me-2">
                    <Badge className='rounded-circle'>{idx + 1}</Badge>
                  </div>
                  <div className='w-100'>
                    <h3>
                      {item.title}
                    </h3>
                    <div className="d-flex justify-content-between">
                      <p className="m-0 w-100 me-2">
                        {item.body}
                      </p>
                      <Button color='danger' onClick={() => deletePost(item.id)}>
                        {(currentDel === item.id && deleteLoading) && <Spinner size='sm' />}
                        Delete</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>) : <div className='text-center h6'>You do not have any post yet</div>
        }
      </div>
    </div>
  )
}

export default Index