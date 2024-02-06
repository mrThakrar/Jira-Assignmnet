const express = require('express')
const Routes = express.Router();

const { createCard, getSingleCard, deleteCard, editCard, cardListing, moveCard } = require('../controller/CardController');

Routes.post('/add-card', createCard);
Routes.get('/get-card', getSingleCard);
Routes.delete('/delete-card', deleteCard);
Routes.patch('/edit-card', editCard);
Routes.get('/card-listing', cardListing);
Routes.patch('/edit-card-status', moveCard);

module.exports = Routes;


