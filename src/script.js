import "./style.css";
import * as THREE from "three";

// CANVAS
const canvas = document.querySelector(".canvas");

// SCENE
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/4.png");

// PARTICLES

// Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 3000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 15;
  colors[i] = Math.random();
}

// for (let i = 0; i < count * 3; i++) {
//   if (i % 3 === 2) {
//     positions[i] = -0.5;
//   } else {
//     positions[i] = (Math.random() - 0.5) * 10;
//     colors[i] = Math.random();
//   }
// }

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  transparent: true,
  alphaMap: particleTexture,
  //   alphaTest: 0.001,
  //   depthTest: false,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
});

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

const geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.05, 32);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

const topLeftCoin = new THREE.Mesh(geometry, material);
topLeftCoin.position.y = 1;
topLeftCoin.position.x -= 1.5;
topLeftCoin.rotation.x = Math.PI * 0.5;

const topCenterCoin = new THREE.Mesh(geometry, material);
topCenterCoin.position.y = 1.5;
topCenterCoin.position.x = 0;
topCenterCoin.rotation.x = Math.PI * 0.5;

const topRightCoin = new THREE.Mesh(geometry, material);
topRightCoin.position.y = 1;
topRightCoin.position.x = 1.5;
topRightCoin.rotation.x = Math.PI * 0.5;

scene.add(topLeftCoin);
scene.add(topCenterCoin);
scene.add(topRightCoin);

const bottomLeftCoin = new THREE.Mesh(geometry, material);
bottomLeftCoin.position.y = -1;
bottomLeftCoin.position.x -= 1.5;
bottomLeftCoin.rotation.x = Math.PI * 0.5;

const bottomCenterCoin = new THREE.Mesh(geometry, material);
bottomCenterCoin.position.y = -1.5;
bottomCenterCoin.position.x = 0;
bottomCenterCoin.rotation.x = Math.PI * 0.5;

const bottomRightCoin = new THREE.Mesh(geometry, material);
bottomRightCoin.position.y = -1;
bottomRightCoin.position.x = 1.5;
bottomRightCoin.rotation.x = Math.PI * 0.5;

scene.add(bottomLeftCoin);
scene.add(bottomCenterCoin);
scene.add(bottomRightCoin);

// Sizes

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// LIGHTS

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);

// Renderer;

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

// Clock
const clock = new THREE.Clock();

// Animations
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();

  topLeftCoin.rotation.z = elapsedTime * 0.2;
  topCenterCoin.rotation.z = elapsedTime * 0.2;
  topRightCoin.rotation.z = elapsedTime * 0.2;

  bottomLeftCoin.rotation.z = elapsedTime * 0.2;
  bottomCenterCoin.rotation.z = elapsedTime * 0.2;
  bottomRightCoin.rotation.z = elapsedTime * 0.2;

  // Update particles
  particles.rotation.y = elapsedTime * 0.05;

  particlesGeometry.attributes.position.needsUpdate = true;

  // Update objects
  //   camera.position.y = Math.sin(elapsedTime);
  //   camera.position.x = Math.cos(elapsedTime);
  //   camera.lookAt(mesh.position);

  // render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
