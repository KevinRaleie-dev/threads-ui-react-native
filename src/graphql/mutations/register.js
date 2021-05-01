import { gql } from "@apollo/client"

const REGISTER_USER = gql `
    mutation RegisterUser($username: String!, $email: String!, $password: String!) {
        register(data: { username: $username, email: $email, password: $password }) {
            errors {
                field
                message
            }
            user {
                id
            }
        }
    }

`
export {
    REGISTER_USER
}