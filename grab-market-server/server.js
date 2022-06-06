const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/");// uploads/ 에 저장해줄꺼야!
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);//file.originalname 으로 저장해줄꺼야~
        },
    }),
});
const port = 8080;

//정보 전달할때, json형식으로 처리가능하게끔 해주는 처리.
app.use(express.json());
app.use(cors());
/**
 * express 서버에서 클라이언트에게 정적(static)인 데이터(이미지, 비디오 등)를 제공하기 위해서 필요한 코드
 * 첫번째 인자인 '/uploads'는 url뒤에 path를 붙여서 서버URL/uploads/파일명 이렇게 접근하도록 설정하는 구문
 * app.use의 두번째 인자인 express.static('uploads') 는 express 프로젝트 내부에 있는 uploads 폴더의 파일들을 제공하겠다는 의미입니다.
 */
app.use("/uploads", express.static("uploads"));

app.get("/banners", (req, res) => {
    models.Banner.findAll({
        limit: 2,
    })
        .then((result) => {
            res.send({
                banners: result,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("에러가 발생했습니다");
        });
});
app.get("/products", (req, res) => {
    models.Product.findAll({
        // limit:3,
        order: [["createdAt", "DESC"]],
        attributes: [//필요한 정보들만 따로 뽑아온다(컬럼수와 다르게, 페이지별로 다르기때문)
            "id",
            "name",
            "price",
            "createdAt",
            "seller",
            "imageUrl",
            "soldout",
        ],
    })
        .then((result) => {
            console.log("PRODUCTS:", result);
            res.send({
                products: result,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send("에러발생");
        });
});

app.post("/products", (req, res) => {
    const body = req.body;
    const { name, description, price, seller, imageUrl } = body;
    if (!name || !description || !price || !seller || !imageUrl) {
        res.status(400).send("모든 필드를 입력해주세요"); //400 사용자가 잘 못 했다.
    }
    models.Product.create({
        name,
        description,
        price,
        seller,
        imageUrl,
    })
        .then((result) => {
            console.log("상품 생성 결과 : ", result);
            res.send({
                result,
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(400).send("상품 업로드에 문제가 발생했습니다");
        });
});

app.get("/products/:id", (req, res) => {
    const params = req.params;
    const { id } = params;
    models.Product.findOne({
        where: {
            id: id,
        },
    })
        .then((result) => {
            console.log("상품 생성 결과 :", result);
            res.send({
                product: result,
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(400).send("상품 조회에 에러가 발생했습니다");
        });
});

app.post("/image", upload.single("image"), (req, res) => {
    const file = req.file;
    console.log(file);
    res.send({
        imageUrl: file.path, //이미지가 저장된 위치
    });
});

app.post("/purchase/:id", (req, res) => {
  const { id } = req.params;
  models.Product.update(
    {
      soldout: 1,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((result) => {
      res.send({
        result: true,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("에러가 발생했습니다.");
    });
});

app.listen(port, () => {
    console.log("그랩의 쇼핑몰 서버가 돌아가고있습니다.");
    models.sequelize
        .sync()
        .then(() => {
            console.log("DB연결 성공!");
        })
        .catch((err) => {
            console.log(err);
            console.log("DB연결 에러ㅠ ");
            process.exit();
        });
});
