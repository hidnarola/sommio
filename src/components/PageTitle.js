import React from 'react'

export default function PageTitle({ title, description, children }) {
  if (!title && !children) return null
  console.log(
    'title, description, children ====> ',
    title,
    description,
    children
  )

  return (
    <header className="page-title text-center">
      <h1 className="text-black font-medium leading-loose text-center">
        {title || children}
      </h1>

      {description && <p>{description}</p>}
    </header>
  )
}
