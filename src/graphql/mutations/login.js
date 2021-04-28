import { gql } from "@apollo/client";

const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        login(data: { email: $email, password: $password }) {
            errors {
                field
                message
            }
            user {
                id
            }
            accessToken
        }
    }

`
export {
    LOGIN_USER
}