let msg = document.querySelector('#msg');
let msgContainer = document.querySelector('.msg-container');
let newGameBtn = document.querySelector('#new-btn');
let resetBtn = document.querySelector('#reset-btn');
let boxes = document.querySelectorAll('.btn');

let turn0 = true;
let count = 0;

const winpatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msg.innerText = "Player 1's turn";
    msgContainer.classList.add('hide');
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0){
            box.innerText="X";
            msg.innerText="Player 2's turn";
            turn0=false;
            }
            else{
            box.innerText="O";
            msg.innerText="Player 1's turn";
            turn0=true;
        }
        count++;
        box.disabled=true;
       let isWinner = checkWinner();

       if(count==9 && !isWinner){
        gameDraw();
       };
    });
});

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);

const gameDraw = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove('hide');
    disableBoxes();
};
const checkWinner=()=>{
    for(let pattern of winpatterns){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;
        if(pos1!=""&& pos2!=""&& pos3!=""){
            if(pos1==pos2 && pos2==pos3){
                const winnerName = pos1 === 'X' ? 'Player 1' : 'Player 2';
                showWinner(winnerName);
                return true;
            }
        }
    }
    return false;
}
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};