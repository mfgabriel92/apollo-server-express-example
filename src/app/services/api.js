import axios from 'axios'

export async function user(vars) {
  return axios.post('http://localhost:8000/graphql', {
    query: `
      query ($id: ID!) {
        user(id: $id) {
          id
          first_name
          last_name
          role
          username
          email
        }
      }
    `,
    vars,
  })
}
