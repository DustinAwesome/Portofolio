const mongoose = require('mongoose');

const MONGO_URL = "mongodb+srv://nasa-api:ym8feHI83aIOixPL@cluster0.2xq0174.mongodb.net/nasa?retryWrites=true&w=majority"

mongoose.connection.once('open', () => {
    console.log('MongoDB Connected');
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}