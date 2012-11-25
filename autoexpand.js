/** 
 * Copyright (c) 2012 Jeremy Blalock - jblalock@berkeley.edu
 * Dual licensed under MIT and GPL.
 * @author Jeremy Blalock
 * @version 0.0.1
 */
(function($) {

  function typeExpand(e, $el) {
    var c = String.fromCharCode(e.which),
        text = $el.val() + c;
    getSetHeight($el, text);
  }

  function getSetHeight($el, text) {
    var height = getHeight($el, text);
    $el.css({
      boxSizing: 'content-box',
      height: height
    });
  }

  function getHeight($el, text) {
    var test = $('<div></div>'), height;
    if (text.trim() == '') {
      text = 'A';
    }
    test.css({
      font: $el.css('font'),
      width: $el.width(),
      lineHeight: $el.css('line-height'),
      wordWrap: 'break-word',
      position: 'absolute',
      bottom: '200xpx'
    });
    test.text(text);
    test.appendTo($('body'));
    test.css('border', '1px solid #000');
    height = test.height();
    test.remove();
    return height;
  }

  function delayExpand() {
    $el = $(this);
    window.setTimeout(function() {
      getSetHeight($el, $el.val());
    }, 0);
  }

  $.fn.autoexpand = function() {
    this.each(function() {
      $(this).keypress(function(e) {
        typeExpand(e, $(this));
      });
      //$(this).bind('paste', delayExpand);
      //$(this).bind('cut', delayExpand);
      //$(this).bind('keydown', delayExpand);
      //$(this).bind('keyup', delayExpand);
      $(this).bind('input', delayExpand);
    });
  }

})(jQuery);
