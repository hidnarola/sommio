const axios = require('axios')

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
    let shipperData =
      item &&
      item.filter(i => {
        return i.name === 'Shipping cost'
      })
    console.log('[order_created] item.length => ', item.length)

    const response = await axios({
      method: 'post',
      url: mailgunUrl,
      auth: { username, password },
      params: {
        from: 'Sommio <mailgun@builton.sommio.co.uk>',
        to: body.object.user.email,
        subject: 'Sommio Blanket',
        html: `<html><body>
          <div>
              <h4>Order Details</h4>
              <p>Name - ${data.first_name} ${data.last_name} </p>
              <p>Order Id - ${body.object._id}</p>
              <p id="demo"></p>
            <div>
              <h5>Product : </h5>
              ${item.map(p => (
                <>
                  <p>Product name: ${p.name}</p>
                  <p>Total Quantity : ${p.quantity}</p>
                  <p>Product Price: ${p.final_price}</p>
                </>
              ))}
              <p>
                Shiping charge :
                ${shipperData[0] && shipperData[0].final_price}
              </p>
              <p>Total Amount : ${body.object.total_amount}</p>
            </div>
        <div>
          <h5>Shipping Address</h5>
          <p>Address - ${body.object.delivery_address.street_name}</p>
          <p>City - ${body.object.delivery_address.city}</p>
          <p>County - ${body.object.delivery_address.state}</p>
          <p>Postcode - ${body.object.delivery_address.zip_code}</p>
          <p>Country - ${body.object.delivery_address.country} </p>
        </div>
        </div>
    </body>
    <script>
    var cars = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];
    var text = "";
    var i;
    for (i = 0; i < cars.length; i++) {
        text += cars[i] + "<br>";
    }
    document.getElementById("demo").innerHTML = text;
    </script></html>`
      }
    }).catch(errors => console.log('mailgun errors => ', errors))
    console.log('mailgun response => ', response)
  }

  return {
    statusCode: 200
  }
}
exports.handler = handler
