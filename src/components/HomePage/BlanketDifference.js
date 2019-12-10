import React from 'react'
import SommioImg1 from '../../images/sommio-img.png';
import SommioImg2 from '../../images/sommio-img2.png';
import SommioImg3 from '../../images/sommio-img3.png';
import BeadImg1 from '../../images/bead-img1.png';
import BeadImg2 from '../../images/bead-img2.png';
import BeadImg3 from '../../images/bead-img3.png';
import PocketVideo from "../../video/pocketBeadsSmall.mp4"
import WeightexVideo from "../../video/WeightexNew.mp4"
import ReactPlayer from 'react-player'

const BlanketDifference = () => {
  return (
    <div className="blanketdifference-main">
      <div className="row no-gutters">
        <div className="col-12 col-lg-6 bor-right">
          <h2>Sommio Weightex™ </h2>
          <div className="sommio-box">
            <ReactPlayer url={WeightexVideo}
            playing={true}
            muted
            width={'100%'}
            height={'100%'}
            loop={true}
            />
            <h4>Perfect Weight Distribution</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the
            </p>
          </div>
          <div className="sommio-box">
            <img alt="advanced-colling" src={SommioImg2} />
            <h4>Advanced Colling</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the
            </p>
          </div>
          <div className="sommio-box">
            <img alt="keeps-on-going" src={SommioImg3} />
            <h4>Keeps on going</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the
            </p>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <h2>Bead-filled Pockets</h2>
          <div className="sommio-box">
            <ReactPlayer url={PocketVideo}
            playing={true}
            muted
            width={'100%'}
            height={'100%'}
            loop={true}
            />
            <h4>Weight moving and bunching</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the
            </p>
          </div>
          <div className="sommio-box">
            <img alt="quickly-overheats" src={BeadImg2} />
            <h4>Quickly Overheats</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the
            </p>
          </div>
          <div className="sommio-box">
            <img alt="leak-over" src={BeadImg3} />
            <h4>Leak over time</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BlanketDifference
