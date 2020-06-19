var computerSequence =[];
var playerSequence =[];
var level = 1;
var lost = false;
var playersTurn = false;
var started = false



function nextSequence(){
 
    var num = Math.floor(Math.random() * 4);
    var color ="";
    switch (num){
        case 0:
            color = "green";
            break;
        case 1:
            color = "red";
            break;
        case 2:
            color = "yellow";
            break;
        case 3:
            color = "blue";
            break;
    }
    computerSequence.push(color);

    setTimeout(function(){playSequence(computerSequence);}, 1000);
    //playersTurn = true;
    
}

function createSound(sound){
    var audio = new Audio(sound);
    audio.play();

}



function checkMatch(a,b){

    if (a.toString() === b.toString()){
        playerSequence =[];
        nextSequence();
        level = level+1;
        setTimeout(function(){ $("h1").text("Level " + level.toString());}, 500);
        
    }else{
        lost = true;
        $("h1").text("You Lose");
        $("body").css("background-color","#7b1d1d");
        createSound('sounds/wrong.mp3');
        setTimeout(function(){$(".btn").addClass("pressed");}, 1000); 
        setTimeout(function(){playAgain();}, 2000);
        
    }

    
}

function playAgain(){
    var play = prompt("Would You like to play again? Y/N?");
    if (play.toUpperCase() === 'Y'){
               location.reload();
       }
}

function playSequence(){
    
    //toggleTurn();
    var delay = 0;
    var switchPlay = 0;

    playersTurn = false;
    

    for(var i = 0; i<computerSequence.length; i++){

      
            var b = computerSequence[i];
            delay = delay + 1000;

            switchPlay++;

            switch(b){
                case "green":
                    setTimeout(function(){createSound('sounds/green.mp3');}, delay);
                    setTimeout(function(){ $("#green").addClass("pressed");}, delay);
                    setTimeout(function(){ $("#green").removeClass("pressed");}, delay+300);
                    break;
                    
                case "red":
                    setTimeout(function(){createSound('sounds/red.mp3');}, delay); 
                    setTimeout(function(){ $("#red").addClass("pressed");}, delay);
                    setTimeout(function(){ $("#red").removeClass("pressed");}, delay+300); 
                    break;
                
                case "yellow":
                    setTimeout(function(){createSound('sounds/yellow.mp3');}, delay);                                       
                    setTimeout(function(){ $("#yellow").addClass("pressed");}, delay);
                    setTimeout(function(){ $("#yellow").removeClass("pressed");}, delay+300);
                    break;

                case "blue":
                    setTimeout(function(){createSound('sounds/blue.mp3');}, delay);                                                          
                    setTimeout(function(){ $("#blue").addClass("pressed");}, delay);
                    setTimeout(function(){ $("#blue").removeClass("pressed");}, delay+300);
                    break;
            }
    }

    //debugger;
    if (switchPlay === computerSequence.length){
        setTimeout(function(){toggleTurn();},delay+500);
    }
}


function playSingleSound(b){

            switch(b){
                case "green":
                    createSound('sounds/green.mp3');
                    setTimeout(function(){ $("#green").addClass("pressed");}, 200);
                    setTimeout(function(){ $("#green").removeClass("pressed");}, 400);
                    break;
                    
                case "red":
                    createSound('sounds/red.mp3');
                    setTimeout(function(){ $("#red").addClass("pressed");}, 200);
                    setTimeout(function(){ $("#red").removeClass("pressed");}, 400); 
                    break;
                
                case "yellow":
                    createSound('sounds/yellow.mp3');
                    setTimeout(function(){ $("#yellow").addClass("pressed");}, 200);
                    setTimeout(function(){ $("#yellow").removeClass("pressed");}, 400);
                    break;

                case "blue":
                    createSound('sounds/blue.mp3');
                    setTimeout(function(){ $("#blue").addClass("pressed");}, 500);
                    setTimeout(function(){ $("#blue").removeClass("pressed");}, 700);
                    break;
            }

    }

    function iterateSeq(k){
        //debugger;
        
        for(var p = 0; p<k; p++){
                /*if current index matches we are good*/
                if (playerSequence[p]===computerSequence[p]) {
                    continue;
                } else {
                    /*if not then lets send it to checkMatch to draw the error*/
                        checkMatch(playerSequence,computerSequence);
                }
        }

        /*we are checking for lost because you wont need to check again if you already lost thus bypassing the prompt of do you want to play again from reappearing 2x*/
        if((playerSequence.length === computerSequence.length) && (lost === false)){
            checkMatch(playerSequence,computerSequence);
        }
    }

    function toggleTurn(){
        if (playersTurn === true){
            playersTurn = false;
        }else{
            playersTurn = true;
        }

    }

/** Code below starts things off.  it calls an intro section while waiting for user input  **/

    function intro(){
        
        setTimeout(function(){ $("#green").addClass("pressed");}, 100);
        setTimeout(function(){ $("#green").removeClass("pressed");}, 200);
    
        setTimeout(function(){ $("#red").addClass("pressed");}, 300);
        setTimeout(function(){ $("#red").removeClass("pressed");}, 400); 

        setTimeout(function(){ $("#blue").addClass("pressed");}, 500);
        setTimeout(function(){ $("#blue").removeClass("pressed");}, 600);
    
        setTimeout(function(){ $("#yellow").addClass("pressed");}, 700);
        setTimeout(function(){ $("#yellow").removeClass("pressed");}, 800);
}


(function myLoop(i) {
    if(started === false){
        setTimeout(function() {
        intro(); //  your code here                
        if (--i) myLoop(i);   //  decrement i and call myLoop again if i > 0
        }, 1000)}
  })(999);  

$(".btn").click(function(){
/*listens for mouse clicks and pushes the suquence to the array*/
   //debugger;

   if(lost===false && playersTurn === true){
        playerSequence.push($(this).attr("id"));
        playSingleSound($(this).attr("id"));

        /*compare every click to computer sequence*/
        iterateSeq(playerSequence.length);
   }
   /*end the players turn when he selected the same number of colors as the computer*/
});

$(document).keyup(function(event){
    /*starts the game*/
    if(event.which === 32){
        started = true;
            if(lost===false && computerSequence.length===0){
                $("h1").text("Player Get Ready!!");
                setTimeout(function(){$("h1").text("Level " + level.toString());}, 800);
                setTimeout(function(){nextSequence();}, 2000);
            }
    }

});
/* start up for mobile*/

$(function(){
    $("#level-title.mobtab").bind("click",tapHandler);
    function tapHandler(){
        started = true;
        if(lost===false && computerSequence.length===0){
            $("h1").text("Player Get Ready!!");
            setTimeout(function(){$("h1").text("Level " + level.toString());}, 800);
            setTimeout(function(){nextSequence();}, 2000);
    }
    
    }
});


