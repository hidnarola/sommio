const axios = require('axios')
let ejs = require('ejs')

handler = async event => {
  console.log('Event SSI ============> ', event)
  const mailgunUrl =
    'https://api.eu.mailgun.net/v3/builton.sommio.co.uk/messages'
  const username = 'api'
  const password = 'key-f4ba739508713f09336d8316a66e1565'
  const body = JSON.parse(event.body)
  console.log('body ============> ', body)

  if (body && body.object) {
    let data = body.object.user
    let item = body.object.items
    people = ['geddy', 'neil', 'alex']

    console.log('itemArrayData ======> ', itemArrayData)

    let shipperData =
      item &&
      item.filter(i => {
        return i.name === 'Shipping cost'
      })

    const response = await axios({
      method: 'post',
      url: mailgunUrl,
      auth: { username, password },
      params: {
        from: 'Sommio <mailgun@builton.sommio.co.uk>',
        to: body.object.user.email,
        subject: 'Sommio Blanket',
        html: ejs.render('<%= people.join(", "); %>', {people: people});
      }
    }).catch(errors => console.log('mailgun errors => ', errors))
    console.log('mailgun response => ', response)
  }

  return {
    statusCode: 200
  }
}
exports.handler = handler
//<div>
//              <p>Product name: ${item[0].name}</p>
//               <p>Total Quantity : ${item[0].quantity}</p>
//               <p>Product Price: ${item[0].final_price}</p>
//             </div>
