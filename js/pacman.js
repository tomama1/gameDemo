var clockstart = false;
var sec = -1;
var min = 0;
var score = 0;
var gmovecounter = 0;
var startdate = '';
var gamewin = 0;
// d = direction
// 1=top, 2=right, 3=bottom, 4=left
var pacman = {
    x: 1,
    y: 1,
    d: 0
};
var ghost = {
    'purpleghost':{
        x: 1,
        y: 1,
        d: 0
    },
     "pinkghost" :{
        x: 1,
        y: 1,
        d: 0
    }, 
     "blueghost" :{
        x: 1,
        y: 1,
        d: 0
    }
}
var world = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],   
    [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0], 
    [0, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 0], 
    [0, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 0], 
    [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0], 
    [0, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 0], 
    [0, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 0], 
    [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0], 
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0], 
    [0, 1, 1, 1, 1, 2, 1, 2, 1, 1, 0, 1, 1, 2, 1, 2, 1, 1, 1, 1, 0], 
    [0, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 0], 
    [0, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 0], 
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0], 
    [0, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 0], 
    [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0], 
    [0, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 0], 
    [0, 1, 2, 2, 1, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 1, 2, 2, 1, 0], 
    [0, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 0],
    [0, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 0], 
    [0, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 0], 
    [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0], 
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
];

function spawnPacman(){
    pacman.y = 16;
    pacman.x = 10;
}

function spawnGhost(){
    var count = 0;
    for (var ghosttype in ghost){
        ghost[ghosttype].y = 10;
        ghost[ghosttype].x = (9 + count);
        count++;
    }
}

function spawnCherry(){
    var continue1 = true;
    while (continue1==true){
        var xpos = Math.floor(Math.random()*(world[0].length-4)+1);
        var ypos =  Math.floor((Math.random())*(world.length-2)+1);
        if (((xpos!=pacman.x)&&(ypos!=pacman.y))&&(world[ypos][xpos]==2)){
            world[ypos][xpos] = 3;
            return;
        }
    }
}

function displayWorld(){
    var output = '';
    for (var i=0;i<world.length; i++){
        output += "\n<div class='row'>";
        for (var j=0;j<(world[i].length); j++){
            if(world[i][j]==1){
                output +="<div class='cell'></div>";
            }
            else if(world[i][j]==2){
                output +="<div class='coin'></div>";
            }
            else if(world[i][j]==3){
                output +="<div class='cherry'></div>";
            }
            if (world[i][j]==0){
                output +="<div class='empty'></div>";
            }
        }
        output += "</div>";
    }
   document.getElementById("world").innerHTML = output;
}

function displayGhost(){
    for (ghosttype in ghost){
        document.getElementById(ghosttype).style.left =ghost[ghosttype].x*20+"px";
        document.getElementById(ghosttype).style.top =ghost[ghosttype].y*20+"px";
    }
}

function displayPacman(){
    document.getElementById('pacman').style.left =pacman.x*20+"px";
    document.getElementById('pacman').style.top =pacman.y*20+"px";
}

function displayScore(){
    document.getElementById('gamescore').innerHTML = score;
}

function randomGhostMove(){
    var num = Math.floor(Math.random() * 4) + 1;
    ghostMove(num);
}

