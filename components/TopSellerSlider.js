import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

export default function TopSellerSlider() {
    return (
        <Carousel showThumbs={false} showStatus={false} >
            <Image 
                src="/images/pants-legend.jpg"
                width={1200}
                height={450}
                alt="pants legend" 
            />
            <Image 
                src="/images/electronics-legend.jpg"
                width={1200}
                height={450}
                alt="electronics legend" 
            />
        </Carousel>
    )
}
