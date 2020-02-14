import React from 'react'
import { Link } from 'gatsby'

import Photo from './Photo'

const Product = ({ id, human_id, name, media, price, description }) => {
  console.log(
    'id, human_id, name, media, price, description =>',
    id,
    human_id,
    name,
    media,
    price,
    description
  )

  return (
    <article key={id} className="px-5 py-2 w-full md:p-5 md:w-1/2 lg:w-1/3">
      <Link
        to={`/products/${human_id}`}
        className="block w-full h-full no-underline"
      >
        <Photo src={media[0].url} />
        <div className="pt-4 pb-2">
          <p className="text-black no-underline flex items-center">{name}</p>
          <span className="text-grey text-sm">Price:{price}</span>
        </div>
      </Link>
    </article>
  )
}
export default Product
{
  /* <article key={id} className="px-5 py-2 w-full md:p-5 md:w-1/2 lg:w-1/3">
      <Link
        to={`/products/${slug}`}
        className="block w-full h-full no-underline"
      >
        <Photo src={mainImage} />

        <div className="pt-4 pb-2">
          <p className="text-black no-underline flex items-center">
            {name}
            {on_sale && (
              <Badge color="green" className="mx-2">
                On Sale
              </Badge>
            )}
          </p>
          <span className="text-grey text-sm">{price}</span>
        </div>
      </Link>
    </article> */
}
