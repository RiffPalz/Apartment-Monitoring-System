import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const userAccount = sequelize.define(
    'userAccount', 
    {
        ID: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        emailAdd: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        phoneNumber:{
            type: DataTypes.STRING(11),
            allowNull: false
        },
        unitNumber: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                min: 1,
                max: 35,
            },
        },
        numberOfTenants: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1,
                max: 2,
            },
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: 'user',
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    }, 
    {
        tableName: 'userAccount', // Table Name
        timestamps: false, // Adds createdAt and updatedAt fields
    }
);

export default userAccount;