import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Photo from '../Photo'
import { FirebaseContext } from '../../context/FirebaseContext'
import Loader from '../../components/Loader'

const userOrderDetails = props => {
  const orderId = props.id
  const url = `https://api.builton.dev/orders/${orderId}`
  const token = localStorage.getItem('firebaseToken')

  const { firebase } = useContext(FirebaseContext)
  const [orderDetails, setOrderDetails] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    console.log('ComponentDid mount SS')

    const fetchUserOrderDetails = async () => {
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Builton-Api-Key': process.env.GATSBY_BUILTON_API_KEY,
          'Content-Type': 'application/json'
        }
      })
      setOrderDetails(response.data)
      setLoading(false)

      console.log('response ORDERS SS ==>', response)
    }
    fetchUserOrderDetails()
  }, [])
  console.log('orderDetails SS => ', orderDetails)

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : (
        <>
          <h1>User Order Details ................!</h1>
          <h4>Your Order Id : {orderDetails && orderDetails._id.$oid}</h4>
          <h4>Product Details</h4>
          <p>
            {orderDetails &&
              orderDetails.items.map(item => (
                <div>
                  <p>Product : {item.name}</p>
                  <Photo
                    src={item.product.media[0] && item.product.media[0].url}
                    alt={item.name}
                  />
                  <p>Price :{item.final_price}</p>
                </div>
              ))}
          </p>
          <h4>User Details</h4>
          <p>Email: {orderDetails && orderDetails.user.email}</p>
          <h4>Shipping Details</h4>
          <p>
            street_name :
            {orderDetails && orderDetails.delivery_address.street_name}
          </p>
          <p>city :{orderDetails && orderDetails.delivery_address.city}</p>
          <p>state: {orderDetails && orderDetails.delivery_address.state}</p>
          <p>
            zip_code:{orderDetails && orderDetails.delivery_address.zip_code}
          </p>
          <p>country:{orderDetails && orderDetails.delivery_address.country}</p>
        </>
      )}
    </>
  )
}
export default userOrderDetails
