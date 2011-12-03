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

    function getFunction(fn) {
        /// <param name="fn" type="String">String of function to parse</param>
        /// <returns type="Function" />
        /// <summary>Takes a string and converts it to an anonymous function</summary>
        var fnMatches = fn.match(/function\((.*?)\).*?\{(.*)\}$/);
        if (fnMatches) {
            var argsMatches = fnMatches[1].split(','),
                argsString = '';
            for (var i = 0; i < argsMatches.length; i++) {
                argsMatches[i] = '"' + $.trim(argsMatches[i]) + '"';
            }
            return eval('new Function(' + argsMatches.join(',') + ', "' + fnMatches[2] + '")');
        }
    };

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
                        if (attr.value.substr(0, 8) === 'function') { // test for anonymous function
                            options[attrName] = getFunction(attr.value);
                        } else {
                            options[attrName] = attr.value;
                        }
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