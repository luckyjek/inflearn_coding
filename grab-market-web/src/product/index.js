import { useParams } from "react-router-dom";

function ProductPage() {
    const { id } = useParams(); //App.js로 부터 받아온 :id (parameter_매개변수)가 들어오게된다.
    console.log("params", id);
    return <h1>상품 상세 페이지{id}상품</h1>;
}

export default ProductPage;
