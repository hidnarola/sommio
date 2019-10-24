import React from 'react'
import { graphql, withPrefix } from 'gatsby'
import useMoltinInventory from '../hooks/useMoltinInventory'
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

function ProductPage({ data: { product, contentful } }) {
  const [inventory, inventoryLoading, inventoryError] = useMoltinInventory(
    product
  )
  const ContentfulProduct = contentful.edges[0].node
  console.log(ContentfulProduct)
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
                  />
                </div>
                <div className="col-12 col-lg-8">
                  <ProductImage />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



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
      name
      description
      sku
      mainImage {
        childImageSharp {
          fluid(maxWidth: 560) {
            ...GatsbyImageSharpFluid
          }
        }
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
    contentful: allContentfulProduct{
      edges{
        node{
          name
          featureSlide{
            title
            blanketImage {
              fluid(maxWidth: 1800) {
                  ...GatsbyContentfulFluid_withWebp_noBase64
              }
            }
            description {
              description
            }
          }
        }
      }

    }
  }
`

export default ProductPage
