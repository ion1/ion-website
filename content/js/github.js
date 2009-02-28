/*global jQuery*/
(function ($) {

var uri = 'http://github.com/api/v1/json/ion1?callback=?';

var table = $('<table id="github-table"/>');
table.append ('<thead><tr><th class="name">Name</th><th class="description">Description</th><thead>');

$.getJSON (uri, function (data) {
  var repos = data.user.repositories;

  var tbody = $('<tbody/>').appendTo (table);

  for (var i = 0; i < repos.length; i++) {
    var repo = repos[i];

    var tr = $('<tr/>').appendTo (tbody);

    var td_name = $('<td class="name"/>').appendTo (tr);
    var td_desc = $('<td class="description"/>').appendTo (tr);

    $('<a/>').
      attr ({ href: repo.url }).
      text (repo.name).
      appendTo (td_name);

    td_desc.text (repo.description);
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