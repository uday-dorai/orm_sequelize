const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const db = require('../models');
app.use(express.json());
app.use(express.urlencoded());
const morgan = require('morgan');
const { logger } = require('../Logger/winston');
const directors = db.director;
const movies = db.movies;

// morgan
app.use(
  morgan('common', {
    stream: fs.createWriteStream(path.join('../logger', 'access.log'), {
      flags: 'a'
    })
  })
);

// get all director data
app.get('/api/director', function (req, res) {
  directors.findAll().then(results => {res.send(results);})
    .catch(err => {
      logger.error(err.stack);
      res.send(500);
    });
});


// get single director with id
app.get('/api/director/:id', function (req, res) {
  directors.findOne({ where: { id: req.params.id } })
    
    .then(results => {
      if (results === null) {
        res.sendStatus(404);
        logger.error({ message: `id:${req.params.id} not found` });
      }
      res.send(results);
    })
    .catch(err => {
      logger.error(err.stack);
      res.sendStatus(500);
    });
});

// add new director to data
app.post('/api/director', function (req, res) {
  directors
    .create({ director: req.body.director })
    .then(results => {
      res.status(201).send(`Added on id ${results.null}`);
    })
    .catch(err => {
      logger.error(err.stack);
      res.sendStatus(500);
    });
});


// update director of id:
app.put('/api/director/:id', function (req, res) {
  directors.update( { director: req.body.director },
                    { where: { id: req.params.id } }
                  )
    
    .then(results => {
      if (results === 0) {
        res.sendStatus(404);
        logger.error({ message: `id:${req.params.id} not found` });
      }
      res.status(202).send(`updated at id ${req.params.id}`);
    })
    .catch(err => {
      logger.error(err.stack);
      res.sendStatus(500);
    });
});

// delete director of id:?
app.delete('/api/director/:id', function (req, res) {
  directors.destroy({ where: { id: req.params.id } })
    .then(results => {
      if (results === 0) {
        res.sendStatus(404);
        logger.error({ message: `id:${req.params.id} not found` });
      }
      res.status(410).send(`director deleted at id:${req.params.id}`);
    })
    .catch(err => {
      logger.error(err.stack);
      res.sendStatus(500);
    });
});



// get all movies list
app.get('/api/movie', function (req, res) {
  movies.findAll().then(results => { res.send(results); })
    .catch(err => {
      logger.error(err.stack);
      res.send(500);
    })
});



// get movie of id:?
app.get('/api/movie/:id', function (req, res) {
  movies.findOne({ where: { Rank: req.params.id } })
    .then(results => {
      if (results === null) {
        res.sendStatus(404);
        logger.error({ message: `id:${req.params.id} not found` });
      }
      res.send(results);
    })
    .catch(err => {
      logger.error(err.stack);
      res.sendStatus(500);
    });
});


// add new movie to list
app.post('/api/movie', function (req, res) {
  movies.create({
    Rank: req.body.Rank,
    Title: req.body.Title,
    Description: req.body.Description,
    Runtime: req.body.Runtime,
    Genre: req.body.Genre,
    Rating: req.body.Rating,
    Metascore: req.body.Metascore,
    Votes: req.body.Votes,
    Gross_Earning_in_Mil: req.body.Gross_Earning_in_Mil,
    Director: req.body.Director,
    Actor: req.body.Actor,
    Year: req.body.Year
  })

    .then(results => {
      res.status(201).send(`Added on id ${results.null}`);
    })
    .catch(err => {
      logger.error(err.stack);
      res.sendStatus(500);
    });
});


// update movie of id:?
app.put('/api/movie/:id', function (req, res) {
  movies.update(
    {
      Title: req.body.Title,
      Description: req.body.Description,
      Runtime: req.body.Runtime,
      Genre: req.body.Genre,
      Rating: req.body.Rating,
      Metascore: req.body.Metascore,
      Votes: req.body.Votes,
      Gross_Earning_in_Mil: req.body.Gross_Earning_in_Mil,
      Director: req.body.Director,
      Actor: req.body.Actor,
      Year: req.body.Year
    },
    { where: { Rank: req.params.id } }
  ) 
    .then(results => {
      if (results === 0) {
        res.sendStatus(404);
        logger.error({ message: `id:${req.params.id} not found` });
      }
      res.status(202).send(`updated at id ${req.params.id}`);
    })
    .catch(err => {
      logger.error(err.stack);
      res.sendStatus(500);
    });
});



// delete movie of id:?
app.delete('/api/movie/:id', function (req, res) {
  movies.destroy({ where: { Rank: req.params.id } })
    .then(results => {
      if (results === 0) {
        res.sendStatus(404);
        logger.error({ message: `id:${req.params.id} not found` });
      }
      res.status(410).send(`movie deleted at id:${req.params.id}`);
    }).catch(err => {
      logger.error(err.stack);
      res.sendStatus(500);
    });
});



app.listen(8000, console.log(`Server started at 8000`));