function ghostTurn(){
    if (gmovecounter== 0){
        ghost.pinkghost.y--;
        ghost.purpleghost.x++;
        displayGhost();
        gmovecounter++;
        return;
    }
    else if (gmovecounter==1){
        ghost.pinkghost.y--;
        ghost.pinkghost.d = 1;
        ghost.purpleghost.y--;
        ghost.blueghost.x--;
        displayGhost();
        gmovecounter++;
        return;
    }
    else if (gmovecounter ==2){
        ghost.pinkghost.x--;
        ghost.purpleghost.y--;
        ghost.purpleghost.d = 3;
        ghost.blueghost.y--;
        displayGhost();
        gmovecounter++;
        return;
    }
    else if (gmovecounter ==3){
        ghost.pinkghost.x--;
        ghost.purpleghost.x++;
        ghost.blueghost.y--;
        ghost.blueghost.d = 2;
        displayGhost();
        gmovecounter++;
        world[9][10] = 1;
        displayWorld();
        return;
    }
    for (ghosttype in ghost){
        // how many different ways can the ghost go besides turning around
        var count = 0;
        // what kind of cell is in that direction
        var left = world[ghost[ghosttype].y][ghost[ghosttype].x-1];
        var right = world[ghost[ghosttype].y][ghost[ghosttype].x+1];
        var top = world[ghost[ghosttype].y-1][ghost[ghosttype].x];
        var bottom = world[ghost[ghosttype].y+1][ghost[ghosttype].x];
        // array of surrounding cells 
        var surroundings = [top, right, bottom, left];
        surroundings[ghost[ghosttype].d] = 1;
        // figuring out how many ways the ghost can go
        for (i=0;i<surroundings.length;i++){
            if (i==ghost[ghosttype].d){
                continue;
            }
            else if((surroundings[i]==2) || (surroundings[i]==0)|| (surroundings[i]==3)){
                count++;
            }
        }
    // case 1: only 1 way to go 
        if (count == 1 ){
            for (i=0;i<surroundings.length;i++){
                if (surroundings[i]!=1){
                    ghostMove(ghosttype,i);
                }
            }
        }
    // case 2: more than 1 way to go
        else if (count > 1){
            var continue1 = true;
            while (continue1 == true){
                var num = Math.floor(Math.random() * 4)+1;
                if (surroundings[num-1] != 1){
                    ghostMove(ghosttype, (num-1));
                    continue1 = false;
                }
            }
        }
    }
}
// 0 = top, 1 = right, 2 = bottom, 3= left
function ghostMove(ghosttype,z){
    if ( z == 3 ){
        if ((ghost[ghosttype]["y"]==10)&&(ghost[ghosttype]["x"]==1)){
            ghost[ghosttype].x = 20;
        }
        ghost[ghosttype].x--;
        displayGhost();
        ghost[ghosttype].d = 1;
    }
    else if ( z == 1 ){
        if ((ghost[ghosttype].y==10)&&(ghost[ghosttype].x==19)){
            ghost[ghosttype].x = 0;
        }
        ghost[ghosttype].x++;
        displayGhost();
        ghost[ghosttype].d = 3;
    }
    else if ( z == 0 ){
        ghost[ghosttype].y--;
        displayGhost();
        ghost[ghosttype].d = 2;
    }
    else if (z == 2 ){
        ghost[ghosttype].y++;
        displayGhost();
        ghost[ghosttype].d = 0;
    }
    // End Game, display Score Box
    if ((pacman.x == ghost[ghosttype].x)&&(pacman.y == ghost[ghosttype].y)){
        var diff = Math.abs(startdate - (new Date()));
        var minutes = Math.floor((Math.floor(diff/1000))/60);
        var seconds = Math.floor(diff/1000);
        if (seconds > 59) {
            minutes = minutes+(Math.floor(seconds/60));
            seconds = seconds%60;
        }
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        alert("You Lose! \n Game Timer : "+minutes+":"+seconds+"\n Final Score : "+score);
        location.reload(true);
        return;
        }
    }
var handler = function() {
    ghostTurn();
};

function gamestart(){
    if(clockstart==true){
        document.onkeydown = function(e){
            // left arrow
            if ((e.keyCode ==37)&&(world[pacman.y][pacman.x-1]!=1)) {
                if ((pacman.y==10)&&(pacman.x==1)){
                    pacman.x = 20;
                }
                pacman.x--;
                pacman.d = 4;
                document.getElementById('pacman').style.transform = "rotate(180deg)";
                displayPacman();
            }
            // right arrow
            else if((e.keyCode==39)&&(world[pacman.y][pacman.x+1]!=1)){
                if ((pacman.y==10)&&(pacman.x==19)){
                    pacman.x = 1;
                }
                else{
                    pacman.x++;   
                }
                pacman.d = 2;
                document.getElementById('pacman').style.transform = "rotate(0deg)";
                displayPacman();
            }
            // up arrow
            else if((e.keyCode==38)&&(world[pacman.y-1][pacman.x]!=1)){
                pacman.y--;
                document.getElementById('pacman').style.transform = "rotate(270deg)";
                pacman.d = 1;
                displayPacman();
            }
            // down arrow
            else if((e.keyCode==40)&&(world[pacman.y+1][pacman.x]!=1)){
                pacman.y++;
                document.getElementById('pacman').style.transform = "rotate(90deg)";
                pacman.d = 3;
                displayPacman();
            }
            if (world[pacman.y][pacman.x] == 2){
                world[pacman.y][pacman.x] = 0;
                score+=10;
                displayScore();
                displayWorld();
            }
            else if(world[pacman.y][pacman.x]==3){
                world[pacman.y][pacman.x] = 0;
                score+=50;
                displayScore();
                displayWorld();
            }
            for (ghosttype in ghost){
                if ((pacman.x == ghost[ghosttype].x)&&(pacman.y == ghost[ghosttype].y)){
                    var diff = Math.abs(startdate - (new Date()));
                    var minutes = Math.floor((Math.floor(diff/1000))/60);
                    var seconds = Math.floor(diff/1000);
                    if (seconds > 59) {
                        minutes = minutes+(Math.floor(seconds/60));
                        seconds = seconds%60;
                    }
                    if (minutes < 10) {minutes = "0"+minutes;}
                    if (seconds < 10) {seconds = "0"+seconds;}
                    alert("You Lose! \n Game Timer : "+minutes+":"+seconds+"\n Final Score : "+score);
                    location.reload(true);
                }
            }
            if (score==1950){
                alert("Congratulations!!!");
                location.reload(true);
            }
        }
    }
}

$(document).ready(function(){
    spawnPacman();
    spawnCherry();
    spawnGhost();
    displayGhost();
    displayPacman();
    displayWorld();
    displayScore();
    // displayClock();
    $('#start').click(function(){
        startdate = new Date();
        clockstart = true;
        gamestart();
        handler();
        setInterval(handler, 500);
    });
});
