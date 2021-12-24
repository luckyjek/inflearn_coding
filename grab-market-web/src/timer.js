import React from "react";

function TimerComponent() {
    const [time, setTime] = React.useState(0); //값이 0으로 시작한다.
    console.log("컴포넌트 업데이트2");

    React.useEffect(function () {
        console.log(time);
        setTime(time + 1);
        console.log(time);
    }, []);

    return (
        <div>
            <h3>{time}초</h3>
            <button>1씩 올려주세요</button>
        </div>
    );
}

export default TimerComponent;
