var Audio = require('Audio');
const Time = require('Time');
const Scene = require('Scene');
const d = require('Diagnostics');
var Patches = require('Patches');
const Textures = require('Textures');
const Animation = require('Animation');
const Touch = require('TouchGestures');
const Materials = require('Materials');
const FaceGestures = require('FaceGestures');
const FaceTracking = require('FaceTracking');

d.log('script is working in ragu sir home');

(async function(){
  const[startScreen, playBtn, instructionBtn, instruction, instructionPlayBtn, gameScreen,audio1, audio2, audio3, basket, pizza1, pizza2, biscuit1, biscuit2, gameOverScreen, ScoreBG, scoreText, faceTracker0, one_Plus,one_Minus] = await Promise.all([
    Scene.root.findFirst('startScreen'),
    Scene.root.findFirst('playBtn'),
    Scene.root.findFirst('instructionBtn'),
    Scene.root.findFirst('instruction'),
    Scene.root.findFirst('instructionPlayBtn'),
    Scene.root.findFirst('gameScreen'),
    Audio.getAudioPlaybackController('clickSound1'),
    Audio.getAudioPlaybackController('gameSound'),
    Audio.getAudioPlaybackController('colliderSound'),
    Scene.root.findFirst('basket'),
    Scene.root.findFirst('pizza1'),
    Scene.root.findFirst('pizza2'),
    Scene.root.findFirst('biscuit1'),
    Scene.root.findFirst('biscuit2'),
    Scene.root.findFirst('gameOverScreen'),
    Scene.root.findFirst('ScoreBG'),
    Scene.root.findFirst('scoreText'),
    Scene.root.findFirst('faceTracker0'),
    Scene.root.findFirst('one_Plus'),
    Scene.root.findFirst('one_Minus'),



  ]);

  const face = FaceTracking.face(0);
  basket.transform.x = face.cameraTransform.x.mul(2.2).expSmooth(100);
  one_Plus.transform.x = face.cameraTransform.x.mul(2.2).expSmooth(100);
  
  var canFall = false;
  var gameRunning = false;

   audio1.setPlaying(false);
   audio3.setPlaying(false);
   faceTracker0.hidden = true;
   gameOverScreen.hidden = true;
   gameScreen.hidden = true;
   basket.hidden = true;
   one_Plus.hidden = true;
   one_Minus.hidden = true;

   

  Touch.onTap(playBtn).subscribe(function(e) {
    startScreen.hidden = true;
    gameScreen.hidden = false;
    faceTracker0.hidden = false;
    basket.hidden = false;
    startGame();
    clickSound();
  });

  Touch.onTap(instructionBtn).subscribe(function(e) {
    startScreen.hidden = true;
    gameScreen.hidden = false;
    instruction.hidden = false;
    gameScreen.hidden = true;
    clickSound()
  });

  Touch.onTap(instructionPlayBtn).subscribe(function(e) {
    startScreen.hidden = true;
    gameScreen.hidden = false;
    instruction.hidden = true;
    faceTracker0.hidden = false;
    basket.hidden = false;
    clickSound();
    startGame();
  });

  function onePlus() {
    const timeDriverParameters = {durationMilliseconds: 1000,loopCount: 1,mirror:false};
    const timeDriver = Animation.timeDriver(timeDriverParameters);
    const quadraticSampler = Animation.samplers.easeInOutQuad(-0.02, 0.3);
    const translationAnimation = Animation.animate(timeDriver, quadraticSampler);
    one_Plus.transform.y = translationAnimation;
    timeDriver.start();
    }

    function oneMinus() {
      const timeDriverParameters = {durationMilliseconds: 1000,loopCount: 1,mirror:false};
      const timeDriver = Animation.timeDriver(timeDriverParameters);
      const quadraticSampler = Animation.samplers.easeInOutQuad(-0.25, 0.3);
      const translationAnimation = Animation.animate(timeDriver, quadraticSampler);
      one_Minus.transform.y = translationAnimation;
      timeDriver.start();
      }

  function pizzaFun1() {
  const timeDriverParameters = {durationMilliseconds: 3000,loopCount: Infinity,mirror:false};
  const timeDriver = Animation.timeDriver(timeDriverParameters);
  const quadraticSampler = Animation.samplers.easeInOutQuad(0.3, -0.3);
  const translationAnimation = Animation.animate(timeDriver, quadraticSampler);
  pizza1.transform.y = translationAnimation;
  timeDriver.start();
  }

  function pizzaFun2() {
    const timeDriverParameters = {durationMilliseconds: 3500,loopCount: Infinity,mirror:false};
    const timeDriver = Animation.timeDriver(timeDriverParameters);
    const quadraticSampler = Animation.samplers.easeInOutQuad(0.3, -0.3);
    const translationAnimation = Animation.animate(timeDriver, quadraticSampler);
    pizza2.transform.y = translationAnimation;
    timeDriver.start();
  }

  function biscuitFun1() {
    const timeDriverParameters = {durationMilliseconds: 2500,loopCount: Infinity,mirror:false};
    const timeDriver = Animation.timeDriver(timeDriverParameters);
    const quadraticSampler = Animation.samplers.easeInOutQuad(0.3, -0.3);
    const translationAnimation = Animation.animate(timeDriver, quadraticSampler);
    biscuit1.transform.y = translationAnimation;
    timeDriver.start(); 
  }

  function biscuitFun2() {
    const timeDriverParameters = {durationMilliseconds: 3000,loopCount: Infinity,mirror:false};
    const timeDriver = Animation.timeDriver(timeDriverParameters);
    const quadraticSampler = Animation.samplers.easeInOutQuad(0.3, -0.3);
    const translationAnimation = Animation.animate(timeDriver, quadraticSampler);
    biscuit2.transform.y = translationAnimation;
    timeDriver.start();
  }

  function startGame(){
    gameRunning = true;
    canFall = true;
    pizzaFun1();
    pizzaFun2();
    biscuitFun1();
    biscuitFun2();
    Time.setTimeout(function(){
      gameOver();
    },15000);
   
  }
   
  function gameOver(){
    gameRunning = false;
    canFall = false;
    audio3.setPlaying(false);
    gameOverScreen.hidden = false;
    startScreen.hidden = true;
    gameScreen.hidden = true;
    faceTracker0.hidden = true;
    basket.hidden = true;
    
  }

     let pizza1Y =  pizza1.transform.y.pinLastValue();
     let pizza2Y =  pizza2.transform.y.pinLastValue();
     let biscuit1Y =  biscuit1.transform.y.pinLastValue();
     let biscuit2Y =  biscuit2.transform.y.pinLastValue();


  let objArr =[pizza1, pizza2, biscuit1, biscuit2];

  let scoreCount = 0;

  // let objArr =[biscuit1];

  function collider(){
    Time.setInterval(function(){
      let basketY = basket.transform.y.add(0.02).pinLastValue();
      let basketX = basket.transform.x.pinLastValue();
      let obj = 4;
      for(let i = 0; i<objArr.length; i++){
        let posX = objArr[i].transform.x.pinLastValue();
        let posY = objArr[i].transform.y.pinLastValue();
        if(posY < -0.27){
          objArr[i].hidden = false;
          // canMove = false;
        }
        let comp = {
          x:{
            min: posX - 0.035,
            max: posX + 0.035
          },
          y:{
            min: posY - 0.02,
            max: posY + 0.02
          } 
        }
        if(basketY > comp.y.min && basketY < comp.y.max){
          if(basketX > comp.x.min && basketX < comp.x.max && i!= obj){
            obj = i;
            objArr[i].hidden = true;
            audio3.reset();
            audio3.setPlaying(true);
            onePlus();
            one_Plus.hidden = false;
            scoreCount ++;
            scoreText.text =  scoreCount.toString();
            
          }
          // oneMinus()
          // scoreCount--;
          // scoreText.text =  scoreCount.toString();
          // one_Minus.hidden = false;

          
        }
      }
     
    }, 70);
  }
  collider();

  function clickSound(){
    audio1.reset();
    audio1.setPlaying(true);
  }

  // Patches.outputs.getPulseOrFallback('left', true).subscribe(() => {
    // d.log('left');
    // startGame();
    // if(startGame){
    //   scoreCount ++;
    //   scoreText.text =  scoreCount.toString();
    //   }
    //   else{
    //     canTurn = false;
    //   }
   
  // });

  // Patches.outputs.getPulseOrFallback('right', true).subscribe(() => {
    // d.log('right'); 
    // startGame();
    // if(startGame){
    // scoreCount ++;
    // scoreText.text =  scoreCount.toString();
    // }
    // else{
    //   canTurn = false;
    // }
    
  // });

 
  // function gameSoundFun(){
  //   audio2.reset();
  //   audio2.setPlaying(true);
  // }
  

})();