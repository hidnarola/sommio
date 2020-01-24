import React from 'react'
import { graphql } from 'gatsby'

const ReadMorePage = ({ data }) => {
  return (
    <div>
      <h1>{data.contentfulCondition.conditionName}</h1>
      <p>
        {/* {data.contentfulCondition.description.content.map(content =>
          content.content.map(cont => <p>{cont.value}</p>)
        )} */}
      </p>
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulCondition: contentfulCondition(slug: { eq: $slug }) {
      slug
      id
      conditionName
    }
  }
`

export default ReadMorePage
