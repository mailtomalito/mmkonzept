/* ==========================================================================
   AJAX loader
   ========================================================================== */
/* --------------------------------------------------------------------------
   Function
   -------------------------------------------------------------------------- */
function loadPage(file, pageName) {
  $.ajax({
      method: "POST",
      url: file + '.html'
  })
  .done(function(data) {
    $('main').html(data);
    $('title').html('Experimentival | ' + pageName);
    history.pushState({
      id: file
    }, pageName, file);
  });
}
/* --------------------------------------------------------------------------
   Trigger
   -------------------------------------------------------------------------- */
/* Link click */
$('a.ajax').click(function(event) {
  event.preventDefault();
  loadPage($(this).attr('href'), $(this).attr('data-pageName'));
  $('body').removeClass('navOpen');
});
/* Navigate Back */
window.addEventListener('popstate', function (event) {
    
}, false);
/* Initial Page Load */
loadPage('home', 'Home');
/* ==========================================================================
   Gradient Backgrounds
   ========================================================================== */
$('.g-bg').append('<span class="gradient"></span>');
/* ==========================================================================
   Color Switcher
   ========================================================================== */
/* --------------------------------------------------------------------------
   Functions
   -------------------------------------------------------------------------- */
let pCol, sCol;
/*
   Colors
*/
let colors = [
  '#FFFF00',
  '#00FFFF',
  '#FF00FF'
]
/*
   Random Color that is not the same as the last one
*/
function randomColor(oldCol) {
  let newCol = oldCol;
  while (newCol == oldCol) {
    newCol = colors[Math.floor(Math.random() * Math.floor(colors.length))];
  }
  return newCol;
}
/*
   Colorswitch Function to be called by events
*/
function colorSwitch() {
  pCol = randomColor(pCol);
  sCol = randomColor(pCol);
  // Primary Color
  $('.logo svg path').css('fill', pCol);
  $('.burger .line').css('backgroundColor', pCol);
  $('body').css('color', pCol);
  $('.mainNav a').css('color', pCol);
  // Secondary Color
  $('.gradient').css('backgroundImage', 'linear-gradient(to bottom, ' + sCol + ' 0%,' + sCol + ' 10%,#000000 95%)');
}
/* --------------------------------------------------------------------------
   Triggers
   -------------------------------------------------------------------------- */
colorSwitch();
$('.burger').click(function() {
  colorSwitch();
});
$('a').click(function() {
  if (!$(this).hasClass('ext')) {
    colorSwitch();
  }
});
/* ==========================================================================
   Navigation
   ========================================================================== */
/* --------------------------------------------------------------------------
   Burgerclick
   -------------------------------------------------------------------------- */
$('.burger').click(function() {
  $('body').toggleClass('navOpen');
});
