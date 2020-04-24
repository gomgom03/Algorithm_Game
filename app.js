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

app.get('/drop2', (req, res) => {
    res.render('drop2.ejs')
})

app.use(function (req, res, next) {
    res.status(404).send("This page does not exist...")
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

const userSockets = {

}

const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log(`Established connection with socket ${socket.id}`);
    socket.emit('socketPreCheck', {});
    socket.on('socketPreResponse', (data)=>{
        let newUser = {
            id: `${(new Date()).getTime()}${Math.random().toString(36).substring(9)}`,
            curSocketID: socket.id,
            name: null,
            curSelectedUser: null,
            curGameMode: null,
            curSortMode: null,
            classCode: null,
            curClass: null,
            score:{
                incorrect: null,
                time: null
            },
            curArray: null
        }
        data.userID === null? (socket.emit('userInfo', newUser),userSockets[newUser.id] = newUser):userSockets[data.userID].curSocketID = socket.id;
        console.log(userSockets);
    })
    socket.on('userChange', (data)=>{
        for(let key in data.replacement){
            userSockets[data.userID][key] = data.replacement[key];
        }
        console.log(userSockets);
    })
    
    
})
