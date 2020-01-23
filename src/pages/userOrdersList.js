import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'gatsby'
import { CheckoutContext } from '../context/index'
import Loader from '../components/Loader'
import { newFirebaseToken } from '../utils/newFirebaseToken'

const UserOrdersList = () => {
  const { userOrderData, userOrder } = useContext(CheckoutContext)
  const [isLoading, setLoading] = useState(false)

  const url = 'https://api.builton.dev/orders'

  useEffect(() => {
    setLoading(true)

    const fetchOrder = async () => {
      var token = await newFirebaseToken()

      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Builton-Api-Key': process.env.GATSBY_BUILTON_API_KEY,
          'Content-Type': 'application/json'
        }
      })

      userOrderData(response.data)
      setLoading(false)
    }
    fetchOrder()
  }, [])

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : (
        <div className="table">
          <h1>My orders</h1>
          <table style={{ width: '100%', border: '1px solid black' }}>
            <tr>
              <th>Order Date</th>
              <th>Order Number</th>
              <th>Total Amount</th>
              <th>Order Status</th>
              <th>Actions</th>
            </tr>
            {userOrder && userOrder.length > 0 ? (
              userOrder.map(order => (
                <tr>
                  <td>{new Date(order.created.$date).toDateString()}</td>
                  <td>{order._id.$oid}</td>
                  <td>{order.total_amount}</td>
                  <td>{order.order_status}</td>
                  <td>
                    <Link to={`/order/${order._id.$oid}`}>View Details</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>No Orders Found</tr>
            )}
          </table>
        </div>
      )}
    </>
  )
}

export default UserOrdersList
