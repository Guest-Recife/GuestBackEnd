'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('tables', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        code: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING
        },
        is_crowded: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        restaurant_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'restaurants',
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
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable('tables');

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }
};
