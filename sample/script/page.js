/// <reference path="jquery-1.6.1.js" />
/// <reference path="jquery-ui.1.8.14.js" />
$(function() {
    
    // Wire-up code samples
    $("p.code-sample").before("<a class=\"show-link\" href=\"#\" title=\"Show the code example\">show example</a>");
    
    $("a.show-link").click(function(e) {
        e.preventDefault();
        var el = $(this);
        el.next().toggle("fast", function() {
            el.text(el.text() == "show example" ? "hide example" : "show example")
        });
        return false;
    });

});