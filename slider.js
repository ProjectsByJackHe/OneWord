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
    var playSpeed = y

    
//observes property changes and adjusts speed accordingly.
    
var words = []
var text = ""

//Generate array of words based on user input
function getWords(){
    text = userInput.value
    words = text.split(" ")
}

userInput.oninput = function(){
    getWords()
}


//Make the SetInterval happen to generate words to show:


function start(){
    var myTimer = setInterval(showText, playSpeed)
    var willAcceptSliderInput = true
    speedInputRange.oninput = function(){
        wordSpeedLabel.innerHTML = willAcceptSliderInput
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
                display.innerHTML = words[index]
            
            let bool = (
            words[index].includes(",") || words[index].includes(".") ||
            words[index].includes("!") || words[index].includes("—") ||
            words[index].includes("?") || words[index].includes(";") ||
            words[index].includes(":")
                       )
            
            //do a setTimeOut if the current word includes period or comma:
            if (bool){
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
/*
function showText(){
    if (willPlay && words.length > 0 && index < words.length){
        display.innerHTML = words[index]
        index += 1
    }
}
*/