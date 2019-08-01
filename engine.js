var text = ""
        var arrayOfText = [[]]
        var words = []
        var isEnglish = true
        var progressTracker = document.getElementById("progressTracker")
        function set() { 
            text = ""
            arrayOfText = [[]]
            words = []
            isEnglish = true
                text = document.getElementById("input").value
                    //document.write(text)
            var index = 0
            for (i = 0; i < text.length; i++){
                if (text[i] == " ") {
                    arrayOfText.push([])
                    index += 1
                }
                else {
                    arrayOfText[index].push(text[i])
                } 
            }
            
            for (j = 0; j < arrayOfText.length; j++){
                words.push(arrayOfText[j].join(""))
            }
        }
    
    function setChina(){
        text = ""
        arrayOfText = [[]]
        words = []
        isEnglish = false
        text = document.getElementById("input").value
        for (i = 0; i < text.length; i++){
            if (text[i] != " "){
                words.push(text[i])
            }
        }
    }
        
    var isExecuting = true  
    
    function reset(){
        if (!isExecuting){
            count = 0
            text = ""
            document.getElementById("display").innerHTML = "Sample text"
            arrayOfText = [[]]
            words = []
            isExecuting = true
            progressTracker.innerHTML = "0 / 0"
            document.getElementById("input").value = ""
        }
    }
       
    var count = 0 //index for the array of words.
    var playSpeed = 170
    var isPaused = true 
    var pauseCount = 1 
    
    function changeSpeeds(){
        playSpeed = 1000
        document.getElementById("debugLabel").innerHTML = "Words per second: " + playSpeed
    }
    
    function pause() { //new function for pausing
            pauseCount += 1
            if (pauseCount%2 == 0){
                document.getElementById("pauseDisplay").innerHTML = "Play"
                isPaused = false
            }
            else {
                document.getElementById("pauseDisplay").innerHTML = "Pause"
                isPaused = true
            }
    }
        
    function next(){ //function for right arrow
        if (isPaused == false){
            if (count < words.length - 1){
                count += 1
            }
            document.getElementById("display").innerHTML = words[count]
        }
    }
    
    function prev(){ //function for left arrow
        if (isPaused == false){
           if (count > 0){
            count -= 1
           }
            document.getElementById("display").innerHTML = words[count]
        }
    }
    
    document.onkeydown = function(event){
        switch(event.keyCode){
            case 37:
                prev();
                break;
            case 39:
                next();
                break;
        }
    }    
        
        
    function play() {
        var myTimer = setInterval(printWords, playSpeed)
        function printWords(){    
            if (count == words.length - 1){
                //document.write("executed" + "\n")
                isExecuting = false
                clearInterval(myTimer)
            }
            if (isEnglish && isExecuting) {
                if (arrayOfText[count].includes(".") || arrayOfText[count].includes(",") || arrayOfText[count].includes("!") || arrayOfText[count].includes("—") || arrayOfText[count].includes("?") || arrayOfText[count].includes(";") || arrayOfText[count].includes(":") ||
                arrayOfText[count].includes("-")){
                  display()
                }
            }
            //diplay the javascript to html on line 128.
            document.getElementById("display").innerHTML = words[count]
            progressTracker.innerHTML = count + 1 + " / " + words.length
            
            if (isPaused){
                count += 1
            }
        }
            
        function display(){
          clearInterval(myTimer)
          setTimeout(function(){
             play()
          }, 720)
        }
    }