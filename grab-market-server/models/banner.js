module.exports = function (sequelize, dataTypes) {
    const banner = sequelize.define("Banner", {
        imageUrl: {
            type: dataTypes.STRING(300),
            allowNull: false,
        },
        href: {//이미지를 눌렀을때 어디로 이동시킬건지에 대한 경로 
            type: dataTypes.STRING(200),
            allowNull: false,
        },
    });
    return banner;
};
