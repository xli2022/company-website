$(function() {
  var navFlag = true
  var videoStatus = 'pause'
  if (window.innerWidth <= 768) {
    setFontSize();
  }
  $(window).on('resize', function() {
    if (window.innerWidth <= 768) {
      setFontSize()
    }
  })
  $('.play-btn').click(function(e) {
    e.stopPropagation();
    videoStatus = 'play'
    $('.video-container').show()
    setVideoPlay(videoStatus)
  })
  $('.video-container').on('click', function() {
    if (videoStatus === 'play') {
      videoStatus = 'pause'
      setVideoPlay(videoStatus)
    }
  })
  $('.video-play').click(function(e) {
    e.stopPropagation();
    videoStatus = 'play'
    setVideoPlay(videoStatus)
  })
  $('#video').on('ended', function() {
    videoStatus = 'pause'
    $('.video-container').hide()
    $('#video')[0].currentTime = 0
    setVideoPlay(videoStatus)
  })
  $('.share-nav').on('click', 'img', function() {
    if (navFlag) {
      $('.share-nav').animate({
        'width': '27px'
      }, function() {
        navFlag = false
        $('.share-nav img').addClass('rotate')
      })
    } else {
      $('.share-nav').animate({
        'width': '106px'
      }, function () {
        navFlag = true
        $('.share-nav img').removeClass('rotate')
      })
    }
  })
  $('.section3 ul').on('click', 'li', function() {
    var idx = $(this).index()
    var clsArr = ['humans', 'mosters', 'robots']
    $(this).removeClass('grey').siblings().addClass('grey')
    $('.section3 article').hide().eq(idx).show()
    $('.section3').removeClass().addClass('section3 ' + clsArr[idx])
  })
  function setFontSize() {
    var winWidth = window.innerWidth;
    var size = (winWidth / 768) * 100;
    document.documentElement.style.fontSize = (size < 100 ? size : 100) + 'px';
  }
  function setVideoPlay(status) {
    if (status === 'play') {
      $('.video-pic').hide()
      $('.video-play').hide()
    } else {
      $('.video-pic').show()
      $('.video-play').show()
    }
    $('#video').trigger(status)
  }
})