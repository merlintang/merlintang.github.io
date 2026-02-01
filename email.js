(function() {
  var k = [0x74, 0x61, 0x6e, 0x67, 0x72, 0x6f, 0x63, 0x6b, 0x40, 0x67, 0x6d, 0x61, 0x69, 0x6c, 0x2e, 0x63, 0x6f, 0x6d];
  var s = '';
  for (var i = 0; i < k.length; i++) s += String.fromCharCode(k[i]);

  var el = document.getElementById('email-addr');
  if (!el) return;

  var c = document.createElement('canvas');
  var ctx = c.getContext('2d');
  ctx.font = '14px "Source Sans 3", -apple-system, BlinkMacSystemFont, sans-serif';
  var w = ctx.measureText(s).width;
  c.width = Math.ceil(w) + 4;
  c.height = 22;
  ctx = c.getContext('2d');
  ctx.font = '14px "Source Sans 3", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#2d3748';
  ctx.fillText(s, 2, 16);

  var img = document.createElement('img');
  img.src = c.toDataURL('image/png');
  img.alt = 'Email';
  img.style.verticalAlign = 'middle';
  img.style.maxWidth = '100%';
  img.style.height = 'auto';

  var a = document.createElement('a');
  a.href = 'mailto:' + s;
  a.appendChild(img);
  a.rel = 'noopener';
  el.appendChild(a);
})();
