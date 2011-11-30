/*!
* Unobtrusive jQuery UI 0.1
* Copyright 2011, Damian Edwards http://damianedwards.com
* Licensed under Ms-PL
* http://www.opensource.org/licenses/MS-PL
*/

/*!
* Modified by Andrew Cohen, 11/30/2011
* TempWorks Software, Inc.
*/

(function ($) {
    "use strict";

    var $jQui = $.ui,
        prefix = "data-ui-";

    $jQui.unobtrusive = {
        parse: function (element) {
            // Wire-up jQuery UI unobtrusively
            $("*[" + prefix + "fn]", element).each(function () {
                $jQui.unobtrusive.parseElement(this);
            });
        },
        parseElement: function (el) {
            var $el = $(el),
                el = $el[0];

            // Loop through functions in data-ui-fn attribute
            $.each($el.attr(prefix + "fn").split(" "), function () {
                var fn = this,
                    options = {},
                    optionPrefix = prefix + fn + "-";

                // Build options parameter from data-ui-[fn]-* attributes
                $.each(el.attributes, function () {
                    var attr = this;
                    if (!attr.specified) return true;

                    if (attr.name.indexOf(optionPrefix) === 0) {
                        // camelCase the name
                        var attrName = $.camelCase(attr.name.substr(optionPrefix.length));
                        options[attrName] = attr.value;
                    }
                });

                // get UI fn if it exists
                var uiFn = ($el[fn] || $.noop);
                // call destroy to remove the ui widget
                uiFn.call($el, 'destroy');
                // call fn with options
                uiFn.call($el, options);
            });
        }
    }

    $(function () {
        $jQui.unobtrusive.parse(document);
    });

} (window.jQuery));