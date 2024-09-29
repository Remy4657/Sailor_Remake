'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Orders.belongsTo(models.Cart, { foreignKey: 'cartId' });

        }
    };
    Orders.init({
        cartId: DataTypes.INTEGER,
        infoOrder: DataTypes.STRING,
        totalMoney: DataTypes.INTEGER,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Orders',
    });
    return Orders;
};