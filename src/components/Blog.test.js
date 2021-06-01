import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import BlogForm from './BlogForm'

test('renders content', () => {
  const blog = {
    url: 'blogurl',
    title: 'authornameteeest'
  }

  const component = render(
    <BlogForm blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'authorname'
  )
})