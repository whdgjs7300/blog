'use client'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    }
};

type Props = {
    children : React.ReactNode;
}

// 이렇게 컴포넌트로 만들어 children을 사용하면 재사용하기 훨 좋음
export default function MultiCarousel({children} : Props) {
    return (
        <Carousel infinite autoPlay responsive={responsive} itemClass="m-2">
            {children}
        </Carousel>
    )
}
