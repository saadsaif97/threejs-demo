import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "./orbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(20);

renderer.render(scene, camera);

// const geometry = new THREE.DodecahedronGeometry(12, 3);
// const material = new THREE.MeshStandardMaterial( {color: 0xff347} );
// const cone = new THREE.Mesh( geometry, material );
// scene.add( cone );

const moonTexture = new THREE.TextureLoader().load("./moon.jpg");
const normalTexture = new THREE.TextureLoader().load("./normal.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
scene.add(moon);

moon.position.x = 10;
moon.position.z = 5;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// helpers
// const gridHelper = new THREE.GridHelper(200, 50)
// const lightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
// controls.autoRotateSpeed = 1;
scene.add(controls);

function animate() {
  requestAnimationFrame(animate);

  // cone.rotation.y += 0.01

  moon.rotation.y += 0.005;

  controls.update();

  renderer.render(scene, camera);
}
animate();

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// we can also add a callback to run when static image loaded
const spaceTexture = new THREE.TextureLoader().load("./space.jpg");
scene.background = spaceTexture;
scene.background = spaceTexture;

document.getElementById("bg").onscroll = (e) => {
  console.log(e.target);
  // controls.rotateSpeed =
};

// function moveCamera() {
//   const t = document.body.getBoundingClientRect().top
//   moon.rotation.x += 0.05
//   moon.rotation.y += 0.075
//   moon.rotation.z += 0.05

//   camera.position.x = t * -0.01
//   camera.position.y = t * -0.0002
//   camera.position.z = t * -0.0002

//   console.log('scroll')
// }

// document.body.addEventListener('scroll', moveCamera)

let scrollPercent = 0;

document.body.onscroll = () => {
  //calculate the current scroll progress as a percentage
  scrollPercent =
    ((document.documentElement.scrollTop || document.body.scrollTop) /
      ((document.documentElement.scrollHeight || document.body.scrollHeight) -
        document.documentElement.clientHeight)) *
    100;
  document.getElementById("scrollPercent").innerText =
    "Scroll Progress : " + scrollPercent.toFixed(2);

    moon.rotation.x = scrollPercent * 2
    moon.rotation.y = scrollPercent * 2
};