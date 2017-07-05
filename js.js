var In_Game_objects = [];
var In_Screen_Objects = [];
var Grass_Array = [];
var Grass_Patch_Array = [];
var grass = new Image();

var cloudshadow = new Image();
cloudshadow.src = "img/cloudshadow.png"

var speed = 100;
grass.src = "https://designplustech.files.wordpress.com/2010/05/16tintbase2.jpg?w=510";

var distance = 10000;

class Grass {
    constructor(x, y, size,speed) {

      this.x = x;
      this.y = y;
      this.size = size;
      this.speed = speed;
  }
}

class Grass_Patch {
      constructor(imagesrc, x, y, size,speed) {
      this.image = new Image();
      this.image.src = imagesrc;
      this.x = x;
      this.y = y;
      this.size = size;
      this.speed = speed;
  }
}

class Game_Object {
    constructor(name, imagesrc, x, y, width, height,speed) {
      this.ImageSource = imagesrc;
      this.name = name;
      this.image = new Image();
      this.image.src = imagesrc;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
  }
}

var then = 0;

var keysDown = {};
addEventListener("keydown", function(e){
    keysDown[e.keyCode] = true;
    e.preventDefault();
}, false);
addEventListener("keyup", function(e){
    delete keysDown[e.keyCode];
    e.preventDefault();
}, false);


  function update(modifier){

  	   //up
  	   if(38 in keysDown){
  	   	    for(var j = In_Game_objects.length - 1; j >= 0; j--)
  	   	    {     
  	   	        In_Game_objects[j].y += In_Game_objects[j].speed * modifier;
  	   	    }

  	   	    for(var j = Grass_Array.length - 1; j >= 0; j--)
  	   	    {     
  	   	        Grass_Array[j].y += Grass_Array[j].speed * modifier;
  	   	    } 

                    for(var j = Grass_Patch_Array.length - 1; j >= 0; j--)
        {     
            Grass_Patch_Array[j].y += Grass_Patch_Array[j].speed * modifier;
        } 
  	   	}

  	   //down
  	   if(40 in keysDown){
  	   	for(var j = In_Game_objects.length - 1; j >= 0; j--)
  	   	{     
  	   	    In_Game_objects[j].y -= In_Game_objects[j].speed * modifier;
  	   	}

  	   	for(var j = Grass_Array.length - 1; j >= 0; j--)
  	   	{     
  	   	    Grass_Array[j].y -= Grass_Array[j].speed * modifier;
  	   	} 
                for(var j = Grass_Patch_Array.length - 1; j >= 0; j--)
        {     
            Grass_Patch_Array[j].y -= Grass_Patch_Array[j].speed * modifier;
        } 
  	   }

  	   //left
  	   if(37 in keysDown){
  	   	for(var j = In_Game_objects.length - 1; j >= 0; j--)
  	   	{     
  	   	    In_Game_objects[j].x += In_Game_objects[j].speed * modifier;
  	   	}

  	   	for(var j = Grass_Array.length - 1; j >= 0; j--)
  	   	{     
  	   	    Grass_Array[j].x += Grass_Array[j].speed * modifier;
  	   	} 

        for(var j = Grass_Patch_Array.length - 1; j >= 0; j--)
        {     
            Grass_Patch_Array[j].x += Grass_Patch_Array[j].speed * modifier;
        } 

  	   }
  	   //right
  	   if(39 in keysDown){ 
  	   	for(var j = In_Game_objects.length - 1; j >= 0; j--)
  	   	{     
  	   	    In_Game_objects[j].x -= In_Game_objects[j].speed * modifier;
  	   	}

  	   	for(var j = Grass_Array.length - 1; j >= 0; j--)
  	   	{     
  	   	    Grass_Array[j].x -= Grass_Array[j].speed * modifier;
  	   	} 

                for(var j = Grass_Patch_Array.length - 1; j >= 0; j--)
        {     
            Grass_Patch_Array[j].x -= Grass_Patch_Array[j].speed * modifier;
        } 
  	   }      
  }

  function render(c){
  	c.clearRect(0,0,800,800)





  	for(var j = Grass_Array.length - 1; j >= 0; j--)
  	{    
  	    if(Grass_Array[j].x < 800 && Grass_Array[j].y < 800 && Grass_Array[j].x > 0 - 100 && Grass_Array[j].y > 0 - 100)
  	    {
  	        c.drawImage(grass,Grass_Array[j].x, Grass_Array[j].y, 100, 100);
  	    }
  	}


    for(var j = Grass_Patch_Array.length - 1; j >= 0; j--)
    {    
        if(Grass_Patch_Array[j].x < 800 && Grass_Patch_Array[j].y < 800 && Grass_Patch_Array[j].x > 0 - 500 && Grass_Patch_Array[j].y > 0 - 500)
        {
            c.drawImage(Grass_Patch_Array[j].image,Grass_Patch_Array[j].x, Grass_Patch_Array[j].y, Grass_Patch_Array[j].size, Grass_Patch_Array[j].size);
        }
    }

    for(var j = In_Screen_Objects.length - 1; j >= 0; j--)
    {    
    	if(In_Screen_Objects[j].x < 800 && In_Screen_Objects[j].y < 800 && In_Screen_Objects[j].x > 0 - 500 && In_Screen_Objects[j].y > 0 - 500)
    	{

    	c.drawImage(In_Screen_Objects[j].image,In_Screen_Objects[j].x,In_Screen_Objects[j].y, In_Screen_Objects[j].width,In_Screen_Objects[j].height);
    }
    }

 for(var j = In_Screen_Objects.length - 1; j >= 0; j--)
    {    
      if(In_Screen_Objects[j].name == "large_Building")
      {
        for(var i = In_Screen_Objects.length - 1; i >= 0; i--)
        { 
          if(collides(i, j) == true)
          {
            if(In_Screen_Objects[i].name != "large_Building" && In_Screen_Objects[i].name != "Hero" && In_Screen_Objects[i].name != "mist")
            {
                In_Screen_Objects[i].height = 0;
            }

          }
        }
      }
    }


    c.drawImage(cloudshadow,0,0, 800,800);
  }

