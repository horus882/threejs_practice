import '../assets/sass/style.scss'

import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';

const scene     = new THREE.Scene();
const camera    = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer  = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



const geometry  = new THREE.BoxGeometry();
const material  = new THREE.MeshBasicMaterial();
const cube      = new THREE.Mesh(geometry, material);

scene.add(cube);

camera.position.y = 1;
camera.position.z = 2;
camera.lookAt(0, 0, 0);

const canvas = document.createElement("canvas");
canvas.id       = 'texture';
canvas.width    = 600;
canvas.height   = 600;
const ctx = canvas.getContext("2d");

let text = {x: 0, y: 0};

function animate() {
	requestAnimationFrame(animate);
	// cube.rotation.y += 0.01;
	text.x += 2;
	material.map = new THREE.Texture(canvas);
	// 更新材質 Material, 記得要設定此屬性
	material.map.needsUpdate = true;
	ctx.clearRect(0, 0, 600, 600);
	ctx.fillStyle = '#333';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#fff';
	ctx.font = "50px Noto+Sans+TC";
	ctx.fillText("Hello World", text.x, 50);
	renderer.render(scene, camera);
}

animate();
