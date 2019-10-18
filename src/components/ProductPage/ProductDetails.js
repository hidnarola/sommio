import React from 'react'
import IntroducingImg from '../../images/introducing-img.png';

const ProductDetails = () => {
    return (
        <div className="reinvented-main">
            <h4>The weighted blanket</h4>
            <h2>Reinvented</h2>
            <div className="container-fluid">
                <div className="row no-gutters">
                    <div className="col-12 col-lg-5 d-flex flex-wrap align-items-center">
                        <div className="introducing-boxs">
                            <h5>Introducing Weightex™</h5>
                            <p>Enjoy pure weighted luxury. With Sommio Weightex™ fabric for perfect weight distribution and temperature management, for an exceptional weighted experience.</p>
                            <button className="btn btn-primary">Discover more</button>
                        </div>
                    </div>
                    <div className="col-12 col-lg-7">
                        <div className="img">
                            <img src={IntroducingImg} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetails;
