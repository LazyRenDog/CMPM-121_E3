const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("role", "img");
face.setAttribute("aria-label", "A neutral face");

const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
head.setAttribute("cx", "100");
head.setAttribute("cy", "100");
head.setAttribute("rx", "78");
head.setAttribute("ry", "86");
head.setAttribute("fill", "#f3cf87");
head.setAttribute("stroke", "#302c29");
head.setAttribute("stroke-width", "4");
face.append(head);

const leftEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
leftEye.setAttribute("cx", "72");
leftEye.setAttribute("cy", "82");
leftEye.setAttribute("rx", "6");
leftEye.setAttribute("ry", "9");
leftEye.setAttribute("fill", "#302c29");
face.append(leftEye);

const rightEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
rightEye.setAttribute("cx", "128");
rightEye.setAttribute("cy", "82");
rightEye.setAttribute("rx", "6");
rightEye.setAttribute("ry", "9");
rightEye.setAttribute("fill", "#302c29");
face.append(rightEye);

const nose = document.createElementNS("http://www.w3.org/2000/svg", "line");
nose.setAttribute("x1", "100");
nose.setAttribute("y1", "96");
nose.setAttribute("x2", "96");
nose.setAttribute("y2", "112");
nose.setAttribute("stroke", "#302c29");
nose.setAttribute("stroke-width", "4");
nose.setAttribute("stroke-linecap", "round");
face.append(nose);

const mouth = document.createElementNS("http://www.w3.org/2000/svg", "line");
mouth.setAttribute("x1", "75");
mouth.setAttribute("y1", "137");
mouth.setAttribute("x2", "125");
mouth.setAttribute("y2", "137");
mouth.setAttribute("stroke", "#302c29");
mouth.setAttribute("stroke-width", "4");
mouth.setAttribute("stroke-linecap", "round");
face.append(mouth);

portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});

const svgNS = "http://www.w3.org/2000/svg";

// changing the text to show what face is showing
face.setAttribute(
  "aria-label",
  "Portrait with dark eyes, flowing black hair, and a witch hat",
);

// Black hair
for (let i = 0; i < 60; i++) {
  const strand = document.createElementNS(svgNS, "line");
  const startX = 35 + (i / 59) * 130; // just the top of head (x: 35 to 165 i think)
  const waveOffset = Math.sin(i * 0.5) * 8; // small wave at the bottom of the hair
  strand.setAttribute("x1", String(startX));
  strand.setAttribute("y1", "45");
  strand.setAttribute("x2", String(startX + waveOffset));
  strand.setAttribute("y2", "175");
  strand.setAttribute("stroke", "#18141c");
  strand.setAttribute("stroke-width", "4");
  strand.setAttribute("stroke-linecap", "round");
  face.prepend(strand); // to put it behind the black hat
}

// Eyes
const eyeCenters = [
  { x: 75, y: 95 },
  { x: 125, y: 95 },
];

for (const center of eyeCenters) {
  for (let i = 0; i < 15; i++) {
    const angle = (i / 15) * Math.PI * 2;
    const radius = i % 2 === 0 ? 5 : 2;
    const eyeOrb = document.createElementNS(svgNS, "circle");
    eyeOrb.setAttribute("cx", String(center.x + radius * Math.cos(angle)));
    eyeOrb.setAttribute("cy", String(center.y + radius * Math.cos(angle)));
    eyeOrb.setAttribute("r", "6");
    eyeOrb.setAttribute("fill", "#0d0814");
    face.append(eyeOrb);
  }
}

// Witch Hat
const hatCone = document.createElementNS(svgNS, "polygon");
hatCone.setAttribute("points", "100,2 55,62 145,62");
hatCone.setAttribute("fill", "#231f2b");
face.append(hatCone);

const hatBrim = document.createElementNS(svgNS, "ellipse");
hatBrim.setAttribute("cx", "100");
hatBrim.setAttribute("cy", "62");
hatBrim.setAttribute("rx", "70");
hatBrim.setAttribute("ry", "12");
hatBrim.setAttribute("fill", "#14111a");
face.append(hatBrim);
