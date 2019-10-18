import React, { useState, useEffect } from 'react'
import { graphql, withPrefix } from 'gatsby'
import ImageGallery from 'react-image-gallery'
import SEO from '../components/SEO'
// import Photo from '../components/Photo'
import Badge from '../components/Badge'
import AddToCart from '../components/ProductPage/AddToCart'
import useMoltinInventory from '../hooks/useMoltinInventory'
import Noimage from '../images/no_img.jpg'
import BlogPost from '../components/BlogPost'
import ProductService from '../components/ProductPage/ProductService'
import ProductReview from '../components/ProductPage/ProductReview'
import ProductTitle from '../components/ProductPage/ProductTitle'
import ProductImage from '../components/ProductPage/ProductImage'
import ProductDetails from '../components/ProductPage/ProductDetails'
import HelpSlider from '../components/ProductPage/HelpSlider'
import FreeDelivery from '../components/ProductPage/FreeDelivery'
import ProductOverview from '../components/ProductPage/ProductOverview'

function ProductPage({ data: { product } }) {
  const [inventory, inventoryLoading, inventoryError] = useMoltinInventory(
    product
  )

  const {
    meta: { display_price }
  } = product

  let [imageArray, setImageArray] = useState([])

  useEffect(() => {
    product.files &&
      product.files.map(img => {
        if (img) {
          imageArray.push({ original: img.href, thumbnail: img.href })
        }
      })
  }, [])

  const selectedProductImage = obj => {
    let tempArray = []
    obj &&
      obj.map(product => {
        product.files.map(img => {
          tempArray.push({
            original: img && img.href ? img.href : Noimage,
            thumbnail: img && img.href ? img.href : Noimage
          })
        })
      })

    setImageArray(tempArray)
  }
  console.log('imageArray &&&&', imageArray)

  return (
    <React.Fragment>
      <SEO
        type="product"
        title={product.meta_title || product.name}
        description={product.meta_description || product.description}
        image={withPrefix(
          product.mainImage && product.mainImage.childImageSharp
            ? product.mainImage.childImageSharp.fluid.src
            : Noimage
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
                    productId={product.id}
                    disabled={!inventory.inStock}
                    variationData={product.meta.variations}
                    selectedProductImage={selectedProductImage}
                  />
                </div>
                <div className="col-12 col-lg-8 d-none">
                  <ProductImage imageArray={imageArray} product={product} />
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
    </React.Fragment>
  )
}

export const query = graphql`
  query($id: String!) {
    product: moltinProduct(id: { eq: $id }) {
      id
      slug
      name
      description
      sku
      relationships {
        parent {
          data {
            id
          }
        }
      }
      files {
        id
        href
      }
      mainImage {
        childImageSharp {
          fluid(maxWidth: 560) {
            ...GatsbyImageSharpFluid
          }
        }
        publicURL
      }
      meta {
        variations {
          id
          name
          options {
            description
            id
            name
          }
        }
        display_price {
          without_tax {
            formatted
          }
        }
      }
      manage_stock
    }
  }
`

export default ProductPage
