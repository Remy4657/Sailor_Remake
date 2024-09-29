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
        await queryInterface.bulkInsert('Blog',
            [
                {
                    name: 'Astronomy Binoculars A Great Alternative',
                    content: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.',
                    image: 'http://127.0.0.1:5501/img/blog/main-blog/m-blog-1.jpg'
                },
                {
                    name: 'The Basics Of Buying A Telescope',
                    content: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.',
                    image: 'http://127.0.0.1:5501/img/blog/main-blog/m-blog-2.jpg'
                },
                {
                    name: 'The Glossary Of Telescopes',
                    content: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.',
                    image: 'http://127.0.0.1:5501/img/blog/main-blog/m-blog-3.jpg'
                },
                {
                    name: 'The Night Sky',
                    content: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.',
                    image: 'http://127.0.0.1:5501/img/blog/main-blog/m-blog-4.jpg'
                },
                {
                    name: 'Telescopes 101',
                    content: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.',
                    image: 'http://127.0.0.1:5501/img/blog/main-blog/m-blog-5.jpg'
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
}