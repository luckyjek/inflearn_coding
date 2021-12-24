import "./App.css";
import MainPageComponent from "./main/index.js";
import { Switch, Route } from "react-router-dom";
import UploadPage from "./upload";
import ProductPage from "./product";

function App() {
    return (
        <div>
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
    );
}

export default App;
