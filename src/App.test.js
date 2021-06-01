import { render, screen, fireEvent } from '@testing-library/react';
import Tryme from './Tryme';
import BlogContent from './components/BlogContent'
import { prettyDOM } from '@testing-library/dom'
import Togglable from './components/Toggable'
import Button from './components/Buttun'
import BlogForm from './components/BlogForm';

// test('renders the author and title', () => {

//   const blogContentProps = {
//     url: 'www.url.com',
//     likes: 5
//   }

//   const component = render(
//     <BlogContent {...blogContentProps} />
//   )
//   //component.debug()'
//   const li = component.container.querySelector('li')

//   console.log(prettyDOM(li))
//   const element = component.getByText(
//     'www.url.com'
//   )
//   expect(element).toBeDefined()
// });
test('renders the author and title', () => {

  const blogContent = {
    url: 'www.url.com',
    likes: 5,
    author: 'raghad',
    title: 'title'
  }

  const component = render(
    <BlogContent blog={blogContent} />
  )

  const li = component.container.querySelector('li')
  // console.log(prettyDOM(li))

  const authorElement = component.getByText(
    'raghad'
  )
  expect(authorElement).toBeDefined()

  const titleElement = component.getByText(
    'title'
  )
  expect(titleElement).toBeDefined()

  const div = component.container.querySelector('.testCom')
  expect(div).toHaveStyle('display: none')
});

test('test the show button', () => {
  const blogContent = {
    url: 'www.url.com',
    likes: 5,
    author: 'raghad',
    title: 'title'
  }

  const component = render(
    <BlogContent blog={blogContent} />
  )
  const li = component.container.querySelector('li')
  //console.log(prettyDOM(li))
  const button = component.getByText('Show')
  fireEvent.click(button)

  // console.log(prettyDOM(li))
  const div = component.container.querySelector('.testCom')
  expect(div).not.toHaveStyle('display: none')

})
test('test clicking the likes twice', () => {
  const blogContent = {
    url: 'www.url.com',
    likes: 5,
    author: 'raghad',
    title: 'title'
  }
  const mockHandler = jest.fn()
  const component = render(
    <BlogContent blog={blogContent} updateLikes={mockHandler} />
  )

  const button = component.getByText('Like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('test creating new blog', () => {
  const url = 'www.url.com';
  const title = 'test title';

  const mockHandler = jest.fn()
  const component = render(
    <BlogForm createBlog={mockHandler} />
  )

  const titleInput = component.container.querySelector('.titleInput')
  fireEvent.change(titleInput, {
    target: { value: title }
  })

  const urlInput = component.container.querySelector('.urlInput')
  fireEvent.change(urlInput, {
    target: { value: url }
  })

  const form = component.container.querySelector('form');
  fireEvent.submit(form);

  const blogObjFromSubmit = mockHandler.mock.calls[0][0];

  expect(blogObjFromSubmit.title).toBe(title);
  expect(blogObjFromSubmit.url).toBe(url);
  expect(blogObjFromSubmit.likes).toEqual(0);

})
// describe('<Togglable />', () => {
//   let component

//   beforeEach(() => {
//     component = render(
//       <Togglable buttonLabel="show...">
//         <div className="testDiv" />
//       </Togglable>
//     )
//   })
//   test('renders its children', () => {
//     expect(
//       component.container.querySelector('.testDiv')
//     ).toBeDefined()
//   })
//   test('at start the children are not displayed', () => {
//     const div = component.container.querySelector('.testCom')
//     //console.log(div)
//     expect(div).toHaveStyle('display: none')
//   })
//   test('test the click', () => {
//     const mockHandler = jest.fn()

//     const component = render(
//       <Button onClick={mockHandler} />
//     )
//     const button = component.getByText('Login')
//     fireEvent.click(button)
//     expect(mockHandler.mock.calls).toHaveLength(1)
//   })
// })


