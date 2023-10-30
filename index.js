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

const user = sequelize.define("user", {
	username: {
		type: Sequelize.DataTypes.STRING,
    allowNull: false
	},
	password: {
		type: Sequelize.DataTypes.STRING,
    allowNull: false
	},
	age: {
		type: Sequelize.DataTypes.INTEGER,
    defaultValue: 21
	}
})

user.sync()
  .then((data) => {
  console.log("Table et modèle synchronisés avec succès !")
  })
  .catch((err) => {
    console.log("Erreur lors de la synchronisation !")
  })
