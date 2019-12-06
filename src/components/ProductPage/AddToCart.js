import React, { useState, useContext, useEffect } from 'react'
import classnames from 'classnames'
import { CartContext } from '../../context/CartContext'
import PlushImages from '../../images/plush.png'
import Select from '../Select'
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
          tags
          short_description
          price
          image_url
          parents {
            _oid
          }
          name
          currency
          parent {
            id
          }
          main_product
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
    Size,
    Cover,
    setToggle,
    toggle,
    weightPrice,
    coverPrice,
    setCartData,
    isEmpty,
    countBuilton,
    quantityBuilton
  } = useContext(CartContext)

  let weightSubProduct = []
  let coverSubProduct = []
  let childData = []
  let parentData = []
  console.log('coverPrice, weightPrice =>', coverPrice, weightPrice)

  allBuiltonProduct.nodes.map(data => {
    if (productId !== data.id && data.main_product === false) {
      childData.push(data)
    } else {
      parentData.push(data)
    }
  })
  childData.map(sub => {
    if (sub.tags[0] === 'Weight') {
      weightSubProduct.push(sub)
    } else {
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

  const [quantity, setQuantity] = useState(1)

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
  parentData.filter(i => {
    if (productId === i.id) {
      selectedProduct = i
    }
  })

  const handleAddToCart = () => {
    let cartItemsBuilton = [
      {
        id: selectedProduct.id,
        name: selectedProduct.name,
        quantityBuilton: 1,
        human_id: selectedProduct.human_id,
        type: 'cart_item_builton',
        description: selectedProduct.description,
        price: selectedProduct.price,
        main_product: selectedProduct.main_product,
        subProduct: { selectedWeight, selectedCover },
        isAddToCart: true,
        currency: selectedProduct.currency
      }
    ]
    console.log('cartItemsBuilton => ', cartItemsBuilton)

    setCartData(cartItemsBuilton)
    setToggle()
    let element = document.getElementsByTagName('body')[0]
    if (toggle === false) {
      element.classList.add('cartopen')
    } else {
      element.classList.remove('cartopen')
    }
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
            <img src={PlushImages} />
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
                  <img src={PlushImages} />
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
