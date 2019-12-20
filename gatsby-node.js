const path = require('path')

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const pages = await graphql(`
    {
      allProducts: allBuiltonProduct {
        edges {
          node {
            id
            human_id
          }
        }
      }

      contentfulCondition: allContentfulCondition {
        edges {
          node {
            slug
            id
          }
        }
      }
    }
  `)

  pages.data.allProducts.edges.forEach(({ node: { id, human_id } }) => {
    createPage({
      path: `/products/${human_id}`,
      component: path.resolve('./src/templates/ProductPageBuilton.js'),
      context: {
        id
      }
    })
  })
  pages.data.contentfulCondition.edges.forEach(({ node: { id, slug } }) => {
    createPage({
      path: `/readMore/${slug}`,
      component: path.resolve('./src/templates/ReadMorePage.js'),
      context: {
        id
      }
    })
  })
}
