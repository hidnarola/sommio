import React, { useState, useContext } from 'react'
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
          parents {
            _oid
          }
          name
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
    addToCart,
    subTotal,
    rate,
    setVariation,
    Weight,
    Size,
    Cover,
    setToggle,
    toggle,
    SubproductPrice
  } = useContext(CartContext)
  console.log('SubproductPrice => ', SubproductPrice)

  const [quantity, setQuantity] = useState(1)

  const [blancketCover, setBlancketCover] = useState('Plush')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  let i = 0
  let childData = []
  let parentData = []
  console.log(
    'allBuiltonProduct, productId,tags => ',
    allBuiltonProduct,
    productId,
    tags
  )
  console.log(' Weight, Size, Cover, => ', Weight, Size, Cover)

  allBuiltonProduct.nodes.map(data => {
    console.log('data => ', data)
    if (productId !== data.id && data.main_product === false) {
      childData.push(data)
    } else {
      parentData.push(data)
    }
  })

  console.log('parentData, childData , => ', parentData, childData)

  let weightSubProduct = []
  let coverSubProduct = []

  childData.map(sub => {
    if (sub.tags[0] === 'Weight') {
      weightSubProduct.push(sub)
    } else {
      coverSubProduct.push(sub)
    }
  })
  console.log(
    'weightSubProduct,coverSubProduct => ',
    weightSubProduct,
    coverSubProduct
  )

  const toggleHandle = () => {
    setDropdownOpen(!dropdownOpen)
  }
  console.log('Size,Weight,Cover => ', Size, Weight, Cover)

  const updateVariations = (e, name, price) => {
    if (name === 'Weight') {
      setVariation(name, e.target.value, price)
    } else if (name === 'Cover') {
      setVariation(name, e, price)
    } else {
      setVariation(name, 'Single', price)
    }
  }
  // selectedSubProductPrice = childData.filter(sub => {
  //   sub.tags
  // })
  // const comparision = () => {
  //   const comboVariations = `${Size}-${Weight}-${Cover}`
  //   const id_obj = childData.filter(item => comboVariations === item.slug)

  //   return (id_obj && id_obj.length > 0 && id_obj[0].id) || false
  // }

  const selectedProductPrice = parentData.filter(i => {
    return productId === i.id
  })
  console.log('selectedProductPrice => ', selectedProductPrice)

  const handleAddToCart = () => {
    // const id = comparision()
    // addToCart(id, parseInt(quantity, 10), Size, Weight, Cover, subTotal, rate)
    setToggle()
    let element = document.getElementsByTagName('body')[0]
    if (toggle === false) {
      element.classList.add('cartopen')
    } else {
      element.classList.remove('cartopen')
    }
  }

  // const finalPrice =
  //   SubproductPrice.objPrice[0]['name'] + SubproductPrice.objPrice[1]['name']
  // console.log(' SubproductPrice ,finalPrice => ', SubproductPrice)

  // var mainPrice =
  //   SubproductPrice > 0 ? SubproductPrice : selectedProductPrice[0].price

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
            {selectedProductPrice[0] &&
              selectedProductPrice[0].price + SubproductPrice}{' '}
            £{/* {SubproductPrice} £ */}
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
