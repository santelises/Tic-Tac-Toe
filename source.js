var positions = ["", "", "", "", "", "", "", "", ""];
var playerPositions = [];
var computerPositions = [];
   
var squares = Array.from(document.querySelectorAll(".square"));

var player = {
    symbol: "X", 
    isTurn: true
}

var computer = {
    symbol: "O", 
    isTurn: false
}
var isTurn = true;
var gameOver = false;


function play(){
    console.log("playing")
    console.log(positions)
    console.log({isTurn})
    if (!gameOver && positions.some(position => position == "")){

        console.log("play on")
        if (isTurn){
            let symbol = player.symbol;
            squares.forEach((square,index)=> {
                square.addEventListener("click",addPlayerInput)
                //*******************************************/
                function addPlayerInput(){
                    if(positions[index] == ""){
                        playerPositions.push(index);
                        console.log(playerPositions)
                        positions[index] = symbol;
                        turnEnd();
                    };
                    
                    // squares.forEach(el => el.removeEventListener("click", addPlayerInput));
                    //need to find way to remove this event listener on all squares because when game ends I can continue to click 
                }
            });
            

        }
        else{
            let symbol = computer.symbol;
            let index = generateRandomIndex();
            computerPositions.push(index);
            positions[index] = symbol;
            turnEnd();

    	//********************************
            function generateRandomIndex(){
                let index = Math.round(Math.random()*positions.length);
                if(positions[index] == ""){
                    return index;
                }
                else{
                    console.log("generating new index")
                    return generateRandomIndex();
                }
            }
        }
    }
    else{
        console.log("game over");
    } 
}
function turnEnd(){
    isTurn = !isTurn;
    render();
    checkForWinner()
}
function render(){
    positions.forEach((position,index)=>{
        squares[index].innerHTML = position;
    })
}
function checkForWinner(){
    var winningCombos =[[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    if (playerPositions.length >=3|| computerPositions.length >=3){
        for (combo of winningCombos){
            if (combo.every(num => playerPositions.includes(num))){
                gameOver = true;
                console.log("Player won");
            }
            if (combo.every(num => computerPositions.includes(num))){
                gameOver = true;
                console.log ("Computer won")
            }
        }
    }
    if (positions.every(position => position == "")) {
        console.log("It's a draw!")
    }
    
    play();

}

play();
    


