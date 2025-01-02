// Firebase configuration - Production
const firebaseConfig = {
  apiKey: "AIzaSyCwd4EeDQmNp9aJ-Edmbh8j4rToVwPnirE",
  authDomain: "pinguwebsite-621ff.firebaseapp.com",
  databaseURL: "https://pinguwebsite-621ff-default-rtdb.firebaseio.com",
  projectId: "pinguwebsite-621ff",
  storageBucket: "pinguwebsite-621ff.firebasestorage.app",
  messagingSenderId: "1004345710660",
  appId: "1:1004345710660:web:a4428b75c9bf0dfc3a0411",
  measurementId: "G-JCPC81WKQE",
};

// Firebase configuration - Dev
// const firebaseConfig = {
//   apiKey: "AIzaSyCbB3q3guxplZHBeRIs_Y9AtR7XvdpmuJY",
//   authDomain: "pinguwebsitetestenv.firebaseapp.com",
//   projectId: "pinguwebsitetestenv",
//   storageBucket: "pinguwebsitetestenv.firebasestorage.app",
//   messagingSenderId: "169075309324",
//   appId: "1:169075309324:web:c875b02949e3aaaae92729",
//   measurementId: "G-NFV6K9RJH2"
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Example: Fetch global shots
const fetchGlobalShots = async () => {
  const snapshot = await db.ref("globalShots").once("value");
  return snapshot.exists() ? snapshot.val() : 0;
};

// Following cody is for CA copy functionality ---------------------------------------------------------
function copyToClipboard() {
  const copyText = document.getElementById("contract-address").textContent;
  navigator.clipboard.writeText(copyText).then(
    () => {
      const copyMessage = document.getElementById("copy-message");
      copyMessage.style.display = "inline";
      setTimeout(() => {
        copyMessage.style.display = "none";
      }, 2000);
    },
    (err) => {
      console.error("Could not copy text: ", err);
    }
  );
}

// Following for the Team Section --------------------------------------------------------- :
// document.querySelectorAll(".team-plus-icon").forEach((plus) => {
//   plus.addEventListener("click", function (event) {
//     event.stopPropagation();
//     document
//       .querySelectorAll(".team-box")
//       .forEach((m) => m.classList.remove("active"));
//     const teamBox = this.closest(".team-box");
//     teamBox.classList.add("active");
//   });
// });

// // Add this event listener for the team-content-wrapper
// document.querySelectorAll(".team-content-wrapper").forEach((wrapper) => {
//   wrapper.addEventListener("click", function (event) {
//     event.stopPropagation();
//     document
//       .querySelectorAll(".team-box")
//       .forEach((m) => m.classList.remove("active"));
//     const teamBox = this.closest(".team-box");
//     teamBox.classList.add("active");
//   });
// });

// document.querySelectorAll(".team-close-icon").forEach((close) => {
//   close.addEventListener("click", function (event) {
//     event.stopPropagation();
//     const teamBox = this.closest(".team-box");
//     teamBox.classList.remove("active");
//   });
// });

// Following is for the Video Section : ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".social-icon-shape").classList.add("new-fill-color");
});

// Toggle video play/pause functionality
function toggleVideo() {
  var video = document.getElementById("mainVideo");
  var controlButton = document.getElementById("videoControl");

  if (video.paused) {
    video.play().catch((error) => {
      console.log("Error playing video on toggle:", error);
    });
    controlButton.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    video.pause();
    controlButton.innerHTML = '<i class="fas fa-play"></i>';
  }
}

