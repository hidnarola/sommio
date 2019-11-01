import React from 'react'
import classNames from 'classnames'

const ReviewItem = () => {
  const klass = classNames(
    'border-t border-grey-light flex items-center cstm_item_info',
    {
      'opacity-50': removing,
      'py-2 md:py-4 lg:py-6': !locked,
      'py-4': locked
    }
  )
  return (
    <div className={klass}>
      <table className="table">
        <tr>
          <th>Product</th>
          <th>Name</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>

        <tr>
          <td>
            <Photo cartImg="cartImg" src={href} alt={name} />
          </td>
          <td>
            {name} <span className="d-block text-sm">{sku}</span>
          </td>
          <td>{value}</td>
        </tr>
      </table>
    </div>
  )
}
export default ReviewItem
