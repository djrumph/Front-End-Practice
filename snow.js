
    
   window.onload = function(){

//get the canvas and context and store in vars
       let canvas = document.getElementById("sky");
       var ctx = canvas.getContext("2d");

//set canvas dims to window height and width
        let width = window.innerWidth;
        let height = 200;

        canvas.width = width;
        canvas.height = height;

        //generate the snowflakes and apply attributes

        let maxFlakes = 300;
        let flakes = [];

        //loop through the empty flakes and apply attributes

        for(let i = 0; i<maxFlakes; i++){
            flakes.push({
                xCordinate: Math.random() * width,
                yCordinate: Math.random() * height,
                radius: Math.random() * 2 + 2,
                density: Math.random() + .05, //use this to control speed. 
                // an idea is to make this faster and change the shape to mimic rain

            })
        }

        // draw flakes onto canvas

        function drawFlakes(){

            ctx.clearRect(0, 0, width, height);
            var my_gradient=ctx.createLinearGradient(0,0,0,170);
            my_gradient.addColorStop(0,"grey");
            my_gradient.addColorStop(1,"white");
            ctx.fillStyle=my_gradient;
            ctx.beginPath();
            for(let i =0; i < maxFlakes; i++){
                let newFlakes = flakes[i];
                ctx.moveTo(newFlakes.xCordinate, newFlakes.yCordinate);
                ctx.arc(newFlakes.xCordinate, newFlakes.yCordinate, newFlakes.radius, 0, Math.PI*2, true);

            }

            ctx.fill();
            moveFlakes();
        }

        //animate the flakes
        let angle = 0;

        function moveFlakes(){
            angle += 0.01;
            for(let i = 0; i < maxFlakes; i++){

                //store current flakes
                let newFlakes = flakes[i];

                //update X and Y coordinates of each snowflake
                newFlakes.yCordinate += Math.pow(newFlakes.density, 2) + 1;
                newFlakes.xCordinate += Math.sin(angle) * 2;

                //if the snowflake reaches the bottom, send a new one to the top

                if(newFlakes.yCordinate > height){
                    flakes[i] = {xCordinate: Math.random()*width, yCordinate: 0, radius: newFlakes.radius, density:newFlakes.density}
                };
        }



   }

setInterval(drawFlakes,25);
   
}
    
    