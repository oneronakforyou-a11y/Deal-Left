const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// READ - display all events
router.get('/', async (req, res) => {
  const events = await Event.find();
  res.render('events', { title: "Events", events });
});

// CREATE - add new event
router.post('/add', async (req, res) => {
  await Event.create(req.body);
  res.redirect('/events');
});

// UPDATE - show edit form
router.get('/edit/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render('edit-event', { title: "Edit Event", event });
});

// UPDATE - submit edited event
router.post('/edit/:id', async (req, res) => {
  await Event.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/events');
});

// DELETE - remove event
router.post('/delete/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.redirect('/events');
});

module.exports = router;
