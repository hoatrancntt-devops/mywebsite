const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('API v1 - Hello from devopsviet.io.vn!'));
app.listen(3000, () => console.log('App listening on port 3000'));
