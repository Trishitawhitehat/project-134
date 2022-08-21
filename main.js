var img = "";
var status = "";
var objects = [];
var alert_sound = "audio.mp3";

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(status = "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Baby Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected are : " + objects.length;
            alert_sound.stop();

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    } else(status != ""); {
        document.getElementById("status").innerHTML = "Status : Baby Not Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected are : " + objects.length;
            alert_sound.start();
        }
        if(objects.length < 0) {
            document.getElementById("status").innerHTML = "Status : Baby Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected are : " + objects.length;
            alert_sound.start();
        }
}

function modelLoaded() {
    console.log("Model Loaded");
    status =  true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(error);
    objects = results;
}