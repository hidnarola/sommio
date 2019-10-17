
import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

function ProductImage() {
  const [index, setIndex] = useState(0)
  const data = useStaticQuery(
    graphql`
      query {
        allMoltinProduct {
          edges {
            node {
              mainImage {
                childImageSharp {
                  fluid {

                    src

                  }
                }
              }
            }
          }
        }
      }
    `
  )
  const length = data.allMoltinProduct.edges.length - 1
  const handleNext = () =>
    index === length ? setIndex(0) : setIndex(index + 1)
  const handlePrevious = () =>
    index === 0 ? setIndex(length) : setIndex(index - 1)
  const { node } = data.allMoltinProduct.edges[index]

  console.log("node ==>", node)
  console.log("length", length)
  return (
    <div>
      <div>
        {/* <Img
          fluid={node.childImageSharp.fluid}
          key={node.id}
          alt={node.name.replace(/-/g, " ").substring(2)}
        /> */}
      </div>
      <div>
        <button onClick={() => handlePrevious()}>Previous</button>
        <button onClick={() => handleNext()}>Next</button>
      </div>
    </div>
  )
}
export default ProductImage;
// import React from 'react'
// import ImageGallery from 'react-image-gallery'
// import Img from 'gatsby-image'
// import NoImage from '../../images/NoImage.jpg'
// const ProductImage = ({ imageArray, product }) => {
//   console.log('product => ', product)

//   return (
//     <div>
//       {/* <ImageGallery
//         items={imageArray}
//         showPlayButton={false}
//         showFullscreenButton={false}
//         showNav={false}
//       /> */}

//           <Img
//             fluid={
//               product.files
//                 ? product.files.href
//                 : NoImage
//             }
//             alt={product.name}
//           />

//     </div>
//   )
// }
// export default ProductImage
