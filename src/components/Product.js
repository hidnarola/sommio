import React from 'react'
import { Link } from 'gatsby'

import Photo from './Photo'
import Badge from './Badge'

export default function Product({ id, slug, name, mainImage, meta, on_sale }) {
  console.log("meta",meta);
  console.log("mainImage==>", mainImage);

  const price =  meta && meta.display_price && meta.display_price.without_tax ? meta.display_price.without_tax.formatted : 0

  return (
    <article key={id} className="px-5 py-2 w-full md:p-5 md:w-1/2 lg:w-1/3">
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
    </article>
  )
}
