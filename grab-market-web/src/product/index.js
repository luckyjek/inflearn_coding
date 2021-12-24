import { useParams } from "react-router-dom";
import axios from "axios";
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
    return <h1>상품 상세 페이지{id}상품</h1>;
}

export default ProductPage;
