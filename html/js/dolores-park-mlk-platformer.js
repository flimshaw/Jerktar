	var canvas;
	var canvasWidth = 630;
	var canvasHeight = 264;
	
	var counter = 0;
	var particleSize = 3; 
	var particleCount = 100;
	var particleMaxVel = 5;
	
	var gravity = .5;
	var friction = .05;
	
	var velX = 5;
	var velY = 5;
	var xPos = 0;
	var yPos = 0;

	var particleArray = new Array();
	
	var stringArray = new Array(
		"What was that MLK speech?",
		"\"And I've looked over. And I've seen the promised land.",
		"I may not get there with you. But I want you to know tonight,",
		"that we, as a people, will get to the promised land.",
		"And I'm happy, tonight.",
		"I'm not worried about anything.",
		"I'm not fearing any man.\"",
		"**SIGH**",
		"Someday, Starfleet Headquarters will be here."			
	);
	
	var string1 = "Someday, Starfleet Headquarters will be here.";
	var string2 = "And I've looked over. And I've seen the promised land. I may not get there with you. But I want you to know tonight, that we, as a people, will get to the promised land. And I'm happy, tonight. I'm not worried about anything. I'm not fearing any man.";
	var stringHolder;
	var stringIdx = 0;
	var stringCounter = 0;
	
	var characterDelay = 1;		
	var lineDelay = 60;
	
	var currentCounter = 0;
	var currentDelay = characterDelay;
	
	var currentMode = 'PRINTING_LINE';
	
	var jerktar_sprite = document.createElement("img");
	var jerktar;
	
	$(document).ready(function() {
		init();
	});
	
	function init() {
		canvas = document.getElementById("jerktar");
		jerktar_sprite.setAttribute("src", "art/jerktar_sprite.png");
		jerktar = new Jerktar();
		draw();
		setInterval(draw, 22);
		

			$("span.footnote a").hover(
				function() {
					$(this).parent().find("span").fadeIn();
				},
				function() {
					$(this).parent().find("span").fadeOut();
				}
			);

			$(document).keydown(function(e) {
				switch(e.keyCode) {
					case 39:
						jerktar.move(3);
						break;
					case 37:
						jerktar.move(-3);
						break;
					case 38:
						jerktar.jump();
						break;
					case 32:
						jerktar.jump();
						break;
				}
			});

	}
	
	function Jerktar() {
		// here's me so far
		this.x = 200;
		this.y = 100;
		
		this.width = 25;
		this.height = 66;
		
		this.velX = 1;
		this.velY = 0;
		
		this.move = move;
		this.applyPhysics = applyPhysics;
		this.update = update;
		this.jump = jump;
	}
	
	function jump() {
		if(!this.jumping) {
			this.velY = -10;
			this.jumping = true;
		}
	}
	
	function Particle() {
		this.x = Math.floor(Math.random() * (canvasWidth - particleSize));
		this.y = Math.floor(Math.random() * (canvasHeight - particleSize)); 
		
		this.velX = 0;
		this.velY = 0;
		
		while(this.velX == 0 || this.velY == 0) {
			if(this.velX == 0) {
				this.velX = Math.floor((Math.random() * particleMaxVel) - (particleMaxVel / 2));
			}
			if(this.velY == 0) {
				this.velY = Math.floor((Math.random() * particleMaxVel) - (particleMaxVel / 2));
			}
		}
		
		this.move = move;
		this.applyGravity = applyGravity;
	}
	
	function applyPhysics() {
		this.velY += gravity;
		if(this.velY > particleMaxVel) {
			this.velY = particleMaxVel;
		}
		
		if(this.velX > 0) {
			this.velX -= friction;
		} else if(this.velX < 0) {
			this.velX += friction;
		}
	}
	
	function update() {
		
		this.applyPhysics();
		
		this.x += this.velX;
		this.y += this.velY;
		
		if(this.x + this.width > canvasWidth || this.x <= 0) {
			this.velX *= -1;
		}
		
		if(this.y + this.height > canvasHeight || this.y <= 0) {
			this.velY = 0;
			this.jumping = false;
		}
		
		if(this.x + this.width > canvasWidth) {
			this.x = canvasWidth - this.width;
		} else if(this.x < 0) {
			this.x = 0;
		}
		
		if(this.y + this.height > canvasHeight) {
			this.y = canvasHeight - this.height;
		} else if(this.y < 0) {
			this.y = 0;
		}
	}
	
	function move(velX) {
		
		this.velX += velX;
		
		if(velX > 3) {
			velX = 3;
		} else if(velX < -3) {
			velX = -3;
		}
		
	}
	
	function getLines(ctx,phrase,maxPxLength,textStyle) {
	    var wa=phrase.split(" ");
	    var phraseArray=new Array();
	    var lastPhrase="";
	    ctx.font = textStyle;
	    var l=maxPxLength;
	    var measure=0;
	    for (var i=0;i<wa.length;i++) {
	        var w=wa[i];
	        measure=ctx.measureText(lastPhrase+w).width;
	        if (measure<l) {
	            lastPhrase+=(" "+w);
	        }else {
	            phraseArray.push(lastPhrase);
	            lastPhrase=w;
	        }
	        if (i==wa.length-1) {
	            phraseArray.push(lastPhrase);
	            break;
	        }
	    }
	    return phraseArray;
	}
	
	function draw() {
		if(canvas.getContext) {
			var ctx = canvas.getContext("2d");
			ctx.canvas.width  = canvasWidth;
			ctx.canvas.height = canvasHeight;
			ctx.clearRect(0,0,canvasWidth,canvasHeight);
			
			ctx.fillStyle    = '#eee';
			ctx.font         = '10px Press-Start-K';
			ctx.textBaseline = 'top';
			
			if(currentMode == 'PRINTING_LINE') {
				if(currentCounter >= currentDelay) {
					stringIdx++;
					stringHolder = stringArray[stringCounter].substr(0, stringIdx);
					if(stringHolder.length == stringArray[stringCounter].length && stringCounter < stringArray.length - 1) {
						stringCounter++;
						currentMode = 'LINE_PAUSE';
						currentDelay = lineDelay;
					}
					currentCounter = 0;
				} else {
					currentCounter++;
				}
			} else if(currentMode == 'LINE_PAUSE') {
				if(currentCounter >= currentDelay) {
					stringIdx = 0;
					currentCounter = 0;
					currentDelay = characterDelay;
					currentMode = 'PRINTING_LINE';
				} else {
					currentCounter++;
				}
			}

			
			ctx.fillText (stringHolder, 5, 5);
			
			
			ctx.fillStyle = "rgb(200,200,200)";
			jerktar.update();
			ctx.drawImage(jerktar_sprite, jerktar.x, jerktar.y);
			ctx.restore();
			for(var i = 0; i < particleArray.length; i++) {
				particleArray[i].move();	
				ctx.fillRect(particleArray[i].x, particleArray[i].y, particleSize, particleSize );
			}				
		}
	}