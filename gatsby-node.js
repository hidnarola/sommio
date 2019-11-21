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

  // pages.data.allProducts.edges.forEach(({ node: { id, slug } }) => {
  //   createPage({
  //     path: `/products/${slug}`,
  //     component: path.resolve('./src/templates/ProductPage.js'),
  //     context: {
  //       id
  //     }
  //   })
  // })
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

// exports.createPages = async ({ actions: { createPage } }) => {
//   // `getPokemonData` is a function that fetches our data
//   const allPokemon = await getPokemonData(["pikachu", "charizard", "squirtle"])

//   // Create a page that lists all Pokémon.
//   createPage({
//     path: `/`,
//     component: require.resolve("./src/templates/all-pokemon.js"),
//     context: { allPokemon },
//   })

//   // Create a page for each Pokémon.
//   allPokemon.forEach(pokemon => {
//     createPage({
//       path: `/pokemon/${pokemon.name}/`,
//       component: require.resolve("./src/templates/pokemon.js"),
//       context: { pokemon },
//     })
//   })
// }
