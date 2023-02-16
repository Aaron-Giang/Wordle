var gameGridArray = [[],[],[],[]] ;//game array
var arrayRow = 0;
var arrayCol = 0;
var currentWord = "NULL"
var currentHint =""
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
    const res = await fetch("https://api.masoudkf.com/v1/wordle", {
    headers: {"x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",},});

    const dict = await res.json();

    return dict;
    
}
//gets the dictionary and starts up game when loaded
document.addEventListener("DOMContentLoaded",async ()=>{
    let dict = {};

    try{
        dict = await getDict();
    }catch(e){
        console.log("error");
        console.log(e);
    }


    gameDict = dict.dictionary;
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

    console.log(currentWord);
    console.log(currentHint);


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


    console.log(numSucc);
}

function setup(dict){
    
    const gameGrid = document.getElementById('gameGrid');

    
    gameDict = dict;

    document.getElementById("restart").disabled = false;
    console.log(gameDict)

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
            console.log("backed");
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
        console.log(gameGridArray[arrayRow]);
        console.log(arrayRow);
    
    },false);
    

}


