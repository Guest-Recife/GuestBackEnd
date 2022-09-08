'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.sequelize.query('CREATE EXTENSION citext;', { transaction });

      await queryInterface.createTable('users', {
        id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER
				},
        name: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING
        },
        last_name: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING
        },
        birth_date: {
          allowNull: false,
          type: Sequelize.DataTypes.DATE
        },
        email: 'citext UNIQUE NOT NULL',
        gender: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING
        },
        cpf: {
          allowNull: true,
          type: Sequelize.DataTypes.STRING
        },
        phone: {
          allowNull: true,
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
      }, { logging: console.log, transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable('users', { logging: console.log, transaction });

      await queryInterface.sequelize.query('DROP EXTENSION citext;', { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
