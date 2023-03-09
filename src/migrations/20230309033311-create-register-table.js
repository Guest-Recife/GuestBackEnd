'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('registers', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'users'
            },
            key: 'id'
          }
        },
        table_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'tables'
            },
            key: 'id'
          }
        },
        restaurant_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'restaurants'
            },
            key: 'id'
          }
        },
        check_in: {
          type: Sequelize.DataTypes.DATE
        },
        check_out: {
          type: Sequelize.DataTypes.DATE
        },
        paid_date: {
          type: Sequelize.DataTypes.DATE
        },
        total_price: {
          type: Sequelize.DataTypes.DOUBLE
        },
        payment_method: {
          type: Sequelize.DataTypes.STRING
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
      await queryInterface.dropTable('registers');

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
