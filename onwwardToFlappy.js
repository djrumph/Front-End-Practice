

let context, controller, rectangle, loop, pipe;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 360;
context.canvas.width = 640;


let topRectHeight = context.canvas.height - (Math.floor(Math.random() * 100) + 150);
  let bottomRectHeight = topRectHeight+80;
  console.log(topRectHeight + "top");
  console.log(bottomRectHeight + "bottom");

rectangle = {

  height:32,
  jumping:true,
  width:32,
  x:144, // center of the canvas
  x_velocity:0,
  y:0,
  y_velocity:0

};

pipe = {

    height:100,
    width:32,
    x:200, // center of the canvas
    x_velocity:0,
    y:0,
    y_velocity:0
  
  };

controller  = {
   
    left:false,
    right:false,
    up:false,
    down:false,
    keyListener:function(event){
        
     let key_state = (event.type =="keydown")?true:false;

     switch(event.keyCode) {
        case 37: //left key
            controller.left = key_state;
        break;
        case 38: //up key
            controller.up = key_state;
        break;
        case 39: //right key
            controller.right = key_state;
        break;
        case 40: //down key, ONLY FOR DEBUGGING
            controller.down = key_state;
        break;
     
     }

    }
};

loop = function(){

    if (controller.up /*&& rectangle.jumping == false*/){

        rectangle.y_velocity -= 3;
        rectangle.jumping = true;
        
    }

    //THIS IF STATEMENT ONLY FOR DEBUGGING
    if (controller.down /*&& rectangle.jumping == false*/){

        rectangle.y_velocity += 1;
        //rectangle.jumping = true;
        
    }

    if(controller.left){
        rectangle.x_velocity -= 0.5;
    }

    if(controller.right){
        rectangle.x_velocity +=0.5;
    }

   // rectangle.y_velocity += 1.0;// gravity
    rectangle.x += rectangle.x_velocity;
    rectangle.y += rectangle.y_velocity;
    rectangle.x_velocity *= 0.9;//friction
    rectangle.y_velocity *= 0.9;//friction

    //if rectangle is falling below floor line
    if(rectangle.y >360 -16 -32){
        rectangle.jumping = false;
        rectangle.y = 360 -16-32;
        rectangle.y_velocity = 0;

    }
//if rectqngle goes meets top of window
    if(rectangle.y <0){
        rectangle.jumping = false;
        rectangle.y = 0;
        //rectangle.y_velocity = 0;

    }

    //if rectantle is going off the left of the screen
    if(rectangle.x <-64){

        rectangle.x = 640;


    }   

    //first try at collision detection
    if(rectangle.x >=70 && rectangle.x <=120 && rectangle.y >= bottomRectHeight -30 || rectangle.x >=70 && rectangle.x <=120 && rectangle.y <=  topRectHeight){

        rectangle.x = 70;
        rectangle.y = rectangle.y;

    }
        
       
     //if rectangle goes past right boundary
    else if (rectangle.x >608){

        rectangle.x = 0;
    }

  context.fillStyle = "#202020";
  context.fillRect(0, 0, 640, 360);// x, y, width, height
  context.fillStyle = "#ff0000";// hex for red
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();
  context.strokeStyle = "#202830";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, 346);
  context.lineTo(640, 346);
  context.stroke();
  //top rectangle 360-
  
  context.fillRect(100, 0, 20, topRectHeight);
  context.fillRect(100, topRectHeight+80, 20, bottomRectHeight);
  //bottom rectangle
  context.fillRect(400,0,20,120);
  context.fillRect(400,220,20,125);

    //call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);

};


window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
