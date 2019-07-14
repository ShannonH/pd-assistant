'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('preference', {
    useCalendar: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    darkMode: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
};