// Toggle video mute/unmute functionality
function toggleMute() {
  var video = document.getElementById("mainVideo");
  var muteButton = document.getElementById("muteControl");

  if (video.muted) {
    video.muted = false;
    muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    video.muted = true;
    muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

// Function to check if the video section covers less than 55% of the screen
function checkVideoSection() {
  const videoSection = document.querySelector(".video-section");
  const videoSectionRect = videoSection.getBoundingClientRect();
  const screenHeight = window.innerHeight;

  if (videoSectionRect.bottom < screenHeight * 0.55) {
    // slideUpHeroArea();
    window.removeEventListener("scroll", checkVideoSection); // Remove the event listener after triggering
  }
}

// Call this function when the video ends
// document.getElementById("mainVideo").addEventListener("ended", slideUpHeroArea);

// Following is for Loader : ---------------------------------------------------------
var $body = document.body,
  $wrap = document.getElementById("wrap"),
  videoSection = document.querySelector(".video-section"),
  mainVideo = document.getElementById("mainVideo"),
  videoControl = document.getElementById("videoControl"),
  muteControl = document.getElementById("muteControl"),
  areawidth = window.innerWidth,
  areaheight = window.innerHeight,
  canvassize = 500,
  length = 30,
  radius = 5.6,
  rotatevalue = 0.035,
  acceleration = 0,
  animatestep = 0,
  toend = false,
  pi2 = Math.PI * 2,
  group = new THREE.Group(),
  mesh,
  ringcover,
  ring,
  camera,
  scene,
  renderer;

camera = new THREE.PerspectiveCamera(65, 1, 1, 10000);
camera.position.z = 150;

scene = new THREE.Scene();
scene.add(group);

class CustomSinCurve extends THREE.Curve {
  constructor(scale) {
    super();
    this.scale = scale === undefined ? 1 : scale;
  }

  getPoint(t) {
    var x = length * Math.sin(pi2 * t);
    var y = radius * Math.cos(pi2 * 3 * t);
    var z, tt;
    tt = (t % 0.25) / 0.25;
    tt = (t % 0.25) - (2 * (1 - tt) * tt * -0.0185 + tt * tt * 0.25);
    if (Math.floor(t / 0.25) == 0 || Math.floor(t / 0.25) == 2) {
      tt *= -1;
    }
    z = radius * Math.sin(pi2 * 2 * (t - tt));
    return new THREE.Vector3(x, y, z).multiplyScalar(this.scale);
  }
}

mesh = new THREE.Mesh(
  new THREE.TubeGeometry(new CustomSinCurve(), 200, 1.1, 2, true),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
group.add(mesh);

ringcover = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 15, 1),
  new THREE.MeshBasicMaterial({
    color: 0x8a4f3a,
    opacity: 0,
    transparent: true,
  })
);
ringcover.position.x = length + 1;
ringcover.rotation.y = Math.PI / 2;
group.add(ringcover);

ring = new THREE.Mesh(
  new THREE.RingGeometry(4.3, 5.55, 32),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    opacity: 0,
    transparent: true,
  })
);
ring.position.x = length + 1.1;
ring.rotation.y = Math.PI / 2;
group.add(ring);

(function () {
  var plain, i;
  for (i = 0; i < 10; i++) {
    plain = new THREE.Mesh(
      new THREE.PlaneGeometry(length * 2 + 1, radius * 3, 1),
      new THREE.MeshBasicMaterial({
        color: 0x8a4f3a,
        transparent: true,
        opacity: 0.13,
      })
    );
    plain.position.z = -2.5 + i * 0.5;
    group.add(plain);
  }
})();

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvassize, canvassize);
renderer.setClearColor("#8a4f3a");

$wrap.appendChild(renderer.domElement);

$body.addEventListener("mousedown", start, false);
$body.addEventListener("touchstart", start, false);
$body.addEventListener("mouseup", back, false);
$body.addEventListener("touchend", back, false);

animate();

function start() {
  toend = true;
}

function back() {
  toend = false;
}

function render() {
  var progress;
  animatestep = Math.max(
    0,
    Math.min(240, toend ? animatestep + 1 : animatestep - 4)
  );
  acceleration = easing(animatestep, 0, 1, 240);
  if (acceleration > 0.35) {
    progress = (acceleration - 0.35) / 0.65;
    group.rotation.y = (-Math.PI / 2) * progress;
    group.position.z = 50 * progress;
    progress = Math.max(0, (acceleration - 0.97) / 0.03);
    mesh.material.opacity = 1 - progress;
    ringcover.material.opacity = ring.material.opacity = progress;
    ring.scale.x = ring.scale.y = 0.9 + 0.1 * progress;
  }
  renderer.render(scene, camera);
}

function animate() {
  mesh.rotation.x += rotatevalue + acceleration;
  render();
  requestAnimationFrame(animate);
}

function easing(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
  return (c / 2) * ((t -= 2) * t * t + 2) + b;
}

