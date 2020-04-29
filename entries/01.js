/* threesJs三大组件  ->  相机(Camera)、渲染器(Renderer)、场景(Scene)*/

/* 基本图形元素 定义在 Objects中，Bone、Group、LensFlare、Line、LineSegments、LOD、Mesh、Points、Skeleton、SkinnedMesh、Sprite */

/* 点、线、面  Points、Line/LineSegments/Mesh */

/* 精灵 Sprite 一个永远面向相机的平面 */

/* 骨骼 Bone 骨骼、Skeleton 骨架、SkinnedMesh 皮肤*/

// 定义形状
import * as Three from '../three.js';
import {lengthOfLine, getSlopeOfLine, intersection} from '../utils';
const {
    Scene,
    WebGLRenderer,
    PerspectiveCamera,

    Vector3,
    Geometry,
    BoxGeometry,
    ShapeGeometry,
    CircleGeometry,
    PlaneBufferGeometry,

    /* 新建某个形状 */
    Line,
    Mesh,
    Plane,
    Shape,
    Points,
    Sprite,
    Texture,
    LineSegments,

    /* 材料 */
    SpriteMaterial,
    PointsMaterial,
    MeshBasicMaterial,
    LineBasicMaterial,
    LineDashedMaterial
} = Three;

// 创建场景
// 创建相机
// 创建物体 （材质和形状）
// 将物体加入到场景中
// 渲染场景（scene, camera）

const width = window.innerWidth;
const height = window.innerHeight;

const scene = new Scene(); // 场景
const camera = new PerspectiveCamera(120, width / height, 1, 1000); // 摄像机
const renderer = new WebGLRenderer();
renderer.setSize(width, height);
document.getElementById('canvas').appendChild(renderer.domElement);


function createPoints() {
    let geometry = new Geometry();
    geometry.vertices.push(new Vector3(0, 0, 0));
    geometry.vertices.push(new Vector3(50, 100, 0));
    geometry.vertices.push(new Vector3(100, 50, 100));
    return new Points(geometry, new PointsMaterial({color: 0xff0000, size: 50}));
}

function createShapePoints() {
    let canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    let context = canvas.getContext("2d");
    context.fillStyle = "#ffff00";
    context.arc(50, 50, 45, 0, 2 * Math.PI);
    context.fill();


    let texture = new Texture(canvas);
    texture.needsUpdate = true;

    let geometry = new Geometry();
    geometry.vertices.push(new Vector3(-200, 0, 0));
    geometry.vertices.push(new Vector3(200, -100, 0));
    geometry.vertices.push(new Vector3(-80, 200, 10));
    let material = new PointsMaterial({color: 0xff0000, size: 100, map: texture});
    return new Points(geometry, material);
}


function createLine() {
    let geometry = new Geometry();

    geometry.vertices.push(new Vector3(200, 0, 0));
    geometry.vertices.push(new Vector3(-200, 100, 0));
    let material = new LineBasicMaterial({color: 0xff00ff});
    return new Line(geometry, material)
}

function createDashedLine() {
    let geometry = new Geometry();
    geometry.vertices.push(new Vector3(150, -110, 0));
    geometry.vertices.push(new Vector3(-500, 0, 0));
    let material = new LineDashedMaterial({color: 0xff0000, dashSize: 1, gapSize: 5, lineWidth: 10});
    return new LineSegments(geometry, material);
}

function createArcLine() {
    let shape = new Shape();
    shape.absarc(0, 0, 300, 0, 2 * Math.PI, true);
    let arcGeometry = new ShapeGeometry(shape);
    let arcMaterial = new LineBasicMaterial({color: 0xff0fff});
    return new Line(arcGeometry, arcMaterial);
}

function createArcShape() {
    let shape = new Shape();
    shape.absarc(0, 0, 200, 0, 2 * Math.PI, true);
    shape.lineTo(0, 0);
    let arcGeometry = new ShapeGeometry(shape);
    let arcMaterial = new MeshBasicMaterial({color: 0xff0fff});
    return new Mesh(arcGeometry, arcMaterial);
}


function createCircle() {
    let circle = new CircleGeometry(400, 100, 0, 2 * Math.PI);
    circle.vertices.shift();
    let material = new LineBasicMaterial({color: 0xf3f5f7});
    return new Line(circle, material);
}


function createRect() {
    let geometry = new PlaneBufferGeometry(100, 600);
    let material = new MeshBasicMaterial({color: 0x00ffff});
    return new Mesh(geometry, material);
}

function createSpriteShape(){
    /*1、创建一个画布，记得设置画布的宽高，否则将使用默认宽高，有可能会导致图像显示变形*/
    let canvas = document.createElement("canvas");
    canvas.width = 120;
    canvas.height = 120;
    /*2、创建图形，这部分可以去看w3c canvas教程*/
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ff0000";
    ctx.arc(50,50,50,0,2*Math.PI);
    ctx.fill();
    /*3、将canvas作为纹理，创建Sprite*/
    let texture = new Texture(canvas);
    texture.needsUpdate = true; //注意这句不能少
    let material = new SpriteMaterial({map:texture});
    let mesh = new Sprite(material);
    /*4、放大图片，每个精灵有自己的大小，默认情况下都是很小的，如果你不放大，基本是看不到的*/
    mesh.scale.set(100,100,1);
    return mesh;
}


const geometry = new BoxGeometry(50, 50, 50);
const material = new MeshBasicMaterial({color: 0x00ff00});
const cube = new Mesh(geometry, material);

camera.position.z = 500;

// scene.add(cube);
// scene.add(createRect());
// scene.add(createCircle());
// scene.add(createArcLine());
// scene.add(createArcShape());
// scene.add(createLine());
// scene.add(createPoints());
// scene.add(createDashedLine());
// scene.add(createShapePoints());
const sprite = createSpriteShape();

console.log(sprite)

scene.add(cube);
scene.add(sprite);

function animate () {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    sprite.position.x += 0.1;
    sprite.position.y += 0.1;
    sprite.position.z += 0.1;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);

}
animate();

