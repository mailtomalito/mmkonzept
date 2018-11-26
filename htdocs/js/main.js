/* ==========================================================================
 AJAX loader
 ========================================================================== */
/* --------------------------------------------------------------------------
   Function
   -------------------------------------------------------------------------- */
function getPage(param) {
  console.log('test')
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
      url: 'pages/' + file + '.html'
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
      applyBuyButton();
      applyVideo();
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
  $('.ticket svg path').css('fill', pCol);
  $('.ticket svg text').css('fill', pCol);
  $('.singleTicket .infos .buy').css('border-color', pCol);
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
  $('.artist').each(function(i) {
    $(this).css('margin-bottom', randomNum(50, 200));
    $(this).css('margin-left', randomNum(0, $('#widthOfContainers').width() - $(this).width()));
    $($(this).find('.pic')).css('height', 400 + 0.2 * (500 - $($(this).find('.pic')).width()));
  });
}
/* ==========================================================================
   Artist hover
   ========================================================================== */
function applyFancyHovers() {
  $('.artist .infos .name').hover(function() {
    $('.from').html('From: ' + $(this).attr('data-from'));
    $('.from').css('display', 'inline-block');
    $('.artist .infos .name').mousemove(function(event) {
      $('.from').css({
        'left': event.pageX,
        'top': event.pageY
      });
    });
  },
  function() {
    $('.from').css('display', 'none');
  });
}
/* ==========================================================================
   Buy Button
   ========================================================================== */
function applyBuyButton() {
  $('.singleTicket .infos .buy').click(function() {
    alert('money money money');
  });
}
/* ==========================================================================
   Video Mute/Unmute
   ========================================================================== */
function applyVideo() {
  $('#trailerVid').click(function() {
    if($(this).attr('muted') != 'undefined' ) {
      $(this).removeAttr('muted');
      console.log('muted')
    } else {
      $(this).attr('muted');
    }
  });
  $('#trailerVid').click( function (){
      if( $('#trailerVid').prop('muted') ) {
        $('#trailerVid').prop('muted', false);
        $('#videoMuted').removeClass('active');
      } else {
        $('#trailerVid').prop('muted', true);
        $('#videoMuted').addClass('active');
      }
   });
}
