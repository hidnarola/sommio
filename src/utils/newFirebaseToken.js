import axios from 'axios'

export const newFirebaseToken = async () => {
  let details = localStorage.getItem('details')

  let refreshToken = details && JSON.parse(details).stsTokenManager.refreshToken

  let urlForToken = `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`

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
