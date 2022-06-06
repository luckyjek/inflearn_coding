import "antd/dist/antd.css";
import "./App.css";
import MainPageComponent from "./main/index.js";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import UploadPage from "./upload";
import ProductPage from "./product";
import { Button } from "antd";
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
