import React, { useState } from 'react'
import { Field, Form } from 'react-final-form'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const Contact = () => {
  //   const [values, setValues] = useState('')

  //   const formValues = e => {
  //     e.preventDefault()
  //     setValues({ [e.target.name]: e.target.value })
  //   }
  //   console.log('contact values =============> ', values)

  //   const handleForm = async value => {
  //     console.log('value ========================>', value)
  //   }

  const [state, setState] = React.useState({})

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  console.log('state ==========================> ', state)

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Hiiiiiiiiiii')

    // const form = e.target
    // fetch('/', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: encode({
    //     'form-name': form.getAttribute('name'),
    //     ...state
    //   })
    // })
    //   .then(res => {
    //     console.log('res ============================> ', res)

    //     // navigate(form.getAttribute('action'))
    //   })
    //   .catch(error => alert(error))
  }

  return (
    <div>
      <h2>Contact Us</h2>
      <form name="contact-form" netlify>
        <input name="name" placeholder="Your Name" type="text" />
        <input name="email" placeholder="name@name.com" type="email" />
        <textarea name="message" />
        <button>Send</button>
      </form>
    </div>
  )
}
export default Contact
