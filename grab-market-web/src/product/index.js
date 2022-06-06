import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";
import { API_URL } from "../config/constants.js";
import dayjs from "dayjs";
import { Button, message } from "antd";
function ProductPage() {
    const { id } = useParams(); //App.js로 부터 받아온 :id (parameter_매개변수)가 들어오게된다.
    const [product, setProduct] = useState(null); //null은 값이 없을때 많이 사용

    const getProduct = () => {
        axios
            .get(`${API_URL}/products/${id}`)
            .then(function (result) {
                setProduct(result.data.product);//server.js의 products key값까지 접근해야한다.
                console.log(result);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(function () {
        getProduct();
    }, []);
    console.log("product", product);

    if (product === null) {
        return <h1>상품 정보를 받고 있습니다.</h1>;
    }

    const onClickPurchase = () => {
        console.log('onClickPurchase');
        axios
            .post(`${API_URL}/purchase/${id}`)
            .then((result) => {
                message.info("구매가 완료되었습니다.");
                getProduct();
            })
            .catch((error) => {
                console.error(`에러가 발생했습니다. ${error.message}`);
            });
    };
    return (
        <>
            <div id="image-box">
                <img src={`${API_URL}/${product.imageUrl}`} />
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" />
                <span>{product.seller}</span>
            </div>
            <div id="contents-box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price}원</div>
                <div id="createdAt">
                    {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
                </div>
                <Button
                    id="purchase-button"
                    size="large"
                    type="primary"
                    danger
                    onClick={onClickPurchase}
                    disabled={product.soldout === 1 ? true : false}
                >
                    재빨리 구매하기
                </Button>
                <pre id="description">{product.description}</pre>
            </div>
        </>
    );
}

export default ProductPage;