mainVideo.addEventListener("canplaythrough", endAnimation);
setTimeout(endAnimation, 10000);

function endAnimation() {
  $wrap.style.display = "none";
  videoSection.style.display = "block";
}

// Slide up effect on the 'Hero Area' -------------------------------------------------------------------------------------------
// function slideUpHeroArea() {
//   const heroArea = document.getElementById("heroArea");
//   heroArea.classList.add("active");
// }

// Call this function when the page is scrolled
window.addEventListener("scroll", checkVideoSection);

// Prompt to rotate phone for users in portrait mode --------------------------------------------------------------
// Update the function to check if 75% or 80% of the video section is visible
// Define a flag to track if the rotate prompt has been manually closed
let rotatePromptClosed = false;

// Check the video section visibility on scroll
function checkVideoSectionVisibility() {
  const videoSection = document.querySelector(".video-section");
  const rotatePrompt = document.getElementById("rotatePrompt");
  const videoSectionRect = videoSection.getBoundingClientRect();
  const videoSectionHeight = videoSectionRect.height;

  // Check if 75% or 80% of the video section is visible
  if (
    (videoSectionRect.top < window.innerHeight * 0.25 &&
      videoSectionRect.bottom > window.innerHeight * 0.75) ||
    (videoSectionRect.top < window.innerHeight * 0.2 &&
      videoSectionRect.bottom > window.innerHeight * 0.8)
  ) {
    checkOrientation(); // Call the orientation check only if the video section is mostly visible
  } else {
    rotatePrompt.style.display = "none";
  }
}

function checkOrientation() {
  const videoSection = document.querySelector(".video-section");
  const rotatePrompt = document.getElementById("rotatePrompt");

  if (rotatePromptClosed) {
    rotatePrompt.style.display = "none";
    return; // Exit the function if the prompt has been manually closed
  }

  if (window.innerHeight > window.innerWidth) {
    // Portrait mode
    const videoSectionRect = videoSection.getBoundingClientRect();
    if (
      videoSectionRect.top < window.innerHeight &&
      videoSectionRect.bottom > 0
    ) {
      rotatePrompt.style.display = "block";
    } else {
      rotatePrompt.style.display = "none";
    }
  } else {
    // Landscape mode
    rotatePrompt.style.display = "none";
  }
}

// Initial call to check visibility and orientation on page load
window.addEventListener("load", checkVideoSectionVisibility);

// Check visibility and orientation on resize
window.addEventListener("resize", checkVideoSectionVisibility);
window.addEventListener("orientationchange", checkVideoSectionVisibility);

// Check video section visibility on scroll
window.addEventListener("scroll", checkVideoSectionVisibility);

// Close rotate prompt on click
document.getElementById("closeRotatePrompt").addEventListener("click", () => {
  rotatePromptClosed = true; // Set the flag to true when the user closes the prompt
  document.getElementById("rotatePrompt").style.display = "none";
});

