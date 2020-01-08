import axios from 'axios'

export const newFirebaseToken = async () => {
  let details = localStorage.getItem('details')

  let refreshToken = details && JSON.parse(details).stsTokenManager.refreshToken

  let urlForToken =
    'https://securetoken.googleapis.com/v1/token?key=AIzaSyDgGT5hFomtsStWFZdYblv6k8d9Bx-5xC0'

  return axios
    .post(urlForToken, {
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    })
    .then(response => {
      return response.data.access_token
    })
    .catch(err => {
      return err
    })
}
