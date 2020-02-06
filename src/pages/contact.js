import React, { useState } from 'react'
import { Field, Form } from 'react-final-form'

const Contact = () => {
  return (
    <div>
      <h2>Contact Us</h2>
      <form method="post" action="#" data-netlify="true" name="contact">
        <input type="hidden" name="form-name" value="contact" />
        <input type="text" name="name" id="name" required />
        <input type="email" name="email" id="email" required />
        <textarea name="message" id="message" rows="4" required />
        <input type="submit" value="Send Message" />
      </form>
    </div>
  )
}
export default Contact
