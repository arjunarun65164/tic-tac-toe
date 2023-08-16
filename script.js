//gameboard, display controller = module
//players = factory functions

const Box = function(){
    let value = '';

    const setValue = function(newValue){
        value = newValue.toString();
    }
    const getValue = function(){
        return value;
    }

    return {setValue, getValue};
}


const Gameboard = (function(){
    //create a 2d 3x3 array for the Gameboard
    //Each item in the gameboard needs to be of function Box();
    //function for inputting position for X/O
    //function for checking validity of input position
    //temporary function to print how the board looks on console

    let rows = 3;
    let columns = 3;
    let board = [];
    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(Box());
        }
    }

    const getBoard = function(){
        //use this instead of just returning board because this way board can't be changed externally

        return board;
    }

    const clickBoard = function(player, row, column){
        //check if the position is already taken
        //if not, set that position to the player number i.e. 1 or 2
        if (box[row][column] === ''){
            return;
        }
        board[row, column].setValue(player);
    }

    const printBoard = function(){
        //prints out all the box Values only
        let boardWithBoxValue = board.map((row) => row.map((box) => box.getValue()));
        console.log(boardWithBoxValue);
    }


    return {board, clickBoard, printBoard, getBoard};
})()





const player = function(){

    return {};
}

const workflow = (function(){


    return{};
})