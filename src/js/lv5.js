import '../assets/sass/style.scss'

import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as PIXI from 'pixi.js'

import * as dat from 'dat.gui'

import { OBJLoader } from './loaders/OBJLoader.js';
import { GLTFLoader } from './loaders/GLTFLoader.js';
// import model from '../assets/models/medals_v1.obj';
import model from '../assets/models/medals_v1.obj';
import sample from '../assets/models/Duck.gltf';
import '../assets/models/Duck0.bin';
import '../assets/models/DuckCM.png';

const objLoader  = new OBJLoader();
const gltfLoader = new GLTFLoader();
const gui 		 = new dat.GUI();

let app  = null,
	text = null;

var medalModel;

console.log(gltfLoader)

const date = new Date().toString();

window['defaultData'] = {
	text: 'Hello World',
	textStyle: {
		fontSize: 50,
		fontFamily: '"Noto Sans S Chinese", "sourcehansans-tc", "source-han-sans-traditional", "Noto Sans TC", "Microsoft JhengHei", Tahoma, Verdana, Arial, sans-serif',
		fontWeight: 700,
		fill: [0xffffff]
	}
}

window['array'] = [
	{
		container: null,
		inner: null,
		speed: 5,
		text: '臉書測試新功能「打擊假新聞」！鼓勵用戶分享前先這樣做',
		textStyle: new PIXI.TextStyle(defaultData.textStyle),
		custom: false
	},
	{
		container: null,
		inner: null,
		speed: 4,
		text: date,
		textStyle: new PIXI.TextStyle(defaultData.textStyle),
		custom: false
	},
	{
		container: null,
		inner: null,
		speed: 4.5,
		text: '#肥皂勤洗手 #避免用手觸碰眼口鼻 #正確配戴口罩',
		textStyle: new PIXI.TextStyle({
			fontSize: 120,
			fontFamily: '"Noto Sans S Chinese", "sourcehansans-tc", "source-han-sans-traditional", "Noto Sans TC", "Microsoft JhengHei", Tahoma, Verdana, Arial, sans-serif',
			fontWeight: 900,
			fill: [0xffffff]
		}),
		custom: false
	},
	{
		container: null,
		inner: null,
		speed: 3,
		text: '第一月台列車即將進站',
		textStyle: new PIXI.TextStyle({
			fontSize: 40,
			fontFamily: '"Noto Sans S Chinese", "sourcehansans-tc", "source-han-sans-traditional", "Noto Sans TC", "Microsoft JhengHei", Tahoma, Verdana, Arial, sans-serif',
			fontWeight: 700,
			fill: [0xaaaaaa],
			// wordWrap: true, // 啟用斷行
			// wordWrapWidth: 30, // 長度多少就斷行
			// breakWords: true
		}),
		custom: false
	},
	{
		container: null,
		inner: null,
		speed: 2.75,
		text: '確診者用餐客人錯愕！新北晶華亭餐廳緊急停業消毒',
		textStyle: new PIXI.TextStyle({
			fontSize: 50,
			fontFamily: '"Noto Sans S Chinese", "sourcehansans-tc", "source-han-sans-traditional", "Noto Sans TC", "Microsoft JhengHei", Tahoma, Verdana, Arial, sans-serif',
			fontWeight: 700,
			fill: [0xcccccc],
			// wordWrap: true, // 啟用斷行
			// wordWrapWidth: 30, // 長度多少就斷行
			// breakWords: true
		}),
		custom: false
	},
	{
		container: null,
		inner: null,
		speed: 3.25,
		text: '周年慶活動中⭐️ ⭐️全館滿800免運!!!⭐️ ⭐️ 新品持續上架中',
		textStyle: new PIXI.TextStyle({
			fontSize: 65,
			fontFamily: '"Noto Sans S Chinese", "sourcehansans-tc", "source-han-sans-traditional", "Noto Sans TC", "Microsoft JhengHei", Tahoma, Verdana, Arial, sans-serif',
			fontWeight: 700,
			fill: [0xffffff],
		}),
		custom: false
	},
	{
		container: null,
		inner: null,
		speed: 4.15,
		text: '[WDS] Live Reloading enabled.',
		textStyle: new PIXI.TextStyle({
			fontSize: 25,
			fontFamily: '"Noto Sans S Chinese", "sourcehansans-tc", "source-han-sans-traditional", "Noto Sans TC", "Microsoft JhengHei", Tahoma, Verdana, Arial, sans-serif',
			fontWeight: 400,
			fill: [0xffffff],
		}),
		custom: false
	},
	{
		container: null,
		inner: null,
		speed: 2.25,
		text: '我想吃水餃',
		textStyle: new PIXI.TextStyle({
			fontSize: 48,
			fontFamily: '"Noto Sans S Chinese", "sourcehansans-tc", "source-han-sans-traditional", "Noto Sans TC", "Microsoft JhengHei", Tahoma, Verdana, Arial, sans-serif',
			fontWeight: 400,
			fill: [0xffffff],
		}),
		custom: false
	},
	{
		container: null,
		inner: null,
		speed: 3,
		text: '測試午間新聞頭條',
		textStyle: new PIXI.TextStyle({
			fontSize: 68,
			fontFamily: '"Noto Sans S Chinese", "sourcehansans-tc", "source-han-sans-traditional", "Noto Sans TC", "Microsoft JhengHei", Tahoma, Verdana, Arial, sans-serif',
			fontWeight: 700,
			fill: [0xffffff],
			// wordWrap: true, // 啟用斷行
			// wordWrapWidth: 30, // 長度多少就斷行
			// breakWords: true
		}),
		custom: true
	}
];

