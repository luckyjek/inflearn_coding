//css파일에 export하는부분이 없을때는  css같은경우는 따로 from을 적어주지 않는다.
//따로 파일 경로 적어주면, 해당 index.css 에있는 콘텐츠들을 다 불러오게된다.
import "./index.css";
function MainPage() {
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
                <div id="product-list"></div>
            </div>
            <div id="footer"></div>
        </>
    );
}

export default MainPage;
