// Gameboard object
const Gameboard = (function(){
    const board = []
    const createCell = function(id, isMarked, mark){
        const cell = document.createElement('div')
        cell.classList.add('board-cell')
        cell.id = id
        cell.isMarked = isMarked
        cell.mark = mark
        document.getElementById('board').appendChild(cell)
        return{cell}
    }
    const boardInit = (function(){
        for(let i=1; i<10; i++){
            const cell = createCell(i, false, '')
            board.push(cell)
        }
    })()

    return{board}
})();



//Factory for players
const makePlayer = function(name, mark){
    return{name, mark}
}


//Gameflow object
const Gameflow = (function(){
    const startGame = function(){
        const player_1 = makePlayer(prompt('Enter the name of first player'), prompt('Which mark will be used?'))
        const player_2 = makePlayer(prompt('Enter the name of first player'), prompt('Which mark will be used?'))
        return{player_1, player_2}
    }
    return{startGame}
})()