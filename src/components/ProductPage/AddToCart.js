import React, { useState, useContext, useEffect } from 'react'
import { CartContext } from '../../context/CartContext'
import PlushImages from '../../images/plush.png'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { useStaticQuery, Link } from 'gatsby'
const AddToCart = ({ productId, tags }) => {
  const { allBuiltonProduct } = useStaticQuery(graphql`
    query {
      allBuiltonProduct {
        nodes {
          _id {
            _oid
          }
          tags
          short_description
          price
          final_price
          name
          currency
          parent {
            id
          }
          media {
            human_id
            url
          }
          main_product
          image_url
          id
          human_id
          description
          _sub_products {
            _oid
          }
        }
      }
    }
  `)
  const {
    setSubProductPrice,
    setVariation,
    Weight,
    Cover,
    setToggle,
    toggle,
    weightPrice,
    coverPrice,
    setCartData
  } = useContext(CartContext)
  console.log('allBuiltonProduct ,=> ', allBuiltonProduct)

  let weightSubProduct = []
  let coverSubProduct = []
  let childData = []
  let parentData = []
  let shipmentProduct = []
  let mainProduct = []

  allBuiltonProduct.nodes.map(data => {
    if (productId !== data.id && data.main_product === false) {
      childData.push(data)
    } else {
      parentData.push(data)
    }
  })

  parentData.filter(product => {
    if (product.name === 'Shipping cost') {
      shipmentProduct.push(product)
    } else {
      mainProduct.push(product)
    }
  })

  childData.map(sub => {
    if (sub.tags[0] === 'Weight') {
      weightSubProduct.push(sub)
    } else if (sub.tags[0] === 'Cover') {
      coverSubProduct.push(sub)
    }
  })

  const selectedCover = coverSubProduct.filter(sub => {
    return sub.name === Cover
  })

  const selectedWeight = weightSubProduct.filter(sub => {
    return sub.name === Weight
  })
  useEffect(() => {
    setSubProductPrice(selectedWeight, selectedCover)
  }, [Weight, Cover])

  const [blancketCover, setBlancketCover] = useState('Plush')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  let i = 0

  const toggleHandle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const updateVariations = (e, name, price) => {
    if (name === 'Weight') {
      setVariation(name, e.target.value, price)
    } else if (name === 'Cover') {
      setVariation(name, e, price)
    } else {
      setVariation(name, 'Single', price)
    }
  }

  let selectedProduct
  mainProduct.filter(i => {
    if (productId === i.id) {
      selectedProduct = i
    }
  })

  let finalProductPrice =
    selectedProduct &&
    selectedProduct.price + selectedCover[0].price + selectedWeight[0].price

  const handleAddToCart = () => {
    let cartItemsBuilton = [
      {
        type: 'cart_item_builton',
        main_product_id: selectedProduct._id._oid,
        id: selectedProduct.id,
        name: selectedProduct.name,
        quantityBuilton: 1,
        human_id: selectedProduct.human_id,
        description: selectedProduct.description,
        price: selectedProduct.price,
        final_price: finalProductPrice,
        main_product: selectedProduct.main_product,
        image_url: selectedProduct.image_url,
        media: selectedProduct.media,
        coverPrice: coverPrice,
        weightPrice: weightPrice,
        subProduct: { selectedWeight, selectedCover },
        isAddToCart: true,
        currency: selectedProduct.currency,
        // shippingPrice: shipmentProduct[0].price,
        shippingProductId: shipmentProduct[0]._id._oid
      }
    ]

    setCartData(cartItemsBuilton)
    setToggle()
    let element = document.getElementsByTagName('body')[0]
    if (toggle === false) {
      element.classList.add('cartopen')
    } else {
      element.classList.remove('cartopen')
    }

    sessionStorage.setItem('cartDetails', JSON.stringify(cartItemsBuilton))
  }

  return (
    <div className="product-variation">
      <div className="blanket-boxs">
        <div className="size-boxs">
          <h4>Blanket Size</h4>
          <p>Single 130*120</p>
        </div>
        <Link to="#" className="btn btn-link ml-auto">
          are other sizes available?
        </Link>
      </div>
      <div className="blanket-boxs">
        <div className="size-boxs">
          <h4>Blanket Weight</h4>
        </div>
        <Link to="#" className="btn btn-link ml-auto">
          help me choose
        </Link>

        <div className="radio-group">
          {weightSubProduct.map((weight, k) => (
            <div className="radio-boxs">
              <input
                type="radio"
                name="weight"
                value={weight.name}
                id={weight.tags[0] + i}
                onChange={e =>
                  updateVariations(e, weight.tags[0], weight.price)
                }
                defaultChecked={k === 0 ? true : false}
              />
              <label for={weight.tags[0] + i++}>
                <div className="title">{weight.name}</div>
                <div className="content">
                  <h4>Recommended for users who weigh between:</h4>
                  <span>{weight.short_description}</span>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="blanket-boxs">
        <div className="size-boxs">
          <h4>Blanket Cover</h4>
        </div>
        <Link to="#" className="btn btn-link ml-auto">
          help me choose
        </Link>
        <Dropdown
          defaultValue={blancketCover}
          isOpen={dropdownOpen}
          toggle={toggleHandle}
        >
          <DropdownToggle caret>
            <img src={PlushImages} alt="plushImages" />
            <div className="content ml-auto">
              <h3>{blancketCover}</h3>
              <p>A luxuriously soft faux fur cover</p>
            </div>
          </DropdownToggle>
          <DropdownMenu>
            {coverSubProduct.map(cover => (
              <div
                onClick={e =>
                  updateVariations(cover.name, cover.tags[0], cover.price)
                }
              >
                <DropdownItem
                  defaultValue={cover.name}
                  onClick={() => setBlancketCover(cover.name)}
                >
                  <img src={PlushImages} alt="plushImages" />
                  <div className="content ml-auto">
                    <h3>{cover.name}</h3>
                    <p>A luxuriously soft faux fur cover</p>
                  </div>
                </DropdownItem>
              </div>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="price-main">
        <h4>
          <span>{Weight}</span> blanket with <span>{Cover}</span> cover
        </h4>
        <div className="price-boxs">
          <span className="price">
            {selectedProduct &&
              selectedProduct.price + weightPrice + coverPrice}{' '}
          </span>
          <p>Or 6 weekly Interest free payments from £ 21.12</p>
        </div>
        <button className="btn btn-success" onClick={handleAddToCart}>
          Add to Basket
        </button>
        <p className="delivery-text">
          Delivery tomorrow if ordered in the next 3h 45m{' '}
        </p>
      </div>
    </div>
  )
}

export default AddToCart
