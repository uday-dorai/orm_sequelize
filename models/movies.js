'use strict';
module.exports = (sequelize, DataTypes) => {
  const movies = sequelize.define('movies', {
    // id:{
    //   type:DataTypes.INTEGER,
    //   primaryKey:true
    // },
    Rank:{
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    Title: DataTypes.STRING,
    Description: DataTypes.STRING,
    Runtime: DataTypes.INTEGER,
    Genre: DataTypes.STRING,
    Rating: DataTypes.FLOAT,
    Metascore: DataTypes.FLOAT,
    Votes: DataTypes.INTEGER,
    Gross_Earning_in_Mil: DataTypes.FLOAT,
    Director: DataTypes.STRING,
    Actor: DataTypes.STRING,
    Year: DataTypes.INTEGER
  }, {timestamps:false});
  movies.associate = function(models) {
    // associations can be defined here
  };
  return movies;
};