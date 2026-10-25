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

face.setAttribute("viewBox", "0 -45 200 245");

face.setAttribute(
  "aria-label",
  "Portrait of a black-yellow gradient witch hat and Bezier curve smile",
);

// Linear Gradient
const defs = document.createElementNS(svgNS, "defs");
const grad = document.createElementNS(svgNS, "linearGradient");
grad.setAttribute("id", "witch-gold-grad");
grad.setAttribute("x1", "0%");
grad.setAttribute("y1", "0%");
grad.setAttribute("x2", "100%");
grad.setAttribute("y2", "100%");

const stop1 = document.createElementNS(svgNS, "stop");
stop1.setAttribute("offset", "0%");
stop1.setAttribute("stop-color", "#14111a");

const stop2 = document.createElementNS(svgNS, "stop");
stop1.setAttribute("offset", "100%");
stop1.setAttribute("stop-color", "#f5d742");

grad.append(stop1, stop2);
defs.append(grad);
face.append(defs);

// Bezier Curve for Hat
const curvedHat = document.createElementNS(svgNS, "path");
curvedHat.setAttribute(
  "d",
  "M 25 38 Q 100 20 175 38 Q 145 32 135 28 Q 115 -15 130 -38 Q 85 -20 65 28 Q 55 32 25 38 Z",
);
curvedHat.setAttribute("fill", "url(#witch-gold-grad)");
curvedHat.setAttribute("stroke", "#14111a");
curvedHat.setAttribute("stroke-width", "3");
face.append(curvedHat);

// Bezier Curve for a smirk
const smileCurve = document.createElementNS(svgNS, "path");
smileCurve.setAttribute("d", "M 65 130 Q 100 165 135 125");
smileCurve.setAttribute("fill", "none");
smileCurve.setAttribute("stroke", "url(#witch-gold-grad)");
smileCurve.setAttribute("stroke-width", "6");
smileCurve.setAttribute("stroke-linecap", "round");
face.append(smileCurve);
