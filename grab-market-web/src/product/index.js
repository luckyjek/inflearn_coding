import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";
function ProductPage() {
    const { id } = useParams(); //App.js로 부터 받아온 :id (parameter_매개변수)가 들어오게된다.
    // console.log("params", id);
    const [product, setProduct] = useState(null); //null은 값이 없을때 많이 사용
    useEffect(function () {
        //랜더링 될때마다 axios통신을 계속 하지 않기위해 , useEffect를 사용해서 라이프 사이클을 조절.
        //즉, 딱 한번만 통신하게 해준다.
        axios
            .get(
                `https://ca6ec645-a4d6-4572-82a1-6768e39df010.mock.pstmn.io/products/${id}`
            )
            .then(function (result) {
                setProduct(result.data);
                console.log(result);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    console.log("product", product);

    if (product === null) {
        return <h1>상품 정보를 받고 있습니다.</h1>;
    }
    return (
        <>
            {/*데이터가 지금 비동기 통신으로 받아오고있으므로 데이터를 받아오기도 전에 
        product.imageUrl을 불러오려고하니까 오류가 난다. 왜? 지금은 null값이다.
        따라서 product가 정상적으로 들어오지 않은 상태에서는 방어 코드를 작성해줘야한다. */}
            <div id="image-box">
                <img src={"/" + product.imageUrl} />
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" />
                <span>{product.seller}</span>
            </div>
            <div id="contents-box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price}원</div>
                <div id="createdAt">2020.12.8</div>
                <div id="description">{product.description}</div>
            </div>
        </>
    );
}

export default ProductPage;
