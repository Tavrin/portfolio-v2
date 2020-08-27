
// Option 1: Import the entire three.js core library.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import * as $ from 'jquery'

let progressElement = document.querySelector('.loading-container');
let progressBackground = document.querySelector('.loading-background');
// let headerZone = document.querySelector('#header-zone');
var vector;
const VIEW_ANGLE = 60;
const ASPECT = window.innerWidth / window.innerHeight;
const NEAR = 1;
const FAR = 1000;
var mesh, meshBig,pivot,renderer,scene,camera, controls,count, stars = [],container;
var buttonId = 1;
container = document.querySelector('#threeCanvas')
const RADIUS = 100;
const SEGMENTS = 32;
const RINGS = 32;
var lastButton = 0;
var buttonClicked = false;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

THREE.DefaultLoadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

THREE.DefaultLoadingManager.onLoad = function ( ) {

    console.log( 'Loading Complete!');
    progressElement.style.display = "none"
    progressBackground.style.display = "none"
    // headerZone.style.display = "block"

};

THREE.DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    // progressElement.style.width = (itemsLoaded / itemsTotal * 100) + '%';

};

THREE.DefaultLoadingManager.onError = function ( url ) {

	console.log( 'There was an error loading ' + url );

};



function init() {

    var textureLoader = new THREE.TextureLoader();
    // const textureSun =textureLoader.load('/public/textures/2k_sun.jpg')
    const textureStar1 = textureLoader.load('/dist/public/textures/2k_sun2.jpg')
    var sprite1 = textureLoader.load( '/dist/public/textures/sprite1.png' );
    // var meteorMat = textureLoader.load( '/public/textures/4k_ceres_fictional.jpg' );
    // var meteorMat2 = textureLoader.load( '/public/textures/8d12c1eb21eb70291bb884ae4f8984dc.png' );
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.autoClear = false;

 scene = new THREE.Scene();
 camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight,0.1, 2000 );
camera.position.z = 10;
camera.lookAt(new THREE.Vector3(0,0,0));

renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );

scene.background = new THREE.Color( 0x15161e );



var light2 = new THREE.AmbientLight( 0x404040,1 ); // soft white light
scene.add( light2 );

var light = new THREE.DirectionalLight( 0x41377d );
				light.position.set( 300, 200, 100 );
				light.castShadow = true;
				light.shadow.camera.top = 10;
				light.shadow.camera.bottom = - 100;
				light.shadow.camera.left = - 120;
				light.shadow.camera.right = 120;
				scene.add( light );
var geometry = new THREE.OctahedronBufferGeometry(2,2);
var geometry2;
function addGeom(size,complexity){
    return geometry2 = new THREE.OctahedronBufferGeometry(size,complexity);
}


// var sphereMaterial = new THREE.MeshLambertMaterial( {map: meteorMat, reflectivity: 0} );
// var sphereMaterial2 = new THREE.MeshLambertMaterial( {map: meteorMat2, reflectivity: 0} );
var material = new THREE.MeshStandardMaterial( {color: 0x677580, flatShading:true} );


    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(0, -.25, 0);
    scene.add( mesh );

    controls = new OrbitControls( camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 0, 0);
    controls.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
				controls.dampingFactor = 0.05;
                controls.autoRotate = true;
				controls.screenSpacePanning = false;

				controls.minDistance = 1;
				controls.maxDistance = 500;

                controls.maxPolarAngle = Math.PI / 2;
                
    var mesh2 = new THREE.Mesh( geometry2, material );
    mesh2.position.set( 3, .15, 0 );
    mesh2.rotation.set(0, 0, Math.PI / 2);
    mesh.add(mesh2);


var geometry = new THREE.BufferGeometry();
var vertices = [];




    const material3 = new THREE.MeshBasicMaterial( { map: textureStar1,reflectivity:1,lightMap:textureStar1, lightMapIntensity: 1 } );
    var geometry3 = new THREE.SphereGeometry(1,SEGMENTS,RINGS);
    for ( var i = 0; i < 3000; i ++ ) {
        var sphere2 = new THREE.Mesh( geometry3, material3 );
        sphere2.position.set(Math.random() * 5000 - 2500,Math.random() * 5000 - 2500,Math.random() * 5000 - 2500)
        sphere2.rotation.x = 1.16;
        sphere2.rotation.y = -0.12;
        sphere2.rotation.z = Math.random()*2*Math.PI;
        stars.push(sphere2)
    scene.add( sphere2 );
              }

    function addMesh( x,y,z){
        addGeom(0.2+(Math.random()*(0.6 - 0.1)+0.1),1);
        var mesh3 = new THREE.Mesh( geometry2, material );
    mesh3.position.set( x, y, z );
    mesh3.rotation.set(0, 0, Math.PI / 2);
    mesh.add(mesh3);
    }

    var geom = addGeom(30,1);
    meshBig = new THREE.Mesh( geom, material );
        meshBig.position.set( 50, 3, -100 );
        meshBig.rotation.set(0, 0, Math.PI / 2);
    mesh.add(meshBig);
    
    addMesh(-3, -1, 3);
    addMesh(3, -5, 1);
    addMesh(-3,-6,-5);
    addMesh(-5,.15,-5);
    addMesh(-1,.15,5);
    addMesh(-7,1,-2);
    addMesh(-8,.15,5);
    addMesh(10,.15,5);
    addMesh(12,.15,5);
    addMesh(8,7,-5);
    addMesh(10,5,5);
    for(var i = 0; i < 200; i++){
        addMesh(Math.floor(Math.random() * 60) - 30,Math.floor(Math.random() * 60) - 30,Math.floor(Math.random() * 60) - 30)
    }
    pivot = new THREE.Group();
    pivot.position.set( 0.0, 0.0, 0 );
    mesh.add( pivot );
    pivot.add( mesh2 );

