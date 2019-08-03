//Get the elements from the view
var userInput = document.getElementById("input")
var display = document.getElementById("display")
var speedInputRange = document.getElementById("myRange")
var wordSpeedLabel = document.getElementById("speedLabel")
var playButton = document.getElementById("playButton")
var autoPause = document.getElementById("auto")
var helpButton = document.getElementById("helper")
var clearTextArea = document.getElementById("clear")
var restart = document.getElementById("restart")
var controlPanel = document.getElementById("userInputContainer")
var wordCount = document.getElementById("wordCount")
var progressBar = document.getElementById("progressBar")


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
        display.style.fontSize = "75px"
        helpButton.style.fontSize = "13px"
        helpButton.style.width = "5px"
        wordCount.style.fontSize = "20px"
    }
    else {
        controlPanel.style.height = "400px"
        autoPause.style.fontSize = "30px"
        wordSpeedLabel.style.fontSize = "30px"
        display.style.fontSize = "100px"
        helpButton.style.fontSize = "35px"
        helpButton.style.width = "auto"
        wordCount.style.fontSize = "30px"
    }
}

setInterval(observeChangeSize, 200)

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
            autoPause.style.backgroundColor = "yellow"
        }
    else {
        autoPause.innerHTML = "Enable Auto-Pause"
        autoPauseEnabled = false
        autoPause.style.backgroundColor = "greenyellow"
    }
}


//Make the SetInterval happen to generate words to show:


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
    restart.style.backgroundColor = "yellow"
    setTimeout(function(){restart.style.backgroundColor = "greenyellow"}, 90)
    //--code
    index = 0
    if (words.length > 0){
        display.innerHTML = words[index]
    }
}

function clearAll(){
    //styling--
    clearTextArea.style.backgroundColor = "yellow"
    setTimeout(function(){clearTextArea.style.backgroundColor = "red"}, 90)
    //--code
    userInput.value = ""
    willPlay = false
    index = 0
    words = []
    display.innerHTML = ""
    wordCount.innerHTML = "Count: " + "0 / " + words.length
    progressBar.value = "0"
}
//--for restart and reset buttons.


function play(){  
    if (playButton.innerHTML == "▶"){
        willPlay = true
        playButton.innerHTML = "❚❚"
        playButton.style.backgroundColor = "yellow"
    }
    else{
        willPlay = false
        playButton.innerHTML = "▶"
        playButton.style.backgroundColor = "greenyellow"
    }
}