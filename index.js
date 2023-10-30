// const Sequelize = require('sequelize')
import { Sequelize } from "sequelize"

const sequelize = new Sequelize('sequelize-learn','root', null, {
  dialect: "mysql"
})

sequelize.authenticate()
  .then(() => {
    console.log("Connection établie à la BDD")
  })
  .catch((err) => {
    console.log("Erreur de connection à la BDD !")
  })