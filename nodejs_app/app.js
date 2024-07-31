const express = require('express');
const promClient = require('prom-client');
const app = express();
const port = 3000;

// Create a registry to store metrics
const register = new promClient.Registry();

// Create a counter metric
const requestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'status_code'],
});
register.registerMetric(requestCounter);

// Middleware to record request metrics
app.use((req, res, next) => {
  res.on('finish', () => {
    requestCounter.inc({ method: req.method, status_code: res.statusCode });
  });
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/metrics', async (req, res) => {
  try {
    // Get metrics from the registry
    const metrics = await register.metrics();
    res.setHeader('Content-Type', register.contentType);
    res.end(metrics);
  } catch (error) {
    res.status(500).send('Error retrieving metrics');
  }
});

app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});
