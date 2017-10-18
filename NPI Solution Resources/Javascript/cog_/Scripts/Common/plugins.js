/**
 * File: plugins.js
 * Project: CERRS
 * Description: Plugins added to jQuery for use on this application
 */

(function ($) {

    console.log('plugin.js loads');

    // Adds time line icons to the Timeline JS markers
    $.add_timeline_icon = function (options) {

        // Default options
        var settings = $.extend({
            search_text: 'case status',
            icon_name: 'case-status-info',
        },
        options);

        $('.storyjs-embed .vco-navigation .marker').find('.flag-content').each(function () {
            var $this = $(this);

            if ($this.html().toLowerCase().indexOf('ico-timeline-') === -1) {
                if ($this.html().toLowerCase().indexOf(settings.search_text) > -1) {
                    $this.prepend('<span class="ico-timeline-' + settings.icon_name + '"></span>');
                }
            }
        });

        return this;
    };

} (jQuery));