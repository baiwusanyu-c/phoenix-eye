/*
* @login-3d.js
* @deprecated 登录页面中图3D效果，因为版本这里直接引用three，而不是用最新的插件（最新版本会导致该页面报错）
*/

import * as THREE from '../../public/three.min'

let camera = undefined,
    scene = undefined,
    renderer = undefined;
let plane = undefined;
//构造函数和对象方法
let raycaster = new THREE.Raycaster();
let normalizedMouse = {
    x: 0,
    y: -180
};
// 主体颜色
let darkBlue = {
    r: 0,
    g: 75,
    b: 143
};
let baseColorRGB = darkBlue;
let baseColor = "rgb(" + baseColorRGB.r + "," + baseColorRGB.g + "," + baseColorRGB.b + ")";
let nearStars = undefined,
    farStars = undefined,
    farthestStars = undefined;

export default function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    camera.position.z = 50;
    renderer.setClearColor("#121212", 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.domElement.style.position = 'absolute'
    // renderer.domElement.style.zIndex = -1
    document.getElementById('app').appendChild(renderer.domElement);

    // Lights
    var topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(0, 1, 1).normalize();
    scene.add(topLight);

    var bottomLight = new THREE.DirectionalLight(0xffffff, 0.4);
    bottomLight.position.set(1, -1, 1).normalize();
    scene.add(bottomLight);

    var skyLightRight = new THREE.DirectionalLight(0x666666, 0.2);
    skyLightRight.position.set(-1, -1, 0.2).normalize();
    scene.add(skyLightRight);

    var skyLightCenter = new THREE.DirectionalLight(0x666666, 0.2);
    skyLightCenter.position.set(-0, -1, 0.2).normalize();
    scene.add(skyLightCenter);

    var skyLightLeft = new THREE.DirectionalLight(0x666666, 0.2);
    skyLightLeft.position.set(1, -1, 0.2).normalize();
    scene.add(skyLightLeft);

    // Mesh creation
    var geometry = new THREE.PlaneGeometry(400, 400, 70, 70);
    var darkBlueMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, shading: THREE.FlatShading, side: THREE.DoubleSide, vertexColors: THREE.FaceColors });

    geometry.vertices.forEach(function (vertice) {
        vertice.x += (Math.random() - 0.5) * 4;
        vertice.y += (Math.random() - 0.5) * 4;
        vertice.z += (Math.random() - 0.5) * 4;
        vertice.dx = Math.random() - 0.5;
        vertice.dy = Math.random() - 0.5;
        vertice.randomDelay = Math.random() * 5;
    });
    for (let [i] of geometry.faces.entries()) {
        geometry.faces[i].color.setStyle(baseColor);
        geometry.faces[i].baseColor = baseColorRGB;
    }

    plane = new THREE.Mesh(geometry, darkBlueMaterial);
    scene.add(plane);

    // Create stars
    farthestStars = createStars(1200, 420, "#0952BD");
    farStars = createStars(1200, 370, "#A5BFF0");
    nearStars = createStars(1200, 290, "#118CD6");

    scene.add(farthestStars);
    scene.add(farStars);
    scene.add(nearStars);

    farStars.rotation.x = 0.25;
    nearStars.rotation.x = 0.25;


    render();

}

function createStars(amount, yDistance) {
    var color = arguments.length <= 2 || arguments[2] === undefined ? "0x000000" : arguments[2];

    var opacity = Math.random();
    var starGeometry = new THREE.Geometry();
    var starMaterial = new THREE.PointsMaterial({ color: color, opacity: opacity });

    for (var i = 0; i < amount; i++) {
        var vertex = new THREE.Vector3();
        vertex.z = (Math.random() - 0.5) * 1500;
        vertex.y = yDistance;
        vertex.x = (Math.random() - 0.5) * 1500;

        starGeometry.vertices.push(vertex);
    }

    return new THREE.Points(starGeometry, starMaterial);
}
var timer = 0;
let animateId
function render() {
    animateId = requestAnimationFrame(render);
    timer += 0.01;
    let vertices = plane.geometry.vertices;

    for (let [i] of vertices.entries()) {
        // Ease back to original vertice position while still maintaining sine wave
        vertices[i].x -= Math.sin(timer + vertices[i].randomDelay) / 40 * vertices[i].dx;
        vertices[i].y += Math.sin(timer + vertices[i].randomDelay) / 40 * vertices[i].dy;
    }

    // Determine where ray is being projected from camera view
    // 用一个新的原点和方向向量来更新射线
    raycaster.setFromCamera(normalizedMouse, camera);

    // Send objects being intersected into a variable
    let intersects = raycaster.intersectObjects([plane]);

    if (intersects.length > 0) {
        (function () {

            var faceBaseColor = intersects[0].face.baseColor;

            plane.geometry.faces.forEach(function (face) {
                face.color.r *= 255;
                face.color.g *= 255;
                face.color.b *= 255;

                face.color.r += (faceBaseColor.r - face.color.r) * 0.01;
                face.color.g += (faceBaseColor.g - face.color.g) * 0.01;
                face.color.b += (faceBaseColor.b - face.color.b) * 0.01;

                var rInt = Math.floor(face.color.r);
                var gInt = Math.floor(face.color.g);
                var bInt = Math.floor(face.color.b);

                var newBasecol = "rgb(" + rInt + "," + gInt + "," + bInt + ")";
                face.color.setStyle(newBasecol);
            });
            plane.geometry.colorsNeedUpdate = true;

            intersects[0].face.color.setStyle("#148efd");
            plane.geometry.colorsNeedUpdate = true;
        })();
    }

    plane.geometry.verticesNeedUpdate = true;
    plane.geometry.elementsNeedUpdate = true;

    farthestStars.rotation.y -= 0.00001;
    farStars.rotation.y -= 0.00005;
    nearStars.rotation.y -= 0.00011;

    renderer.render(scene, camera);
}
function handleResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    let width = window.innerWidth
    width = width <= 1280 ? 1280 : width
    renderer.setSize(width, window.innerHeight);
}

window.addEventListener("resize", handleResize);

function handleMousemove(event){
    // Normalize mouse coordinates
    normalizedMouse.x = event.clientX / window.innerWidth * 2 - 1;
    normalizedMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener("mousemove", handleMousemove);

/**
 * 添加一个销毁方法，避免页面切换后，背景图还存在，导致渲染帧数下降卡顿
 */
export function destroyTHERR() {
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMousemove);
    renderer.dispose()
    cancelAnimationFrame(animateId)
    document.getElementById('app').removeChild(renderer.domElement);
}