/// <reference path="jquery-1.7.1.js" />
/// <reference path="jquery-ui.1.8.17.js" />
/// <reference path="../../src/jquery-ui.unobtrusive.js" />

$(function () {

    // Wire-up code samples
    $("p.code-sample").before("<a class=\"show-link\" href=\"#\" title=\"Show the code example\">show example</a>");

    $("a.show-link").click(function (e) {
        e.preventDefault();
        var el = $(this);
        el.next().toggle("fast", function () {
            el.text(el.text() == "show example" ? "hide example" : "show example")
        });
        return false;
    });

    // Create dynamic UI
    $("#dynamic button").click(function (e) {
        var html = "<label for='dateOfBirth'>Birth Date:</label>" +
               "<input id='dateOfBirth' name='dateOfBirth' data-ui-fn='datepicker' />" +
               "<div data-ui-fn='slider'></div>";

        e.preventDefault();
        e.stopPropagation();

        $("#dynamic .content").append(html);
        $.ui.unobtrusive.parse("#dynamic .content");
    });
});