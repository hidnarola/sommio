const path = require('path')
require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: 'I Love Lamp',
    description:
      'I love carpet. I love desk. I love lamp. I Love Lamp is the official Moltin demo store.',
    author: '@moltin',
    url: process.env.DEPLOY_PRIME_URL || process.env.URL || 'localhost:8000'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
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
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `1eaguqndmewd`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    },
    {
      resolve: `gatsby-builton`,
      options: {
        apiKey:
          'W3ZcWLcHbfeHcz8wR_bdH29uzNQMGzZkwDfXt-5Jhcv4SHMyNVAkVoA8I1srMdxCnupv7mQKSKck6dk9SOG1bQ=='
      }
    },
    'gatsby-plugin-stripe'
  ]
}
