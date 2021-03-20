const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middlewares 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

// routes
app.use('/api/notes', require('./routes/notes'));
app.use('/api/users', require('./routes/users'));

module.exports = app;
