const path = require('path')
const proxy = require('http-proxy-middleware')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  siteMetadata: {
    title: 'I Love Lamp',
    description: 'I love carpet. I love desk. I love lamp. ',
    author: '',
    url: process.env.DEPLOY_PRIME_URL || process.env.URL || 'localhost:8000'
  },
  // proxy: {
  //   prefix: '/messages',
  //   url: 'https://api.eu.mailgun.net/v3/builton.sommio.co.uk'
  // },
  // proxy: {
  //   prefix: 'https://api.eu.mailgun.net/v3/builton.sommio.co.uk',
  //   url: 'http://localhost:8000/'
  // },
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
    'gatsby-plugin-stripe'
  ]
  // developMiddleware: app => {
  //   app.use(
  //     'https://api/',
  //     proxy({
  //       target: 'http://localhost:8000',
  //       pathRewrite: {
  //         'https://api/': ''
  //       }
  //     })
  //   )
  // }
}
