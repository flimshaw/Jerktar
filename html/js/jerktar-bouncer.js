var canvasHeight = 264;
var canvasWidth = 630;
var jerktar = new Array();
var jerktarParticles = 100;
var inertia = 1;
var friction = .98;
var mousex = 0;
var mousey = 0;
var maxSpeed = 4;
var offset;
$(document).ready(function() {
    // 264x630
    canvas = document.getElementById("jerktar");
    offset = $("#jerktar").position();
    $(document).mousemove(function(event) {
        mousex = event.clientX - offset.left;
        mousey = event.clientY - offset.top;
    });
    
    for(var i = 0; i < jerktarParticles; i++) {
        jerktar.push(new Jerktar());
    }
    draw();
	setInterval(draw, 22);
});

function Jerktar() {
	this.x = 0 + Math.floor(Math.random() * (canvasWidth / 2));
	this.y = 0 + Math.floor(Math.random() * (canvasHeight / 2)); 
	
	this.velX = Math.floor(Math.random() * maxSpeed) - (maxSpeed / 2);
	this.velY = Math.floor(Math.random() * maxSpeed) - (maxSpeed / 2);
	
	this.inertia = (Math.random() * inertia) + inertia;
	
	this.update = update;
	this.attract = attract;
}

function update() {
    
    if(this.x + 40 > mousex) {
        this.velX -= this.inertia;
    } else {
        this.velX += this.inertia;
    }
    
    if(this.y - 5 < mousey) {
        this.velY += this.inertia;
    } else {
        this.velY -= this.inertia;
    }
    
    this.x += this.velX;
    this.y += this.velY;
    
    var fontSize = 11;
    	this.message = "JERKTAR!";
    
    if(this.x >= (canvasWidth - (fontSize * this.message.length)) || this.x < 0) {
        //this.velX *= -1;
    }
    
    if(this.y >= (canvasHeight - fontSize) || this.y < 0) {
        //this.velY *= -1;
    }
    
    this.velX *= friction;
    this.velY *= friction;
}

function attract(mousex, mousey) {
    

    
}

function draw() {
	if(canvas.getContext) {
		var ctx = canvas.getContext("2d");
		ctx.canvas.width  = canvasWidth;
		ctx.canvas.height = canvasHeight;
		ctx.clearRect(0,0,canvasWidth,canvasHeight);
		
		ctx.font         = '22px Press-Start-K';
		ctx.textBaseline = 'top';
		for(var i = 0; i < jerktar.length; i++) {
            jerktar[i].update()
            ctx.fillStyle    = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
            ctx.fillText (jerktar[i].message, jerktar[i].x, jerktar[i].y);
            
        }	

		
		
		
		//ctx.fillStyle = "rgb(200,200,200)";		
	}
}