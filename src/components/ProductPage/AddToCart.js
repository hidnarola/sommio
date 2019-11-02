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
const AddToCart = ({ disabled, productId, variationData }) => {
  const { allMoltinProduct } = useStaticQuery(graphql`
    query {
      allMoltinProduct {
        nodes {
          id
          name
          slug
          meta {
            display_price {
              without_tax {
                amount
                formatted
              }
            }
          }
          mainImage {
            childImageSharp {
              fluid(maxWidth: 560) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          relationships {
            parent {
              data {
                id
              }
            }
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
    setToggle
  } = useContext(CartContext)

  const [quantity, setQuantity] = useState(1)
  // const [weight, setWeight] = useState('6')
  // const [size, setSize] = useState('single')
  // const [cover, setCover] = useState('Plush')
  const [blancketCover, setBlancketCover] = useState('Plush')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  // const [loading, setLoading] = useState(true)
  let i = 0
  let childData = []
  let parentData = []
  console.log('Weight,Size,Cover => ', Weight, Size, Cover)

  allMoltinProduct.nodes.map(data => {
    if (
      data.relationships.parent !== null &&
      productId === data.relationships.parent.data.id
    ) {
      childData.push(data)
    } else {
      parentData.push(data)
    }
  })

  const toggle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const updateVariations = (e, name) => {
    if (name === 'Weight') {
      setVariation(name, e.target.value)
    } else if (name === 'Cover') {
      setVariation(name, e)
    } else {
      setVariation(name, 'Single')
    }
  }

  const comparision = () => {
    const comboVariations = `${Size}-${Weight}-${Cover}`
    const id_obj = childData.filter(item => comboVariations === item.slug)

    return (id_obj && id_obj.length > 0 && id_obj[0].id) || false
  }

  const selectedProductPrice = childData.filter(i => {
    const id = comparision()
    return id === i.id
  })

  const handleAddToCart = () => {
    const id = comparision()
    addToCart(id, parseInt(quantity, 10), Size, Weight, Cover, subTotal, rate)
    setToggle()
  }

  return (
    <div className="product-variation" >
      {variationData &&
        variationData.map(data => {
          if (data.name === 'Size') {
            return (
              <div className="blanket-boxs">
                <div className="size-boxs">
                  <h4>Blanket {data.name}</h4>
                  {data &&
                    data.options &&
                    data.options.map(size => <p>{size.name}</p>)}
                </div>
                <Link to="#" className="btn btn-link ml-auto">
                  are other sizes available?
                </Link>
              </div>
            )
          } else if (data.name === 'Weight') {
            return (
              <div className="blanket-boxs">
                <div className="size-boxs">
                  <h4>Blanket {data.name}</h4>
                </div>
                <Link to="#" className="btn btn-link ml-auto">
                  help me choose
                </Link>

                <div className="radio-group">
                  {data &&
                    data.options &&
                    data.options.map((w, k) => (
                      <div className="radio-boxs">
                        <input
                          type="radio"
                          name="weight"
                          value={w.name}
                          id={data.name + i}
                          onChange={e => updateVariations(e, data.name)}
                          defaultChecked={k === 0 ? true : false}
                        />
                        <label for={data.name + i++}>
                          <div className="title">{w.name}</div>
                          <div className="content">
                            <h4>Recommended for users who weigh between:</h4>
                            <span>{w.description}</span>
                          </div>
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            )
          } else {
            return (
              <div className="blanket-boxs">
                <div className="size-boxs">
                  <h4>Blanket {data.name}</h4>
                </div>
                <Link to="#" className="btn btn-link ml-auto">
                  help me choose
                </Link>
                <Dropdown
                  defaultValue={blancketCover}
                  isOpen={dropdownOpen}
                  toggle={toggle}
                >
                  <DropdownToggle caret>
                    <img src={PlushImages} />
                    <div className="content ml-auto">
                      <h3>{blancketCover}</h3>
                      <p>A luxuriously soft faux fur cover</p>
                    </div>
                  </DropdownToggle>
                  <DropdownMenu>
                    {data &&
                      data.options &&
                      data.options.map(cover => (
                        <div
                          onClick={e => updateVariations(cover.name, data.name)}
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
            )
          }
        })}
      <div className="price-main">
        <h4>
          <span>{Weight} kg</span> blanket with <span>{Cover}</span> cover
        </h4>
        <div className="price-boxs">
          <span className="price">
            {selectedProductPrice[0] &&
              selectedProductPrice[0].meta &&
              selectedProductPrice[0].meta.display_price.without_tax
                .formatted}{' '}
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
