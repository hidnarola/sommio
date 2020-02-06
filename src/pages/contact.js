import React, { useState } from 'react'
import { Field, Form } from 'react-final-form'

const Contact = () => {
  const handle = () => {
    console.log('Hiii')
  }
  const handleMethod = () => {
    console.log('handleMethod')
  }
  return (
    <div>
      <Form onSubmit={handle}>
        {({ handleSubmit, form, submitting, pristine, values }) => {
          return (
            <form
              onSubmit={handleSubmit}
              method="post"
              action="#"
              data-netlify="true"
              name="test"
            >
              <input type="hidden" name="form-name" value="test" />
              <div className="frm_grp">
                <Field name="name">
                  {({ input, meta }) => (
                    <div className="form-group">
                      <input
                        {...input}
                        type="text"
                        id="name"
                        placeholder="Name"
                      />
                      <label for="name">Name</label>
                    </div>
                  )}
                </Field>
              </div>
              <div className="frm_grp">
                <Field name="email">
                  {({ input, meta }) => (
                    <div className="form-group">
                      <input
                        {...input}
                        type="email"
                        placeholder="Email"
                        id="email"
                      />
                      <label for="email">Email</label>
                    </div>
                  )}
                </Field>
              </div>

              <div className="frm_grp">
                <Field name="message">
                  {({ input, meta }) => (
                    <div className="form-group">
                      <input
                        {...input}
                        type="text"
                        placeholder="Message"
                        id="message"
                      />
                      <label for="city">Message</label>
                    </div>
                  )}
                </Field>
              </div>
              <div>
                <button type="submit">Next Step</button>
              </div>
            </form>
          )
        }}
      </Form>
      <h2>Contact Us</h2>
      <form method="post" action="#" data-netlify="true" name="contact">
        <input type="hidden" name="form-name" value="contact" />
        <input type="text" name="name" id="name" required />
        <input type="email" name="email" id="email" required />
        <textarea name="message" id="message" rows="4" required />
        <input type="submit" value="Send Message" />
      </form>
      <div>
        <form
          name="contact-test"
          method="post"
          action="/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleMethod}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact-test" />
          <p hidden>
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>
          <p>
            <label>
              Your name:
              <br />
              <input type="text" name="name" />
            </label>
          </p>
          <p>
            <label>
              Your email:
              <br />
              <input type="email" name="email" />
            </label>
          </p>
          <p>
            <label>
              Message:
              <br />
              <textarea name="message" />
            </label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </div>
    </div>
  )
}
export default Contact