//-----------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", async () => {
  const isMobile = () => /Mobi|Android/i.test(navigator.userAgent);

  // Mobile view adjustments
  if (isMobile()) {
    document.getElementById("infoContainer1").style.display = "none";
    document.getElementById("infoContainerMobile").style.display = "block";
  }

  // DOM Elements
  const gunScope = document.getElementById("gunScope");
  const globalShotCounter = document.getElementById("globalShotCounter");
  const shotCounter = document.getElementById("shotCount");
  const topScorerInfo = document.getElementById("topScorerInfo");
  const mobileShotCount = document.getElementById("mobileShotCount");
  const mobileGlobalCounter = document.getElementById("mobileGlobalCounter");

  // State Variables
  let shotsFired = 0;
  let globalShotsFired = 0;
  const updateQueue = { globalShots: 0, leaderboard: {} };

  // Hide the default cursor and update gun scope position
  document.body.style.cursor = "none";
  document.addEventListener("mousemove", (e) => {
    gunScope.style.left = `${e.clientX}px`;
    gunScope.style.top = `${e.clientY}px`;
  });

  const sanitizeKey = (key) => key.replace(/\./g, "-");

  // Fetch user IP and geographical data
  const fetchIPData = async () => {
    const response = await fetch("https://ipv4.icanhazip.com/");
    const ip = (await response.text()).trim();
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await geoResponse.json();
    return {
      ip: data.ip,
      country: data.country_name,
      countryCode: data.country_code.toLowerCase(),
    };
  };

  // Fetch initial data from the database
  const fetchInitialData = async () => {
    const [globalShots, topScorerSnapshot] = await Promise.all([
      db.ref("globalShots").once("value"),
      db.ref("topScorer").once("value"),
    ]);

    globalShotsFired = globalShots.exists() ? globalShots.val() : 0;
    globalShotCounter.textContent = `Global Shots: ${globalShotsFired}`;
    mobileGlobalCounter.textContent = `Global : ${globalShotsFired}`;

    const sanitizedIP = sanitizeKey(ip);

    document.getElementById("currentIpAddress").textContent = sanitizedIP;
    document.getElementById("mobileipAddress").textContent = sanitizedIP;
    const ipScoreSnapshot = await db
      .ref(`scoresByIP/${sanitizedIP}/totalScore`)
      .once("value");
    const ipScore = ipScoreSnapshot.exists() ? ipScoreSnapshot.val() : 0;

    console.log(`Your Score (by IP): ${ipScore}`);
    shotsFired = ipScore;
    shotCounter.textContent = ipScore;
    mobileShotCount.textContent = ipScore;

    const topScorer = topScorerSnapshot.exists()
      ? topScorerSnapshot.val()
      : null;
    if (topScorer) {
      if (topScorer.countryCode) {
        const flagUrl = `https://flagcdn.com/w40/${topScorer.countryCode}.png`;
        topScorerInfo.innerHTML = `Top Shooter: ${topScorer.score} <img src="${flagUrl}" alt="${topScorer.country}" style="height: 20px; vertical-align: middle;"> `;

        // Followng is for mobile only :
        document.getElementById(
          "mobileTopScorer"
        ).innerHTML = `Top: ${topScorer.score}  <img src="${flagUrl}" alt="${topScorer.country}" style="height: 10px; vertical-align: middle;"> `;
      } else {
        topScorerInfo.textContent = `Top Shooter:${topScorer.score}  ${topScorer.country} `;
        // Followng is for mobile only :
        document.getElementById(
          "mobileTopScorer"
        ).textContent = `Top: ${topScorer.score}`;
      }
    }
  };

  const batchUpdateDatabase = async () => {
    const updates = {};
    let potentialTopScorer = null,
      increment = null;

    // Update globalShots
    if (updateQueue.globalShots > 0) {
      increment = updateQueue.globalShots;
      updateQueue.globalShots = 0;

      // Use transaction to safely increment globalShots
      // This is important for when multiple users are updating simultaneously
      await db
        .ref("globalShots")
        .transaction((current) => (current || 0) + increment);
    }

    // Update leaderboard for a specific country
    if (
      updateQueue.leaderboard &&
      Object.keys(updateQueue.leaderboard).length > 0
    ) {
      const specificCountry = country; // Get the specific country
      const leaderboardPath = `leaderboard/${specificCountry}`;

      // Perform transaction for the specific country
      await db
        .ref(leaderboardPath)
        .transaction((current) => (current || 0) + increment);
    }

    // Update scoresByIP if needed
    if (ip) {
      const sanitizedIP = sanitizeKey(ip);
      const userScorePath = `scoresByIP/${sanitizedIP}`;

      updates[userScorePath] = {
        country,
        countryCode,
        totalScore: shotsFired,
      };

      // Push updates for scoresByIP
      await db.ref().update(updates);

      // Update potential top scorer
      potentialTopScorer = {
        ip,
        country,
        countryCode,
        score: shotsFired,
      };
    }

    if (potentialTopScorer) {
      // Update the top scorer info display
      const prevTopScorerSnapshot = await db.ref("topScorer").once("value");
      const prevTopScorer = prevTopScorerSnapshot.val();
      if (potentialTopScorer.score > prevTopScorer.score) {
        await db.ref("topScorer").transaction((current) => potentialTopScorer);
        if (potentialTopScorer.countryCode) {
          const flagUrl = `https://flagcdn.com/w40/${potentialTopScorer.countryCode}.png`;
          topScorerInfo.innerHTML = `Top Shooter: ${potentialTopScorer.score} <img src="${flagUrl}" alt="${potentialTopScorer.country}" style="height: 20px; vertical-align: middle;">`;

          // Followng is for mobile only :
          document.getElementById(
            "mobileTopScorer"
          ).innerHTML = `Top: ${potentialTopScorer.score}  <img src="${flagUrl}" alt="${potentialTopScorer.country}" style="height: 10px; vertical-align: middle;"> `;
        } else {
          topScorerInfo.textContent = `Top Shooter: ${potentialTopScorer.country} ${potentialTopScorer.score}`;
        }
      }
    }
  };

  // Periodically update the database
  setInterval(batchUpdateDatabase, 2000);

  const createAnimation = (x, y, animationSrc, size = 350, section) => {
    // Create a wrapper div
    size = 20;
    const wrapper = document.createElement("div");
    wrapper.style.position = "absolute"; // Ensure positioning is relative to the section
    wrapper.style.left = `${x - size / 2}px`; // Center horizontally
    wrapper.style.top = `${y - size / 2}px`;
    wrapper.style.width = `${size}px`;
    wrapper.style.height = `${size}px`;
    wrapper.style.pointerEvents = "none";
    wrapper.style.zIndex = "1000"; // Ensure this value is higher than any section's z-index

    // Create the image element
    const img = document.createElement("img");
    img.src = "animations/bullet_hole.png"; // Animation image path
    img.style.width = "100%"; // Fill the wrapper
    img.style.height = "100%"; // Fill the wrapper
    img.style.objectFit = "contain"; // Ensure proper aspect ratio

    // Create the audio element
    const audio = document.createElement("audio");
    audio.src = "animations/muzzle-flash-audio.mp3"; // Replace with your audio file path
    audio.autoplay = true;
    audio.style.display = "none"; // Hide audio element visually
    // Remove the audio element after playback
    audio.addEventListener("ended", () => {
      wrapper.removeChild(audio); // Remove the audio element only
    });
    // Append image and audio to the wrapper
    wrapper.appendChild(img);
    wrapper.appendChild(audio);

    // Append wrapper to the clicked section
    section.appendChild(wrapper);

    // Remove the animation after it completes
  };

  const { ip, country, countryCode } = await fetchIPData();
  await fetchInitialData();

  document.addEventListener("click", (e) => {
    shotsFired++;
    globalShotsFired++;
    updateQueue.globalShots++;
    updateQueue.leaderboard[country] =
      (updateQueue.leaderboard[country] || 0) + 1;

    shotCounter.textContent = shotsFired;
    mobileShotCount.textContent = shotsFired;
    globalShotCounter.textContent = `Global Shots: ${globalShotsFired}`;
    mobileGlobalCounter.textContent = `Global: ${globalShotsFired}`;

    // Update global counter instantly
    updateQueue.scoresByIP = {
      ip: shotsFired,
      country,
      countryCode,
    };

    const clickedSection =
      document.elementFromPoint(e.clientX, e.clientY).closest("section") ||
      document.body;
    const sectionRect = clickedSection.getBoundingClientRect();
    const relativeX = e.clientX - sectionRect.left;
    const relativeY = e.clientY - sectionRect.top;

    createAnimation(
      relativeX,
      relativeY,
      "animations/muzzle-flash.webm",
      350,
      clickedSection
    );
    console.log(`Shots Fired : ${shotsFired}`);
  });
});

//---------------------------------------------------
// Function to check if an element is partially in the viewport
function isPartiallyInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right > 0
  );
}

// Add an event listener for scroll
document.addEventListener("scroll", () => {
  const stampingText = document.querySelectorAll(".overlay-stamping-text");
  stampingText.forEach((text) => {
    if (isPartiallyInViewport(text)) {
      text.classList.add("active");
    } else {
      text.classList.remove("active");
    }
  });
});

// Trigger the animation on page load if already partially in viewport
document.addEventListener("DOMContentLoaded", () => {
  const stampingText = document.querySelectorAll(".overlay-stamping-text");
  stampingText.forEach((text) => {
    if (isPartiallyInViewport(text)) {
      text.classList.add("active");
    }
  });
});
