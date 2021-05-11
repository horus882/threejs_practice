import '../assets/sass/style.scss'

import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
// var OrbitControls = require('three-orbit-controls')(THREE)
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui'
import * as PIXI from 'pixi.js'

const gui = new dat.GUI();

let app  = null,
	text = null;

// const textStyle = new PIXI.TextStyle({
// 	fontSize: 50,
// 	fontFamily: '"Noto Sans S Chinese", "sourcehansans-tc", "source-han-sans-traditional", "Noto Sans TC", "Microsoft JhengHei", Tahoma, Verdana, Arial, sans-serif',
// 	fontWeight: 700,
// 	fill: [0xffffff], // 填滿，若是陣列形式則可以做到漸層效果
// 	// fill: [0xa7caff, 0xffa7c0], // 填滿，若是陣列形式則可以做到漸層效果
// 	// align: "center", // 對齊
// 	// stroke: "#000000", // 外框顏色
// 	// strokeThickness: 5, // 外框粗細
// 	// dropShadow: true, // 必須設為 true 才會啟用
// 	// dropShadowColor: "#000000", // 陰影顏色
// 	// dropShadowBlur: 5, // 陰影的擴散(柔焦)
// 	// dropShadowAngle: 5, // 陰影的角
// 	// dropShadowDistance: 0 // 陰影距離
// 	// wordWrap: true, // 啟用斷行
// 	// wordWrapWidth: 150 // 長度多少就斷行
// });

window['defaultData'] = {
	text: 'Hello World',
	textStyle: {
		fontSize: 50,
		fontFamily: '"Noto Sans S Chinese", "sourcehansans-tc", "source-han-sans-traditional", "Noto Sans TC", "Microsoft JhengHei", Tahoma, Verdana, Arial, sans-serif',
		fontWeight: 700,
		fill: [0xffffff]
	}
}

const date = new Date().toString();

window['array'] = [
	{
		container: null,
		speed: 5,
		text: defaultData.text,
		textStyle: new PIXI.TextStyle(defaultData.textStyle),
		direction: 'horizontal'
	},
	{
		container: null,
		speed: 4,
		text: date,
		textStyle: new PIXI.TextStyle(defaultData.textStyle),
		direction: 'horizontal'
	},
	{
		container: null,
		speed: 4.5,
		text: '( • ̀ω•́ )',
		textStyle: new PIXI.TextStyle({
			fontSize: 120,
			fontFamily: '"Noto Sans S Chinese", "sourcehansans-tc", "source-han-sans-traditional", "Noto Sans TC", "Microsoft JhengHei", Tahoma, Verdana, Arial, sans-serif',
			fontWeight: 900,
			fill: [0xffffff]
		}),
		direction: 'horizontal'
	},
	{
		container: null,
		speed: 3,
		text: '午餐還沒吃',
		textStyle: new PIXI.TextStyle({
			fontSize: 30,
			fontFamily: '"Noto Sans S Chinese", "sourcehansans-tc", "source-han-sans-traditional", "Noto Sans TC", "Microsoft JhengHei", Tahoma, Verdana, Arial, sans-serif',
			fontWeight: 700,
			fill: [0xffffff],
			wordWrap: true, // 啟用斷行
			wordWrapWidth: 30, // 長度多少就斷行
			breakWords: true
		}),
		direction: 'vertical'
	}
];

gui.add(array[0], 'text').name('Container 1');
gui.add(array[1], 'text').name('Container 2');
gui.add(array[2], 'text').name('Container 3');
gui.add(array[3], 'text').name('Container 4');

