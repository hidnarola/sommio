const axios = require('axios')

handler = async event => {
  const mailgunUrl =
    'https://api.eu.mailgun.net/v3/builton.sommio.co.uk/messages'
  const username = 'api'
  const password = 'key-f4ba739508713f09336d8316a66e1565'
  const body = JSON.parse(event.body)
  console.log('body =================> ', body)

  const response = await axios({
    method: 'post',
    url: mailgunUrl,
    auth: { username, password },
    params: {
      from: 'Sommio.netlify.com <mailgun@builton.sommio.co.uk>',
      to: 'ssi@narola.email',
      subject: `Form submission from contact form: ${body.name}`,
      html: `<html><body>
                <div>
                    <p>Name : ${body.name}</p>
                    <p>Email : ${body.email}</p>
                    <p>Subject : ${body.subject}</p>
                    <p>Message : ${body.message}</p>
                </div>
             </body></html>`
    }
  }).catch(errors => {
    console.log('mailgun errors => ', errors)
    return errors
  })
  console.log('mailgun response => ', response)

  return {
    statusCode: 200
  }
}
exports.handler = handler
