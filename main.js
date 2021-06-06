prediction_1 = "" ;
prediction_2 = "" ;

Webcam.set({
   width : 350 ,
   height : 300 ,
   image_format : "png" ,
   png_quality : 90 
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id ='captured_img' src='"+data_uri+"'>";
    })
}

console.log("ML5 Version : " , ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/u-pr3fDl4/model.json" , modelLoaded);

function modelLoaded() {
     console.log("Model Loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first Prediction is " + prediction_1 ;
    speak_data_2 = " and The second Prediction is " + prediction_2 ;
    var utter_this = new SpeechSynthesisUtterance (speak_data_1 + speak_data_2);
    synth.speak(utter_this);
}

function check() {
    img = document.getElementById("captured_img");
    classifier.classify(img , gotResult);
}

function gotResult(error , results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
        prediction_1 = results[0].label ;
        prediction_2 = results[1].label ;
        speak();
        if (results[0].label == "Happy") {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }
        if (results[0].label == "Sad") {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if (results[0].label == "Angry") {
            document.getElementById("update_emoji").innerHTML = "&#128545;";
        }
        if (results[0].label == "Shocking") {
            document.getElementById("update_emoji").innerHTML = "&#128559;";
        }
        if (results[0].label == "Crying") {
            document.getElementById("update_emoji").innerHTML = "&#128546;";
        }
        if (results[1].label == "Happy") {
            document.getElementById("update_emoji_2").innerHTML = "&#128522;";
        }
        if (results[1].label == "Sad") {
            document.getElementById("update_emoji_2").innerHTML = "&#128532;";
        }
        if (results[1].label == "Angry") {
            document.getElementById("update_emoji_2").innerHTML = "&#128545;";
        }
        if (results[1].label == "Shocking") {
            document.getElementById("update_emoji_2").innerHTML = "&#128559;";
        }
        if (results[1].label == "crying") {
            document.getElementById("update_emoji_2").innerHTML = "&#128546;";
        }
    }
}