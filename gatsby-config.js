const path = require('path')
require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: 'Sommio',
    description:
      'Sommio Weighted Blankets',
    author: 'Sommio',
    url: process.env.DEPLOY_PRIME_URL || process.env.URL || 'localhost:8000'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    `gatsby-plugin-transition-link`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, `src`, `images`)
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#131313',
        theme_color: '#131313',
        display: 'minimal-ui',
        icon: 'src/images/i-love-lamp-icon.png'
      }
    },
    {
      resolve: '@moltin/gatsby-source-moltin',
      options: {
        client_id: process.env.GATSBY_MOLTIN_CLIENT_ID
      }
    },
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        purgeOnly: ['src/styles/main.css']
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svgImages/ // See below to configure properly
        }
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ["gatsby-remark-component"]
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `1eaguqndmewd`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    },
    'gatsby-plugin-stripe'
  ]
}
