import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import './Slider.css';
import "./main-container.css"
import slider_img1 from '../assets/1.webp';
import slider_img2 from '../assets/2.jpg';
import slider_img3 from '../assets/3.jpg';


const Slider = () => {
    return (
        <div className="main_container">
            <MDBCarousel showControls>
                <MDBCarouselItem itemId={1}>
                    <img src={slider_img1} className='d-block w-100' alt='...' />
                    <MDBCarouselCaption>
                        <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </MDBCarouselCaption>
                </MDBCarouselItem>
                <MDBCarouselItem itemId={2}>
                    <img src={slider_img2} className='d-block w-100' alt='...' />
                    <MDBCarouselCaption>
                        <h5 style={{"color": "black"}}>Second slide label</h5>
                        <p style={{"color": "black"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </MDBCarouselCaption>
                </MDBCarouselItem>
                <MDBCarouselItem itemId={3}>
                    <img src={slider_img3} className='d-block w-100' alt='...' />
                    <MDBCarouselCaption>
                        <h5 style={{"color": "black"}}>Third slide label</h5>
                        <p style={{"color": "black"}}>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </MDBCarouselCaption>
                </MDBCarouselItem>
            </MDBCarousel>
        </div>
    );
};

export default Slider;
