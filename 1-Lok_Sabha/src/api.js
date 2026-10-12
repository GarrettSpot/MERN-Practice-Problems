// ✅ Student Stub: api/src.js
const express = require('express');
const app = express();
app.use(express.json());

// In-memory arrays for MPs and votes
const mps = [];
const votes = [];

let currentId = 1;

// TODO: Implement the following endpoints:
// - POST /mp
// - POST /vote
// - GET /results

module.exports = app;
