let handPose;
let video;
let hands = [];

function preload() {
  handPose = ml5.handPose({ flipped:true });
}

function gotHands(results) {
  hands = results;
}

function mousePressed() {
  console.log(hands);
}

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO, { flipped:true });
  video.size(640, 480);
  video.hide();

  handPose.detectStart(video, gotHands);
}

function draw() {
  background(0);
  image(video, 0, 0, width, height);

  for (let i=0; i<hands.length; i++) {
    let hand = hands[i];

    // get dist of thumb and index
    // let thumb_index_dist = dist(hand.keypoints[4].x, hand.keypoints[4].y, hand.keypoints[8].x, hand.keypoints[8].y);
    // if (thumb_index_dist < 25) {
    //   tint(255, 60);
    // } else {
    //   tint(255, 255);
    // }

    let palm_pinky_dist = dist(hand.keypoints[0].x, hand.keypoints[0].y, hand.keypoints[20].x, hand.keypoints[20].y);
    let palm_thumb_dist = dist(hand.keypoints[0].x, hand.keypoints[0].y, hand.keypoints[4].x, hand.keypoints[4].y);
    let thumbPointUp = (hand.keypoints[4].y > hand.keypoints[0].y) ? false : true;

    if (palm_pinky_dist < palm_thumb_dist / 2) {
      if (thumbPointUp) {
        console.log("thumbs up");
        fill(0, 255, 0);
      } else {
        console.log("thumbs down");
        fill(255, 0, 0);
      }
    } else {
      fill(255);
    }



    for (let j=0; j<hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];

      if (hand.confidence > 0.1) {
        // fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
}
