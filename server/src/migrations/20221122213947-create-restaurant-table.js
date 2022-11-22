'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable('restaurants', {
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
				cnpj: {
					allowNull: false,
					type: Sequelize.DataTypes.STRING
				},
				is_delivery: {
					allowNull: false,
					type: Sequelize.DataTypes.BOOLEAN
				},
				cep: {
					allowNull: true,
					type: Sequelize.DataTypes.STRING
				},
				state: {
					allowNull: true,
					type: Sequelize.DataTypes.STRING
				},
				city: {
					allowNull: true,
					type: Sequelize.DataTypes.STRING
				},
				district: {
					allowNull: true,
					type: Sequelize.DataTypes.STRING
				},
				address: {
					allowNull: true,
					type: Sequelize.DataTypes.STRING
				},
				number: {
					allowNull: true,
					type: Sequelize.INTEGER	
				}
			});

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},

	async down (queryInterface) {
		const transaction = await queryInterface.sequelize.transaction();

		try{
			await queryInterface.dropTable('restaurants');

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
