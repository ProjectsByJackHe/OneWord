//Get the elements from the view
var userInput = document.getElementById("input")
var display = document.getElementById("display")
var speedInputRange = document.getElementById("myRange")
var wordSpeedLabel = document.getElementById("debugLabel")
var playButton = document.getElementById("playButton")
var progressTracker = document.getElementById("progressTracker")
//mathmatical calculation for words per minute:
    let currentValue = speedInputRange.value
    let x = (currentValue/60000)*1000
    let y = 1000/x
    display.innerHTML = y
    var playSpeed = y

    
//observes property changes and adjusts speed accordingly.
    
var words = []
var text = ""

//Generate array of words based on user input
function getWords(){
    text = userInput.value
    words = text.split(" ")
    wordSpeedLabel.innerHTML = words
}

userInput.oninput = function(){
    getWords()
}


//Make the SetInterval happen to generate words to show:
function start(){
    var myTimer = setInterval(showText, playSpeed)
    speedInputRange.oninput = function(){
        let currentValue = this.value
        let x = (currentValue/60000)*1000
        let y = 1000/x
        display.innerHTML = y
        playSpeed = y
        clearInterval(myTimer)
        start()
    }
}

start()

var index = 0
var willPlay = false

function play(){  
    if (playButton.innerHTML == "Play"){
        willPlay = true
        playButton.innerHTML = "Pause"
    }
    else{
        willPlay = false
        playButton.innerHTML = "Play"
    }
}

function showText(){
    if (willPlay){
        index += 1
        progressTracker.innerHTML = index
    }
}
