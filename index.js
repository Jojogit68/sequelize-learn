// const Sequelize = require('sequelize')
import { Sequelize } from "sequelize"

const sequelize = new Sequelize('sequelize-learn','root', null, {
  dialect: "mysql"
})

// sequelize.authenticate()
//   .then(() => {
//     console.log("Connection établie à la BDD")
//   })
//   .catch((err) => {
//     console.log("Erreur de connection à la BDD !")
//   })

const User = sequelize.define(
	"user",
	{
		username: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
		},
		age: {
			type: Sequelize.DataTypes.INTEGER,
			defaultValue: 21,
		},
	},
	{
		timestamps: false,
	}
)

// User.sync()
//   .then((data) => {
//   console.log("Table et modèle synchronisés avec succès !")
//   })
//   .catch((err) => {
//     console.log("Erreur lors de la synchronisation !")
//   })

User.sync({ alter: true })
	.then(() => {
		// const user = User.build({
		// 	username: "Jonathan",
		// 	password: "1234",
		// 	age: 46,
		// })
		// return user.save()
		return User.create({
			username: "Jonathan",
			password: "1234",
			age: 46,
		})
	})
	.then((data) => {
		console.log(data.toJSON())
		console.log("Utilisateur ajouté à la bdd !")
	})
	.catch((err) => {
		console.log(err)
	})
