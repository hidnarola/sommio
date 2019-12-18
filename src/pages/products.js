// import React from 'react'
// import { graphql } from 'gatsby'

// import SEO from '../components/SEO'
// import PageTitle from '../components/PageTitle'
// import ProductGrid from '../components/ProductGrid'

// const IndexPage = ({ data: { allBuiltonProduct } }) => {
//   console.log('allBuiltonProduct from product page => ', allBuiltonProduct)

//   const productList = []
//   allBuiltonProduct.edges.map(pro => {
//     console.log('product from products page => ', pro)

//     if (pro.node.relationships.parent === null) {
//       productList.push(pro.node)
//     }
//   })

//   return (
//     <>
//       <SEO title="All Products" />
//       {console.log(
//         'allMoltinProduct',
//         allMoltinProduct,
//         'productList==>',
//         productList
//       )}
//       <PageTitle>All Products</PageTitle>

//       <ProductGrid products={productList} />
//     </>
//   )
// }

// export const query = graphql`
//   query allProductsQuery {
//     allBuiltonProduct {
//       edges {
//         node {
//           id
//           name
//           human_id
//           parents {
//             _oid
//           }
//           main_product
//         }
//       }
//     }
//   }
// `
// export default IndexPage