// for (let i = 0; i < array.length; i++) { gui.add(array[i], 'text').name('Container ' + (i + 1)); }

function runThree() {

	const scene     = new THREE.Scene();
	// const camera    = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0.1, 1000 );
	const camera    = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
	const renderer  = new WebGLRenderer({ antialias: true, alpha: true });
	// scene.background = new THREE.Color(0x222222);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.autoClear = false;
	renderer.setClearColor(0x000000, 0.0);
	document.body.appendChild(renderer.domElement);

	const geometry  = new THREE.BoxGeometry(10, 10, 10);
	const material  = new THREE.MeshBasicMaterial();
	// const cube      = new THREE.Mesh(geometry, material);
	// scene.add(cube);
	// cube.rotation.y = 0.5;

	camera.position.x = -2;
	camera.position.y = 0;
	camera.position.z = 4.25;
	camera.lookAt(0, 0, 0);

	const cameraDebugger = gui.addFolder('Camera');

	cameraDebugger.add(camera.position, 'x').min(-50).max(50).step(0.1)
	cameraDebugger.add(camera.position, 'y').min(-50).max(50).step(0.1)
	cameraDebugger.add(camera.position, 'z').min(0).max(50).step(0.1)

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping 		= true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor 		= 0.05;
	controls.screenSpacePanning = false;

	// const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	// scene.add( directionalLight );

// 加入燈光 Start

	const light = new THREE.HemisphereLight( 0xffffff, 0x333333, 0.5 );
	scene.add( light );

	// const pointLight = new THREE.PointLight(0xffffff, 0.35)
	// pointLight.position.x = -1
	// pointLight.position.y = 5.5
	// pointLight.position.z = 10
	// scene.add(pointLight)

	// const light = gui.addFolder('Light');

	// light.add(pointLight.position, 'x').min(-50).max(50).step(0.1)
	// light.add(pointLight.position, 'y').min(-50).max(50).step(0.1)
	// light.add(pointLight.position, 'z').min(-50).max(50).step(0.1)
	// light.add(pointLight, 'intensity').min(0).max(10).step(0.1)

	// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
	// scene.add(pointLightHelper)

// 加入燈光 End

// 加入模型 Start

	objLoader.load(
		model,
		function ( object ) {
			scene.add( object );
			// object.scale.x = 3;
			// object.scale.y = 3;
			// object.scale.z = 3;
			medalModel = object;

			medalModel.scale.set(1, 1, 1);
			medalModel.rotation.x = -0.6;
			medalModel.rotation.y = 0.1;
			medalModel.position.y = 0.45;
			// medalModel.material.color.set('0xffff00')
			// console.log('medalModel.material', medalModel.material)
			console.log(medalModel);
			// medalModel.traverse( function( child, index ) {
			// 	if ( child instanceof THREE.Mesh ) {
			// 		console.log(child, index);
			// 		child.material = material;
			// 	}
			// } );
			medalModel.traverse( function( child ) {
				if ( child.isMesh ) {
					// material.normalMapType = THREE.ObjectSpaceNormalMap;
					console.log(child.material);
					child.material = material;
				}
			} );


			const objDebugger = gui.addFolder('Object');

			objDebugger.add(medalModel.rotation, 'x').min(-10).max(10).step(0.1)
			objDebugger.add(medalModel.rotation, 'y').min(-10).max(10).step(0.1)
			objDebugger.add(medalModel.rotation, 'z').min(-10).max(10).step(0.1)

		},
		function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		function ( error ) {
			console.log( 'An error happened' );
		}
	);

	gltfLoader.load(
		sample,
		function ( object ) {
			scene.add( object.scene );
			// object.scale.x = 3;
			// object.scale.y = 3;
			// object.scale.z = 3;
				// object.scene.scale.set(1, 1, 1);
				// object.scene.rotation.x = -0.6;
				// object.scene.rotation.y = 0.1;
				object.scene.position.x = 1.45;
				object.scene.position.y = 0.45;
			// object.material.color.set('0xffff00')
			// console.log(object)

			const sampleDebugger = gui.addFolder('Sample');

			sampleDebugger.add(object.scene.position, 'x').min(-10).max(10).step(0.1)
			sampleDebugger.add(object.scene.position, 'y').min(-10).max(10).step(0.1)
			// sampleDebugger.add(object.rotation, 'z').min(-10).max(10).step(0.1)

		},
		function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		function ( error ) {
			console.log( 'An error happened' );
		}
	);

// 加入模型 End

	var mouse = new THREE.Vector2();
	var raycaster = new THREE.Raycaster();
	var map = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
	var spriteMat = new THREE.SpriteMaterial({
		map: map,
		alphaMap: map,
		color: 'grey',
	});

	renderer.domElement.addEventListener('dblclick', onDoubleClick);

	function onDoubleClick(event) {

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);

		console.log(medalModel)

		let intersects = raycaster.intersectObject(medalModel, true);

		if (intersects.length < 1) return;

		let o = intersects[0];

		let pIntersect = o.point.clone();
		medalModel.worldToLocal(pIntersect);
		console.log(pIntersect);

		if (pIntersect.x > -3.3 && pIntersect.x < 5 && pIntersect.y < 5 && pIntersect.y > 3.8) {
			alert(array[0].text)
		} else if (pIntersect.x > -3.3 && pIntersect.x < 5 && pIntersect.y < 3.8 && pIntersect.y > 2.6) {
			alert(array[1].text)
		} else if (pIntersect.x > -3.3 && pIntersect.x < 5 && pIntersect.y < 2.6 && pIntersect.y > 0) {
			alert(array[2].text)
		} else if (pIntersect.x > -3.3 && pIntersect.x < 5 && pIntersect.y < 0 && pIntersect.y > -0.9) {
			alert(array[3].text)
		} else if (pIntersect.x > -3.3 && pIntersect.x < 5 && pIntersect.y < -0.9 && pIntersect.y > -2) {
			alert(array[4].text)
		} else if (pIntersect.x > -3.3 && pIntersect.x < 5 && pIntersect.y < -2 && pIntersect.y > -3.4) {
			alert(array[5].text)
		} else if (pIntersect.x > -3.3 && pIntersect.x < 5 && pIntersect.y < -3.4 && pIntersect.y > -4) {
			alert(array[6].text)
		} else if (pIntersect.x > -3.3 && pIntersect.x < 5 && pIntersect.y < -4 && pIntersect.y > -5) {
			alert(array[7].text)
		} else if (pIntersect.x > -5 && pIntersect.x < -3.3 && pIntersect.y < 5 && pIntersect.y > -5) {
			alert(array[8].text)
		}

		let sprite = new THREE.Sprite(spriteMat);
		sprite.scale.set(0.1, 0.1, 1)
		sprite.position.copy(o.face.normal).multiplyScalar(0.1).add(pIntersect);
		medalModel.add(sprite);

	}

	function animate() {
		requestAnimationFrame(animate);
		// cube.rotation.y += 0.01;
		if (array) {
			for (let i = 0; i < array.length; i++) {

				let inner = array[i].inner;
				let container = array[i].container;

				inner.x -= array[i].speed;

				if (inner.x + inner.width < app.view.width) {
					text = new PIXI.Text(array[i].text + ' ', array[i].textStyle);
					text.x += inner.width;
					text.y = 7;
					inner.addChild(text);
				}

			}
		}
		material.map = new THREE.Texture(app.view);
		material.map.needsUpdate = true;
		controls.update();
		renderer.render(scene, camera);
	}

	runPixi();
	animate();

}

function runPixi() {

	let type = 'WebGL';
	if (!PIXI.utils.isWebGLSupported()) { type = 'canvas'; }
	PIXI.utils.sayHello(type);

	app = new PIXI.Application({
		view: document.getElementById('#pixi'), // 指定元素
		width: 600,                 // 寬度
		height: 600,                // 高度
		antialias: true,            // 反鋸齒
		// backgroundColor: 0x000000,  // 背景色
		transparent: true, 		// default: false
		resolution: 2,      		// default: 1
		forceCanvas: true   		// 強制使用 Canvas
	});

	app.view.id = 'pixi'
	document.body.appendChild(app.view);

	app.renderer.autoDensity = true;

	let allContainersHeight = 0;

	for (let i = 0; i < array.length; i++) {

		array[i].inner = new PIXI.Container();
		array[i].container = new PIXI.Container();

		let inner = array[i].inner;
		let container = array[i].container;

		container.interactive = true;
		container.buttonMode = true;
		container.click = () => { console.log(array[i].text); }

		if (array[i].custom == true) {

			// console.log(array[i]);

			inner.x = 200;
			inner.y = 0;
			container.addChild(inner);
			app.stage.addChild(container);

			while (container.width <= app.view.width) {
				text = new PIXI.Text(array[i].text + ' ', array[i].textStyle);
				text.x += inner.width;
				text.y = 7;
				inner.addChild(text);
			}

			container.x = container.height + 10;
			container.y = 0;
			container.rotation = 90 * (Math.PI / 180);

		} else {

			inner.x = 200;
			inner.y = 0;
			container.y = allContainersHeight;

			container.addChild(inner);
			app.stage.addChild(container);

			while (container.width <= app.view.width) {
				text = new PIXI.Text(array[i].text + ' ', array[i].textStyle);
				text.x += inner.width;
				text.y = 7;
				inner.addChild(text);
			}
			console.log('container.width', container.width);
			console.log('container.height', container.height);

			allContainersHeight += container.height;

			let mask = new PIXI.Graphics();
			mask.beginFill(0xff0000)
			mask.drawRect(100, 0, app.view.width - 100, container.height)
			mask.endFill();

			container.mask = mask;
			container.addChild(mask)

		}

	}

}

runThree();
