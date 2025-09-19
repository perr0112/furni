// scene.js

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let renderer, scene, camera, controls, mixer, rafId, clock;
let onResize;

export function initScene() {
  const canvas = document.querySelector("canvas.webgl");
  if (!canvas) {
    return;
  }

  if (renderer) return;

  scene = new THREE.Scene();
  clock = new THREE.Clock();

  const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.camera.far = 15;
  directionalLight.shadow.camera.left = -7;
  directionalLight.shadow.camera.top = 7;
  directionalLight.shadow.camera.right = 7;
  directionalLight.shadow.camera.bottom = -7;
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ color: "#444444", })
  );
  floor.receiveShadow = true;
  floor.rotation.x = -Math.PI * 0.5;
  scene.add(floor);

  // Camera
  const { clientWidth: cw, clientHeight: ch } = canvas.parentElement || canvas;
  camera = new THREE.PerspectiveCamera(50, cw / ch, 0.1, 100);
  camera.position.set(-2, 5, 10);
  scene.add(camera);

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(cw, ch);

  // Controls
  controls = new OrbitControls(camera, canvas);
  controls.target.set(1.5, 0, 0);
  controls.enableDamping = true;

  // Modèle
  const gltfLoader = new GLTFLoader();
  gltfLoader.load(
    "SheenChair.gltf",
    (gltf) => {
      mixer = new THREE.AnimationMixer(gltf.scene);
      gltf.scene.scale.setScalar(5);
      scene.add(gltf.scene);
    },
    undefined,
    (error) => console.error(error)
  );

  onResize = () => {
    const w = (canvas.parentElement || canvas).clientWidth || window.innerWidth;
    const h = (canvas.parentElement || canvas).clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  window.addEventListener("resize", onResize);

  const tick = () => {
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    controls.update();
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  };

  tick();
}
