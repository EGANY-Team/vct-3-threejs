import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  BoxBufferGeometry,
  MeshPhongMaterial,
  TextureLoader,
  RepeatWrapping,
  Mesh,
  DirectionalLight,
  HemisphereLight
} from "three"; // import necessary components

import iceTexture from "./textures/ice.jpg"; // ice cube texture image

const threejsContainer = document.getElementById("threejs"); // get container
let scene,
  camera,
  geometry,
  texture,
  material,
  cube,
  renderer,
  hemiLight,
  dirLight;

// setup geometry (box)
geometry = new BoxBufferGeometry(1, 1, 1);

// setup texture
texture = new TextureLoader().load(iceTexture); // load texture
texture.wrapS = texture.wrapT = RepeatWrapping; // set wrapping mode to repeat
// setup material with reflective light
material = new MeshPhongMaterial({
  map: texture,
  reflectivity: 1
});

// create 3D object (ice cube)
cube = new Mesh(geometry, material);

// setup lights
dirLight = new DirectionalLight("#ce7c5f", 1.4);
dirLight.position.set(1, 1, 1);
hemiLight = new HemisphereLight("#afe273", "#f4dcc6", 0.5);

// create and add everything to the scene
scene = new Scene();
scene.add(cube, dirLight, hemiLight);

// setup camera
camera = new PerspectiveCamera(50, innerWidth / 2 / innerHeight, 1, 1000);
camera.position.z = 3; // move camera back 3 units

// setup renderer (using WebGL)
renderer = new WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(innerWidth / 2, innerHeight);
renderer.gammaOutput = true; // realistic lighting effect

renderer.setAnimationLoop(() => {
  // rotate ice cube
  let speed = 0.01;
  cube.rotation.x += speed;
  cube.rotation.y += speed;
  cube.rotation.z += speed;

  // render
  renderer.render(scene, camera);
});

// add result to container
threejsContainer.appendChild(renderer.domElement);
