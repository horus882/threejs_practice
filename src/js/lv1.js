import '../assets/sass/style.scss'
import * as THREE from 'three';
import { render } from 'node-sass';
import { PerspectiveCamera, WebGLRenderer } from 'three';

const scene     = new THREE.Scene();
const camera    = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer  = new WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
