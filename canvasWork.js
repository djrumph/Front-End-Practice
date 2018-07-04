let context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 180;
context.canvas.height = 320;

rectangle = {

    height:32,
    jumping:true,
    width:32,
    x:144,
    x_velocity:0,
    y:0,
    y_velocity:0

};

controller  = {
   
    left:false,
    right:false,
    up:false,
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
        break
     }

    }
};



window.addEventListener("keydown",controller.keyListener);
window.addEventListener("keyup",controller.keyListener);
window.requestAnimationFrame(loop);
