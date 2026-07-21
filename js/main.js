const canvas = document.getElementById("game")
const context = canvas.getContext("2d");

//images declaration 

const ground = new Image();
const mountain = new Image();
const player1 = new Image();
//player

const player = {
    x: 0,
    y: 350,
    width: 150,
    height: 150, 
    speed: 5, 
    gravity: 10
}

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
}

const groundLayer = new Layer(ground, 6, canvas.width, canvas.height);
const mountainLayer = new Layer(mountain, 2, canvas.width, canvas.height/2 + 200);
const playerLayer = new Layer(player1, player.speed)

function gameLoop(){
       
       context.clearRect(0,0,canvas.width, canvas.height)
       
        groundLayer.update();
        groundLayer.draw();

        mountainLayer.update();
        mountainLayer.draw();

        playerLayer.drawPlayer();

        requestAnimationFrame(gameLoop)


}

gameLoop();

ground.src="images/ground.png"
mountain.src ="images/mountain.png"
player1.src = "images/player.png"
//next add a player a camera movement that go with a player