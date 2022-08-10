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

export const EDIT_USER = gql`
mutation Mutation($input: EditUserInput) {
  editUser(input: $input) {
    name
    age
  }
}
`