import * as THREE from './threejs/build/three.module.js';

// import { DDSLoader } from './threejs/examples/jsm/loaders/DDSLoader.js';
import {OrbitControls} from './threejs/examples/jsm/controls/OrbitControls.js';
import { MTLLoader } from './threejs/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from './threejs/examples/jsm/loaders/OBJLoader.js';

let RENDERING = true;
let PLACED = false
function setRendering(bol) {
    if(RENDERING = !!bol) animate()
}


let container
let canv_width = 0, canv_height = 0
let windowHalfX = 0
let windowHalfY = 0
let mouseX = 0, mouseY = 0


const camera = new THREE.PerspectiveCamera( 45, canv_width / canv_height, 1, 10000 );
camera.position.set(500, 400, 500);


const renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setPixelRatio( window.devicePixelRatio );
//renderer.setSize( canv_width, canv_height );
//container.appendChild( renderer.domElement );


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.target.set(200, 100, -200);
controls.update();


// scene

const scene = new THREE.Scene();
{
	const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.8 );
	scene.add( ambientLight );

	const pointLight = new THREE.PointLight( 0xcccccc, 0.2, 100000 );
	pointLight.position.set( -10000, 1000, 1000 );
	camera.add( pointLight );

	scene.add( camera );
}


/*const manager = new THREE.LoadingManager();
new MTLLoader( manager )
	.setPath( 'models/' )
	.load( 'brick.mtl', function ( materials ) {

		materials.preload();
		console.log(materials);

		new OBJLoader( manager )
			.setMaterials( materials )
			.setPath( 'models/' )
			.load( 'brick.obj', function ( object ) {

				object.position.y = - 95;
				scene.add( object );

			}, function(){}, function(){} );

	} );*/
{
	const mtlLoader = new MTLLoader();
    mtlLoader.setPath("models/");
    mtlLoader.load("brick.mtl", function(materials){
        materials.preload();
//        console.log(materials);
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('models/');
        objLoader.load('brick.obj', function(object){
            object.scale.x = 1;
            object.scale.y = 1;
            object.scale.z = 1;
            scene.add(object);
        });
    });
}




//document.addEventListener( 'mousemove', onDocumentMouseMove );
window.addEventListener( 'resize', onWindowResize );
//onWindowResize();
//animate();


function onWindowResize() {
    if (!PLACED) return

	canv_width = container.clientWidth
	canv_height = container.clientHeight
//	canv_width = window.innerWidth
//	canv_height = window.innerHeight

	windowHalfX = canv_width / 2;
	windowHalfY = canv_height / 2;

	camera.aspect = canv_width / canv_height;
	camera.updateProjectionMatrix();

	renderer.setSize( canv_width, canv_height );

}

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX ) / 2
	mouseY = ( event.clientY - windowHalfY ) / 2

    mouseX = window.innerWidth - event.clientX
    mouseY = window.innerHeight - event.clientY

    mouseX/=window.innerWidth/5
    mouseY/=window.innerHeight/5

}

//

function animate() {

    if (RENDERING) {
        requestAnimationFrame( animate );
	   render();
    }
//    console.log('rdr')

}

function render() {
//    let r = 1000
//
//	 camera.position.x = 200 + r * Math.sin(mouseX) * Math.sin(mouseY)
//	 camera.position.y = 100 + r * Math.sin(mouseX) * Math.cos(mouseY)
//	 camera.position.z = - 150 + r * Math.cos(mouseX)

	camera.lookAt( 200, 100, -150 );
	// console.log(scene.position);

	renderer.render( scene, camera );

}

function disable() {setRendering(0)}
function enable()  {setRendering(1)}
function place(domEl) {
    container = domEl
    domEl.appendChild( renderer.domElement )
    PLACED = true
    onWindowResize()
    animate()
}
export {disable, enable, place}
