const GAME_STATE = {
    MENU: "menu",
    PLAYING: "playing",
    PAUSED: "paused",
    GAME_OVER: "gameOver",
    WIN: "win"
}

const music = new Audio("sounds/GameBackground.mp3");
const hit =  new Audio("sounds/hit.mp3")

let currentState = GAME_STATE.MENU;

window.addEventListener("keydown", function(event){
    if(event.code === 'Enter')
    {
        currentState = GAME_STATE.PLAYING;
    }
   
    else if(event.key === "p")
    {
        if(currentState === GAME_STATE.PLAYING)
        {
        currentState = GAME_STATE.PAUSED;
        }
        else {
            currentState = GAME_STATE.PLAYING;
        }
    }
    else if(event.key === "r")
    {
        if(currentState === GAME_STATE.GAME_OVER)
        {
            currentState = GAME_STATE.PLAYING;
        }
    }

})