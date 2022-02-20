import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {FirstPersonControls} from "three/examples/jsm/controls/FirstPersonControls";

// this entire script was made with great help from the guys behind https://threejs-journey.com

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
    width: 800,
    height: 600,
}

// Scene
const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xA9A9A9})
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    planeMaterial
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65
scene.add(plane)

// Object
/*const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    material
);
scene.add(mesh);*/

// from https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript/966938#966938
function createArray(length) {
    let arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        let args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

let spawner_array = createArray(30, 30);
let collector = new Array();
console.log(spawner_array)

// from https://stackoverflow.com/questions/10021847/for-loop-in-multidimensional-javascript-array
let flagx = 0.0;
let flagz = 0.0;
let mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.1, 0.1, 2, 2, 2),
    material
);
for(let i = 0; i < spawner_array.length; i++) {
    let inner = spawner_array[i];
    for (let j = 0; j < inner.length; j++) {
        mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.1, 0.1, 2, 2, 2),
            material
        );
        collector.push(mesh)
        mesh.position.z = flagz;
        mesh.position.x = flagx;
        flagz -= 0.12;
        scene.add(mesh);
    }
    flagz = 0.0
    mesh.position.x = flagx;
    flagx -= 0.12
}


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2;
/*const aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)

camera.position.x = 2 * 5
camera.position.y = 2.5 * 5
camera.position.z = 2 * 5
//camera.lookAt(mesh.position);*/
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true

//const controls = new FirstPersonControls(camera, canvas);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// Cursor
const cursor = {
    x: 0,
    y: 0,
};

/*window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);

    console.log(cursor.x, cursor.y);
});*/

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()
let currentIntersect = null
const rayOrigin = new THREE.Vector3(- 3, 0, 0)
const rayDirection = new THREE.Vector3(10, 0, 0)
rayDirection.normalize()

/**
 * Mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
})

window.addEventListener('click', () =>
{
    if(currentIntersect)
    {
        //currentIntersect.object.material.color.set('#ff0000')
        switch(currentIntersect.object)
        {
            case mesh:
                console.log('click on mesh')
                break
        }
    }
})

const tick = () => {
    // Cast a ray from the mouse and handle events
    raycaster.setFromCamera(mouse, camera)

    //const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(collector)
    for(const intersect of intersects)
        {
            intersect.object.material.color.set('#0000ff')
        }

        for(const object of collector)
        {
           if(!intersects.find(intersect => intersect.object === object))
           {
               object.material.color.set('#ff0000')
           }
        }

    // Render
    controls.update();
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
};

tick();