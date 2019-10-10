import React, { useState, useContext } from 'react'

import { CartContext } from '../context'
import Select from '../components/Select'
import { useStaticQuery } from 'gatsby';
function AddToCart({ disabled, productId , variationData, changeColorFunction,selectedProductImage}) {
  const dataMoltin = useStaticQuery(graphql`
  query {
    allMoltinProduct {
      nodes {
        id
        name
        slug

        files {
          id
          href
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
        meta {
          variations {
            id
            name
            options {
              id
              name
              description
            }
            name
          }
        }
      }
    }
  }
  `)
  console.log("data.moltinProduct",dataMoltin);
    const childData = [];
    const parentData = [];
          dataMoltin.allMoltinProduct.nodes.map((data )=> {
            if(data.relationships.parent !== null && productId === data.relationships.parent.data.id){
              childData.push(data)
            }else{
              parentData.push(data);
              console.log("parentData",parentData);
            }
          })
  const { addToCart, subTotal, rate } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState("none");
  const [size, setSize] = useState("none");
  const [color,setColor] = useState("none");

  function updateQuantity({ target: { value } }) {
    // console.log('price => ',price)
    setQuantity(value)
  }

  function updateVariations (e, name) {
      console.log("sizefter update=>",e.target.value, name);
      if(name === "Weight"){
        setWeight(e.target.value)
      }else if(name === "Size"){
        setSize(e.target.value)
      }else{
        setColor(e.target.value)
        getImage(e.target.value)
      }
    }

    const getImage = (c) => {
    console.log("c ====>", typeof c);

      if(c == "none"){
        console.log("Testing",parentData);
      // const parentObj = parentData[0].files && parentData[0].files.filter(parentImage => {
      //   return parentImage;
      //     console.log("parentImage",parentImage);
      //   })
        return selectedProductImage(parentData);
      }

      const obj = childData.filter((item) => {
         if(item.name.indexOf(c) >= 0){
          console.log("Itemsss=>",item);
            return item
        }
      }
      );
      console.log("obj==>",obj)

      selectedProductImage(obj && obj.length > 0 && obj)
    }

    const comparision = () => {
      const comboVariations = `${weight}-${size}-${color}`;
      const id_obj = childData.filter((item) => comboVariations === item.name);
      console.log("id_obj==>",id_obj)
      return (id_obj && id_obj.length > 0 && id_obj[0].id) || false;
    }

  const handleAddToCart = () => {
    const id = comparision();
    console.log("id==>", id);
    addToCart(id, parseInt(quantity, 10), size,weight, color, subTotal, rate)
  }

  return (
    <>
    <div className="inline-flex my-2">
      <Select
        options={new Array(10)
          .fill(0)
          .map((v, k) => k + 1)
          .map(i => ({ id: i, name: i }))}
        defaultValue={1}
        onChange={updateQuantity}
        disabled={disabled}
      />
      {variationData && variationData.map((data) => {
              return (
                data && data.options && <div key={data.id}>
                  <p>{data.name}</p>
                  <Select
                    options={data.options.map(i =>
                        ({ id: i.name, name: i.name })
                      )
                    }
                    onChange={(e)=>updateVariations(e, data.name)}
                  />
                </div>
              )
            })}

      <button
        onClick={handleAddToCart}
        className="inline-block appearance-none bg-black border border-black text-white px-4 py-3 leading-tight rounded-none focus:outline-none ml-2"
        disabled={disabled || (weight && size && color == "none")}
      >
        Add to Cart
      </button>
    </div>

  </>
  )
}

export default AddToCart;
