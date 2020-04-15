const express = require('express');
const app = express();


const port = 3000;

const server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/click', (req, res) => {
    res.render('click.ejs');
})

app.get('/drop', (req, res) => {
    res.render('drop.ejs');
})

const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log(`Established connection with socket ${socket.id}`);
})
