import { gql } from '@apollo/client'

export const LOGIN_QUERY = gql`
query Query($input: LoginInput) {
  login(input: $input) {
    id
    name
    age
    password
    email
    created_at
  }
}
`
export const REGISTER = gql`
mutation Mutation($input: AddUserInput) {
  addUser(input: $input) {
    id
    name
    age
    email
    created_at
  }
}
`

export const ME = gql`
query Query {
  me {
    id
    name
    age
    email
    created_at
  }
}
`