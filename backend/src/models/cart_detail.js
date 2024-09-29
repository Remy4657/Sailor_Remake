'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart_Detail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    };
    Cart_Detail.init({
        ProductId: {
            type: DataTypes.INTEGER,

        },
        CartId: {
            type: DataTypes.INTEGER,

        },
        qty: DataTypes.INTEGER

    }, {
        sequelize,
        modelName: 'Cart_Detail',
    });
    return Cart_Detail;
};