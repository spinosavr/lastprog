var CClickCount=0;
function clickHandler(evt){
    CClickCount=1;
}

    var socket = io();

    var side = 30;

//! Setup function fires automatically
function setup() {
    var p = document.getElementById("pElement");
    p.addEventListener("click", clickHandler);
    

    var matrix = [];
    var wea;

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let gishCountElement = document.getElementById('gishCount');
    let amenCountElement = document.getElementById('amenCount');
    let pixCountElement = document.getElementById('pixCount');
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 
    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        wea=data.wea;
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        var gce;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        var ece;
        gishCountElement.innerText = data.gishCounter;
        var gsce;
        amenCountElement.innerText = data.amenCounter;
        var ace;
        pixCountElement.innerText = data.pixCounter;
        var pce;
        let curExText="";
        if (wea==0)
        {
            curExText="Գարուն";
        } else if (wea==1)
        {
            curExText="Ամառ";
        } else if (wea==2)
        {
            curExText="Աշուն";
        } else if (wea==3)
        {
            curExText="Ձմեռ";
        }
        document.getElementById("p1").innerHTML =curExText;
        if(CClickCount==0)
        {
            gce=grassCountElement;
            ece=grassEaterCountElement;
            gsce=gishCountElement;
            ace=amenCountElement;
            pce=pixCountElement;
        }
        if(CClickCount==1)
        {
            grassCountElement=gce;
            grassEaterCountElement=ece;
            gishCountElement=gsce;
            amenCountElement=ace;
            pixCountElement=pce;
        }
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if(CClickCount==0)
                {
                    if (matrix[i][j] == 1) {
                        if(wea==3)
                        {
                            fill("white");
                        }
                        else
                        {
                           fill("green"); 
                        }
                        rect(j * side, i * side, side, side);
                    } else if (matrix[i][j] == 2) {
                        fill("orange");
                        rect(j * side, i * side, side, side);
                    } else if (matrix[i][j] == 0) {
                        fill('#acacac');
                        rect(j * side, i * side, side, side);
                    } else if (matrix[i][j] == 3) {
                        fill('red');
                        rect(j * side, i * side, side, side);
                    } else if (matrix[i][j] == 4) {
                        fill('blue');
                        rect(j * side, i * side, side, side);
                    } else if (matrix[i][j] == 5) {
                        fill('yellow');
                        rect(j * side, i * side, side, side);
                    }  
                }
                else
                {
                    fill("black");
                    rect(0, 0, 600, 600);
                }
            }
        }
    }
}
function mousePressed() {
    let curx=Math.floor(mouseX/side),cury=Math.floor(mouseY/side);
    let Cordinates = {
        x:curx,
        y:cury
    }
    socket.emit("clicked",Cordinates);
}