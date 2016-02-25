console.log('HELLO!');
$(function() {
//gives button click functionality to the divs in the nave bar
$(".navdiv").click(function() {
  window.location = $(this).find("a").attr("href"); 
  return false;
});
//gives on click functionality to the funk buttons (create post & log out)
$(".funk").click(function() {
  window.location = $(this).find("a").attr("href"); 
  return false;
});

//grabs the audio tage in the root page
var $mrGnome = $('audio')[0];
//plays the song in the public mrgnome folder on the root page
$mrGnome.play();

}); //<<<END function on load