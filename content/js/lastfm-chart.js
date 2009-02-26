/*global jQuery*/
(function ($) {

function yql_uri (expr) {
  return "http://query.yahooapis.com/v1/public/yql?q=" +
         encodeURIComponent (expr) +
         "&diagnostics=false&format=json&callback=?"
}

var expr = 'select * from json where url="http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=hapanvelli&api_key=204ecfee11b8db29a0266442351bd4b8&format=json"';

var table = $('<table id="lastfm-table"/>');
table.append ('<thead><tr><th class="playcount" title="Play count">#</th><th class="artist">Artist</th></tr></thead>');

$.getJSON (yql_uri (expr), function (data) {
  var chart = data.query.results.weeklyartistchart.artist;

  // If there’s only a single item, YQL doesn’t seem to wrap it in an array.
  if (typeof chart.length === 'undefined') {
    chart = [chart];
  }

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
