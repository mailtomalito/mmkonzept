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
      applyFancyHovers('.artist .infos .name');
      applyArtistStuff();
      applyBuyButton();
      applyVideo();
      applyFromMobile();
      loadCallback();
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
  $('body').append('<script>var currentCoolColor = "' + pCol + '";</script>')
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
function applyFancyHovers(element) {
  $(element).hover(function() {
    console.log('test')
    $('.from').html('From: ' + $(this).attr('data-from'));
    $('.from').css('display', 'inline-block');
    $(element).mousemove(function(event) {
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
  $('.singleTicket .infos .buy').click(function() {playMoneyBurn()});
  $('.moneymoneymoney').click(function() {playMoneyBurn()});
  function playMoneyBurn() {
    $('#moneyBurn').css('display', 'flex');
    $('body').css('overflow', 'hidden');
  }
  $('#moneyBurn').click(function() {
    $('#moneyBurn').css('display', 'none');
    $('body').css('overflow', 'scroll');
  });
}
/* ==========================================================================
   Video Mute/Unmute
   ========================================================================== */
function applyVideo() {
  $('#trailerVid').click(function() {
    if($(this).attr('muted') != 'undefined' ) {
      $(this).removeAttr('muted');
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
/* ==========================================================================
   From Mobile
   ========================================================================== */
function applyFromMobile() {
  $('.artist .name').each(function() {
    $(this).append('<p class="fromMobile">' + $(this).attr('data-from') + '</p>');
  });
  $('.pic .name').each(function() {
    $(this).append('<p class="fromMobile">' + $(this).attr('data-from') + '</p>');
  });
}
/* ==========================================================================
   The Socialwall
   ========================================================================== */
function howManyColsShouldThereBe() {
 if($(window).width() <= 425) {
   return 1;
 } else if($(window).width() <= 850) {
   return 2;
 } else if($(window).width() <= 1000) {
   return 3;
 } else if($(window).width() <= 1300) {
   return 4;
 } else {
   return 5;
 }
}
var currentCols = howManyColsShouldThereBe();
function loadCallback() {
  sortToCols(currentCols);
}
$(window).resize(function() {
  if(howManyColsShouldThereBe() != currentCols) {
    currentCols = howManyColsShouldThereBe();
    sortToCols(currentCols);
  }
});
function sortToCols(anzahl) {
  pics = $('.theWall .pic');
  col_ = {};
  $('.theWall').empty();
  for(var i = 1; i <= anzahl; i++) {
    if(i%2 == 0) {
      $('.theWall').append('<div class="col fl col_'+i+'" data-type="parallax" data-depth="'+(i*6)+'"></div>');
    } else {
      $('.theWall').append('<div class="col fl col_'+i+'" data-type="parallax" data-depth="'+(i*4)+'"></div>');
    }
  }
  $('.theWall .col').css('width', 'calc('+(100/anzahl)+'% - 20px)');
  c = 1;
  for(var i = 0; i <= pics.length; i++) {
    $('.col_'+c).append(pics[i]);
    if(c < anzahl) {
      c++;
    } else {
      c = 1;
    }
  }
  applyFancyHovers('.theWall .name');
}
(function() {
  window.addEventListener('scroll', function(event) {
    var depth, i, layer, layers, len, movement, topDistance, translate3d;
    topDistance = this.pageYOffset;
    layers = document.querySelectorAll('[data-type=\'parallax\']');
    for (i = 0, len = layers.length; i < len; i++) {
      layer = layers[i];
      depth = layer.getAttribute('data-depth');
      movement = -(topDistance * (depth / 100));
      translate3d = 'translate3d(0, ' + movement + 'px, 3px)';
      layer.style['-webkit-transform'] = translate3d;
      layer.style['-moz-transform'] = translate3d;
      layer.style['-ms-transform'] = translate3d;
      layer.style['-o-transform'] = translate3d;
      layer.style.transform = translate3d;
      $(".card").click(function() {
        return;
      });
    }
  });
}.call(this));
