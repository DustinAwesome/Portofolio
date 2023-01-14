const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public' , 'index.html'));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));