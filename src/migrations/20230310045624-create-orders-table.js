'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable('orders', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        price: {
          allowNull: false,
          type: Sequelize.DataTypes.DOUBLE
        },
        done: {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false
        },
        register_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'registers'
            },
            key: 'id'
          }
        },
        created_at: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        deleted_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true
        }
      }, { transaction });
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable('orders', { transaction });
    });
  }
};
