/*global jQuery*/
(function ($) {

var table = $('<table id="ffuu-table"/>');
var ffuu;

function render_line (i) {
  var line = ffuu.shift ();
  if (! line) {
    return false;
  }

  var tr = $('<tr class="data">').appendTo (table);
  tr.append ('<th>' + i + '</th>');

  for (var j = 0; j < line.length; j++) {
    var hits  = line[j][0];
    var color = line[j][1];

    var rgb;
    if (color < 0) {
      rgb = [0.8, 0, 0];
    } else {
      rgb = [color, color, color];
    }

    var css_color = 'rgb(' +
                    Math.round(255*rgb[0]) + ',' +
                    Math.round(255*rgb[1]) + ',' +
                    Math.round(255*rgb[2]) + ')';

    var td = $('<td/>').
      css ('background-color', css_color).
      appendTo (tr);

    if (hits > 0) {
      var word = [];
      for (var f = 0; f < j; f++) { word.push ('F'); }
      for (var u = 0; u < i; u++) { word.push ('U'); }
      word = word.join ('');

      var uri = 'http://www.google.com/search?hl=en&amp;q=' + word;

      td.
        attr ('title', word + ': ' + hits).
        append ('<a href="' + uri + '">&nbsp;</a>');
    }
  }

  return true;
}

function generate_table () {
  var height = ffuu.length;
  var width  = ffuu[0].length;

  var first_tr = $('<tr class="top"/>').appendTo (table);
  first_tr.append ('<th>F\u2192</th>');
  for (var i = 0; i < width; i++) {
    first_tr.append ('<th rowspan="2">' + i + '</th>');
  }

  $('<tr class="top"><th>U\u2193</th></tr>').appendTo (table);

  var j = 0;
  var interval = setInterval (function () {
    if (! render_line (j)) {
      clearInterval (interval);
      return;
    }
    j++;
  }, 1);
}

$.getJSON ('ffuu-data.json', function (data) {
  ffuu = data;
  generate_table ();
});

$(function () {
  $('#ffuu-container').empty ().append (table);
});

}) (jQuery);

// vim:set et sw=2 sts=2:
