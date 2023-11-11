//if you also want to make a game like this then follow canva expert frank laboratory on youtube!

onload=()=>{
    //canvas
    "use strict"
    const c = document.querySelector("canvas");
    const ctx = c.getContext("2d");
    let cW = c.width = innerWidth;
    let cH = c.height = innerHeight;
    const sect= document.querySelector("#section");
    const replay= document.querySelector("#replay");
    const spanscore= document.querySelector("#score");
    
    // event listener for window resize
    window.addEventListener('resize', () => {
        cW = c.width = window.innerWidth;
        cH = c.height = window.innerHeight;
    
        // Adjust other relevant variables or objects as needed
        bg.width = cW;
        bg.height = cH;
        bg.x2 = cW;
    
        // Redraw the canvas content
        // You may need to call your drawing functions again here
    });

    let variables = ["1","0","0","false","false","0", 6];
    let [gameSpeed,frame,score,gameOver,runFrame,highScore, scale] = variables;
    
    
    const setScale = () => {
        const { innerWidth, innerHeight } = window;
    
        if (innerWidth < 768) { // Example breakpoint for mobile devices
            scale = 3; // Adjust this scale factor as needed
        } else if (innerWidth < 1024) { // Example breakpoint for tablets
            scale = 4; // Adjust this scale factor as needed
        } else {
            scale = 6; // Default scale for desktop
        }
        console.log('New Scale: ', scale);
    };
    

// Call setScale() when the window loads and if it's resized
window.addEventListener('load', setScale);
window.addEventListener('resize', setScale);


    
    //mouse
    let mouse={
        x:cW/2,
        y:cH/2, 
        clicked:false,
    }
    
    let cPosition = c.getBoundingClientRect();
    
    
    //////////////////movement/////////////////
    c.ontouchstart=(event)=>{
        event.preventDefault();
        mouse.x= Math.floor(event.touches[0].clientX - cPosition.left);
        mouse.y= Math.floor(event.touches[0].clientY - cPosition.top);
      mouse.clicked = true;
    }
    c.ontouchend=(event)=>{
        event.preventDefault();
        mouse.clicked = false;
    }
    c.onmousedown = (event) => {
        event.preventDefault();
      mouse.x = Math.floor(event.clientX - cPosition.left);
      mouse.y = Math.floor(event.clientY - cPosition.top);
      mouse.clicked = true;
    };
    
    c.onmouseup = (event) => {
        event.preventDefault();
      mouse.clicked = false;
    };
    
    
    
    
    
    
    /////////music and sounds /////////////
    const bubsound1= document.createElement("audio");
    bubsound1.src = "https://opengameart.org/sites/default/files/bubbles-single2.wav";
    
    const bubsound2= document.createElement("audio");
    bubsound2.src= "https://opengameart.org/sites/default/files/Plop.ogg";
    
    ///Buble Spritesheets
    const bubblePop= new Image();
    bubblePop.src= "https://previews.dropbox.com/p/thumb/ACEAuBOFmNnSpZK0A-o_FNzI10mymJaoPDhLNYpjV0j91R9tDkwa9dLqRiqk9MYkNqh-ajKr0IZufLnH2nzqxtyp46AxSRt8VgJQfYKWmL1MrTH4SCkIBGKnEDYaGV0wtaYXpcVYHAvX8VwY6GHpqC1iq3WL7BOS_Lh3yRGNZgE6YbIe0DZCQ-q109f4aU8t_94zRPp84Dasr3qLn_o-xwtCLOKTrGNWtSP9lw6NKjy8u3cA2XRLEoNRPfQGQxcsmrbSOl5CBQnnZyPNXdR4RWhjbE5w9qj0AakfPufEAZnWubcXlpLQ-jXboM9CVkqwjX8ijABf-FNElsoPDu8wRMY3/p.png";
    
    
    const bubbleImg = new Image();
    bubbleImg.src = "https://previews.dropbox.com/p/thumb/ACFRxYacxSCBHc0AFuAk7w3Sf4dTVgyRckyNHaVZeG3jFMPPuHy5YEiOGqmK5k9JvxsmJxyeXUAx9faOEinc6oSYXoQPR-K7JTZMf21UNbRON7P4a_Mx5LagsJ-W7VJauMaqm4IOoHj2FlfskJWTECSBmI4_z8awlaK_sMaISFvQRUdfAZZSbJzM61PfX3h0P4syRY5VcYzZugX9RDsUANbOh1OthapeNZXBcHLeR0PbLGKVzi7HwYpnAXn34HzR6bCJi6pHpsHIGUg8sNi7YtVkQ6qxaAtWJ_qT5VIOBVxZ08YwnyOlFJ7znjVlv6JbprCkaUrjWw5zWBjW1aTuAWT2/p.png";
    

    //1992 981 image dimension
    const playerLeft= new Image();
    playerLeft.src= "https://previews.dropbox.com/p/thumb/ACEdQeHITLeK0p5_oOhIF0MpA99qIWCIDshjZL3CYl8jgwSrLCikANvyOTdYmhFtXr5r-0Rx9Gd_jNfmVQEgs2oZyvxi0PhwhyjG3AeRV2hJihurtssWtmarTaifYRFd5SBRCG8-CwrLI6B4JZks5wC09OUZd4ysyLL5LpSrn1Ir_rcFPNZG4V56Sjv_1qfAoC5_s4ghLwcRmwua3TFbqbMovbgV5QDQB0SxechMtBwbrTOfTfpWynxXwuPlh6M7TNk7aCw2_3sJB1_DH77XSIpq3tR_gZ3b_mLqggEnnuBjx-ybnjrAa0nB1datLCuKbT1HvSpov581xI8C6ZMGWZsY/p.png";
    
    const playerRight= new Image();
    playerRight.src= "https://previews.dropbox.com/p/thumb/ACGhNvVm8_abPSFZAI1jCmGAsERyjIT7tSZkS9ItgpoPFO6hMEtalA9vRhYDl_weB-NC2Jmk2O_gBe8PviS0Hmws8ShKntr7neSSBmiqpnLAnbpJeiji5WYLt9s-_EK4WSdrjVYs84ze-CeT-clpueMmBJh-HcsGTDkekIT9HO3EmGDdnedz5pfjD_EFmoX6i2pz2oDWOhbnZuocF3rL5t107dAQx_-QbiWOd2P9N4rK8_3me_DI0SUj9ZiF51PMbHKlTX21LJD0umMXSSFW_3tO_Jc7kRN0zstrOdCENjnPFODjlvdkNFzBXfR85Z446HnxsW39oBOiMBI9K_3Xzow5/p.png";
    
    
    /////enemy
    const enemyImgSources = [
        "enemy/spritesheets/__blue_cartoon_fish_swim.png",
        "enemy/spritesheets/__green_cartoon_fish_01_swim.png",
        "enemy/spritesheets/__orange_cartoon_fish_01_swim.png",
        "enemy/spritesheets/__pink_cartoon_fish_01_swim.png",
        "enemy/spritesheets/__red_cartoon_fish_01_swim.png",
        "enemy/spritesheets/__yellow_cartoon_fish_01_swim.png",
    ];
    
    


    
    /////////////background/////////////////
    const background = new Image();
    background.src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2OG0tc4EcSo5HpqLjNIwNqMkC7Pt6Toct2g&usqp=CAU";
    
    const bg= {
        x1:0,
        x2:cW,
        y:0,
        width:cW,
        height:cH,
    }
    const handleBackground = () => {
        ctx.clearRect(0, 0, cW, cH);
    
        ctx.drawImage(background, bg.x1, bg.y, cW, cH);
        ctx.drawImage(background, bg.x2, bg.y, cW, cH);
    
        if (bg.x1 - gameSpeed <= -cW) bg.x1 = cW;
        else bg.x1 -= gameSpeed;
    
        if (bg.x2 - gameSpeed <= -cW) bg.x2 = cW;
        else bg.x2 -= gameSpeed;
    };
    
    
    
    
    
    ////////////////player////////////////////
    class Player{
        constructor(){
            this.x = cW;
            this.y = cH/2;
            this.radius = 30+scale;
            this.angle = 0;
            this.frameX = 0;
            this.frameY = 0;
            this.frame = 0;
            this.imgWidth = 498;
            this.imgHeight = 327;
            
        }
        update(){
            this.dx = this.x - mouse.x;
            this.dy = this.y - mouse.y;
            let theta = Math.atan2(this.dy,this.dx);
            this.angle= theta;
            const percentage = 20;
            //direction move
            if(mouse.x != this.x){
                this.x -= this.dx /percentage;
            }
            if(mouse.y != this.y){
                this.y -= this.dy/percentage;
            }
            
            //frame
            if(frame % 8 === 0){
                
                this.frame++;
                if(this.frame >= 12)this.frame= 0;
                if(this.frame ===3 ||this.frame===7||this.frame===11){
                    this.frameX = 0;
                }else{
                    this.frameX++;
                }
                
            }
            
            
        }
        draw(){
            if(mouse.clicked){
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x,this.y)
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
            }

            // ctx.beginPath();
            // ctx.fillStyle="red";
            // ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
            // ctx.fill();
            // ctx.closePath();

            ctx.save();
            ctx.translate(this.x,this.y);
            ctx.rotate(this.angle);
            
            



            if(this.x >= mouse.x){
                ctx.drawImage(playerLeft, this.frameX * this.imgWidth, this.frameY * this.imgHeight, this.imgWidth, this.imgHeight, -this.radius,-this.radius, this.imgWidth / scale, this.imgHeight / scale);
    
            }else{
                ctx.drawImage(playerRight, this.frameX * this.imgWidth, this.frameY * this.imgHeight, this.imgWidth, this.imgHeight, -this.radius, -this.radius, this.imgWidth / scale, this.imgHeight / scale);
    
            }
            ctx.restore();
        }
    }
    
    const player = new Player();
    
    const makePlayer =()=>{
        player.update();
        player.draw();
    }
    
    
    //////////////////bubbles////////////////
    class Bubbles{
        constructor(){
            this.x = Math.random() * cW;
            this.y = cH + 100;
            this.radius= 30;
            this.speed = Math.random() * 3+1;
            this.distance;
            this.counted= false;
            this.sound= Math.random() <= .5 ? "sound1": "sound2";
            this.timer= 0;
            this.frameX = 0;
            this.frameY = 0;
            this.imgW= 512;
            this.imgH= 512;
        }
        draw(){
            
          //ctx.drawImage(bubbleImg,this.x -42,this.y -42,this.radius *scale,this.radius *scale)
        ctx.drawImage(bubbleImg,this.frameX*this.imgW,this.frameY*this.imgH,this.imgW,this.imgH,this.x-32,this.y-52,this.imgW/scale,this.imgH/scale);
        
        }
        update(){
            let dx = this.x - player.x;
            let dy = this.y - player.y;
            this.distance = Math.sqrt(dx*dx+dy*dy);
            this.y -= this.speed;
        }
    }
    const bubbles = new Bubbles();
    
    //bubblearray
    let bubbleArray = [];
    
    const makeBubble =()=>{
        if(frame%50 === 0){
            bubbleArray.push(new Bubbles());
        }
        for(let i in bubbleArray){
        bubbleArray[i].update();
        bubbleArray[i].draw();
            
        }
        for(let i in bubbleArray){
                   
        if(bubbleArray[i].y < 0 - bubbleArray[i].radius *2 ){
                bubbleArray.splice(i,1);
                
            }
        
            /////colllison
            if(bubbleArray[i].distance < bubbleArray[i].radius + player.radius){
              if(bubbleArray[i]){
                if(!bubbleArray[i].counted){
                    if(bubbleArray[i].sound === "sound1"){
                    bubsound1.play();
                    }else{
                    bubsound2.play();
                    }
                    explodeArray.push(new Explode(bubbleArray[i].x,bubbleArray[i].y));
                    bubbleArray.splice(i,1);
                    ++score;
                    
                    runFrame = true;
                }
                }     
              }
        }
    }
    
    //////////////////enemy//////////////////
    
    class Enemy{
        constructor(){
            this.x = cW+200; 
            this.radius= 30+scale;
            
            this.y= Math.random()*(cH - this.radius);
            
            this.speed= Math.random() * 2 + 2;
            this.frame=0;
            this.frameX=0;
            this.frameY=0;
            this.enemyImg = new Image();
            this.enemyImg.onload = () => this.draw();
            this.setImage();
            this.imgW = 418;
            this.imgH= 397;
            this.distance;
        }

        setImage() {
            this.images = enemyImgSources.map((src) => {
                const img = new Image();
                img.src = src;
                return img;
            });
            this.enemyImg = this.images[Math.floor(Math.random() * this.images.length)];
            this.enemyImg.onload = () => this.draw();
        }
        draw(){
        //     ctx.beginPath();
        // ctx.fillStyle="red";
        // ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        // ctx.fill();
        // ctx.closePath();
            ctx.drawImage(this.enemyImg,this.frameX * this.imgW,this.frameY * this.imgH,this.imgW,this.imgH,this.x-this.radius,this.y-this.radius,this.imgW /scale,this.imgH/scale)
        };
        resetEnemy() {
            this.x = cW + 200;
            this.y = Math.random() * (cH - this.radius);
          }
        
        update(){
            this.x -= this.speed;
             
            // animation
            if(frame % 5 === 0){
                this.frame++;
                if(this.frame >= 12)this.frame= 0;
                if(this.frame===3 ||this.frame===7||this.frame===11){
                    this.frameX = 0;
                }else{
                    this.frameX++;
                }
                if(this.frame< 3)this.frameY =0;
                else if(this.frame < 7)this.frameY=1;
                else if(this.frame< 11)this.frameY =2;
               else this.frameY =0
            }
            
            // //collide
            // let dx = this.x - player.x;
            // let dy = this.y - player.y;
            // this.distance = Math.sqrt(dx*dx+dy*dy);
        }
    }


    ////enemys
    let enemies = [];
    const maxEnemies = 3; // maximum number of enemies
console.log(enemies)
    // Create enemies and add them to the array
    const createEnemy = () => {
        const newEnemy = new Enemy(); // Create a new instance of Enemy for each enemy
        enemies.push(newEnemy); 
    };

    // Inside the animation loop or where enemies are updated
    const updateEnemies = () => {
        for (let i = 0; i < enemies.length; i++) {

            if (enemies[i].x < -enemies[i].radius) {
                enemies[i].speed = Math.random() * 2 + 2;
                enemies[i].y= Math.random()*(cH - this.radius);
                enemies[i].setImage();
                enemies[i].resetEnemy();
                i--; // Adjust the index as we removed an element
                console.log("Enemy removed");
                
            } else {
                enemies[i].draw();
                enemies[i].update();
                let dx = enemies[i].x - player.x;
                let dy = enemies[i].y - player.y;
                let distance = Math.sqrt(dx * dx + dy * dy); // Move this line inside the loop

            if (distance < enemies[i].radius + player.radius) {
                gameOver = true;
                if (score >= highScore) {
                    highScore = score;
                }
            }
            }
            
        }
            
            
    };
    
    






    //////////////explosion effects////////////
    let explodeArray=[];
    class Explode{
        constructor(x,y,){
            this.x= x;
            this.y= y;
            this.isBubblePop = Math.random()>.5;
            this.radius=30;
            this.frame=0;
            this.frameX=0;
            this.frameY=0;
            this.frameX2= 0;
            this.frameY2=0;
            this.spriteW= 512;
            this.spriteH= 512;
    
            this.spriteW2= 393.75;
            this.spriteH2= 511.5;
    
            this.timer=0;
        }
        draw() {
    
        let bubbleRandom = Math.abs(Math.random()*1);
        
    //ctx.drawImage(bubblePop, this.frameX * this.spriteW2, this.frameY * this.spriteH2, this.spriteW2, this.spriteH2, this.x - 32, this.y - 52, this.spriteW2 / scale, this.spriteH2 / scale);
    //ctx.drawImage(bubbleImg, this.frameX * this.spriteW, this.frameY * this.spriteH, this.spriteW, this.spriteH, this.x - 32, this.y - 52, this.spriteW / scale, this.spriteH / scale);
    
    
    
     if (this.isBubblePop) {
                ctx.drawImage(
                    bubblePop,
                    this.frameX * this.spriteW2,
                    this.frameY * this.spriteH2,
                    this.spriteW2,
                    this.spriteH2,
                    this.x - 32,
                    this.y - 52,
                    this.spriteW2 / scale,
                    this.spriteH2 / scale
                );
            } else {
                ctx.drawImage(
                    bubbleImg,
                    this.frameX * this.spriteW,
                    this.frameY * this.spriteH,
                    this.spriteW,
                    this.spriteH,
                    this.x - 32,
                    this.y - 52,
                    this.spriteW / scale,
                    this.spriteH / scale
                );
            }
    
    
    
    
    
    
    
    } // this is draw end
        
        update(){
        
        /////for image frame/////
           if(runFrame){
            if(this.timer % 5=== 0){
                
                this.frameX++;
                this.frame++;
                if(this.frame >= 8)return;
                
                if(this.frame===4){
                 if(!this.frameTrue){
                     this.frameX = 0;
                 }
                 this.frameTrue = true;
                }
                
                //if frame is less than 3 than
                if(this.frame < 4){
                    this.frameY =0;
                    }
                //if frame is bigger than 3 but less than 7 than 
                else if(this.frame <=7){
                    this.frameY =1;
                } 
               }
               this.timer++;     
               };
        }
    }
    const explode=new Explode();
    
    const makeExplode=()=>{
          for(let i in explodeArray){
            explodeArray[i].update();
            explodeArray[i].draw();
            }
         if(explodeArray.length >10){
            explodeArray.splice(0,1)
        }    
    }
    
    /////////////explosion effect ends here////////
    
    
    replay.onclick=()=>gameReplayFunc();
    
    const gameReplayFunc=()=>{
        if(gameOver === true){

            //mouse
            mouse.x= cW/2;
            mouse.y=cH/2;

            //player
            player.x= cW +200;
            player.y=cH/2;
            player.angle=0;

            //bubbles
            bubbleArray=[];
            bubbles.x = Math.random() * cW;
            bubbles.y = cH + 100;
            explodeArray= [];

            //enemy
            enemies=[];
           // Create new enemies
            createEnemy();

            //score
            score= 0;
            sect.style.display= "none";
            gameOver = false;
            
            animate();
        }
            
    }
    
    
    ////score text
    const textMake=()=>{
        ctx.beginPath();
        ctx.font= "1rem georgia";
        ctx.fillStyle= "darkBlue";
        ctx.fillText("Score: " + score,10,30);
        ctx.fill();
        ctx.closePath();
        //high score
        ctx.beginPath();
        ctx.font="1rem bold";
        ctx.fillStyle = "#053f5c";
        ctx.fillText("High: "+ highScore,cW- 75,30);
        ctx.fill();
        ctx.closePath();
        
        spanscore.innerHTML= score;    
    }
    
    
    ////////////////animate/////////////////
    const animate=()=>{
    
        if(gameOver == true){
            ctx.clearRect(0,0,cW,cH);
            sect.style.display= "block";
            return;
        }
        ctx.clearRect(0,0,cW,cH);
        handleBackground();
        makeBubble();
        makeExplode();
        makePlayer();
        
        updateEnemies();
        
        //create new enemies
        if (enemies.length < maxEnemies && frame % 50 === 0) {
            createEnemy();
        }
        

        textMake();
        requestAnimationFrame(animate);
        frame++;
    }
    
    animate();
    };