// var sphere = new THREE.Mesh( geometry, material );
// scene.add( sphere );
// var geometry = new THREE.BoxGeometry();
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;
controls.update();
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'touchstart', onDocumentTouchStart, false );
document.addEventListener( 'touchmove', onDocumentTouchMove, false );
vector = new THREE.Vector3(300,100,10);
}

var animate = function () {
    requestAnimationFrame( animate );
    mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.001;

    pivot.rotation.y += 0.001;
     
    // if(camera.position.x <= 8 && camera.position.x >= -8){
    //     console.log(camera.position.x);
    //     camera.position.x += (( mouseX - camera.position.x ) * 0.02)/100;
    //     // camera.position.z += ( mouseX - camera.position.x ) * 0.02;
    // }
    // else if(camera.position.x >8){
    //     camera.position.x = 7.99;
    // }
    // else if(camera.position.x < -8){
    //     camera.position.x = -7.99;
    // }
    
    // camera.position.z += ( mouseX - camera.position.x ) * 0.02;
    // camera.position.y += ( - mouseY - camera.position.y ) * 0.02;
    // console.log(camera.lookAt);
    if(buttonClicked == true && (buttonId == 2 || buttonId == 3)){
      
        controls.autoRotate = false;
        if(camera.position.x < 30){
            camera.position.x += 0.6 - (camera.position.x / 100);
            camera.lookAt( mesh.position );
           
        }
        // else{
        //     buttonId = 0;
        // }
    }
    else if(buttonClicked == false && buttonId == 1 && (lastButton == 2 || lastButton == 3)){
       
        if(camera.position.x > 3){
            count +=0.2;
            camera.position.x -= 0.6 - ((30 -camera.position.x) / 100);
            
        }
        // else{
        //     buttonId = 0;
        // }
        camera.lookAt( mesh.position );
        
    }
    
    controls.update();
    renderer.render( scene, camera );
};

init();
animate();

function onWindowResize() {
windowHalfX = window.innerWidth / 2;
windowHalfY = window.innerHeight / 2;

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

mouseX = event.clientX - windowHalfX;
mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

if ( event.touches.length === 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

}

}

function onDocumentTouchMove( event ) {

if ( event.touches.length === 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

}

}

document.getElementById("work-button").addEventListener( 'click', function(){
    if(buttonId != 2){
        $("#work-container").css("display","block");
        if(buttonId == 1){
            $( "#dev-name" ).fadeOut();
            $( "#dev-title" ).fadeOut();
            lastButton = 1;
        }
        else if(buttonId==3){
            $("#about-container").fadeOut();
            $("#background-dark").fadeOut();
            lastButton = 3;
        }
        
        buttonClicked = true;
        buttonId= 2;
    }
    window.setTimeout(function(){displayWork(2);},5);
    

} );

document.getElementById("home-button").addEventListener( 'click', function(){
    if (buttonId != 1){
  
        if(buttonId == 2){
            lastButton = 2;
            document.getElementById("work-container").style.transform = "translateY(120%)";
            window.setTimeout(function(){displayWork(1);},400);
        }
        else if(buttonId==3){
            lastButton = 3;
            $("#about-container").fadeOut();
            $("#background-dark").fadeOut();
        }
        
        // document.getElementById("work-container").style.display = "none";
        $( "#dev-name" ).fadeIn();
        $( "#dev-title" ).fadeIn();
        // camera.lookAt(new THREE.Vector3(30,0,0));
        buttonClicked = false;
        buttonId= 1;
    }

} );

document.getElementById("about-button").addEventListener( 'click', function(){
    if(buttonId != 3){
        lastButton = buttonId;
        if(buttonId == 1){
            $( "#dev-name" ).fadeOut();
            $( "#dev-title" ).fadeOut();
            lastButton = 1;
        }
        else if(buttonId == 2){
        document.getElementById("work-container").style.transform = "translateY(120%)";

        window.setTimeout(function(){displayWork(1);},400);
        lastButton = 2;

        }
            
            $("#about-container").fadeIn();
            $("#background-dark").fadeIn();
        buttonClicked = true;
        buttonId= 3;
        
    }
    
    

} );

function displayWork(state) {

    
    if(state ==1){
        document.getElementById("work-container").style.display = "none";
        document.getElementById("work-container").style.transform = " matrix(1, 0, 0, 1, 0, 616)";
    }
    else if(state == 2){
        $("#work-container").css("transform","translateY(0%)");
    }
    
  }
