import React from 'react'
import { Form } from 'react-final-form'

const TestForm = () => {
  return (
    <div>
      <form
        name="contact-form"
        action="/thankyou"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
      >
        <input name="bot-field" type="hidden" value="contact-form" />
        <p>
          <label>
            Your Name: <input type="text" name="name" />
          </label>
        </p>
        <p>
          <label>
            Your Email: <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Message: <textarea name="message"></textarea>
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </div>
  )
}
export default TestForm
