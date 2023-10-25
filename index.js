// Gameboard object
const Gameboard = (function(){


    const DOM_board = document.getElementById('board')
    const board = []


    const createCell = function(id, isMarked, mark){
        const cell = document.createElement('div')
        cell.classList.add('board-cell')
        cell.id = id
        cell.isMarked = isMarked
        cell.mark = mark
        cell.marking = function(){
            cell.innerText = Players.currentPlayer.mark
            cell.mark = Players.currentPlayer.mark
            cell.isMarked = true
            Gameflow.checkWinner()
            if(Gameflow.gameOver===false){
                Players.changePlayer()
                renderBoard()
            } else{
                Gameboard.finalRender()
            }
        }
        DOM_board.appendChild(cell)
        return cell
    }


    const boardInit = function(){
        for(let i=1; i<10; i++){
            const cell = createCell(i, false, '')
            board.push(cell)
        }
    }


    const renderBoard = function(){
        DOM_board.innerHTML = ''
        board.forEach(cell=>{
            if(cell.isMarked===false){
                cell.classList.add('active')
                cell.addEventListener('click', cell.marking)
            }else{
                cell.classList.remove('active')
                cell.removeEventListener('click', cell.marking)
            }
            DOM_board.appendChild(cell)
            document.getElementById('h2').innerText=`${Players.currentPlayer.name}'s turn`
        })
    }


    const finalRender = function(){
        board.forEach(cell=>{
            cell.classList.remove('active')
            cell.removeEventListener('click', cell.marking)
        })
        if(Gameflow.gameOver===true){
            document.getElementById('h2').innerText=`${Players.currentPlayer.name}' is a Winner!`
        }else{
            document.getElementById('h2').innerText=`It's a tie.`
        }
        Gameflow.restart()

    }

    return{boardInit, renderBoard, board, DOM_board, finalRender}
})();










//Factory for players
const Players = (function(){
    let currentPlayer
    const player_1 = {}
    const player_2 = {}
    const setPlayer = function(player, name, mark){
        player.name = name
        player.mark = mark
    }
    const changePlayer = function(){
        if(Players.currentPlayer===Players.player_1){
            Players.currentPlayer = Players.player_2
        }else{
            Players.currentPlayer=Players.player_1
        }
    }
    return{player_1, player_2, setPlayer, changePlayer, currentPlayer}
})()









//Gameflow object
const Gameflow = (function(){


    let gameOver = false


    const startGame = function(){
        if(document.getElementById('startBtn')){
            document.getElementById('button-container').removeChild(document.getElementById('startBtn'))
        }
        if(document.getElementById('restartBtn')){
            document.getElementById('button-container').removeChild(document.getElementById('restartBtn'))
        }
        

        Gameboard.boardInit()
        
    
        Players.setPlayer(Players.player_1, prompt('Enter the name of first player').toString(), prompt('Which mark will be used?').toString())
        Players.setPlayer(Players.player_2, prompt('Enter the name of second player').toString(), prompt('Which mark will be used?').toString())
        
        Players.currentPlayer = Players.player_1
        Gameboard.renderBoard()
    }

    const restart= function(){
        const restartBtn = document.createElement('button')
        restartBtn.classList.add('button')
        restartBtn.innerText='Restart'
        restartBtn.id='restartBtn'
        restartBtn.addEventListener('click', ()=>{
            Gameboard.board.length = 0
            Gameboard.DOM_board.innerHTML = ''
            Gameflow.gameOver = false
            Gameflow.startGame()
        })
        document.getElementById('button-container').appendChild(restartBtn)
    }
    const checkWinner = function(){
        if(
            (
                (Gameboard.board[0].mark===Players.currentPlayer.mark) &&
                (Gameboard.board[1].mark===Players.currentPlayer.mark) &&
                (Gameboard.board[2].mark===Players.currentPlayer.mark)
            )
            ||
            (
                (Gameboard.board[3].mark===Players.currentPlayer.mark) &&
                (Gameboard.board[4].mark===Players.currentPlayer.mark) &&
                (Gameboard.board[5].mark===Players.currentPlayer.mark)
            )
            ||
            (
                (Gameboard.board[6].mark===Players.currentPlayer.mark) &&
                (Gameboard.board[7].mark===Players.currentPlayer.mark) &&
                (Gameboard.board[8].mark===Players.currentPlayer.mark)
            )



            ||



            (
                (Gameboard.board[0].mark===Players.currentPlayer.mark) &&
                (Gameboard.board[3].mark===Players.currentPlayer.mark) &&
                (Gameboard.board[6].mark===Players.currentPlayer.mar)
            )
            ||
            (
                (Gameboard.board[1].mark===Players.currentPlayer.mark) &&
                (Gameboard.board[4].mark===Players.currentPlayer.mark) &&
                (Gameboard.board[7].mark===Players.currentPlayer.mark)
            )
            ||
            (
                (Gameboard.board[2].mark===Players.currentPlayer.mark) &&
                (Gameboard.board[5].mark===Players.currentPlayer.mark) &&
                (Gameboard.board[8].mark===Players.currentPlayer.mark)
            )



            ||



            (
                (Gameboard.board[0].mark===Players.currentPlayer.mark) &&
                (Gameboard.board[4].mark===Players.currentPlayer.mark) &&
                (Gameboard.board[8].mark===Players.currentPlayer.mark)
            )
            ||
            (
                (Gameboard.board[2].mark===Players.currentPlayer.mark) &&
                (Gameboard.board[4].mark===Players.currentPlayer.mark) &&
                (Gameboard.board[6].mark===Players.currentPlayer.mark)
            )
        ){ 
            Gameflow.gameOver = true
        } else if(Gameboard.board.every((element)=>{
            return element.isMarked
        })){
            Gameflow.gameOver = 'tie'
        }
    }
    return{startGame, restart, checkWinner, gameOver}
})()