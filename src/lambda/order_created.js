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
    let dataArray = [
      { id: 1, name: 'bob' },
      { id: 2, name: 'john' },
      { id: 3, name: 'jake' }
    ]

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
        // html: ejs.render('<%= people.join(", "); %>', { people: people })
        html: ejs.render(
          `<html>
          <body>
            <div>
              <h4>Order Details</h4>
              <p>
                Name - <%= data.first_name data.last_name %>
              </p>
              <p>Order Id - <%= body.object._id %>
              <div>
                <h5>Product : </h5>

                <table>
                <% for(var i=0; i < dataArray.length; i++) { %>
                   <tr>
                     <td><%= dataArray[i].id %></td>
                     <td><%= dataArray[i].name %></td>
                   </tr>
                <% } %>
                </table>
                <p>
                  Shiping charge :  <%= shipperData[0] && shipperData[0].final_price %>
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
          { dataArray: dataArray }
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
//<div>
//              <p>Product name: ${item[0].name}</p>
//               <p>Total Quantity : ${item[0].quantity}</p>
//               <p>Product Price: ${item[0].final_price}</p>
//             </div>
