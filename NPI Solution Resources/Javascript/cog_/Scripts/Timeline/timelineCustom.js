/**
 * File: timeline-custom.js
 * Project: CERRS
 * Description: Module and code specific to the Timeline
 */

/*
//TODO: Fix this RequireJS code since the timeline initializes last
requirejs.config({
    baseUrl: 'cog_/Scripts/',
    paths: {
        'jquery': 'Timeline/jQuery',
        'plugins': 'Common/plugins'
    },
    shim: {
        'plugins': {
            deps: ['jquery']
        }
    }
});
requirejs(['jquery', 'plugins', 'cog_/Scripts/Timeline/config'], function ($) {
*/

// Create namespace
var time_custom_ns = time_custom_ns || {};

$(function () {

    // The module pattern for page specific variables and functions
    time_custom_ns.time_custom = (function () {

        // Private variables and functions
        var my_var = '';

        // Module Public API
        return {
            my_var: my_var
        };
    })();

    // Make sure window is loaded and then invoke page specific funtions
    $(window).load(function () {

        setTimeout(function () {
            console.log('timelineCustom.js loads');

            // Commenting this out for now.  Need to figure out a better way to populate the icons.
            /*
            $.add_timeline_icon({
                search_text: 'case status',
                icon_name: 'case-status-info'
            });
            $.add_timeline_icon({
                search_text: 'status change',
                icon_name: 'case-status-info'
            });
            $.add_timeline_icon({
                search_text: 'created',
                icon_name: 'created'
            });
            $.add_timeline_icon({
                search_text: 'email:',
                icon_name: 'email'
            });
            $.add_timeline_icon({
                search_text: 'call:',
                icon_name: 'call'
            });
            $.add_timeline_icon({
                search_text: 'task:',
                icon_name: 'task'
            });
*/

        },
        3000);
    });
});

/*
});
*/
