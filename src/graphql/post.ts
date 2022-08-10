import { gql } from '@apollo/client'

export const ALL_POST = gql`
query Query {
  getAllPost {
    id
    title
    body
  }
}
`

export const ADD_POST = gql`
mutation Mutation($input: AddPostInput) {
  addPost(input: $input) {
    __typename
    id
    title
    body
  }
}
`

export const DELETE_POST = gql`
mutation Mutation($id: Int!) {
  deletePost(id: $id)
}
`