const path = require('path')
require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: 'I Love Lamp',
    description: 'I love carpet. I love desk. I love lamp. ',
    author: '',
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
          'Rqd56FLNq539fNET8PGvIsA9kNkr12dkyHwk8SLyLtKISlMgEJ-cyQ3aTKtQapYxXNwx-u18dByEnViH59QBBQ=='
      }
    },
    // {
    //   resolve: 'gatsby-plugin-firebase',
    //   options: {
    //     features: {
    //       auth: true,
    //       database: true,
    //       firestore: false,
    //       storage: false,
    //       messaging: false,
    //       functions: true,
    //       performance: false
    //     }
    //   }
    // },
    'gatsby-plugin-stripe'
  ]
}
