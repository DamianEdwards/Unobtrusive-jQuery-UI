/*!
 * Unobtrusive jQuery UI 0.1
 * Copyright 2011, Damian Edwards http://damianedwards.com
 * Licensed under Ms-PL
 * http://www.opensource.org/licenses/MS-PL
 */
(function ($) {
	"use strict";
	
    $(function () {
        var prefix = "data-ui-";
        
        // Wire-up jQuery UI unobtrusively
        $("*[" + prefix + "fn]").each(function () {
            var el = this,
                $el = $(el);

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
                        options[attr.name.substr(optionPrefix.length)] = attr.value;
                    }
                });

                // Call jQuery UI fn if it exists
                ($el[fn] || $.noop).call($el, options);
            });
        });
    });

}(window.jQuery));