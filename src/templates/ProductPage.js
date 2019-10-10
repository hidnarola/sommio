import React, {useState,useEffect} from "react";
import {graphql, withPrefix} from "gatsby";
import ImageGallery from "react-image-gallery";
import SEO from "../components/SEO";
// import Photo from '../components/Photo'
import Badge from "../components/Badge";
import AddToCart from "../components/AddToCart";
import useMoltinInventory from "../hooks/useMoltinInventory";
import Noimage from "../images/no_img.jpg";
import BlogPost from "../components/BlogPost";

function ProductPage({data: {
    product
  }}) {
  const [inventory, inventoryLoading, inventoryError] = useMoltinInventory(product);

  const {meta: {
      display_price
    }} = product;
  console.log("product.mainImage===>", product);

  let [imageArray, setImageArray] = useState([]);
console.log('inventory inventory=> ',inventory);
console.log('inventory product=> ',product);

    useEffect(() => {
      product.files && product.files.map(img => {
        if (img) {
          imageArray.push({original: img.href, thumbnail: img.href});
        }
      })
    },[])

  const selectedProductImage = obj => {
    let tempArray = [];
    obj && obj.map(product => {
      product.files.map(img =>{
        console.log("img......",img);
        tempArray.push({
          original: img &&  img.href ? img.href : Noimage,
          thumbnail: img &&  img.href ? img.href : Noimage
        });
      })
      console.log("tempArray", tempArray);
    });

    setImageArray(tempArray);
  };
  console.log("imageArray &&&&", imageArray);

  return (<React.Fragment>
    <SEO type="product" title={product.meta_title || product.name} description={product.meta_description || product.description} image={withPrefix(
        product.mainImage && product.mainImage.childImageSharp
        ? product.mainImage.childImageSharp.fluid.src
        : Noimage)}/>

    <div className="flex flex-wrap">
      <div className="py-2 md:py-5 md:px-5 w-full lg:w-1/2">
        <div className="sticky pin-t">
          <ImageGallery items={imageArray} showPlayButton={false} showFullscreenButton={false} showNav={false}/>
        </div>
      </div>

      <div className="py-2 md:py-5 md:px-5 md:pr-10 w-full lg:w-1/2">
        <div className="my-2 flex flex-col md:flex-col-reverse">
          <h1 className="text-3xl md:text-5xl text-black font-normal">
            {product.name}
          </h1>

          <span className="block text-grey text-xl md:my-2 md:mt-8 inline-flex items-center">
            {display_price.without_tax.formatted}
            {
              product.on_sale && (<Badge color="green" className="mx-2">
                On Sale
              </Badge>)
            }
            {
              !inventoryError && (
                inventoryLoading
                ? (<Badge className="mx-2">Loading inventory</Badge>)
                : (<Badge color={inventory.inStock
                    ? "green"
                    : "red"} className="mx-2">
                  {
                    inventory.inStock
                      ? product.manage_stock
                        ? `${inventory.available} in stock `
                        : "In Stock"
                      : "Out of stock"
                  }
                </Badge>))
            }
          </span>
        </div>

        {
          inventoryError
            ? (inventoryError)
            : (<div className="flex flex-wrap flex-col md:flex-row md:items-end">
              <AddToCart productId={product.id} disabled={!inventory.inStock} variationData={product.meta.variations} selectedProductImage={selectedProductImage}/>
            </div>)
        }

        <div className="my-2 md:my-5">
          <h4 className="hidden md:block text-lg text-black font-bold my-2">
            Description
          </h4>
          <p>{product.description}</p>
        </div>
        <BlogPost/>
      </div>
    </div>
  </React.Fragment>);
}

export const query = graphql `
  query($id: String!) {
    product: moltinProduct(id: { eq: $id }) {
      id
      slug
      name
      description
      sku
      relationships {
        parent {
          data {
            id
          }
        }
      }
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
        publicURL
      }
      meta {
        variations {
          id
          name
          options {
            description
            id
            name
          }
        }
        display_price {
          without_tax {
            formatted
          }
        }
      }
      manage_stock
    }
  }
`;

export default ProductPage;