function runThree() {

	const scene     = new THREE.Scene();
	const camera    = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	const renderer  = new WebGLRenderer({ antialias: true });
	scene.background = new THREE.Color(0x333333);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	const geometry  = new THREE.BoxGeometry(10, 10, 10);
	const material  = new THREE.MeshBasicMaterial();
	const cube      = new THREE.Mesh(geometry, material);
	scene.add(cube);

	cube.rotation.y = 0.5;

	camera.position.y = 10;
	camera.position.z = 25;
	camera.lookAt(0, 0, 0);

	const controls = new OrbitControls(camera, renderer.domElement);

	controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.05;

	controls.screenSpacePanning = false;



	var mouse = new THREE.Vector2();
	var raycaster = new THREE.Raycaster();
	var map = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
	var spriteMat = new THREE.SpriteMaterial({
		map: map,
		alphaMap: map,
		color: 'grey'
	});

	renderer.domElement.addEventListener('dblclick', onDoubleClick);

	function onDoubleClick(event) {

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);

		let intersects = raycaster.intersectObject(cube);

		if (intersects.length < 1) return;

		let o = intersects[0];

		let pIntersect = o.point.clone();
		cube.worldToLocal(pIntersect);
		console.log(pIntersect);

		if (pIntersect.x > -5 && pIntersect.x < 5 && pIntersect.y < 5 && pIntersect.y > 3.8) {
			alert(array[0].text)
		} else if (pIntersect.x > -5 && pIntersect.x < 5 && pIntersect.y < 3.8 && pIntersect.y > 2.6) {
			alert(array[1].text)
		} else if (pIntersect.x > -5 && pIntersect.x < 5 && pIntersect.y < 2.6 && pIntersect.y > 0) {
			alert(array[2].text)
		} else if (pIntersect.x > -5 && pIntersect.x < 5 && pIntersect.y < 0 && pIntersect.y > -3.4) {
			alert(array[3].text)
		}

		let sprite = new THREE.Sprite(spriteMat);
		sprite.position.copy(o.face.normal).multiplyScalar(0.25).add(pIntersect);
		cube.add(sprite);

	}

	function animate() {
		requestAnimationFrame(animate);
		// cube.rotation.y += 0.01;
		if (array) {
			for (let i = 0; i < array.length; i++) {

				let container = array[i].container;
				container.x -= array[i].speed;
				if (container.x + container.width < app.view.width) {
					text = new PIXI.Text(array[i].text + ' ', array[i].textStyle);
					text.x += container.width;
					text.y = 7;
					container.addChild(text);
				}

			}
		}
		material.map = new THREE.Texture(app.view);
		// 更新材質 Material, 記得要設定此屬性
		material.map.needsUpdate = true;
		controls.update();
		renderer.render(scene, camera);
	}

	runPixi();
	animate();

}

function runPixi() {

	let type = "WebGL";
	if (!PIXI.utils.isWebGLSupported()) { type = "canvas"; }
	PIXI.utils.sayHello(type);

	app = new PIXI.Application({
		view: document.getElementById('#pixi'), // 指定元素
		width: 600,                 // 寬度
		height: 600,                // 高度
		antialias: true,            // 反鋸齒
		backgroundColor: 0x000000,  // 背景色
		// transparent: false, 		// default: false
		// resolution: 1,      		// default: 1
		forceCanvas: true   		// 強制使用 Canvas
	});

	app.view.id = 'pixi'
	document.body.appendChild(app.view); // Add the canvas that Pixi automatically created for you to the HTML document

	app.renderer.autoDensity = true;

	let allContainersHeight = 0;

	for (let i = 0; i < array.length; i++) {
		array[i].container = new PIXI.Container();
		let container = array[i].container;
		container.interactive = true;
		container.buttonMode = true;
		container.click = () => { console.log(array[i].text); }
		// if (array[i].direction == 'vertical') {

		// } else {
			container.y = allContainersHeight;
			app.stage.addChild(container);
			while (container.width <= app.view.width) {
				text = new PIXI.Text(array[i].text + ' ', array[i].textStyle);
				text.x += container.width;
				text.y = 7;
				container.addChild(text);
			}
			console.log('container.width', container.width);
			console.log('container.height', container.height);
			allContainersHeight += container.height;
		// }
	}

	// var texture = new THREE.Texture(app.view) 
	// texture_UI.needsUpdate = true;

	// var material_UI = new THREE.MeshBasicMaterial( {map: texture_UI, side:THREE.DoubleSide } );
	// material_UI.transparent = true;

	// var mesh_UI = new THREE.Mesh( new THREE.PlaneGeometry(width, height), material_UI );
	// mesh_UI.position.set(0,0,0);
	// scene_3D.add( mesh_UI );

}

runThree();
