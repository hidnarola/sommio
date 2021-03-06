import React, { useState } from 'react'
import { graphql, withPrefix } from 'gatsby'
import SEO from '../components/SEO'
import AddToCart from '../components/ProductPage/AddToCart'
import Noimage from '../images/no_img.jpg'
import ProductService from '../components/ProductPage/ProductService'
import ProductReview from '../components/ProductPage/ProductReview'
import ProductTitle from '../components/ProductPage/ProductTitle'
import ProductDetails from '../components/ProductPage/ProductDetails'
import HelpSlider from '../components/ProductPage/HelpSlider'
import FreeDelivery from '../components/ProductPage/FreeDelivery'
import ProductOverview from '../components/ProductPage/ProductOverview'
import ProductImage from '../components/ProductPage/ProductImage'

const ProductPageBuilton = ({ data: { product } }) => {
  console.log('ProductPageBuilton product ==================>', product)

  const [selectedVariationId, setSelectedVariationId] = useState(
    product._id._oid
  )
  const onChangeSelectedProduct = id => {
    setSelectedVariationId(id)
  }
  return (
    <div>
      <SEO
        type="product"
        title={product.short_description || product.name}
        description={product.meta_description || product.description}
        image={withPrefix(
          product && product.image_url ? product.image_url : Noimage
        )}
      />

      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-12 col-lg-8">
            <ProductService />
            <ProductTitle title={product.name} />
          </div>
          <div className="col-12 col-lg-4">
            <ProductReview />
          </div>

          <div className="col-12">
            <div className="blanket-bg">
              <div className="row">
                <div className="col-12 col-lg-4">
                  <AddToCart
                    onChangeSelectedProduct={onChangeSelectedProduct}
                    productId={product._id._oid}
                    tags={product.tags}
                  />
                </div>
                <div className="col-12 col-lg-8">
                  <ProductImage
                    selectedVariationId={selectedVariationId}
                    productId={product.id}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="reinvented-bg">
        <ProductDetails />
      </section>

      <section className="overviewhelp-bg">
        <ProductOverview />
        <HelpSlider />
      </section>

      <FreeDelivery />
    </div>
  )
}
export const query = graphql`
  query($id: String!) {
    product: builtonProduct(id: { eq: $id }) {
      _id {
        _oid
      }
      id
      name
      price
      main_product
      human_id
      description
      image_url
      short_description
      tags
      media {
        url
      }
    }
  }
`
export default ProductPageBuilton
