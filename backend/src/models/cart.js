'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Cart.belongsTo(models.User, { foreignKey: 'userId' });
            Cart.belongsTo(models.Payment, { foreignKey: 'paymentId' });
            Cart.belongsTo(models.Shipping, { foreignKey: 'ShippingId' });
            Cart.belongsToMany(models.Product, {
                through: "Cart_Detail"
            });
            Cart.hasMany(models.Orders);
        }
    };
    Cart.init({
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        totalMoney: DataTypes.INTEGER,
        address: DataTypes.STRING,
        commune: DataTypes.STRING,
        district: DataTypes.STRING,
        city: DataTypes.STRING,
        codeCart: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        ShippingId: DataTypes.INTEGER,
        paymentId: DataTypes.INTEGER

        //qty: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Cart',
    });
    return Cart;
};