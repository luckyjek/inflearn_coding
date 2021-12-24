import "antd/dist/antd.css";
import "./App.css";
import MainPageComponent from "./main/index.js";
// export default를 한 모듈을 {} 없이 바로 불러올 수 있습니다.
// 그러나 만일 export 만으로 모듈을 내보내면 import {} 를 통해 불러옵니다.
import { Switch, Route, Link, useHistory } from "react-router-dom";
import UploadPage from "./upload";
import ProductPage from "./product";
// Switch는 Route 컴포넌트가 중복으로 렌더링될 컴포넌트를 하나만 렌더링되도록 도와줍니다.
// exact는 path 속성에 넣은 경로값이 정확히 URL의 경로값과 일치할 때만 렌더링되도록 돕습니다. 만일 exact를 사용하지 않으면 path="/" 인 라우터는 /products 경로에서도 반응하게 됩니다.
// 보통 react-router를 사용할 때 Switch와 exact를 같이 활용하는 편입니다.
import { Button } from "antd"; /*내가 구현한게 아닌 컴포넌트를 antd에서 다 구현해놓음.
ex. 이props가 들어왔을때 어떻게 어떻게 동작을 하라! 이렇게.*/
import { DownloadOutlined } from "@ant-design/icons";
function App() {
    const history = useHistory();
    return (
        <div>
            <div id="header">
                <div id="header-area">
                    <Link to="/">
                        <img src="/images/icons/logo.png" />
                    </Link>
                    <Button
                        size="large"
                        onClick={function () {
                            history.push("/upload");
                        }}
                        icon={<DownloadOutlined />}
                    >
                        상품업로드
                    </Button>
                </div>
            </div>
            <div id="body">
                <Switch>
                    <Route exact={true} path={"/"}>
                        <MainPageComponent />
                    </Route>
                    {/*  //:붙은곳이 숫자를 자유롭게 입력할 수 있게해준다. 그리고 자유롭게 입력한 숫자를 아래 
                //  <ProductPage /> Page에서 받을 수 있게된다.*/}
                    <Route exact={true} path={"/products/:id"}>
                        <ProductPage />
                    </Route>
                    <Route exact={true} path={"/upload"}>
                        <UploadPage />
                    </Route>
                </Switch>
            </div>
            <div id="footer"></div>
        </div>
    );
}

export default App;
