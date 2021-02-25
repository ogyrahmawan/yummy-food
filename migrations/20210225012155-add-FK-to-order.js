'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Orders', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fk-UserId',
      references: { 
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
    await queryInterface.addConstraint('Orders', {
      fields: ['RestaurantId'],
      type: 'foreign key',
      name: 'fk-RestaurantId',
      references: { //Required field
        table: 'Restaurants',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
    await queryInterface.addConstraint('Orders', {
      fields: ['DishId'],
      type: 'foreign key',
      name: 'fk-DishId',
      references: { //Required field
        table: 'Dishes',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('Orders', 'fk-UserId'),
    await queryInterface.removeConstraint('Orders', 'fk-RestaurantId')
    await queryInterface.removeConstraint('Orders', 'fk-DishId')
  }
};
