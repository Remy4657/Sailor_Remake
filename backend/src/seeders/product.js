'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Product',
      [
        {

          name: 'SAN PHAM 1',
          price: 100000,
          priceOld: 200000,
          status: "Còn hàng",
          image: "../assets/img/img_/product/p1.jpg",
          description: "Dep",
          categoryId: 1,
        },
        {

          name: 'SAN PHAM 2',
          price: 100000,
          priceOld: 200000,
          status: "Còn hàng",
          image: "../assets/img/img_/product/p2.jpg",
          description: "Dep",
          categoryId: 2,
        },
        {

          name: 'SAN PHAM 3',
          price: 100000,
          priceOld: 200000,
          status: "Còn hàng",
          image: "../assets/img/img_/product/p3.jpg",
          description: "Dep",
          categoryId: 1,
        },
        {

          name: 'SAN PHAM 4',
          price: 100000,
          priceOld: 200000,
          status: "Còn hàng",
          image: "../assets/img/img_/product/p4.jpg",
          description: "Dep",
          categoryId: 2,
        },
        {

          name: 'SAN PHAM 5',
          price: 100000,
          priceOld: 200000,
          status: "Còn hàng",
          image: "../assets/img/img_/product/p5.jpg",
          description: "Dep",
          categoryId: 3,
        },
        {

          name: 'SAN PHAM 6',
          price: 100000,
          priceOld: 200000,
          status: "Còn hàng",
          image: "../assets/img/img_/product/p6.jpg",
          description: "Dep",
          categoryId: 1,
        },
        {

          name: 'SAN PHAM 7',
          price: 100000,
          priceOld: 200000,
          status: "Còn hàng",
          image: "../assets/img/img_/product/p7.jpg",
          description: "Dep",
          categoryId: 2,
        },
        {

          name: 'SAN PHAM 8',
          price: 100000,
          priceOld: 200000,
          status: "Còn hàng",
          image: "../assets/img/img_/product/p8.jpg",
          description: "Dep",
          categoryId: 3,
        }


      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
