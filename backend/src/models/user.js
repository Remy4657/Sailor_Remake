'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.Cart, { foreignKey: { name: 'CartId' } });
            User.belongsToMany(models.Role, {
                through: "User_Role"
            });

        }

    };
    User.init({
        CartId: DataTypes.INTEGER,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};