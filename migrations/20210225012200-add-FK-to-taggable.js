'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Taggables', {
      fields: ['TagId'],
      type: 'foreign key',
      name: 'fk-TagId',
      references: { 
        table: 'Tags',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
    await queryInterface.addConstraint('Taggables', {
      fields: ['RestaurantId'],
      type: 'foreign key',
      name: 'fk-RestaurantId',
      references: { //Required field
        table: 'Restaurants',
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
    await queryInterface.removeConstraint('Taggables', 'fk-TagId')
    await queryInterface.removeConstraint('Taggables', 'fk-RestaurantId')
  }
};
