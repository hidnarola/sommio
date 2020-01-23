import React from 'react'
import { useStaticQuery } from 'gatsby'

export default function BlogPost() {
  const contentfulData = useStaticQuery(graphql`
    query {
      contentfulBlogPost {
        author {
          title
          id
        }
        body {
          body
          id
        }
        title
        description {
          description
          id
        }
        slug
      }
    }
  `)

  return (
    <div className="mb-10">
      <h4 className="mb-3">BLOG PAGE</h4>
      <p className="mb-1">Title :{contentfulData.contentfulBlogPost.title}</p>
      <p className="mb-1">
        Authour :{contentfulData.contentfulBlogPost.author.title}
      </p>
      <p className="mb-1">
        Description :{contentfulData.contentfulBlogPost.description.description}
      </p>
    </div>
  )
}
