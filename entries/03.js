import {
    /*形状*/
    Line,
    Mesh,
    Points,
    LineSegments,


    /*光源*/
    SpotLight,
    PointLight,
    AmbientLight,
    DirectionalLight,

    Geometry,
    BoxGeometry,
    BoxBufferGeometry,
    PlaneGeometry, // 面材质
    CircleGeometry,
    LatheBufferGeometry,
    CircleBufferGeometry,
    PlaneBufferGeometry, // 面材质

    Vector3,
    Vector2,

    DoubleSide,

    MeshBasicMaterial,
    LineBasicMaterial,
    LineDashedMaterial,

    Scene,
    WebGLRenderer,
    PerspectiveCamera
} from '../three';

const width = window.innerWidth;
const height = window.innerHeight;

const scene = new Scene();
const camera = new PerspectiveCamera(120, width / height, 0.1, 1000);
const renderer = new WebGLRenderer();

renderer.setSize(width, height);
document.getElementById('canvas').appendChild(renderer.domElement);


function createPoint() {
    let geometry = new Geometry();
    geometry.vertices.push(new Vector3(150, -110, 0));
    geometry.vertices.push(new Vector3(0, 500, 0));
    let material = new LineDashedMaterial({color: 0xff0000});
    return new LineSegments(geometry, material);
}

function createRect () {
    let geometry = new PlaneBufferGeometry(500, 500, 10, 10);
    let material = new MeshBasicMaterial({color: 0xffff00, side: DoubleSide});
    return new Mesh(geometry, material);
}

/* BoxBufferGeometry */
function createBox () {
    // 长、宽、高、长-段数、宽-段数、高-段数（影响性能）
    let geo = new BoxGeometry(100, 100, 200, 1, 1, 1);
    let mat = new MeshBasicMaterial({color: 0x00ffff});
    return new Mesh(geo, mat);
}


function createBufferBox () {
    let geo = new BoxBufferGeometry(100, 100, 100, 100, 100);
    let mat = new MeshBasicMaterial({color: 0x00ff00});
    return new Mesh(geo, mat);
}

function createBufferCircle() {
    let geo = new CircleBufferGeometry(200, 30, 0, 2 * Math.PI);
    let mat = new MeshBasicMaterial({color: 0xff0000});
    return new Mesh(geo, mat);
}

function createCircle() {
    let geo = new CircleGeometry(100, 30, 0, 2 * Math.PI);
    let mat = new MeshBasicMaterial({color: 0xff00ff});
    return new Mesh(geo, mat);
}

function createBufferLathe () {
    let points = [];
    for ( let i = 0; i < 10; i ++ ) {
        points.push( new Vector2( Math.sin( i * 0.2 ) * 100 + 200, ( i - 5 ) * 40 ) );
    }
    const geometry = new LatheBufferGeometry( points );
    const material = new MeshBasicMaterial( { color: 0xff0000 } );
    return new Mesh( geometry, material );
}



camera.position.z = 200;

const line = createPoint();

const plane = createRect();

const box = createBox();
const bufferBox = createBufferBox();

const circle = createCircle();
const bufferCircle = createBufferCircle();

const bufferLache = createBufferLathe();


pointLight.position.set(0, 500, 0);

scene.add(line);
// scene.add(plane);
scene.add(box);
// scene.add(bufferBox);
//
// scene.add(circle);
// scene.add(bufferCircle);

// scene.add(bufferLache);

// plane.rotation.x = 90;
// plane.position.y = -100;
//
// bufferCircle.position.z = -100;


function animate () {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    box.rotation.z += 0.01;
    // bufferLache.rotation.z += 0.01;
    // bufferLache.rotation.y += 0.01;

    line.rotation.y += 0.05;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

