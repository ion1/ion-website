/*global jQuery*/
(function ($) {

function yql_uri (expr) {
  return "http://query.yahooapis.com/v1/public/yql?q=" +
         encodeURIComponent (expr) +
         "&diagnostics=false&format=json&callback=?"
}

var expr = 'select * from json where url="http://github.com/api/v1/json/ion1"';

var table = $('<table id="github-table"/>');
table.append ('<thead><tr><th class="name">Name</th><th class="description">Description</th><th class="homepage">&nbsp;</th><thead>');

$.getJSON (yql_uri (expr), function (data) {
  var repos = data.query.results.user.repositories;

  // If there’s only a single item, YQL doesn’t seem to wrap it in an array.
  if (typeof repos.length === 'undefined') {
    repos = [repos];
  }

  var tbody = $('<tbody/>').appendTo (table);

  for (var i = 0; i < repos.length; i++) {
    var repo = repos[i];

    var tr = $('<tr/>').appendTo (tbody);

    var td_name = $('<td class="name"/>').appendTo (tr);
    var td_desc = $('<td class="description"/>').appendTo (tr);
    var td_page = $('<td class="homepage"/>').appendTo (tr);

    $('<a/>').
      attr ({ href: repo.url }).
      text (repo.name).
      appendTo (td_name);

    td_desc.text (repo.description);

    if (repo.homepage) {
      $('<a/>').
        attr ({ href: repo.homepage }).
        append ('<img src="/css/internet.png" alt="Homepage" title="Homepage"/>').
        appendTo (td_page);
    } else {
      td_page.text ('\u00a0');
    }
  }

  tbody.find ('tr:odd').addClass ('odd');
  tbody.find ('tr:even').addClass ('even');
});

$(function () {
  $('#github').
    empty ().
    append (table).
    append ('<p><a href="http://github.com/ion1">My profile</a></p>');
});

}) (jQuery);

// vim:set et sw=2 sts=2:
