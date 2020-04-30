import {

    BackSide,


    Mesh,

    /*场景*/
    Scene,

    /*相机*/
    PerspectiveCamera,


    /*几何形状*/
    Geometry,
    BoxGeometry,
    BoxBufferGeometry,
    PlaneBufferGeometry,
    SphereBufferGeometry,
    TorusKnotBufferGeometry,

    Vector3,

    /*renderer*/
    WebGLRenderer,

    PointLight,
    AmbientLight,
    RectAreaLight,
    DirectionalLight,

    PointLightHelper,
    DirectionalLightHelper,

    MeshBasicMaterial,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
} from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {RectAreaLightUniformsLib} from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

const widht = innerWidth;
const height = innerHeight;
const origin = new Vector3();

const scene = new Scene();
const camera = new PerspectiveCamera(75, widht/height, 1, 1000);
const renderer = new WebGLRenderer();

const control = new OrbitControls(camera, renderer.domElement);


renderer.setSize(widht, height);
renderer.shadowMap.enabled = true;

document.querySelector('#canvas').appendChild(renderer.domElement);


camera.position.z = 10;


control.update();


function createBox() {
    let geometry = new BoxGeometry(1, 1, 1);
    let material = new MeshBasicMaterial({color: 0x555555});
    let box = new Mesh(geometry, material);
    scene.add(box);
    return box;
}

function createAmbientLight() {
    let ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
}

function createPointLight() {
    let pointLight = new PointLight(0xffff00, 0.5);
    let pointLightHelper = new PointLightHelper(pointLight, 0.1);
    scene.add(pointLight);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLightHelper);
}


function createDirectionLight() {
    let directionLight = new DirectionalLight(0xffffff, 0.5);
    let directionLightHelper = new DirectionalLightHelper(directionLight, 0.1);
    scene.add(directionLight);
    directionLight.position.set(-2, 2, 2);
    directionLight.rotation.x = 45;
    scene.add(directionLightHelper);
}

function createRectAreaLight() {
    RectAreaLightUniformsLib.init();
    let rectAreaLight = new RectAreaLight(0xffffff, 3, 3, 3);
    rectAreaLight.position.set(2, 2, 0);
    scene.add(rectAreaLight);
    return rectAreaLight;
}


function createPlane(RectLight) {
    let geometry = new PlaneBufferGeometry();
    let material = new MeshBasicMaterial({side: BackSide});
    let rectLightMesh = new Mesh(geometry, material);
    rectLightMesh.scale.x = RectLight.width;
    rectLightMesh.scale.y = RectLight.height;

    RectLight.add( rectLightMesh );

    let rectLightMeshBack = new Mesh(
        new PlaneBufferGeometry(),
        new MeshBasicMaterial({color: 0x999999})
    );
    rectLightMesh.add(rectLightMeshBack);

    return rectLightMesh;
}


function createStandard () {

    let standard = new Mesh(
        new BoxBufferGeometry(100, 0.1, 100),
        new MeshStandardMaterial({
            color: 0x808080,
            roughness: 0,
        })
    );
    scene.add(standard);

    let standardBox = new Mesh(
        new BoxBufferGeometry(0.5, 0.5, 0.5),
        new MeshStandardMaterial({
            color: 0xa00000,
            roughness: 0
        })
    );
    standardBox.position.set(1,1,0);
    scene.add(standardBox);
}


function createSphere () {
    let standardSphere = new Mesh(
        new SphereBufferGeometry(0.5, 20, 20),
        new MeshStandardMaterial({
            color: 0xa00000,
            roughness: 0
        })
    );
    standardSphere.position.set(0,1,0);
    scene.add(standardSphere);
}

function createTorus () {
    let standardTorus = new Mesh(
        new TorusKnotBufferGeometry(0.5, 0.2, 100, 15),
        new MeshStandardMaterial({
            color: 0xa00000,
            roughness: 0
        })
    );
    standardTorus.position.set(-2,1,0);
    standardTorus.castShadow = true;
    standardTorus.receiveShadow = true;

    scene.add(standardTorus);
}

const box = createBox();

box.position.y = 2;


// 灯光
createPointLight();
createAmbientLight();
createDirectionLight();
const rectLight = createRectAreaLight();
const plane = createPlane(rectLight);
plane.position.set(0,0,0);

rectLight.rotation.x = 45;
createStandard();
createSphere();
createTorus();

function render () {

    requestAnimationFrame(render);

    let t = ( Date.now() / 2000 ),
        r = 4.0,
        lx = r * Math.cos( t ),
        lz = r * Math.sin( t );

    rectLight.position.set(lx, 2, lz);
    rectLight.lookAt( origin );
    renderer.render(scene, camera);
}


render();
