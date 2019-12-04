// const Builton = require('@builton/core-sdk')

// exports.sourceNodes = async (
//     { actions, createNodeId, createContentDigest },
//     { apiKey }
//   ) => {
//     const { createNode } = actions

//     const builton = new Builton({
//         apiKey
//     })

//     const processProduct = product => {
//         const nodeId = createNodeId(product.id)
//         const nodeContent = JSON.stringify(product)
//         const nodeData = Object.assign({}, product, {
//         id: nodeId,
//         parent: null,
//         children: [],
//         internal: {
//             type: `BuiltonProduct`,
//             content: nodeContent,
//             contentDigest: createContentDigest(product),
//         },
//         })
//         return nodeData
//       }

//     const productList = await builton.products.getAll()
//     const products = productList.current

//     return(
//         products.map(product => {
//             const nodeData = processProduct(product)
//             createNode(nodeData)
//         })

//     )

//   }

const Builton = require('@builton/core-sdk')
const { createRemoteFileNode } = require('gatsby-source-filesystem')
const merge = require('deepmerge')

const { name: application } = require('./package')

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  { apiKey }
) => {
  const { createNode } = actions

  const builton = new Builton({
    apiKey
  })

  const processProduct = product => {
    const nodeContent = JSON.stringify(product)
    // const nodeId = createNodeId(product.id)
    const nodeData = {
      ...product,
      id: product.id,
      parent: null,
      children: [],
      internal: {
        type: `BuiltonProduct`,
        content: nodeContent,
        contentDigest: createContentDigest(product)
      }
    }

    return nodeData
  }
  const productList = await builton.products.getAll()
  const products = productList.current

  return products.map(product => {
    const nodeData = processProduct(product)
    createNode(nodeData)
  })
  return
}
