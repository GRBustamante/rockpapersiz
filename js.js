const selectionButtons = document.querySelectorAll( '[data-selection]' )
const playerScoreSpan = document.querySelector( '[data-player-score]' )
const computerScoreSpan = document.querySelector( '[data-computer-score]' )
const matchResults =  document.querySelector( '[data-match-results]' )
const resetButton = document.querySelector( '[data-reset]' )
const selectionPrint = document.querySelector( '[data-selection-print]' )
const roundNum = document.querySelector('[data-round-num')
const SELECTIONS  = [    
    {
        name: 'rock',
        beats: 'sicssors',
        emoji: '💎' ,
        num: 0,
    },
    {
        name: 'paper',
        beats: 'rock',
        emoji: '📃',
        num: 1,
    },
    {
        name: 'sicssors',
        beats: 'paper',
        emoji: '✂',
        num: 2,
    }
    ]


selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
    const selectionName = selectionButton.dataset.selection
    const selection = SELECTIONS.find (selection => selection.name === selectionName)
    
    playRound(selection)  
})
})


function computerPlay() {
    let computerThrow = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[computerThrow]
}



function playRound(selection) {
    const computerSelection = computerPlay()
   
    const stale = stalemate(selection, computerSelection)
    const computerWin = isWinner(computerSelection, selection)
    const playerWin = isWinner(selection, computerSelection)

   printResults(selection, computerSelection)


    

if (playerWin) {incrementScore(playerScoreSpan); incrementRound(); matchResults.innerText  = "Player win"} ;

if (computerWin) {incrementScore(computerScoreSpan); incrementRound(); matchResults.innerText = "Computer Win"} ;

if (stale) {matchResults.innerText= "STALEMATE"} 




    console.log(computerSelection)
    console.log(selection)
    console.log(playerWin)
    console.log(computerWin)
}

resetButton.addEventListener('click', e => { playerScoreSpan.innerText = 0; computerScoreSpan.innerText = 0;
roundNum.innerText = 0;})



function incrementRound(){
roundNum.innerText = parseInt(roundNum.innerText) +1;
if (roundNum.innerText == 5)
roundNum.innerText = "Round over " + roundWinner(playerScoreSpan, computerScoreSpan) + " wins.";
}

function roundWinner(playerScoreSpan, computerScoreSpan) {
if (playerScoreSpan.innerText > computerScoreSpan.innerText) return "PLAYER"
if (computerScoreSpan.innerText > playerScoreSpan.innerText) return "COMPUTER"
}


function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) +1

}
function stalemate(selection, opponentSelection){
    return selection.name === opponentSelection.name
}

function printResults(selection, computerSelection){
document.getElementById('playerPrint').innerText = selection.name
document.getElementById('computerPrint').innerText = computerSelection.name

}



function isWinner(selection, opponentSelection) {
return selection.beats === opponentSelection.name
}



  



