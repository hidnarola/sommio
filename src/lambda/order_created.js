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

    let shipperData = []
    let products = []

    item &&
      item.filter(i => {
        if (i.name === 'Shipping cost') {
          shipperData.push(i)
        } else {
          products.push(i)
        }
      })

    const response = await axios({
      method: 'post',
      url: mailgunUrl,
      auth: { username, password },
      params: {
        from: 'Sommio <mailgun@builton.sommio.co.uk>',
        to: body.object.user.email,
        subject: 'Sommio Blanket',
        html: ejs.render(
          `<html>
          <body>
            <div>
              <h4>Order Details</h4>
              <p>
                Name - <%= data.first_name %> <%= data.last_name %>
              </p>
              <p>Order Id - <%= body.object._id %>
              <div>
                <h5>Product : </h5>
                <% for(var i=0; i < products.length; i++) { %>
                    <p>Product name: <%= products[i].name %></p>
                     <p>Total Quantity: <%= products[i].quantity %></p>
                     <p>Product Price: <%= products[i].final_price %></p>
                <% } %>
                <p>
                Shiping charge :
                <%= shipperData[0] && shipperData[0].final_price %>
              </p>
                <p>Total Amount : <%= body.object.total_amount %> </p>
              </div>
              <div>
                <h5>Shipping Address</h5>
                <p>Address - <%= body.object.delivery_address.street_name%> </p>
                <p>City - <%= body.object.delivery_address.city%> </p>
                <p>County - <%= body.object.delivery_address.state %> </p>
                <p>Postcode - <%= body.object.delivery_address.zip_code %> </p>
                <p>Country - <%= body.object.delivery_address.country %> </p>
              </div>
            </div>
          </body>
        </html>`,
          {
            products: products,
            data: data,
            body: body,
            shipperData: shipperData
          }
        )
      }
    }).catch(errors => console.log('mailgun errors => ', errors))
    console.log('mailgun response => ', response)
  }

  return {
    statusCode: 200
  }
}
exports.handler = handler
