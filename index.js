const axios = require('axios')

module.exports.order_created = async event => {
  console.log('Event SSI ============> ', event, event.body)
  const body = JSON.parse(event.body)

  const mailgunUrl =
    'https://api.eu.mailgun.net/v3/builton.sommio.co.uk/messages'
  const username = 'api'
  const password = 'key-f4ba739508713f09336d8316a66e1565'

  try {
    const response = await axios({
      method: 'post',
      url: mailgunUrl,
      auth: { username, password },
      params: {
        from: 'Sommio <mailgun@builton.sommio.co.uk>',
        to: body.object.user.email,
        subject: 'Sommio Blanket',
        text: 'Order completed !!!!!!!'
      }
    }).catch(errors => console.log('mailgun errors => ', errors))
    console.log('mailgun response => ', response)
  } catch (err) {
    console.log('err ====>', err)
  }

  return {
    statusCode: 200
  }
}
