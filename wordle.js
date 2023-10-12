var gameGridArray = [[],[],[],[]] ;//game array
var arrayRow = 0;
var arrayCol = 0;
var currentWord = "NULL"
var currentHint =""
let gameDict = []
let gameOver = false;
const alphabetList = new Set(  
["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
);

//updates the game grid to show what is in gameGridArray
function updateGriddy(grid){
    for(let x = 0; x < 4; x++){
        for(let y =0;y<4;y++){
            const box = document.getElementById(`box${x}${y}`);
            box.textContent = grid[x][y];
        }
    }
}


//async function that reutrns dictionary of words
async function getDict(){
    const dict = [
        {
          word: "Nerd",
          hint: "You may be considered one, if you like Star Trek"
        },
        {
          word: "Word",
          hint: "What you're trying to guess in this game"
        },
        {
          word: "Game",
          hint: "What you're playing right now"
        },
        {
          word: "Hint",
          hint: "Clue to help you guess the word"
        },
        {
          word: "Play",
          hint: "What you do in a game"
        },
        {
          word: "Four",
          hint: "Number of letters in each word"
        },
        {
          word: "Guess",
          hint: "What you do to find the secret word"
        },
        {
          word: "Time",
          hint: "What you have to complete the game"
        },
        {
          word: "Hint",
          hint: "A clue that may lead to the word"
        },
        {
          word: "Easy",
          hint: "Not difficult"
        },
        {
          word: "Hard",
          hint: "Challenging or tough"
        },
        {
          word: "Fish",
          hint: "An aquatic creature"
        },
        {
          word: "Tree",
          hint: "A tall, woody plant"
        },
        {
          word: "Moon",
          hint: "Earth's natural satellite"
        },
        {
          word: "Rain",
          hint: "Water falling from the sky"
        },
        {
          word: "Star",
          hint: "A luminous celestial object"
        },
        {
          word: "Mars",
          hint: "The red planet"
        },
        {
          word: "Gold",
          hint: "A precious metal"
        },
        {
          word: "Wind",
          hint: "Moving air"
        },
        {
          word: "Fire",
          hint: "A source of heat and light"
        },
        {
          word: "Wave",
          hint: "An oscillation in the ocean"
        },
        {
          word: "Book",
          hint: "A written or printed work"
        },
        {
          word: "Rain",
          hint: "What falls from the sky when it's wet"
        },
        {
          word: "Lion",
          hint: "King of the jungle"
        },
        {
          word: "Ship",
          hint: "A large water vessel"
        },
        {
          word: "Bear",
          hint: "A furry mammal in the forest"
        },
        {
          word: "Tree",
          hint: "A natural source of shade"
        },
        {
          word: "Star",
          hint: "What shines in the night sky"
        },
        {
          word: "Hand",
          hint: "What you use to hold things"
        },
        {
          word: "Band",
          hint: "A musical group"
        },
        {
          word: "Hike",
          hint: "What you do in the mountains"
        },
        {
          word: "Jump",
          hint: "What you do off a trampoline"
        },
        {
          word: "Kite",
          hint: "What flies in the sky on a string"
        },
        {
          word: "Lamp",
          hint: "A source of light"
        },
        {
          word: "Road",
          hint: "Where you drive your car"
        },
        {
          word: "Song",
          hint: "What you sing in the shower"
        },
        {
          word: "Wave",
          hint: "What you do at a passing friend"
        },
        {
          word: "Yard",
          hint: "The area around your house"
        },
        {
          word: "Time",
          hint: "What you can't get back"
        },
      ];
      
    return dict;
    
}
//gets the dictionary and starts up game when loaded
document.addEventListener("DOMContentLoaded",async ()=>{

    gameDict = await getDict();
    //remove load bar
    document.getElementById("loadBar").style.display = "none";

    setup(gameDict);//starts game
    



})
//resets the board and board variables and generates a new word
function reset(dict){
    for(let x = 0; x < 4; x++){
        for(let y =0;y<4;y++){
            gameGridArray[x][y] = "";
            var element = document.getElementById(`box${x}${y}`);
            element.classList.remove("empty");
            element.classList.remove("right");
            element.classList.remove("exist");

        }
    }
    var dictLen = Object.keys(dict).length;
    var randNum = Number.parseInt(Math.random() * dictLen);
    currentWord = dict[randNum].word;
    currentHint = dict[randNum].hint;
    arrayRow = 0;
    arrayCol = 0;



}
//called when user tries word and will display the correct color for the box
function rowChanger(lastRow = false){
    var numSucc = 0; //checks number of right characters

    for(var x =0;x<4;x++){
        var element = document.getElementById(`box${arrayRow}${x}`);

        var currentLetter = gameGridArray[arrayRow][x].toLowerCase();
        var checkLetter = currentWord.charAt(x).toLowerCase();

        //checks if letter is right
        if(currentLetter == checkLetter){
            element.classList.add("right")
            numSucc +=1;
        }
        //checks if letter is inside of word
        else if( currentWord.includes(currentLetter) ){
            element.classList.add("exist")

        }
        else{
            element.classList.add("empty")

        }
    }   

    if(numSucc == 4){// if user guessses word correctly 
        document.getElementById("mainBoxList").style.display = "none";
        document.getElementById("congratImg").style.display = "block";
        document.getElementById("winMessage").style.display = "block";
        document.getElementById("hint").classList.add("hidden");
        document.getElementById("winMessage").innerHTML = `You guessed the word <b>${currentWord}</b> correctly!`;

    }else if(lastRow == true){//last row and user did not solve
        document.getElementById("hint").classList.add("hidden");
        document.getElementById("fail").classList.remove("hidden");

        document.getElementById("fail").innerHTML = `You missed the word <b>${currentWord}</b> and lost!`;

    }


}

function setup(dict){
    
    const gameGrid = document.getElementById('gameGrid');

    
    gameDict = dict;

    document.getElementById("restart").disabled = false;

    reset(gameDict);
    
    document.getElementById('restart').onclick = function(){
        //resets board and game
        reset(gameDict);
        //updates grid
        updateGriddy(gameGridArray);
        // unfocuses button so enterkey remains functional
        document.activeElement.blur(); 
        document.getElementById("mainBoxList").style.display = "block";
        document.getElementById("congratImg").style.display = "none";
        document.getElementById("hint").classList.add("hidden");
        document.getElementById("winMessage").style.display = "none";
        document.getElementById("fail").classList.add("hidden");


        
    }
    //hint button click
    document.getElementById("hintButton").onclick = function(){
        document.activeElement.blur(); 
        document.getElementById("hint").classList.toggle("hidden");
        document.getElementById("hint").innerHTML = `<cite>hint: </cite> ${currentHint}`;
    }

    //instruction Button  click
    document.getElementById("instructionButton").onclick = function(){
        document.activeElement.blur(); 
        document.getElementById("infoBox").classList.toggle("hidden");

    }

    document.getElementById("darkModeButton").onclick = function(){
        document.body.classList.toggle("dark");
        
    }

    //Checking for keypresses
    document.addEventListener("keydown",(event) =>{
        var name = event.key;
        var code = event.code;
        
        //checks for letter keypress
        if(alphabetList.has(name) && arrayCol <4){
            gameGridArray[arrayRow][arrayCol] = name;
            arrayCol += 1;
        }
        //checking for backspace
        else if(name == "Backspace" && arrayCol > 0 && arrayCol<=4){
            arrayCol -=1;
            gameGridArray[arrayRow][arrayCol] = "";
            
        }

        //checking for enter
        else if(name == "Enter"){
            if(arrayCol == 4 && arrayRow < 3){
                rowChanger();
                arrayCol = 0;
                arrayRow +=1
    }
        else if (arrayCol == 4 && arrayRow ==3 ){
            rowChanger(lastRow = true)
            arrayCol = 0;
            arrayRow +=1
        }

        else{
            window.alert("first complete the word")
        }
        

        }
        
        updateGriddy(gameGridArray);
    
    },false);
    

}


