require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse/sync');

const app = express();
const PORT = process.env.PORT || 8080;

// Parse JSON and URL-encoded bodies
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Load CSVs at startup
const dealersPath = path.join(__dirname, 'data', 'toyota_dealers.csv');
const serviceEmailsPath = path.join(__dirname, 'data', 'toyotaserviceemails.csv');

let dealers = [];
let serviceEmails = [];

try {
  const dealersCsv = fs.readFileSync(dealersPath, 'utf8');
  dealers = parse(dealersCsv, { columns: true, skip_empty_lines: true, trim: true });
  console.log(`Loaded ${dealers.length} dealers`);
} catch (err) {
  console.error('Failed to load dealers CSV:', err.message);
}

try {
  const serviceEmailsCsv = fs.readFileSync(serviceEmailsPath, 'utf8');
  serviceEmails = parse(serviceEmailsCsv, { columns: true, skip_empty_lines: true, trim: true });
  console.log(`Loaded ${serviceEmails.length} service email records`);
} catch (err) {
  console.error('Failed to load service emails CSV:', err.message);
}

// Make data available to routes
app.locals.dealers = dealers;
app.locals.serviceEmails = serviceEmails;

// API Routes
app.use('/api/dealers', require('./routes/dealers'));
app.use('/api/email', require('./routes/email'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', dealers: dealers.length }));

// Serve React build
const clientDist = path.join(__dirname, 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  app.get('/', (req, res) => res.send('API server running. Build the client with: npm run build'));
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
