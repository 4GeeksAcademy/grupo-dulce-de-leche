import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div>
            <script type="text/javascript" async src="https://play.vidyard.com/embed/v4.js"></script>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <Image
                        style={{ width: '100%', margin: 'auto', display: 'block' }}
                        className="vidyard-player-embed"
                        src="https://play.vidyard.com/uJUo6s1J7tfWNPgFMLuoqB.jpg"
                        data-uuid="uJUo6s1J7tfWNPgFMLuoqB"
                        data-v="4"
                        data-type="inline"
                        alt="First slide"
                    />
                    
                    <Carousel.Caption>
                        <h3 className='text-black'>First Step</h3>
                        <p className='text-black'>Create your ingredients.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        style={{ width: '100%', margin: 'auto', display: 'block' }}
                        className="vidyard-player-embed"
                        src="https://play.vidyard.com/VZ7HCv3q9KmfXqy6F4mvQP.jpg"
                        data-uuid="C594S4hHbUnacHftJKp5Fb"
                        data-v="4"
                        data-type="inline"
                        alt="Vidyard Player"
                    />
                    <Carousel.Caption>
                        <h3 className='text-black'>Second Step</h3>
                        <p className='text-black'>Create Your Recipes.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        style={{ width: "100%", margin: "auto", display: "block" }}
                        className="vidyard-player-embed"
                        src="https://play.vidyard.com/VZ7HCv3q9KmfXqy6F4mvQP.jpg"
                        data-uuid="VZ7HCv3q9KmfXqy6F4mvQP"
                        data-v="4"
                        data-type="inline"
                    />
                    <Carousel.Caption>
                        <h3 className='text-black'>Third Step</h3>
                        <p className='text-black'>Create the new Product you have, based on your recipes.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        style={{ width: "100%", margin: "auto", display: "block" }}
                        className="vidyard-player-embed"
                        src="https://play.vidyard.com/xAsCdCKey1CxjESphguryj.jpg"
                        data-uuid="xAsCdCKey1CxjESphguryj"
                        data-v="4"
                        data-type="inline"
                    />
                    <Carousel.Caption>
                        <h3 className='text-black'>Start Making Recipes!</h3>
                        <p className='text-black'>With the make recipe button you can automate your inventories, adding products made by you and deducting the ingredients from your stock.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default ControlledCarousel;
