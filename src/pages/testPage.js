import React, { useEffect } from 'react'

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock'
import SimpleSlider from '../components/slider'
import Fade from 'react-reveal/Fade'
import Meditate from '../images/svgImages/meditate.svg'


function TestPage() {




  return (
    <>
      <div >
        <SimpleSlider />

        <div className="bannerWide bg-white" data-scroll data-scroll-speed="1">
          <div className="container">
            <h3 className="text-blue p-32 tracking-wide font-normal text-2xl">
              mauris duis gravida elementum 🐠 vel in velit, praesent malesuada
              ultrices. Ultrices lacus pulvinar amet rhoncus, 👊 imperdiet
              feugiat eget diam nisl enim 💜 ipsum, commodo sed aliquam diam
              lorem viverra consectetur a vulputate nam sit nunc egestas
              fringilla dolor ipsum
            </h3>
          </div>
        </div>
        <div
          className="bannerWide p-16 pt-32 pb-32 bg-blue-light "
          data-scroll
          data-scroll-speed="3"
        >
          <div className="w-2/5 p-16">
            <h1
              className="text-5xl text-blue "
              data-scroll
              data-scroll-delay="0.2"
              data-scroll-speed="3"
            >
              Goodbye Stress, Hello Rest
            </h1>
            <h4
              className="pt-2 tracking-wide font-normal text-2xl"
              data-scroll
              data-scroll-delay="0.4"
              data-scroll-speed="3"
            >
              mauris duis gravida elementum 🐠 vel in velit, praesent malesuada
              ultrices.
            </h4>
          </div>
          <div className="w-3/5">
            <Meditate data-scroll data-scroll-speed="3" />
          </div>
        </div>
        {/*<div className="bannerWide mx-auto w-screen bg-grey-light" >
    //  <div className="container bg-white -mt-32 shadow-lg z-50 rounded">
    //    <h1 className="text-6xl">Hello</h1>
    //  </div>
    //</div>*/}

        <div className="container">
          <h3
            className="text-blue p-32 tracking-wide font-normal text-2xl"
            data-scroll
            data-scroll-speed="2"
          >
            mauris duis gravida elementum 🐠 vel in velit, praesent malesuada
            ultrices. Ultrices lacus pulvinar amet rhoncus.
          </h3>
        </div>
        <div
          className="bannerWide mx-auto w-screen p-32 pt-16 pb-16 bg-white"
          data-scroll
          data-scroll-speed="1"
          data-scroll-offset="100,-300%"
        >
          <div class="flex flex-wrap mb-4">
            <div
              class="w-1/2 bg-gray-400  flex p-4 pt-2 pb-8 "
              data-scroll
              data-scroll-speed="2"
              data-scroll-delay="1"
            >
              <img src="https://source.unsplash.com/random/800x800" />
            </div>
            <div class="w-1/2 bg-gray-500">
              <div
                class="flex flex-wrap mb-4"
                data-scroll
                data-scroll-speed="2"
                data-scroll-delay="1"
              >
                <div class="w-1/2 bg-gray-400 p-2">
                  <img src="https://source.unsplash.com/random/400x400" />
                </div>
                <div class="w-1/2 bg-gray-500 p-2">
                  <img src="https://source.unsplash.com/random/400x400" />
                </div>
                <div class="w-1/2 bg-gray-400 p-2">
                  <img src="https://source.unsplash.com/random/400x400" />
                </div>
                <div class="w-1/2 bg-gray-500 p-2">
                  <img src="https://source.unsplash.com/random/400x400" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-screen bg-blue bannerWide">
          <h1
            className="whitespace-no-wrap text-6xl text-white"
            data-scroll
            data-scroll-speed="15"
            data-scroll-direction="horizontal"
            data-scroll-offset="100,-300%"
          >
            Free Delivery 🚚 Free Delivery 🚚 Free Delivery 🚚 Free Delivery 🚚
            Free Delivery 🚚 Free Delivery 🚚 Free Delivery 🚚 Free Delivery
            Free Delivery Free Delivery Free Delivery
          </h1>
        </div>
        <div className="hero overflow-y-hidden container mx-auto bg-pink">
          <h1 data-scroll>Hero 3</h1>
        </div>
        <div className="hero overflow-y-hidden container mx-auto bg-red">
          <h1 data-scroll data-scroll-speed="2">
            Hero 4
          </h1>
        </div>
        <div className="hero overflow-y-hidden container mx-auto bg-yellow">
          <h1>Hero 5</h1>
        </div>
        <h1>About Gatsby</h1>
        <p>Such wow. Very React.</p>
      </div>
    </>
  )
}
export default TestPage
