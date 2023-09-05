 prediction_1 = "" ;
 prediction_2 = "" ;

 Webcam.set({
    width : 350 ,
    height : 300 ,
    image_format : "png" ,
    png_quality : 90 
 });

 camera = document.getElementById("camera") ;

 Webcam.attach(camera) ;

 function picture() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='capimage' src='"+data_uri+"'/>" ;
    });
 }

 console.log("ml5 version", ml5.version );

 classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/voquKIRTM/model.json", modelloaded ) ; 

 function modelloaded() {
    console.log("model loaded ");
 }

 function speak() {
    synth = window.speechSynthesis ;
    speak_data_1 = "The first prediction is " + prediction_1 ; 
    speak_data_2 = "The second prediction is "+ prediction_2 ;
    utterthis = new SpeechSynthesisUtterance( speak_data_1 + speak_data_2) ; 
    synth.speak(utterthis) ;
 }

 function check() {
    comimg = document.getElementById("capimage") ; 
     classifier.classify(comimg ,gotresult) ;
 }

 function gotresult(error , result ) {
   if(error){
      console.log(error);
   }else{
      console.log(result);

     document.getElementById("result_emotion_name").innerHTML = result[0].label ; 
     document.getElementById("result_emotion_name2").innerHTML = result[1].label ; 

     prediction_1 = result[0].label ; 
     prediction_2 = result[1].label ;
     speak();

     if (result[0].label == "Happy") {
      document.getElementById("emoji1").innerHTML = "&#128522;";
     }

     if (result[0].label == "Sad") {
      document.getElementById("emoji1").innerHTML = "&#128532;";
     }

     if (result[0].label == "Confused") {
      document.getElementById("emoji1").innerHTML = "&#128546;";
     }

     if (result[1].label == "Happy") {
       document.getElementById("emoji2").innerHTML = "&#128522;";
     }

     if (result[1].label == "Sad") {
      document.getElementById("emoji2").innerHTML = "&#128532;";
     }

     if (result[1].label == "Confused") {
      document.getElementById("emoji2").innerHTML = "&#128546;";
    }
   }
   

 }