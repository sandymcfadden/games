(function($){})(window.jQuery);
$(document).ready(function (){
  var $display = $('#display-input');
  var state = 'off';
  var currDisplay = '';
  
  $('#phone').on('click', 'a', keyPressed);
  
  var oneKeySound      = new Audio('audio/keys/1.mp3');
  var twoKeySound      = new Audio('audio/keys/2.mp3');
  var threeKeySound    = new Audio('audio/keys/3.mp3');
  var fourKeySound     = new Audio('audio/keys/4.mp3');
  var fiveKeySound     = new Audio('audio/keys/5.mp3');
  var sixKeySound      = new Audio('audio/keys/6.mp3');
  var sevenKeySound    = new Audio('audio/keys/7.mp3');
  var eightKeySound    = new Audio('audio/keys/8.mp3');
  var nineKeySound     = new Audio('audio/keys/9.mp3');
  var zeroKeySound     = new Audio('audio/keys/0.mp3');
  var asterickKeySound = new Audio('audio/keys/asterick.mp3');
  var poundKeySound    = new Audio('audio/keys/pound.mp3');
  var ringingSound     = new Audio('audio/keys/ringing.mp3');
  
  var rand = 0;
  var animals = [];
  animals[0] = 'cat';
  animals[1] = 'cow';
  animals[2] = 'dog';
  animals[3] = 'duck';
  animals[4] = 'elephant';
  animals[5] = 'goat';
  animals[6] = 'horse';
  animals[7] = 'owl';
  animals[8] = 'pig';
  animals[9] = 'rooster';
  animals[10] = 'sheep';
  
  var animalsound = new Audio('audio/animals/'+ animals[rand] + '.mp3');
  var animaltimeout;
  var endtimeout;

  function keyPressed() {
    var id  = $(this).attr('id');
    currDisplay = $display.val();
    switch (id) {
      case 'one':
        addCharacter('1');
        oneKeySound.play();
      break;
      case 'two':
        addCharacter('2');
        twoKeySound.play();
      break;
      case 'three':
        addCharacter('3');
        threeKeySound.play();
      break;
      case 'four':
        addCharacter('4');
        fourKeySound.play();
      break;
      case 'five':
        addCharacter('5');
        fiveKeySound.play();
      break;
      case 'six':
        addCharacter('6');
        sixKeySound.play();
      break;
      case 'seven':
        addCharacter('7');
        sevenKeySound.play();
      break;
      case 'eight':
        addCharacter('8');
        eightKeySound.play();
      break;
      case 'nine':
        addCharacter('9');
        nineKeySound.play();
      break;
      case 'zero':
        addCharacter('0');
        zeroKeySound.play();
      break;
      case 'asterisk':
        addCharacter('*');
        asterickKeySound.play();
      break;
      case 'pound':
        addCharacter('#');
        poundKeySound.play();
      break;
      case 'talk':
        toggleTalk();
      break;
      case 'back':
        if (state != 'talking')
          $display.val(currDisplay.substring(0, currDisplay.length - 1));
      break;
      default:

      break;
    }
    return false;
  }
  
  function toggleTalk() {
    if (state == 'off') {
      $('#talk').html('End');
      $('#talk').css('background-image', 'url(../img/end-bg.jpg)');
      ringingSound.play();
      showAnimal();
      ringingSound.addEventListener('ended', playAnimalSound, false);
      state = 'talking';
    }
    else  if (state == 'talking') {
      endTalk();
    }
  }
  
  function endTalk() {
    if (state != 'off') {
      ringingSound.pause();
      ringingSound = new Audio('audio/keys/ringing.mp3');
      animalsound.pause();
      $('#animal').fadeOut('slow');
      $display.val('');
      $('#talk').html('Talk');
      $('#talk').css('background-image', 'url(../img/talk-bg.jpg)');
      state = 'off';
    }
  }
  
  function addCharacter(c) {
    if (state == 'talking')
      return;
    if (currDisplay.length >= 14)
      $display.val(currDisplay.substring(1, currDisplay.length) + c);
    else
      $display.val(currDisplay + c);
  }
  
  function showAnimal() {
    if (currDisplay in animals)
      rand = currDisplay;
    else
      rand = Math.floor(Math.random() * animals.length);
    $('#animal').html('<img src="img/animals/'+ animals[rand] +'.jpg" alt="'+ animals[rand] +'">').fadeIn('fast');
  }
  
  function playAnimalSound() {
    animalsound = new Audio('audio/animals/'+ animals[rand] +'.mp3');
    animalsound.play();
    animalsound.addEventListener('ended', endTalk, false);
  }
  

});
