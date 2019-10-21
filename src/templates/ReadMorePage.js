import React from 'react'
import { graphql } from 'gatsby'

const ReadMorePage = ({ data: { contentfulCondition } }) => {
  console.log('query , contentfulCondition => ', query,contentfulCondition);
  return (
    <div>
      <h1>ReadMore page</h1>
    </div>
  )
}

export const query = graphql`
query {
  contentfulCondition : allContentfulCondition {
    edges {
      node {
        slug
        id
         description {
          description
        }
      }
    }
  }
}`

export default ReadMorePage;
