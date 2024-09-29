'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Cart', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
            },

            firstname: {
                type: Sequelize.STRING
            },
            lastname: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            totalMoney: {
                type: Sequelize.INTEGER
            },
            address: {
                type: Sequelize.STRING
            },
            commune: {
                type: Sequelize.STRING
            },
            district: {
                type: Sequelize.STRING
            },
            city: {
                type: Sequelize.STRING
            },
            codeCart: {
                type: Sequelize.STRING
            },
            ShippingId: {
                type: Sequelize.INTEGER
            },

            // qty: {
            //     type: Sequelize.INTEGER
            // },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Cart');
    }
};