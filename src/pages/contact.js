import React, { useState } from 'react'
import { Field, Form } from 'react-final-form'
import axios from 'axios'

const Contact = () => {
  const handle = () => {
    console.log('Hiii')
  }
  const handleSubmit = () => {
    console.log('handleMethod')
    // axios
  }
  return (
    <div>
      <h2>Contact Us</h2>
      <form method="post" action="/thankyou" name="contact">
        {/* <input type="hidden" name="form-name" value="contact" /> */}
        <input type="text" name="name" id="name" required />
        <input type="email" name="email" id="email" required />
        <textarea name="message" id="message" rows="3" required />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}
export default Contact
