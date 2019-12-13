'use strict';
module.exports = (sequelize, DataTypes) => {
  const director = sequelize.define('director', {
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    director: DataTypes.STRING
  }, {timestamps:false});
  director.associate = function(models) {
    // associations can be defined here
  };
  return director;
};