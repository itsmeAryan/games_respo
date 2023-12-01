import { Component } from "react";

class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: null,
            score: 0,
            gameOver: false,
            message: null
        };
    }
    initBoard() {
        let board = [];
        let square = 4;
        for (let r = 0; r < square; r++) {
            let row = [];
            for (let c = 0; c < square; c++) {
                row.push(0);
            }
            board.push(row);
        }
        board = this.fillrandomCell(this.fillrandomCell(board));
        this.setState({ board, score: 0, gameOver: false, message: null });
    }
    generateRandomValue() {
        const selectNum = [2, 4];
        return selectNum[Math.floor(Math.random() * selectNum.length)];
    }
    fillrandomCell(board) {

        let cells = this.getEmptyCells(board);
        if(cells.length==0){
            return board};
        let cell = cells[Math.floor(Math.random() * cells.length)];
        board[cell[0]][cell[1]] = this.generateRandomValue();
        return board;
    }
    getEmptyCells(board) {
        let cells = [];
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                if (board[r][c] == 0) {
                    cells.push([r, c]);
                }
            }
        }
        return cells;
    }
    componentDidMount() {
        this.initBoard();
        document.addEventListener("keydown", this.eventHandler.bind(this))
    }
    eventHandler(e) {
        switch (e.key) {
            case "ArrowRight": this.move("ArrowRight"); break;
            case "ArrowDown": this.move("ArrowDown"); break;
            case "ArrowUp": this.move("ArrowUp"); break;
            case "n": this.initBoard(); break;
            case "ArrowLeft": this.move("ArrowLeft"); break;
            default: break;
        }
    }
    move(direction) {
        if (this.state.gameOver) {
            this.setstate({ message: "Game over. Please start a new game." });
            return;
        }
        if (direction === "ArrowLeft") {
            const updatedBoard = this.moveLeft(this.state.board);
            if (this.boardMoved(this.state.board, updatedBoard.board)) {
                const getBoard = this.fillrandomCell(updatedBoard.board);
                if(this.isGameOver(getBoard)){
                    this.setState({board: upWithRandom, gameOver: true, message: 'Game over!'});
                    return;
                }
                this.setState({
                    board: getBoard, score: this.state.score + updatedBoard.score
                })
            }
        }
        else if (direction === "ArrowRight") {
            const updatedBoard = this.moveRight(this.state.board);
            if (this.boardMoved(this.state.board, updatedBoard.board)) {
                const getBoard = this.fillrandomCell(updatedBoard.board);
                if(this.isGameOver(getBoard)){
                    this.setState({board: upWithRandom, gameOver: true, message: 'Game over!'});
                    return;
                }
                this.setState({
                    board: getBoard, score: this.state.score + updatedBoard.score
                })
            }
        }
        else if (direction === "ArrowDown") {
            const updatedBoard = this.moveDown(this.state.board);
            if (this.boardMoved(this.state.board, updatedBoard.board)) {
                const getBoard = this.fillrandomCell(updatedBoard.board);
                if(this.isGameOver(getBoard)){
                    this.setState({board: upWithRandom, gameOver: true, message: 'Game over!'});
                    return;
                }
                this.setState({
                    board: getBoard, score: this.state.score + updatedBoard.score
                })
            }
        }
        else {
            // arrowup
            const updatedBoard = this.moveUp(this.state.board);
            if (this.boardMoved(this.state.board, updatedBoard.board)) {
                const getBoard = this.fillrandomCell(updatedBoard.board);
                if(this.isGameOver(getBoard)){
                    this.setState({board: upWithRandom, gameOver: true, message: 'Game over!'});
                    return;
                }
                this.setState({
                    board: getBoard, score: this.state.score + updatedBoard.score
                })
            }
        }
    }
    boardMoved(original, updated) {
        return (JSON.stringify(updated) !== JSON.stringify(original)) ? true : false;
    }
    moveRight(originalBoard) {
        let board = [];
        let score = 0;
        //pushed all values to the left side;
        for (let i = 0; i < originalBoard.length; i++) {
            let row = [];
            for (let j = 0; j < originalBoard[i].length; j++) {
                if (originalBoard[i][j] != 0) {
                    row.unshift(originalBoard[i][j]);
                }
            }
            for (let k = row.length; k < originalBoard[i].length; k++) {
                row.unshift(0);
            }
            board.push(row);
        }
        for (let i = 0; i < board.length; i++) {
            for (let j = board[i].length - 1; j > 0; j--) {
                if (board[i][j] > 0 && board[i][j] == board[i][j - 1]) {
                    board[i][j] *= 2;
                    board[i][j - 1] = 0;
                    score += board[i][j];
                }
            }

        }
        return { board, score };


    }
    moveLeft(originalBoard) {
        let board = [];
        let score = 0;
        //pushed all values to the left side;
        for (let i = 0; i < originalBoard.length; i++) {
            let row = [];
            for (let j = 0; j < originalBoard[i].length; j++) {
                if (originalBoard[i][j] != 0) {
                    row.push(originalBoard[i][j]);
                }
            }
            for (let k = row.length; k < originalBoard[i].length; k++) {
                row.push(0);
            }
            board.push(row);
        }
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length - 1; j++) {
                if (board[i][j] > 0 && board[i][j] == board[i][j + 1]) {
                    board[i][j] *= 2;
                    board[i][j + 1] = 0;
                    score += board[i][j];
                }
            }

        }
        return { board, score };


    }
    moveUp(originalBoard) {
        let board = JSON.parse(JSON.stringify(originalBoard));
        let score = 0;
        for (let i = 0; i < board.length; i++) {
            let locator = 0;
            for (let j = 0; j < board[0].length; j++) {
                if (board[j][i] != 0) {
                    if (locator != j) {
                        board[locator][i] = board[j][i];
                        board[j][i] = 0;
                    }
                    locator++;
                }
            }
        }
        for (let i = 0; i < board.length; i++) {
            for (let j = 1; j < board[0].length; j++) {
                if (board[j][i] > 0 && board[j][i] == board[j - 1][i]) {
                    board[j - 1][i] *= 2;
                    board[j][i] = 0;
                    score += board[j - 1][i];

                }
            }
        }
        // remove spaces
        for (let i = 0; i < board.length; i++) {
            let locator = 0;
            for (let j = 0; j < board[0].length; j++) {
                if (board[j][i] != 0) {
                    if (locator != j) {
                        board[locator][i] = board[j][i];
                        board[j][i] = 0;
                    }
                    locator++;
                }
            }
        }
        return { board, score }
    }
    moveDown(originalBoard) {
        let board = JSON.parse(JSON.stringify(originalBoard));
        let score = 0;
        for (let i = 0; i < board.length; i++) {
            let locator = board.length - 1;
            for (let j = board[0].length - 1; j >= 0; j--) {
                if (board[j][i] != 0) {
                    if (locator != j) {
                        board[locator][i] = board[j][i];
                        board[j][i] = 0;
                    }
                    locator--;
                }
            }
        }
        for (let i = 0; i < board.length; i++) {
            for (let j = board[0].length - 1; j > 0; j--) {
                if (board[j][i] > 0 && board[j][i] == board[j - 1][i]) {
                    board[j][i] *= 2;
                    board[j - 1][i] = 0;
                    score += board[j][i];

                }
            }
        }
        // remove spaces
        for (let i = 0; i < board.length; i++) {
            let locator = board.length - 1;
            for (let j = board[0].length - 1; j > 0; j--) {
                if (board[j][i] != 0) {
                    if (locator != j) {
                        board[locator][i] = board[j][i];
                        board[j][i] = 0;
                    }
                    locator--;
                }
            }
        }
        return { board, score }
    }
    isGameOver(board){
        let allMoves=[
            this.boardMoved(board,this.moveUp(board).board),
            this.boardMoved(board,this.moveRight(board).board),
            this.boardMoved(board,this.moveDown(board).board),
            this.boardMoved(board,this.moveLeft(board).board),
        ]
        return (allMoves.includes(true))?false:true;
    }
    render() {
        return <>
         <div className="button" onClick={() => {this.initBoard()}}>New Game</div>
                
                <div className="buttons">
                  <div className="button" onClick={() => {this.move('ArrowUp')}}>Up</div>
                  <div className="button" onClick={() => {this.move('ArrowRight')}}>Right</div>
                  <div className="button" onClick={() => {this.move('ArrowDown')}}>Down</div>
                  <div className="button" onClick={() => {this.move('ArrowLeft')}}>Left</div>
                </div>
            <div className="score">Score: {this.state.score}</div>
{
    this.state.gameOver&&(<h1>{this.state.message}</h1>)
}
            <div className="container">
                {
                    this.state.board?.map((row, index) => (
                        <Row row={row} key={index} />
                    ))
                }
            </div>
        </>
    }
}
export default Tag
const Row = ({ row }) => {
    return <>
        <div className="box">
            {
                row.map((cell, i) => (
                    <Cell key={i} cell={cell} />
                ))
            }
        </div>
    </>
}
const Cell = ({ cell }) => {
    const color = `color color-${cell}`;
    return <>
        <div className={color}>
            <div className="number">{cell == 0 ? '' : cell}</div>
        </div>
    </>
}