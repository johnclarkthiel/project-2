console.log('HELLO!');
$(function() {

$(".navdiv").click(function() {
  window.location = $(this).find("a").attr("href"); 
  return false;
});

$(".funk").click(function() {
  window.location = $(this).find("a").attr("href"); 
  return false;
});

var $mrGnome = $('audio')[0];

$mrGnome.play();

}); //<<<END function on load