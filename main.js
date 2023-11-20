song_1="";
song_2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;

function preload(){
song_1=loadSound("music.mp3");
song_2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}

function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.1)
    {
    circle(leftWristX,leftWristY,20);
    song_1.play();
    song_2.stop();
    document.getElementById("song_name_button").innerHTML=" Song 1 is playing ";
    
}
}

function gotPoses(results){
if(results.length>0){
    console.log(results);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = " + scoreLeftWrist);

    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
}

}