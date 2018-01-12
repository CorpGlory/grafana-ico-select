export function fit(size, $container, $content, containerHeight, isContentImage) {
  var sizePercent = parseFloat(size) / 100;

  var containterWidth = $container.width();
  var contentWidth = $content.width() || 0.01;
  if(isContentImage) {
    var contentHeight = $content.height() || 0.01;
  } else {
    var contentHeight = parseFloat($content.css('font-size'));
  }

  var factorWidth = containterWidth / contentWidth;
  var factorHeight = containerHeight  / contentHeight;
  var factor = Math.min(factorHeight, factorWidth);
  var newContentHeight = contentHeight * factor * sizePercent;
  if(newContentHeight <= 0) {
    newContentHeight = 0.01
  }
  $content.css({
    'font-size': newContentHeight + 'px',
    'height': newContentHeight + 'px'
  });
}
