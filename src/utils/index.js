export const isLoggedIn = () => {
  if (localStorage.getItem('firebaseToken')) {
    return true
  }
}
