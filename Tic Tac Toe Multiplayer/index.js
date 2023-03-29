const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let players = [];
let last;
let a=Array(4);
let b=Array(3);
let size=0,cx,co;
for (let i=1;i<=3;i++) a[i]=Array(4);

io.on('connection', (socket) => {
  console.log('connection', socket.id);
  players.push(socket.id);

  if(players.length === 2) {
    
    const [x, o] = players;
    const game = {};
    game[x] = 'X';
    game[o] = 'O';
    io.emit('start', game);
  }

  socket.on('disconnect', () => {
    console.log('disconnect', socket.id);
    //players = players.filter(id => id !== socket.id);
    players = players.filter(function(id){
      return id!==socket.id;;
    })
    for (let i=1;i<=3;i++) for (let j=1;j<=3;j++) a[i][j]='a';
    size=0;
    if(players.length === 2) {
      io.emit('start');
    }
  });


  socket.on('click',clik);
  function clik(b)
  {
    //console.log(last,b);
    if (last===b[2] || a[b[0]][b[1]]=='x' || a[b[0]][b[1]]=='o') return;
    a[b[0]][b[1]]=b[2];
    checkscore();
    last=b[2];
    //console.log(a);
    io.emit('bifa',b);
  }

  function checkscore()
  {
    size++;

    cx=0;
    co=0;
    for (let i=1;i<=3;i++)    // se verifica diagonala principala
    {
      if (a[i][i]=='X') cx++;
      if (a[i][i]=='O') co++;
    }
    if (cx===3)
    {
      io.emit('win','x');
      return;
    }
    if (co===3)
    {
      io.emit('win','o');
      return;
    }

    cx=0;
    co=0;
    for (let i=1;i<=3;i++)    // se verifica diagonala secundara
    {
      if (a[i][3-i+1]=='X') cx++;
      if (a[i][3-i+1]=='O') co++;
    }
    if (cx===3)
    {
      io.emit('win','x');
      return;
    }
    if (co===3)
    {
      io.emit('win','o');
      return;
    }

    for (let i=1;i<=3;i++)  // se verifica linile
    {
      cx=0;
      co=0;
      for (let j=1;j<=3;j++)
      {
        if (a[i][j]=='X') cx++;
        if (a[i][j]=='O') co++;
      }
      if (cx===3)
      {
        io.emit('win','x');
        return;
      }
      if (co===3)
      {
        io.emit('win','o');
        return;
      }
    }
    
    for (let j=1;j<=3;j++)   // se verifica coloanele
    {
      cx=0;
      co=0;
      for (let i=1;i<=3;i++)
      {
        if (a[i][j]=='X') cx++;
        if (a[i][j]=='O') co++;
      }
      if (cx===3)
      {
        io.emit('win','x');
        return;
      }
      if (co===3)
      {
        io.emit('win','o');
        return;
      }
    }

    if (size===9)
    {
      io.emit('draw','yeah');
      return;
    }
    console.log(size);
  }
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
