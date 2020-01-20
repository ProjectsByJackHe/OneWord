//Get the elements from the view
var userInput = document.getElementById("input")
var display = document.getElementById("display")
var speedInputRange = document.getElementById("myRange")
var wordSpeedLabel = document.getElementById("speedLabel")
var playButton = document.getElementById("playButton")
var autoPause = document.getElementById("auto")
var helpButton = document.getElementById("helper")
var secondHelpButton = document.getElementById("helper2")
var clearTextArea = document.getElementById("clear")
var restart = document.getElementById("restart")
var controlPanel = document.getElementById("userInputContainer")
var wordCount = document.getElementById("wordCount")
var progressBar = document.getElementById("progressBar")


// const colors = ["red", "green", "blue", "yellow", "purple"]
// for (var i = 0; i < 5; i++){
//     document.getElementById(i).innerHTML = i
//     document.getElementById(i).style.backgroundColor = colors[i]
// }

//mathmatical calculation for words per minute:
    let currentValue = speedInputRange.value
    let x = (currentValue/60000)*1000
    let y = 1000/x
    var playSpeed = y

//observes property changes and adjusts speed and size accordingly.
function observeChangeSize(){
   // display.innerHTML = document.body.clientWidth;
    if (document.body.clientWidth < 1100){
        controlPanel.style.height = "430px"
        autoPause.style.fontSize = "20px"
        wordSpeedLabel.style.fontSize = "20px"
        display.style.fontSize = "90px"
        helpButton.style.fontSize = "13px"
        helpButton.style.width = "5px"
        wordCount.style.fontSize = "20px"
    }
    else {
        controlPanel.style.height = "400px"
        autoPause.style.fontSize = "30px"
        wordSpeedLabel.style.fontSize = "30px"
        display.style.fontSize = "150px"
        helpButton.style.fontSize = "35px"
        helpButton.style.width = "auto"
        wordCount.style.fontSize = "30px"
    }
}

observeChangeSize()

var words = []
var text = ""
var autoPauseEnabled = false

//Generate array of words based on user input
function getWords(){
    text = userInput.value
    words = text.split(" ")
    wordCount.innerHTML = "Count: " + "0 / " + words.length
    progressBar.max = String(words.length)
}

userInput.oninput = function(){
    getWords()
}

function willEnableAutoPause(){
    if (autoPause.innerHTML == "Enable Auto-Pause"){
            autoPause.innerHTML = "Disable Auto-Pause"
            autoPauseEnabled = true
            autoPause.style.backgroundColor = "lightgrey"
        }
    else {
        autoPause.innerHTML = "Enable Auto-Pause"
        autoPauseEnabled = false
        autoPause.style.backgroundColor = "white"
    }
}


//Make the SetInterval happen to generate words to show:
var START_INDEX = 0

function start(){
    var myTimer = setInterval(showText, playSpeed)
    var willAcceptSliderInput = true
    speedInputRange.oninput = function(){
        wordSpeedLabel.innerHTML = "Speed: " + this.value + " wpm"
        if (willAcceptSliderInput){
            let currentValue = this.value
            let x = (currentValue/60000)*1000
            let y = 1000/x
            playSpeed = y
            clearInterval(myTimer)
            start() //initializer #1
        }
    }
    
        function showText(){
        if (willPlay && words.length > 0 && index < words.length){
            
            //update the view 
            display.innerHTML = words[index]
            wordCount.innerHTML = "Count: " + (index + 1) + " / " +words.length 
            progressBar.value = String(index + 1)
            wordSpeedLabel.innerHTML = "Speed: " + speedInputRange.value + " wpm" 
            
            // const NUM_WORDS = 50
            // var wordsOnScreen = ""
            // if (index%NUM_WORDS == 0){
            //     START_INDEX = index
            //     paragraph.innerHTML = ""
            // }
            // for (var i = START_INDEX; i < index; i++){
            //     if (i < words.length){
            //         wordsOnScreen += words[i] + " "
            //     }
            // }
            // paragraph.innerHTML = wordsOnScreen

            const NUM_WORDS = 51
            var x = 0
            if (index % NUM_WORDS === 0){
                START_INDEX = 0
                for (var i = index; i < index + NUM_WORDS; i++){
                    if (i < words.length){
                        document.getElementById(x).innerHTML = words[i]
                        document.getElementById(x).style.backgroundColor = "white"
                        x++
                    }
                    else{
                        document.getElementById(x).innerHTML = ""
                        x++
                    }
                }
            }
            if (START_INDEX < NUM_WORDS){
                document.getElementById(START_INDEX).style.backgroundColor = "yellow"
                // uncomment in order to enable 1 word traversals:
                if (START_INDEX > 0) {
                    document.getElementById(START_INDEX - 1).style.backgroundColor = "white"
                }
            }
            START_INDEX++

            let bool = (
            words[index].includes(",") || words[index].includes(".") ||
            words[index].includes("!") || words[index].includes("—") ||
            words[index].includes("?") || words[index].includes(";") ||
            words[index].includes(":")
                       )
            
            //do a setTimeOut if the current word includes period or comma:
            if (bool && autoPauseEnabled){
                clearInterval(myTimer)
                willAcceptSliderInput = false
                setTimeout(start, 1000) //initializer #2
            }
            index += 1
        }
    }
}

