song="";
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(600,500);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("Posenet is Initialised");
}
left_wrist_x=0;
right_wrist_x=0;
left_wrist_y=0;
right_wrist_y=0;
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        left_wrist_x=results[0].pose.leftWrist.x;
        left_wrist_y=results[0].pose.leftWrist.y;
        right_wrist_x=results[0].pose.rightWrist.x;
        right_wrist_y=results[0].pose.rightWrist.y;
        console.log("Left Wrist X="+left_wrist_x+"Left Wrist Y="+left_wrist_y);
        console.log("Right Wrist X="+right_wrist_x+"Right Wrist Y="+right_wrist_y);
       score_left_wrist=results[0].pose.keypoints[9].score;
       console.log(score_left_wrist);
       score_right_wrist=results[0].pose.keypoints[10].score;
       console.log(score_right_wrist);

    }
}
score_left_wrist=0;
score_right_wrist=0;

function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("black");
    
    if(score_left_wrist>0.2){
        circle(left_wrist_x,left_wrist_y,20);
        number=Number(left_wrist_y);
        remove_decimal=floor(number);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="Volume: "+volume;
        song.setVolume(volume);
    }
    if(score_right_wrist>0.2){
        fill("blue");
        stroke("black");
        circle(right_wrist_x,right_wrist_y,20);
        if(right_wrist_y>0 && right_wrist_y<100){
document.getElementById("speed").innerHTML="Speed=0.5x"
song.rate(0.5);
        }
        else if(right_wrist_y>100 && right_wrist_y<200){
            document.getElementById("speed").innerHTML="Speed=1.0x"
            song.rate(1);
                    }
                    else if(right_wrist_y>200 && right_wrist_y<300){
                        document.getElementById("speed").innerHTML="Speed=1.5x"
                        song.rate(1.5);
                                }
                                else if(right_wrist_y>300 && right_wrist_y<400){
                                    document.getElementById("speed").innerHTML="Speed=2.0x"
                                    song.rate(2);
                                            }
                                            else if(right_wrist_y>400){
                                                document.getElementById("speed").innerHTML="Speed=2.5x"
                                                song.rate(2.5);
                                                        }
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}