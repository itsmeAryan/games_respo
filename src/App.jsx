import React, { useEffect, useState } from 'react'
import "./index.css"
const App = () => {
  const [board, setBoard] = useState(Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0)));
  const [score, setScore] = useState(0);
  const rows=board.length,columns=board[0].length;
  const showvalues=()=>{
    console.log(board)
  }
  const ArrowRightController=()=>{
    for(let i=0;i<rows;i++){
      let row=slide(board[i]);
      
      updateBoardRow(i,row.reverse());
    }
    setDefaultValues();
  }
  const ArrowLeftController=()=>{
    for(let i=0;i<rows;i++){
      let row=slide(board[i]);
      updateBoardRow(i,row);
    }
    setDefaultValues();
  }
  const ArrowUpController=()=>{console.log("up")}
  const ArrowDownController=()=>{console.log("down")}
  const handleKeyPress=e=>{
    switch(e.key){
      case "ArrowRight":ArrowRightController();break;
      case "ArrowLeft":ArrowLeftController();break;
      case "ArrowDown":ArrowDownController();break;
      default:ArrowUpController(); break;
    }
  }
  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress);
    setDefaultValues()
    setDefaultValues()
    return () => {
      document.removeEventListener('keyup', handleKeyPress);
    };
  }, []);
  const updateBoardElement = (r,c,val) => {
    console.log(r,c,val,"_Blod")
    setBoard(prevBoard => {
      const updatedBoard = [...prevBoard];
      updatedBoard[r][c] = val;
      return updatedBoard;
    });
    
  };
  const updateBoardRow = (r,newRow) => {
    setBoard(prevBoard => {
      const updatedBoard = [...prevBoard];
      updatedBoard[r] = newRow;
      return updatedBoard;
    });
  };
  function hasEmptyBox() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c <columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}
function setDefaultValues() {
  if (!hasEmptyBox()) {
    return;
  }

  let found = false;
  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);

    if (board[r][c] === 0) {
      found = true;

      // Update the state with a new random value (2 or 4)
      const newValue = Math.random() < 0.5 ? 2 : 4;
      updateBoardElement(r, c, newValue);
    }
  }
}

function filterZero(row){
  return row.filter(num => num != 0); //create new array of all nums != 0
}
function slide(rowdel){
  console.log(rowdel)
  //[2,0,2,2]
 let row=filterZero(rowdel);//[2,2,2]
  console.log(row,"filtered")
  for(let i=0;i<row.length;i++){
    if(row[i]==row[i+1]){
      row[i]*=2;
      row[i+1]=0;
      setScore(prevScore => prevScore + row[i]);
    }//[4,0,2]
  }
 let newrow=filterZero(row)//[4,2];
  while(newrow.length<columns){
    newrow.push(0);
  }
  console.log("after",newrow);
return newrow;//[4,2,0,0];
}
  return <>
  <h1 className="title">2048 Game</h1>
  <button onClick={showvalues}>press</button>
  <hr className="line" />
  <h2 className="score">Score:
  <span className="scores">{score}</span>
  </h2>
  <div  className="board">
  {
    board.map(row=>(
      row.map((value,index)=>(
        <div key={index} className={"box "+"x"+value}>{value!=0&&value}</div>
      ))
    ))
  }
  </div>
  </>
}

export default App