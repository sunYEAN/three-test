import {
    Scene,

    Mesh,
    Light,
    PointLight,
    AmbientLight,
    DirectionalLight,


    Geometry,
    BoxGeometry,

    // 材质
    MeshBasicMaterial,

    WebGLRenderer,

    PerspectiveCamera,
} from '../three';

const width = innerWidth;
const height = innerHeight;

const scene = new Scene();
const camera = new PerspectiveCamera(75, width/height, 0.1, 1000);
const renderer = new WebGLRenderer();

camera.position.z = 100;

renderer.setSize(width, height);

canvas.appendChild(renderer.domElement);


function createLight() {
    return new Light(0xffffff);
}

function createPointLight () {
    let light = new PointLight( 0xff0000, 1, 100 );
    light.position.set( 50, 50, 50 );
    return light;
}
function createBox () {
    let geometry = new BoxGeometry(50, 50, 50);
    let material = new MeshBasicMaterial({color: 0x333333});
    return new Mesh(geometry, material)
}

let box = createBox()

scene.add(box);
scene.add(createLight());
scene.add(createPointLight());

function render () {
    box.rotation.y += 0.02;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();
