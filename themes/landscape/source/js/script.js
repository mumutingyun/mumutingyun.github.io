(function($){
  // Local Search
  var $searchWrap = $('#search-form-wrap'),
    $searchInput = $('.search-form-input'),
    $searchResult = $('#local-search-result'),
    searchData = null,
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  // Load search data
  $.getJSON('/search.json', function(data){
    searchData = data;
  });

  // Show search box
  $('.nav-search-btn').on('click', function(){
    if (isSearchAnim) return;
    startSearchAnim();
    $searchWrap.addClass('on');
    $searchInput.val('').focus();
    $searchResult.addClass('local-search-result-closed').empty();
    stopSearchAnim();
  });

  // Hide search box on blur (with delay for result click)
  $searchInput.on('blur', function(){
    setTimeout(function(){
      if ($searchResult.find('a:hover').length === 0) {
        startSearchAnim();
        $searchWrap.removeClass('on');
        $searchResult.addClass('local-search-result-closed').empty();
        stopSearchAnim();
      }
    }, 200);
  });

  // Search on input
  var searchTimer;
  $searchInput.on('input', function(){
    clearTimeout(searchTimer);
    var keyword = $(this).val().trim().toLowerCase();
    if (!keyword) {
      $searchResult.addClass('local-search-result-closed').empty();
      return;
    }
    if (!searchData) return;

    searchTimer = setTimeout(function(){
      var results = [];
      $.each(searchData, function(i, item){
        var title = (item.title || '').toLowerCase();
        var content = (item.content || '').toLowerCase();
        if (title.indexOf(keyword) > -1 || content.indexOf(keyword) > -1) {
          results.push(item);
        }
      });

      // Position the result dropdown relative to the search input
      var offset = $searchInput.offset();
      var inputHeight = $searchInput.outerHeight();
      var inputWidth = $searchInput.outerWidth();
      $searchResult.css({
        top: offset.top + inputHeight + 5,
        left: offset.left,
        width: Math.max(inputWidth, 200)
      });

      if (results.length === 0) {
        $searchResult.removeClass('local-search-result-closed').html('<div class="search-result-empty">未找到相关文章</div>');
      } else {
        var html = '';
        $.each(results, function(i, item){
          html += '<a class="search-result-item" href="' + item.url + '">' +
            '<span class="search-result-title">' + item.title + '</span>' +
            '</a>';
        });
        $searchResult.removeClass('local-search-result-closed').html(html);
      }
    }, 200);
  });

  // Prevent form submit
  $('.search-form').on('submit', function(e){ e.preventDefault(); });

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      title = $this.attr('data-title'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"><span class="fa fa-twitter"></span></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"><span class="fa fa-facebook"></span></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"><span class="fa fa-pinterest"></span></a>',
            '<a href="https://www.linkedin.com/shareArticle?mini=true&url=' + encodedUrl + '" class="article-share-linkedin" target="_blank" title="LinkedIn"><span class="fa fa-linkedin"></span></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox') || $(this).parent().is('a')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" data-fancybox=\"gallery\" data-caption="' + alt + '"></a>')
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Dark Mode Toggle
  var $darkModeToggle = $('#dark-mode-toggle');
  var $darkModeIcon = $darkModeToggle.find('.fa');

  // Load saved preference
  if (localStorage.getItem('darkMode') === 'true') {
    $('body').addClass('dark-mode');
    $darkModeIcon.removeClass('fa-moon-o').addClass('fa-sun-o');
  }

  // Helper: force dark mode styles on article blocks via inline styles
  function applyArticleDarkMode(enable) {
    $('.article-inner').each(function() {
      if (enable) {
        this.style.setProperty('background', '#161b22', 'important');
        this.style.setProperty('border-color', '#30363d', 'important');
        this.style.setProperty('box-shadow', '1px 2px 3px rgba(0,0,0,0.3)', 'important');
      } else {
        this.style.removeProperty('background');
        this.style.removeProperty('border-color');
        this.style.removeProperty('box-shadow');
      }
    });
  }

  // Apply on load if dark mode is active
  if ($('body').hasClass('dark-mode')) {
    applyArticleDarkMode(true);
  }

  // Toggle on click
  $darkModeToggle.on('click', function() {
    $('body').toggleClass('dark-mode');
    var isDark = $('body').hasClass('dark-mode');
    localStorage.setItem('darkMode', isDark);
    applyArticleDarkMode(isDark);
    if (isDark) {
      $darkModeIcon.removeClass('fa-moon-o').addClass('fa-sun-o');
    } else {
      $darkModeIcon.removeClass('fa-sun-o').addClass('fa-moon-o');
    }
    // Note: Mermaid diagrams keep their original theme.
    // Refresh the page to apply the correct mermaid theme.
  });

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });
})(jQuery);