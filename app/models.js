const { DataTypes } = require("sequelize");
const sequelize = require("./db");

// Contribution Model
const Contribution = sequelize.define("Contribution", {
    memberId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    status: {
        type: DataTypes.STRING,
        defaultValue: "PENDING"
    }
});

// Investment Model
const Investment = sequelize.define("Investment", {
    memberId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    type: DataTypes.STRING,
    status: {
        type: DataTypes.STRING,
        defaultValue: "PENDING"
    }
});

module.exports = { Contribution, Investment, sequelize };
