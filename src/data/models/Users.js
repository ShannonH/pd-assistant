'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    }
  });
};