function collides(a, b)
{
    if (In_Screen_Objects[a].x < In_Screen_Objects[b].x + In_Screen_Objects[b].width &&
        In_Screen_Objects[a].x + In_Screen_Objects[a].width > In_Screen_Objects[b].x &&
        In_Screen_Objects[a].y < In_Screen_Objects[b].y + In_Screen_Objects[b].height &&
        In_Screen_Objects[a].y + In_Screen_Objects[a].height > In_Screen_Objects[b].y) return true;
}


  function setImage(){
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      var now = Date.now();
      var delta = now-then;

      update(delta/1000);
      render(ctx);

      then = now;



        bubbleSort(In_Game_objects);

      requestAnimationFrame(setImage);
  }

  var w = window;
  requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

  function start(){
  	console.log('starting');
  	then = Date.now();
      setImage();
  }

var tree_size = 100;
  function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  	//put stuff in here    (new Game_Object("Imagesource.jpg, x, y, width, height"))
  	function Load_Objects(){
  		for(var j = 20000; j >= 0; j--)
  		{  

        ran = getRndInteger(1,1)
        if(ran == 1)
        {
          In_Game_objects.push(new Game_Object("tree","https://opengameart.org/sites/default/files/_tree_01_prev_0.png",(getRndInteger(-10000,10000)),getRndInteger(-10000,10000),tree_size,tree_size, speed));

        }

        

        ran = getRndInteger(1,1)
        if(ran == 1)
        {
          In_Game_objects.push(new Game_Object("tree","https://opengameart.org/sites/default/files/_tree_14_prev.png",(getRndInteger(-10000,10000)),getRndInteger(-10000,10000),tree_size,tree_size, speed));

        }
        

        ran = getRndInteger(1,1)
        if(ran == 1)
        {
          In_Game_objects.push(new Game_Object("tree","https://opengameart.org/sites/default/files/_tree_09_prev.png",(getRndInteger(-10000,10000)),getRndInteger(-10000,10000),tree_size,tree_size, speed));

        }

        ran = getRndInteger(1,1)
        if(ran == 1)
        {
          In_Game_objects.push(new Game_Object("mist","img/Mist.png",(getRndInteger(-10000,10000)),getRndInteger(-10000,10000),500,tree_size, speed));

        }

        ran = getRndInteger(1,1)
        if(ran == 1)
        {
          In_Game_objects.push(new Game_Object("mist","img/Mist.png",(getRndInteger(-10000,10000)),getRndInteger(-10000,10000),600,tree_size, speed));

        }

        ran = getRndInteger(1,100)
        if(ran == 1)
        {
          //In_Game_objects.push(new Game_Object("tree","img/TallGrass.png",(getRndInteger(-10000,10000)),getRndInteger(-10000,10000),100,tree_size, speed));

        }








        ran = getRndInteger(1,100)
        if(ran == 1)
        {

          In_Game_objects.push(new Game_Object("tree","https://opengameart.org/sites/default/files/styles/medium/public/_tree_10_prev.png",(getRndInteger(-10000,10000)),getRndInteger(-10000,10000),tree_size,tree_size, speed));
                 
      }



        ran = getRndInteger(1,600)
        if(ran == 1)
        {
         In_Game_objects.push(new Game_Object("large_Building", "https://s-media-cache-ak0.pinimg.com/originals/c4/a5/2f/c4a52feaf91c2925cc56964121acc258.png",(getRndInteger(-10000,10000)),getRndInteger(-10000,10000),500,500, speed));

        }


        }
  




        In_Game_objects.push(new Game_Object("Hero","https://opengameart.org/sites/default/files/_tree_09_prev.png",400,400,tree_size,tree_size, 0));

        bubbleSort(In_Game_objects);
  	}


    function bubbleSort(items) {

    In_Screen_Objects = [];

    for(var j = In_Game_objects.length - 1; j >= 0; j--)
    {    
        if(items[j].x < 800 && items[j].y < 800 && items[j].x > 0 - 500&& items[j].y > 0 - 500)
        {
            In_Screen_Objects.push(items[j]);
        }
    }

  var length = In_Screen_Objects.length;

  for (var i = 0; i < length; i++) { //Number of passes
    for (var j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
      //Compare the adjacent positions
      if(In_Screen_Objects[j].y < In_Screen_Objects[j+1].y) {
        //Swap the numbers
        var tmp = In_Screen_Objects[j];  //Temporary variable to hold the current number
        In_Screen_Objects[j] = In_Screen_Objects[j+1]; //Replace current number with adjacent number
        In_Screen_Objects[j+1] = tmp; //Replace adjacent number with current number

        if(In_Screen_Objects[j].ImageSource == "img/Mist.png")
        {
          In_Screen_Objects[j].x += 0.01;
        }
      }      
    }  
  }
}

  	function Load_Grass(){

  	    for(var x = -100; x <= 100; x++)
  	    {
  	        for(var y = -100; y <= 100; y++)
  	        {
  	            Grass_Array.push(new Grass(x * 100, y * 100, 200, speed));
  	        }
  	    }
  	}

        function Load_Grass_Patch(){

      for(var j = 20000; j >= 0; j--)
      {  
        ran = getRndInteger(1,5)

        if(ran == 1)
        {
          Grass_Patch_Array.push(new Grass_Patch("img/grass_patch.png",(getRndInteger(-10000,10000)),getRndInteger(-10000,10000),500, speed));

        }

        ran = getRndInteger(1,5)
        if(ran == 1)
        {
          Grass_Patch_Array.push(new Grass_Patch("img/grass_patch_brown.png",(getRndInteger(-10000,10000)),getRndInteger(-10000,10000),500, speed));

        }

                ran = getRndInteger(1,5)
        if(ran == 1)
        {
          Grass_Patch_Array.push(new Grass_Patch("img/leaves.png",(getRndInteger(-10000,10000)),getRndInteger(-10000,10000),200, speed));

        }

      }

    }


Load_Grass_Patch();
  Load_Grass();
	Load_Objects();
 	start();


