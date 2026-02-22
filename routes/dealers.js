const express = require('express');
const router = express.Router();

// GET /api/dealers?q=name&state=TX&city=Austin&zip=78701
router.get('/', (req, res) => {
  const { q, state, city, zip } = req.query;
  let results = req.app.locals.dealers;

  if (q) {
    const query = q.toLowerCase();
    results = results.filter(d =>
      (d.name && d.name.toLowerCase().includes(query)) ||
      (d.address && d.address.toLowerCase().includes(query)) ||
      (d.dealer_code && d.dealer_code.includes(query))
    );
  }
  if (state) {
    results = results.filter(d => d.state && d.state.toUpperCase() === state.toUpperCase());
  }
  if (city) {
    const c = city.toLowerCase();
    results = results.filter(d => d.city && d.city.toLowerCase().includes(c));
  }
  if (zip) {
    results = results.filter(d => d.zip && d.zip.startsWith(zip));
  }

  res.json({ count: results.length, dealers: results });
});

// GET /api/dealers/states — list all unique states
router.get('/states', (req, res) => {
  const states = [...new Set(
    req.app.locals.dealers
      .map(d => d.state)
      .filter(Boolean)
  )].sort();
  res.json(states);
});

// GET /api/dealers/cities?state=TX
router.get('/cities', (req, res) => {
  const { state } = req.query;
  let dealers = req.app.locals.dealers;
  if (state) {
    dealers = dealers.filter(d => d.state && d.state.toUpperCase() === state.toUpperCase());
  }
  const cities = [...new Set(dealers.map(d => d.city).filter(Boolean))].sort();
  res.json(cities);
});

module.exports = router;
