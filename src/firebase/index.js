import firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyDgGT5hFomtsStWFZdYblv6k8d9Bx-5xC0',
  authDomain: 'builton-61902.firebaseapp.com'
})
export default firebase

// new Promise(func (resolve, reject)){
//   firebase.initializeApp({
//     apiKey: 'AIzaSyDgGT5hFomtsStWFZdYblv6k8d9Bx-5xC0',
//     authDomain: 'builton-61902.firebaseapp.com'
//   })
// }.then(function (num) {
//   console.log(num); // num == 20
//   return Promise.resolve(firebase);
// })
// export default Promise.all(promises)
