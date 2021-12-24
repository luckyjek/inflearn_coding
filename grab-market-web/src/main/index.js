//css파일에 export하는부분이 없을때는  css같은경우는 따로 from을 적어주지 않는다.
//따로 파일 경로 적어주면, 해당 index.css 에있는 콘텐츠들을 다 불러오게된다.
import React from "react";
import "./index.css";
import axios from "axios";
function MainPage() {
    const [products, setProducts] = React.useState([]); //state를 사용하기위함.
    React.useEffect(function () {
        axios
            .get(
                "https://ca6ec645-a4d6-4572-82a1-6768e39df010.mock.pstmn.io/products"
            )
            .then(function (result) {
                console.log(result);
                const products = result.data.products;
                //카드로 만들기 위해서 react같은 경우는, state를 활용
                setProducts(products);
            })
            .catch(function (error) {
                console.error("에러발생: ", error);
            });
    }, []);
    return (
        <>
            <div id="header">
                <div id="header-area">
                    <img src="images/icons/logo.png" />
                </div>
            </div>
            <div id="body">
                <div id="banner">
                    <img src="images/banners/banner1.png" />
                </div>
                <h1>판매되는 상품들</h1>
                <div id="product-list">
                    {products.map(function (product, index) {
                        return (
                            <div className="product-card">
                                <div>
                                    <img
                                        className="product-img"
                                        src={product.imageUrl}
                                    />
                                </div>
                                <div className="product-contents">
                                    <span className="product-name">
                                        {product.name}
                                    </span>
                                    <span className="product-price">
                                        {product.price}원
                                    </span>
                                    <div className="product-seller">
                                        <img
                                            className="product-avatar"
                                            src="images/icons/avatar.png"
                                        />
                                        <span>{product.seller}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div id="footer"></div>
        </>
    );
}

export default MainPage;
