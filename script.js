//gameboard, display controller = module
//players = factory functions

const Box = function () {
    let value = '';

    const setValue = function (newValue) {
        value = newValue.toString();
    }
    const getValue = function () {
        return value;
    }

    return { setValue, getValue };
}


const Gameboard = (function () {
    //create a 2d 3x3 array for the Gameboard
    //Each item in the gameboard needs to be of function Box();
    //function for inputting position for X/O
    //function for checking validity of input position
    //temporary function to print how the board looks on console

    let rows = 3;
    let columns = 3;
    let board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Box());
        }
    }

    const getBoard = function () {
        //use this instead of just returning board because this way board can't be changed externally
        return board;
    }

    const clickBoard = function (token, row, column) {
        //check if the position is already taken
        //if not, set that position to the player number i.e. 1 or 2
        if (!(board[row][column].getValue() === '')) {
            return false;
        }
        board[row][column].setValue(token);
        return true;
    }

    const reset = function () {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j].setValue('');
            }
        }
    }

    const printBoard = function () {
        //prints out all the box Values only
        let boardWithBoxValue = board.map((row) => row.map((box) => box.getValue()));
        console.log(boardWithBoxValue);
        return boardWithBoxValue;
    }
})()

const player = function (name, token) {
    //player factory function which only allows the name and token to be altered when the player is created
    let playerName = name;
    let playerToken = token;
    const getName = function () {
        return playerName;
    }
    const getToken = function () {
        return playerToken;
    }

    const setName = function (name) {
        playerName = name;
    }

    return { getName, getToken, setName };
}

const workflow = (function () {
    const board = Gameboard;
    const boxesDom = document.querySelectorAll('.box');
    const playerDivs = document.querySelectorAll('div.player');
    const playerHeadings = document.querySelectorAll('h2.player');
    const resetButton = document.querySelector('button.start');

    //Default Player 1 and 2 values
    player1 = player('Player 1', 'X');
    player2 = player('Player 2', 'O');
    currentToken = 'X';

    //updates the dom Box to the code box values
    const render = function () {
        //renders the grid
        //renders the player tokens
        let rowIndex, colIndex = 0;
        boxesDom.forEach(box => {
            rowIndex = Number(box.dataset.row);
            colIndex = Number(box.dataset.col);
            box.innerText = board.getBoard()[rowIndex][colIndex].getValue();
        })

        playerDivs[0].querySelector('.token').innerText = player1.getToken();
        playerDivs[1].querySelector('.token').innerText = player2.getToken();

        playerHeadings[0].innerText = player1.getName();
        playerHeadings[1].innerText = player2.getName();
    }

    const switchToken = function () {
        currentToken = player1.getToken() === currentToken ? player2.getToken() : player1.getToken();
        console.log('token switched to ' + currentToken);
    }

    const getToken = function () {
        return currentToken;
    }
    const resetToken = function () {
        currentToken = 'X';
    }

    const playRound = function (row, column) {
        //validation for row and column inputs
        if (!(row < 3 && column < 3)) {
            return;
        }
        if (board.clickBoard(currentToken, row, column)) {
            switchToken();
            render();

            let gameResult = gameOver();
            console.log(gameResult);

            const possibleResults = ['X', 'O', 'T'];

            if (possibleResults.includes(gameResult)){
                output(gameResult);
                resetToken();
            }

        };
    }

    const output = function(token) {
        const dialogEnd = document.querySelector(".gameEnd");
        const playerName = document.querySelector(".playerName");
        if (token === 'X'){
            //code if player 1 won
            //output something saying X won
            playerName.innerText = player1.getName() + " has Won!";
        }

        else if (token === 'O'){
            //code if player 2 won
            playerName.innerText = player2.getName() + " has Won!";
        }

        else{
            //code if tie
            playerName.innerText = "It was a Tie!"
        }

        dialogEnd.showModal();

    }

    const detectClick = function () {
        boxesDom.forEach(box => {
            box.addEventListener('click', (event) => {
                let row = event.target.dataset.row;
                let col = event.target.dataset.col;
                playRound(row, col);
            })
        })
    }
    const gameOver = function () {
        //detects if the game is over
        //can return X, O, '' or T

        let boardString = board.getBoard().map(row => row.map(box => box.getValue()));

        //check 3 in a row
        //Check Row
        for (let i = 0; i < 3; i++) {
            if (boardString[i][0] === boardString[i][1] && boardString[i][1] === boardString[i][2] && boardString[i][0] != '') {
                console.log(i);
                return boardString[i][0];
            }
        }
        //Check Column
        for (let i = 0; i < 3; i++) {
            if (boardString[0][i] === boardString[1][i] && boardString[1][i] === boardString[2][i] && boardString[0][i] != '') {
                return boardString[0][i];
            }
        }
        //Check Diagonal
        if (boardString[1][1] != '' && (boardString[0][0] === boardString[1][1] && boardString[1][1] === boardString[2][2]) || (boardString[0][2] === boardString[1][1] && boardString[1][1] === boardString[2][0])) {
            return boardString[1][1];
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (boardString[i][j] === '') {
                    return boardString[i][j];
                }
            }
        }

        return 'T';
    }

    const getNames = function () { //gets the name from the dialog/form and puts them in the left/right
        const dialog = document.querySelector("dialog.open");
        const form = document.querySelector("form");
        let first,second;
        form.reset();
        dialog.showModal();

        form.addEventListener("submit", (e)=>{
            e.preventDefault(); 
            first = document.querySelector("#player1Input");
            second = document.querySelector("#player2Input");
            dialog.close();
            player1.setName(first.value);
            player2.setName(second.value);
            render();
        })
    }

    const clearBoard = function () {
        board.reset();
        getNames();
        render();
    }


    const resetGame = (function () {
        resetButton.addEventListener('click', clearBoard); //clears the visual board
        resetToken();//sets the token back to 'X'

    })()

    render();
    getNames();
    detectClick();
})()