//css파일에 export하는부분이 없을때는  css같은경우는 따로 from을 적어주지 않는다.
//따로 파일 경로 적어주면, 해당 index.css 에있는 콘텐츠들을 다 불러오게된다.
import React from "react";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { API_URL } from "../config/constants.js";
// import { Carousel } from "antd";

dayjs.extend(relativeTime);

function MainPage() {
    const [products, setProducts] = React.useState([]); //state를 사용하기위함
    const [banners, setBanners] = React.useState([]);
    React.useEffect(function () {
        axios
            .get(`${API_URL}/products`)
            .then(function (result) {
                console.log(result);
                const products = result.data.products;
                //카드로 만들기 위해서 react같은 경우는, state를 활용
                setProducts(products);
            })
            .catch(function (error) {
                console.error("에러발생: ", error);
            });

        axios
            .get(`${API_URL}/banners`)
            .then((result) => {
                console.log("bannersresult", result);
                const banners = result.data.banners;
                console.log("banners_result", result);
                setBanners(banners);
                console.log("bay");
            })
            .catch((error) => {
                console.error("에러 발생 : ", error);
            });
    }, []);
    return (
        <>
            {/* <Carousel autoplay autoplaySpeed={3000}>
                {banners.map(function (banner, index) {
                    return (
                        <Link to={banner.href}>
                            <div id='banner'>
                                <img src={`${API_URL}/${banner.imageUrl}`} />
                            </div>
                        </Link>
                    );
                })}
            </Carousel> */}
            <h1 id='product-headline'>판매되는 상품들</h1>
            <div id='product-list'>
                {products.map(function (product, index) {
                    return (
                        <div className='product-card'>
                            {product.soldout === 1 && (
                                <div className='product-blur' />
                            )}
                            <Link
                                className='product-link'
                                to={`/products/${product.id}`}
                            >
                                <div>
                                    <img
                                        className='product-img'
                                        src={`${API_URL}/${product.imageUrl}`}
                                    />
                                </div>
                                <div className='product-contents'>
                                    <span className='product-name'>
                                        {product.name}
                                    </span>
                                    <span className='product-price'>
                                        {product.price}원
                                    </span>
                                    <div className='product-footer'>
                                        <div className='product-seller'>
                                            <img
                                                className='product-avatar'
                                                src='images/icons/avatar.png'
                                            />
                                            <span>{product.seller}</span>
                                        </div>
                                        <span className='product-date'>
                                            {dayjs(product.createdAt).fromNow()}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default MainPage;
