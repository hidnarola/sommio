import React from 'react'
import { graphql } from 'gatsby'

const ReadMorePage = ({ data }) => {
  console.log('query , data => ', query, data)
  return (
    <div>
      <h1>ReadMore page</h1>
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulCondition: contentfulCondition(slug: { eq: $slug } ) {
      slug
      id
      description {
        description
      }
    }
  }
`

export default ReadMorePage
