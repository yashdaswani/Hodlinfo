const express = require('express');
const mongoose = require('mongoose');
const cryptoRoutes = require('./routes/cryptoRoutes');
const { fetchDataAndStoreInDB } = require('./controller/cryptoController');
const cors = require('cors')
const app = express();
const PORT = 3000;
app.use(cors())

mongoose.connect('mongodb+srv://yashdaswani2504:5iwjzLEwe0aZCuci@cluster0.ncfmqjf.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use('/api', cryptoRoutes);

fetchDataAndStoreInDB();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
