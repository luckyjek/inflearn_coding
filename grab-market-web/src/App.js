import "./App.css";
import ChildComponent from "./child";
import TimerComponent from "./timer";
function App() {
    const test = "hihihihi";
    // const sayHello = function () {
    //     return <h3>인프런 강의 너무 좋아</h3>;
    // };

    const sayHello2 = function () {
        alert("안녕하세요");
    };
    return (
        <div>
            <h1>안녕하세요</h1>
            <h2>
                {test}
                {/* {sayHello()} */}
                {sayHello2}
            </h2>
            <h2 onClick={sayHello2}>click</h2>
            <TimerComponent />
            <ChildComponent name="그랩" age={27} />
            <ChildComponent name="은경" age={33} />
            <ChildComponent name="철수" age={23} />
        </div>
    );
}

export default App;
