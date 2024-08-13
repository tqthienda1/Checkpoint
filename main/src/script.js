import "fs";

gsap.registerPlugin(MotionPathPlugin);
const car = document.getElementById("package2");

const tl = gsap.timeline();
var order = 1;
var tmp = 0;
const breakLine = "-------------------------------";

let time = 0;
function run(cp) {
  console.log(cp);
  switch (cp) {
    case 1:
      tl.to("#car", {
        duration: 1,
        ease: "none",
        motionPath: {
          path: "#motionPath1",
          align: "#motionPath1",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      });

      break;
    case 2:
      tl.to("#car", {
        duration: 2.5,
        ease: "none",
        motionPath: {
          path: "#motionPath2",
          align: "#motionPath2",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      });
      break;
    case 3:
      tl.to("#car", {
        duration: 1.4,
        ease: "none",
        motionPath: {
          path: "#motionPath3",
          align: "#motionPath3",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      });

      break;
    case 4:
      tl.to("#car", {
        duration: 1.8,
        ease: "none",
        motionPath: {
          path: "#motionPath4",
          align: "#motionPath4",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      });

      break;
    case 5:
      tl.to("#car", {
        duration: 1.7,
        ease: "none",
        motionPath: {
          path: "#motionPath5",
          align: "#motionPath5",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      });

      break;
    case 6:
      tl.to("#car", {
        duration: 1.9,
        ease: "none",
        motionPath: {
          path: "#motionPath6",
          align: "#motionPath6",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      });

      break;
    case 7:
      package2.style.zIndex = "4";

      tl.to("#car", {
        duration: 2,
        ease: "none",
        motionPath: {
          path: "#motionPath7",
          align: "#motionPath7",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      });

      break;
    case 8:
      tl.to("#car", {
        duration: 2.1,
        ease: "none",
        motionPath: {
          path: "#motionPath8",
          align: "#motionPath8",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      });
      break;
    case 9:
      tl.to("#car", {
        duration: 1.3,
        ease: "none",
        motionPath: {
          path: "#motionPath9",
          align: "#motionPath9",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      });
      break;
    case 10:
      tl.to("#car", {
        duration: 2,
        ease: "none",
        motionPath: {
          path: "#motionPath10",
          align: "#motionPath10",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      });

      break;
  }
}

function path() {
  document.getElementById("path" + order).style.visibility = "visible";
  document.getElementById("path" + order).style.animation =
    "dash 20s linear forwards";

  run(order);
  order++;
}

//Test animation
// const carAnimation = setInterval(path, 5000);

function resetPath(resetCheckpoint) {
  if (resetCheckpoint == 0) {
    fs.appendFile("result.txt", breakLine, (err) => {
      if (err) {
        console.log("Error while break to the next team !");
      }
    });
    location.reload();
    return;
  }
  const errorOrder = order;
  order = resetCheckpoint;

  //delete time of error checkpoints
  for (let i = 1; i <= errorOrder; i++) {
    if (i >= order) {
      document.getElementById("cp" + i).innerHTML = "";
    }
    document.getElementById("path" + i).style.visibility = "hidden";
  }
  document.getElementById("car").style.transform = "";

  //rerun to new checkpoint
  for (let i = 1; i <= order; i++) {
    document.getElementById("path" + i).style.visibility = "visible";
    document.getElementById("path" + i).style.animation =
      "dash 20s linear forwards";

    run(i);
  }

  console.log("Reset to " + order + " checkpoint successfully!");
}

var socket = new WebSocket("ws://192.168.4.1:81/");
socket.onopen = function (e) {
  console.log("Connect successfully !");
};
socket.onerror = function (e) {
  console.log("Cannot connect to server !");
};
socket.onmessage = function (e) {
  console.log("[socket data] " + e.data);
  const receive = e.data;
  const data = receive.split("|");
  if (data[0] == "reset") {
    resetPath(data[1]);
  } else {
    let cp = data[0];
    time = data[1];
    const delay = time - tmp;

    if (cp > 0 && cp <= 10 && cp == order && delay > 3000) {
      const cpElement = document.getElementById("cp" + order);
      cpElement.innerHTML = (time / 1000).toFixed(3) + "s";
      path();
      console.log(order);
      tmp = time;
      fs.appendFile("result.txt", order + time, (err) => {
        if (err) {
          console.log("Error while writing result !");
        }
      });
    }
  }
};

/*


Back up website
Things to do:
1. Send signal to esp32 from second website then, send signal from esp32 to main website
2. The signal or data contain the order of checkpoint you want to change (only go back).
After that, the main website will change the position of the car to start position, hide all the paths, then make the car go to the checkpoint was picked.
Time of checkpoints which are after the checkpoint was picked will be deleted. Set order variable to current checkpoint minus checkpoint was picked.
Initialize a temp variable with same value of order variable, then make the car go with that temp variable.


*/
