/*!
* Unobtrusive jQuery UI 0.2
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
        /// <summary>Takes a string and converts it to an anonymous function</summary>
        /// <param name="fn" type="String">String of function to parse</param>
        /// <returns type="Function" />

        var fnMatches = fn.match(/function\s*\((.*?)\).*?\{(.*)\}$/),
            argsMatches,
            argsString,
            i;

        if (fnMatches) {
            argsMatches = fnMatches[1].split(',');
            argsString = '';
            for (i = 0; i < argsMatches.length; i += 1) {
                argsMatches[i] = '"' + $.trim(argsMatches[i]) + '"';
            }
            return eval('new Function(' + argsMatches.join(',') + ', "' + fnMatches[2] + '")');
        }
    }

    $jQui.unobtrusive = {

        parse: function (context) {
            /// <summary>Wires up jQuery UI unobtrusively based on data-* attributes for the passed element and its children.</summary>
            /// <param name="context">A DOM Element, Document, or jQuery to use as context</param>

            $("*[" + prefix + "fn]", context).each(function () {
                $jQui.unobtrusive.parseElement(this);
            });
        },

        parseElement: function (el) {
            /// <summary>Wires up jQuery UI unobtrusively on a single element.</summary>
            /// <param name="el">A DOM Element, selector or jQuery collection.</param>

            var $el = $(el),
                element = $el[0];

            // Loop through functions in data-ui-fn attribute
            $.each($el.attr(prefix + "fn").split(" "), function () {
                var fn = this,
                    uiFn,
                    options = {},
                    optionPrefix = prefix + fn + "-";

                // Build options parameter from data-ui-[fn]-* attributes
                $.each(element.attributes, function () {
                    var attr = this,
                        attrName;

                    if (!attr.specified) {
                        return true;
                    }

                    if (attr.name.indexOf(optionPrefix) === 0) {
                        // camelCase the name
                        attrName = $.camelCase(attr.name.substr(optionPrefix.length));

                        // test for anonymous function
                        if (attr.value.substr(0, 8) === 'function') {
                            options[attrName] = getFunction(attr.value);
                        } else {
                            options[attrName] = attr.value;
                        }
                    }
                });

                // get UI fn if it exists
                uiFn = ($el[fn] || $.noop);
                // call destroy to remove the ui widget
                uiFn.call($el, 'destroy');
                // call fn with options
                uiFn.call($el, options);
            });
        }
    };

    // onload, parse the whole page
    $(function () {
        $jQui.unobtrusive.parse(window.document);
    });

}(window.jQuery));