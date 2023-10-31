import { Sequelize } from "sequelize"
const { DataTypes } = Sequelize

const sequelize = new Sequelize("sequelize-learn", "root", null, {
	dialect: "mysql",
})

const Student = sequelize.define(
	"student",
	{
		student_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [4, 20],
			},
		},
		favorite_class: {
			type: DataTypes.STRING(25),
			defaultValue: "Informatique",
		},
		school_year: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		subsribe_to_socialmedia: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	},
	{ timestamps: false }
)

Student.sync()
	.then(() => {
		console.log("Table créée")
		// Student.bulkCreate(
		// 	[
		// 		{
		// 			name: "Jonathan",
		// 			school_year: 14,
		// 		},
		// 		{
		// 			name: "Kévin",
		// 			school_year: 10,
		// 			favorite_class: "Cooking",
		// 			subsribe_to_socialmedia: false,
		// 		},
		// 		{
		// 			name: "Julie",
		// 			school_year: 14,
		// 		},
		// 		{
		// 			name: "Charlotte",
		// 			school_year: 12,
		// 			favorite_class: "Video",
		// 		},
		// 		{
		// 			name: "Paul",
		// 			school_year: 13,
		// 			favorite_class: "Gaming",
		// 		},
		// 	],
		// 	{
		// 		validate: true,
		// 	}
		// )
		// 	.then((data) => {
		// 		data.forEach((element) => {
		// 			console.log(element.toJSON())
		// 		})
		// 		console.log("Utilisateurs ajoutés à la bdd !")
		// 	})
		// 	.catch((err) => {
		// 		console.log(err)
		// 	})

		Student.findAll({
			attributes: ["name"],
			where: Sequelize.or(
				{ favorite_class: "Informatique" },
				{ subsribe_to_socialmedia: false }
			),
		}).then((data) => {
			data.forEach((element) => {
				console.log(element.toJSON())
			})
		})

		Student.findAll({
			attributes: [
				"school_year",
				[sequelize.fn("COUNT", sequelize.col("school_year")), "num_students"],
			],
			group: "school_year",
		}).then((data) => {
			data.forEach((element) => {
				console.log(element.toJSON())
			})
		})

		Student.findAndCountAll({
			where: { favorite_class: "Informatique" },
			raw: true,
		}).then((data) => {
			const { count, rows } = data
			console.log(count)
			console.log(rows)
		})
	})

	.catch((err) => {
		console.log(err)
	})
