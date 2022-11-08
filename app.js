
const cells = document.querySelectorAll("td")
const handleClick = (e) => {
    console.log(e.target)
    e.target.textContent="X"
}
cells.forEach(element => {
    element.addEventListener("click", handleClick)
});
const gameBoard = (()=>{
    const score = [1,2]
    
    
    return{score}
}
)()

const game = (()=>{})()

const Player = () => {

}

gameBoard.score