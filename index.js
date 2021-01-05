const port = 3000;

const app = require('express')();
var http = require('http').createServer(app)
var io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST'],
  }
})
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')
const TicTacToe = require('./TicTacToe')
const Users = require('./Users')

app.use(cors());
app.use(require('body-parser').json())


var users = new Users;
var game = new TicTacToe;
var X = ""
var O = ""
const emulateMove = require('./Emulate')(game)

var count = 0;
app.get('/', (req, res) => {
  res.send({
    'data': 'hello world!',
    'count': count++,
  })
})

function updateGame() {
  io.emit('game-update', game.moves, game.calculateWinner())
}

app.get('/generate-id', (req, res) => {
  const id = uuidv4()
  users.getUser(id)
  res.json({'id': id})
})

app.post('/echo-post', (req, res) => {
  console.log(req.body);
  res.json(req.body);
})

app.get('/check-in/:id', (req, res) => {
  const id = req.params.id;
  users.check_in(id)
  console.log(`User ${id} has checked in`)
  res.json({'id': id, 'message': 'Check in Sucessful'})
})

app.post('/move', (req, res) => {
  console.log('something moved')
  const {move, id} = req.body
  game.makeMove(move)
  updateGame()
  res.send({id, 'message': 'Sucessful move'})
})

app.get('/reset', (req, res) => {
  game.reset()
  updateGame()
  res.send({message: 'game reset'})
})

io.on('connection', socket => {
  console.log(`A user has connected with ID: ${socket.id}`)
  console.log(`Transport type is ${socket.handshake.query.transport}`)
  updateGame()
})

// setInterval(() => {
//   emulateMove()
//   updateGame()
// }, 1000)

app.use(async (err, req, res, next) => {
  console.log(err)
  res.status(500).send({ error: err.toString() });
})

http.listen(port, () => {
  console.log(`Listening on *:${port}`);
  users.getUser('d51fff98-089f-4003-922f-c6327b9ba874')
})