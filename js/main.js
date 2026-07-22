const canvas = document.getElementById("game")
const context = canvas.getContext("2d");
//declartion for window listener for keyboard action

const keys = {};
window.addEventListener("keydown", function(event){
    keys[event.key]= true;
})
window.addEventListener("keyup", function(event){
    keys[event.key]= false;
})

//images declaration 

const ground = new Image();
const mountain = new Image();
const player1 = new Image();
const enemy = new Image();
//player

let score = 0.2;
let collide = 0;

const player = {
    x: 30,
    y: 350,
    width: 150,
    height: 150, 
    speed: 5, 
    gravity: 10
}

const enmies = [
    {x: 500, y: 350, width: 150, height: 150, speed: 4},
    {x: 700*2, y: 350, width: 150, height: 150, speed: 4},
    {x: 500*3, y: 350, width: 150, height: 150, speed: 4},
    {x: 700*4, y: 350, width: 150, height: 150, speed: 4},
    {x: 700*5, y: 350, width: 150, height: 150, speed: 4},
    {x: 700*6, y: 350, width: 150, height: 150, speed: 4},
    {x: 500*10, y: 350, width: 150, height: 150, speed: 4},
    {x: 500*11, y: 350, width: 150, height: 150, speed: 4}
]

//class
class Layer {
      constructor(image, speed, width, height)
        {
            this.image = image;
            this.speed = speed;
            this.width = width;
            this.height = height
            this.x = 0;
        }
        update(){
            this.x-=this.speed;
            if(this.x <=-canvas.width){
                this.x = 0;
            }
        }

        draw(){
            context.drawImage(this.image, this.x, 0, this.width, this.height)
            context.drawImage(this.image, this.x + this.width, 0, this.width, this.height)
        

        }
        drawPlayer(){
            context.drawImage(this.image, player.x, player.y, player.width, player.height )
        }
        updatePlayer(){
            if(keys["w"])
            {
                player.y -=player.speed;
            }
            else {
                player.y +=player.gravity;
            }
        
            if(player.y>350){
                player.y = 350;
            }
            if(player.y<0)
            {
                player.y = 0;
            }
          
        }
        drawEnemies(){
         for(let index of enmies){
             context.drawImage(this.image, index.x, index.y, index.width, index.height);
         }
              
        }

        updateEnemies(){
             for(let index of enmies){
                  index.x -=index.speed;
           
             }
        }

       checkCollision(){
          score++;
          if(score>=1000)
          {
             currentState = GAME_STATE.WIN
    
             drawGameWin();
          }
          for(let index of enmies){
            if(player.x < index.x + index.width && player.x + player.width > index.x && player.y < index.y + index.height && index.y + player.height > index.y){
                console.log("collision happens")
                collide++;
                music.pause();
                hit.play();
                
                if(index.y > player.y)
                {
                    collide--;
                }
                if(collide>500) {
                  currentState = GAME_STATE.GAME_OVER
                   drawGameOver();
                }
            }
          }
       }



}

function drawMenu() {
    context.fillStyle = "green"
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = "blue"
    context.font = "50px Arial"
    context.fillText("DINO GAME;", 100, 300)

    context.font = "40px Arial"
    context.fillText("press Enter to start;",100, 400)

    
}

function drawPause(){
    context.fillStyle = "blue"
    context.font = "50px Arial"
    context.fillText("GAME PAUSED;", 100, 300)
    context.fillText("press p to conitune;", 100, 400)
}

function drawScore()
{
    context.fillStyle = "black"
    context.font = "30px Arial bold"
    context.fillText("score; " + score, 500, 50)
    context.fillText("collide; " + collide, 500, 100)
}
function drawGameOver(){
    context.fillStyle = "black"
    context.font = "50px Arial"
    context.fillText("GAME OVER;", 100, 300)
    context.fillText("press R to start again;", 200, 400)
    score = 0;
    collide = 0;
    
}
function drawGameWin(){
    
    context.fillStyle = "black"
    context.font = "50px Arial"
    context.fillText("you have won;", 100, 300)
}
const groundLayer = new Layer(ground, 6, canvas.width, canvas.height);
const mountainLayer = new Layer(mountain, 2, canvas.width, canvas.height/2 + 200);
const playerLayer = new Layer(player1, player.speed)
const objectPlayer =  new Layer();
const enemyImage = new Layer(enemy, enmies.speed, enmies.width, enmies.height);

function gameLoop(){

    if(currentState === GAME_STATE.PLAYING){
       context.clearRect(0,0,canvas.width, canvas.height)
       
    
        groundLayer.update();
        groundLayer.draw();

        mountainLayer.update();
        mountainLayer.draw();
        
        
        objectPlayer.updatePlayer();
        objectPlayer.updateEnemies();
        objectPlayer.checkCollision();

        playerLayer.drawPlayer();
        enemyImage.drawEnemies();

        music.play();

        drawScore();
    }

    if(currentState === GAME_STATE.MENU){
         drawMenu();
       
    }
    
    if(currentState === GAME_STATE.PAUSED)
    {
        drawPause();
        music.pause();
    }

        requestAnimationFrame(gameLoop)
   

}

gameLoop();

ground.src="images/ground.png"
mountain.src ="images/mountain.png"
player1.src = "images/player.png"
enemy.src = "images/enemy.png"
//next add a player a camera movement that go with a player