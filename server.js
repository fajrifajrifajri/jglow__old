// Express
const express = require('express');
const path = require("path");
const app = express();
// Cors
const cors = require('cors');
// BodyParser
const bodyParser = require('body-parser');
// .env
require('dotenv').config();
// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
// MongoDB
const mongoose = require('mongoose');

// MongoDB Open Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB database connection established successfully");
})

// Access Foto
app.use('/public', express.static(path.join(__dirname, "./client/public/")));

// CRUD Konsultasi, Order, Users, Produk, Agent
const konsultasiRouter = require('./routes/konsultasi');
const orderRouter = require('./routes/order');
const usersRouter = require('./routes/users');
const produkRouter = require('./routes/produk');
const agentRouter = require('./routes/agent');
const laporanProdukRouter = require('./routes/laporanProduk');
const laporanAgentRouter = require('./routes/laporanAgent');
const laporanHarianRouter = require('./routes/laporanHarian');
const laporanMingguanRouter = require('./routes/laporanMingguan');
const laporanBulananRouter = require('./routes/laporanBulanan');
const laporan3BulanRouter = require('./routes/laporan3Bulan');
const laporanTahunanRouter = require('./routes/laporanTahunan');

app.use('/backend/konsultasi', konsultasiRouter);
app.use('/backend/order', orderRouter);
app.use('/backend/users', usersRouter);
app.use('/backend/produk', produkRouter);
app.use('/backend/agent', agentRouter);
app.use('/backend/laporan-produk', laporanProdukRouter);
app.use('/backend/laporan-agent', laporanAgentRouter);
app.use('/backend/laporan-harian', laporanHarianRouter);
app.use('/backend/laporan-mingguan', laporanMingguanRouter);
app.use('/backend/laporan-bulanan', laporanBulananRouter);
app.use('/backend/laporan-3bulan', laporan3BulanRouter);
app.use('/backend/laporan-tahunan', laporanTahunanRouter);

// Port:5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});

// Heroku
// https://dev.to/hawacodes/deploying-a-mern-app-with-heroku-3km7
// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