start()

var index = 0
var willPlay = false

//features and functionality--

function playAgain(){
    //styling--
    restart.style.backgroundColor = "lightgrey"
    setTimeout(function(){restart.style.backgroundColor = "white"}, 90)
    //--code
    index = 0
    START_INDEX = 0
    if (words.length > 0){
        display.innerHTML = words[index]
        progressBar.value = String(index)
        wordCount.innerHTML = "Count: " + index + " / " + words.length
    }
    // 51 represents how many spans there are on the screen
    for (var j = 0; j < 51; j++){
        document.getElementById(j).innerHTML = ""
        document.getElementById(j).style.backgroundColor = "white"
    }
}

function clearAll(){
    //styling--
    clearTextArea.style.backgroundColor = "lightgrey"
    setTimeout(function(){clearTextArea.style.backgroundColor = "white"}, 90)
    //--code
    userInput.value = ""
    willPlay = false
    index = 0
    words = []
    display.innerHTML = ""
    wordCount.innerHTML = "Count: " + "0 / " + words.length
    progressBar.value = "0"
    START_INDEX = 0
    let spans = 51
    for (var x = 0; x < spans; x++){
        document.getElementById(x).innerHTML = ""
        document.getElementById(x).style.backgroundColor = "white"
    }
}
//--for restart and reset buttons.

//code to enable key-board controls:
document.onkeydown = function(event){
switch(event.keyCode){
    case 37:
        temporarilyDisableSliderControl()
        prev();
        break;
    case 39:
        temporarilyDisableSliderControl()
        next();
        break;
    case 32:
        let isBoxSelected = document.activeElement.nodeName == 'TEXTAREA'
            if (!isBoxSelected) {
                playButton.disabled = true
                restart.disabled = true
                clearTextArea.disabled = true
                helpButton.disabled = true
                secondHelpButton.disabled = true
                autoPause.disabled = true
                setTimeout(function(){playButton.disabled = false;
                restart.disabled = false; clearTextArea.disabled = false;           helpButton.disabled = false;secondHelpButton.disabled = false
                autoPause.disabled = false;                     
            },1)
                play()
            }
        break;
    }
}

function temporarilyDisableSliderControl(){
    speedInputRange.disabled = true
    setTimeout(function(){speedInputRange.disabled = false},1)
}

//Go to next word:
function next(){
    if (!willPlay && START_INDEX < 50 && index < words.length){ 
        // incrment index by 1, render the display with new count, show next word in the words array. 
        index += 1
        wordCount.innerHTML = "Count: " + (index + 1) + " / " + words.length 
        progressBar.value = String(index + 1)
        display.innerHTML = words[index]
    }
    if (START_INDEX < 50 && !willPlay && index <= words.length && words.length > 0){
        // increment the LOCAL index by 1
        START_INDEX++
        document.getElementById(START_INDEX).style.backgroundColor = "aqua"
        document.getElementById(START_INDEX - 1).style.backgroundColor = "white"
        if (START_INDEX > 1){
           document.getElementById(START_INDEX - 2).style.backgroundColor = "white"
        }
    }
}

//Go back to previous word:
function prev(){
    if (!willPlay && START_INDEX > 0 && !willPlay && index > 0){
        // Decrease the index by 1, render the display 
        index -= 1
        wordCount.innerHTML = "Count: " + (index + 1) + " / " + words.length 
        progressBar.value = String(index + 1)
        display.innerHTML = words[index]
    }
    if (START_INDEX > 0 && !willPlay && index >= 0 && words.length > 0){
        // decrease the LOCAL index by 1
        START_INDEX--
        document.getElementById(START_INDEX).style.backgroundColor = "aqua"
        document.getElementById(START_INDEX + 1).style.backgroundColor = "white"
    }
}
//code to enable key-board control

function play(){  
    if (playButton.innerHTML == "▶"){
        willPlay = true
        playButton.innerHTML = "❚❚"
        playButton.style.backgroundColor = "lightgrey"
    }
    else{
        willPlay = false
        playButton.innerHTML = "▶"
        playButton.style.backgroundColor = "white"
    }
}

//code for the pop-up manual:
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  var isPopUpManualOpen = false
  
function openPopUp() {
    modal.style.display = "block";
    setTimeout(function(){isPopUpManualOpen = true}, 1)
}
        
span.onclick = function() {
    modal.style.display = "none";
}

document.onclick = function(){
    if (isPopUpManualOpen){
        modal.style.display = "none";
        isPopUpManualOpen = false;
    }
}
//code for the pop-up manual