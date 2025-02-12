import * as THREE from 'three';


const scene = new THREE.Scene();

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Camera
const camera = new THREE.PerspectiveCamera(  // PerspectiveCamera
    75, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
);
camera.position.z = 3;


// Light
// basic light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0x090EE90, 4);
light.position.set(1, 4, 1);
scene.add(light);

const lightTwo = new THREE.DirectionalLight(0xffffff, 1);
lightTwo.position.set(1, -4, 1);
scene.add(lightTwo);



const geometry = new THREE.OctahedronGeometry(1);
const textureLoader = new THREE.TextureLoader();

const albedoMap = textureLoader.load('https://www.kim-dekker.nl/assets/textures/task_albedo.jpeg');
const normalMap = textureLoader.load('https://www.kim-dekker.nl/assets/textures/task_normal.jpeg');
const roughnessMap = textureLoader.load('https://www.kim-dekker.nl/assets/textures/task_roughness.jpeg');

const material = new THREE.MeshStandardMaterial({
    map: albedoMap,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
    roughness: 1.5,
    metalness: 1,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

cube.scale.set(0.6, 1, 0.6)



// Animation loop
renderer.setAnimationLoop(() => {

    // cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
});


// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
