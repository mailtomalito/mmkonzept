/* ==========================================================================
 AJAX loader
 ========================================================================== */
/* --------------------------------------------------------------------------
   Function
   -------------------------------------------------------------------------- */
function getPage(param) {
  if(param == 'back') {
    if (window.location.pathname == '/') {
      loadPage('home', 'noPush');
    } else {
      loadPage(window.location.pathname.substr(1), 'noPush');
    }
  } else {
    if (window.location.pathname == '/') {
      loadPage('home');
    } else {
      loadPage(window.location.pathname.substr(1));
    }
  }
}
function loadPage(file, param) {
  $.ajax({
      method: "POST",
      url: file + '.html'
    })
    .done(function(data) {
      $('main').html(data);
      $('title').html('Experimentival | ' + file.charAt(0).toUpperCase() + file.slice(1));
      $('h1').html(file.charAt(0).toUpperCase() + file.slice(1));
      if(param != 'noPush') {
        history.pushState({
          id: file
        }, file.charAt(0).toUpperCase() + file.slice(1), file);
      }
      colorSwitch();
      applyFancyHovers();
      applyArtistStuff();
    });
}
/* --------------------------------------------------------------------------
   Trigger
   -------------------------------------------------------------------------- */
/* Link click */
$('a.ajax').click(function(event) {
  event.preventDefault();
  loadPage($(this).attr('href'));
  $('body').removeClass('navOpen');
});
/* Navigate Back */
window.addEventListener('popstate', function(event) {
  getPage('back');
}, false);
/* Initial Page Load */
getPage();
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
$('.burger').click(function() {
  colorSwitch();
});
$('a').click(function() {
  if (!$(this).hasClass('ext') && !$(this).hasClass('ajax')) {
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

/* ==========================================================================
   Artists
   ========================================================================== */
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function applyArtistStuff() {
  $('.artist').each(function() {
    $(this).css('margin-bottom', randomNum(50, 200));
    $(this).css('margin-left', randomNum(0, ($('#widthOfContainers').width() - $(this).width())));
  });
}
/* ==========================================================================
   Artist hover
   ========================================================================== */
function applyFancyHovers() {
  $('.artist .infos').hover(function() {
    $($(this).find('.from')).css('display', 'inline-block');
    $('.artist .infos').mousemove(function(event) {
      $($(this).find('.from')).css({
        'left': event.pageX,
        'top': event.pageY
      });
    });
  },
  function() {
    $($(this).find('.from')).css('display', 'none');
  });
}
