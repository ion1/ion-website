/*global jQuery*/
(function ($) {

var uri = 'http://pipes.yahoo.com/pipes/pipe.run?_id=3nXqp_cA3hGbkiSWBB50VA&_render=json&_callback=?';

var table = $('<table id="lastfm-chart"/>');
table.append ('<thead><tr><th class="playcount" title="Play count">#</th><th class="artist">Artist</th></tr></thead>');

$.getJSON (uri, function (data) {
  var chart = data.value.items[0].weeklyartistchart.artist;

  var tbody = $('<tbody/>').appendTo (table);

  for (var i = 0; i < chart.length; i++) {
    var item = chart[i];

    var tr = $('<tr/>').appendTo (tbody);

    var td_count  = $('<td class="playcount"/>').appendTo (tr);
    var td_artist = $('<td class="artist"/>').appendTo (tr);

    td_count.text (item.playcount);

    $('<a/>').
      attr ({ href: item.url }).
      text (item.name).
      appendTo (td_artist);
  }

  tbody.find ('tr:odd').addClass ('odd');
  tbody.find ('tr:even').addClass ('even');
});

$(function () {
  $('#lastfm').
    empty ().
    append (table).
    append ('<p><a href="http://www.last.fm/user/hapanvelli/">My listening habits</a></p>');
});

}) (jQuery);

// vim:set et sw=2 sts=2:
