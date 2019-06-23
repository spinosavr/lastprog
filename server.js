
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Gish = require("./modules/gish.js");
var Amen = require("./modules/amen.js");
var Pix = require("./modules/pix.js");
let random = require('./modules/random');

//! Requiring modules  --  END
var weather= ["spr", "sum", "aut", "win"];


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
GishArr = [];
AmenArr = [];
PixArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
gishHashiv = 0;
amenHashiv = 0;
pixHashiv = 0;
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, Gish, AmenArr, PixArr) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < Gish; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < AmenArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < PixArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 25, 20, 15, 10, 5);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            } else if (matrix[y][x] == 3) {
                var Ggish = new Gish(x, y);
                GishArr.push(Ggish);
                gishHashiv++;
            } else if (matrix[y][x] == 4) {
                var AAmen = new Amen(x, y);
                AmenArr.push(AAmen);
                amenHashiv++;
            } else if (matrix[y][x] == 5) {
                var PPix = new Pix(x, y);
                PixArr.push(PPix);
                pixHashiv++;
            }
        }
    }
}
creatingObjects();
var we=0;
var mon=0;

function avgr(data){
    let curx=data.x, cury=data.y;
    if(curx>=0 && curx<20 && cury>=0 && cury<20)
    {
        if(matrix[cury][curx]==0)
        {
            matrix[cury][curx]=1;
            let grass = new Grass(curx, cury);
            grassArr.push(grass); 
            var azatVandakner=grass.chooseCell(0);
            for (i in azatVandakner){
                let x=azatVandakner[i][0];
                let y=azatVandakner[i][1];
                if(matrix[y][x]==0)
                {
                    matrix[y][x]=1;
                    grass = new Grass(curx, cury);
                    grassArr.push(grass); 
                }
            }
        }
        else{
            if(curx-1>=0 && curx-1<20 && cury-1>=0 && cury-1<20 && matrix[cury-1][curx-1]==0)
            {
                grass = new Grass(curx-1, cury-1);
                grassArr.push(grass);
            }
            if(curx>=0 && curx<20 && cury-1>=0 && cury-1<20 && matrix[cury-1][curx]==0)
            {
                grass = new Grass(curx, cury-1);
                grassArr.push(grass);
            }
            if(curx+1>=0 && curx+1<20 && cury-1>=0 && cury-1<20 && matrix[cury-1][curx+1]==0)
            {
                grass = new Grass(curx+1, cury-1);
                grassArr.push(grass);
            }
            if(curx-1>=0 && curx-1<20 && cury>=0 && cury<20 && matrix[cury][curx-1]==0)
            {
                grass = new Grass(curx-1, cury);
                grassArr.push(grass);
            }
            if(curx+1>=0 && curx+1<20 && cury>=0 && cury<20 && matrix[cury][curx+1]==0)
            {
                grass = new Grass(curx+1, cury);
                grassArr.push(grass);
            }
            if(curx-1>=0 && curx-1<20 && cury+1>=0 && cury+1<20 && matrix[cury+1][curx-1]==0)
            {
                grass = new Grass(curx-1, cury+1);
                grassArr.push(grass);
            }
            if(curx>=0 && curx<20 && cury+1>=0 && cury+1<20 && matrix[cury+1][curx]==0)
            {
                grass = new Grass(curx, cury+1);
                grassArr.push(grass);
            }
            if(curx+1>=0 && curx+1<20 && cury+1>=0 && cury+1<20 && matrix[cury+1][curx+1]==0)
            {
                grass = new Grass(curx+1, cury+1);
                grassArr.push(grass);
            }
        }
    }
}

io.on("connection",function(socket){
    socket.on("clicked",avgr);
});

function game() {
    mon++;
    if(mon==6)
    {
        we++;
        mon=0;
    }
    if(we==4)
    {
        we=0;
    }
    if(we==0)//garun e
    {
        for(var i=0; i<grassArr.length; i++)
        {
            grassArr[i].mul();
        }
        for(var i=0; i<grassEaterArr.length; i++)
        {
            grassEaterArr[i].eat();
        }
        for(var i=0; i<GishArr.length; i++)
        {
            GishArr[i].eat();
        }
        for(var i=0; i<AmenArr.length; i++)
        {
            AmenArr[i].eat();
        }
    }
    if(we==1)//amar e
    {
        for(var i=0; i<grassArr.length; i++)
        {
            grassArr[i].mul();
        }
        for(var i=0; i<grassEaterArr.length; i++)
        {
            grassEaterArr[i].eat();
        }
        for(var i=0; i<GishArr.length; i++)
        {
            GishArr[i].eat();
        }
        for(var i=0; i<PixArr.length; i++)
        {
            PixArr[i].eat();
        }
    }
    if(we==2)//ashun e
    {
        for(var i=0; i<grassArr.length; i++)
        {
            grassArr[i].mul();
        }
        for(var i=0; i<grassEaterArr.length; i++)
        {
            grassEaterArr[i].eat();
        }
        for(var i=0; i<GishArr.length; i++)
        {
            GishArr[i].eat();
        }
        for(var i=0; i<AmenArr.length; i++)
        {
            AmenArr[i].eat();
        }
    }
    if(weather==3)//zmer e
    {
        for(var i=0; i<grassEaterArr.length; i++)
        {
            grassEaterArr[i].eat();
        }
        for(var i=0; i<GishArr.length; i++)
        {
            GishArr[i].eat();
        }
        for(var i=0; i<PixArr.length; i++)
        {
            PixArr[i].eat();
        }
    }
    //! Object to send
    let sendData = {
        wea: we,
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        gishCounter: gishHashiv,
        amenCounter: amenHashiv,
        pixCounter: pixHashiv
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)