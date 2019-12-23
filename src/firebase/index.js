const config = {
  apiKey: 'AIzaSyDgGT5hFomtsStWFZdYblv6k8d9Bx-5xC0',
  authDomain: 'builton-61902.firebaseapp.com'
}

let firebaseInstance
export const getFirebase = firebase => {
  if (firebaseInstance) {
    return firebaseInstance
  }

  firebase.initializeApp(config)
  firebaseInstance = firebase
  console.log('firebase => ', firebase)

  return firebase
}

// import firebase from 'firebase'

// firebase.initializeApp({
//   apiKey: 'AIzaSyDgGT5hFomtsStWFZdYblv6k8d9Bx-5xC0',
//   authDomain: 'builton-61902.firebaseapp.com'
// })
// export default firebase
