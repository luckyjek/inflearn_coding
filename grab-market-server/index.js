//사용되지 않는 파일이다! server.js 보기(express 사용)
var http = require("http"); //모듈불러옴 require로 불러온다.
var hostname = "127.0.0.1"; //127.0.0.1는 항상 본인 컴퓨터를 가르킴.
var port = 8080;

const server = http.createServer(function (req, res) {
    const path = req.url;
    const method = req.method;

    if (path === "/products") {
        if (method === "GET") {
            //응답보낼때, json이라는 JS Object형 구조의 json형식의 응답을 보낼꺼야~
            res.writeHead(200, { "Content-Type": "application/json" });
            const products = JSON.stringify([ //JS배열형태를 -> string으로 바꿔준다.
                {
                    name: "농구공",
                    price: 5000,
                },
            ]);
            res.end(products);
        } else if (method === "POST") {
            res.end("생성되었습니다!");
        }
    } else {
        res.end("Good Bye");
    }
});

server.listen(port, hostname); //받아온 요청값을 기다리는 listen
//위의 명시해놓은 hostname과 port번호로 기다리고있겠다!

console.log("grab market server on!");
