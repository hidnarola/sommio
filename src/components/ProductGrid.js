import React from 'react'

import Product from './Product'

export default function ProductGrid({ loading, products }) {
  return <div className="flex flex-wrap -mx-5">{products.map(Product)}</div>
}
// {loading ? (
//   <img
//     src="/static/images/loading.svg"
//     title="Loading"
//     className="mx-auto"
//     alt="Loading"
//   />
// ) : (
//   products.map(Product)
// )}
