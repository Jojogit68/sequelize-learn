const Sequelize = require("sequelize")
const bcrypt = require("bcrypt")
// import { Sequelize } from "sequelize"
// const { bcrypt } = pkg
const { DataTypes } = Sequelize

const sequelize = new Sequelize("sequelize-learn", "root", null, {
	dialect: "mysql",
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
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [4, 20],
			},
			get() {
				const rawValue = this.getDataValue("username")
				return rawValue.toUpperCase()
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			set(value) {
				const salt = bcrypt.genSaltSync(12)
				const hash = bcrypt.hashSync(value, salt)
				this.setDataValue("password", hash)
			},
		},
		age: {
			type: DataTypes.INTEGER,
			defaultValue: 28,
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

User.sync()
	.then(() => {
		// const user = User.build({
		// 	username: "Jonathan",
		// 	password: "1234",
		// 	age: 46,
		// })
		// return user.save()
		return User.create({
			username: "François",
			password: "password",
			// age: 46,
		})
	})
	.then((data) => {
		console.log(data.username)
		console.log(data.password)
		console.log(data.toJSON())
		console.log("Utilisateur ajouté à la bdd !")
	})
	.catch((err) => {
		console.log(err)
	})
