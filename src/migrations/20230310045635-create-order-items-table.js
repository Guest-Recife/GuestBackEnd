'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable('order_items', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        quantity: {
          type: Sequelize.DataTypes.INTEGER
        },
        unit_price: {
          type: Sequelize.DataTypes.DOUBLE
        },
        has_arrived: {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false
        },
        order_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'orders'
            },
            key: 'id'
          }
        },
        food_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'food_items'
            },
            key: 'id'
          }
        },
        is_deleted: {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false
        }
      }, { transaction });
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable('order_items', { transaction });
    });
  }
};
