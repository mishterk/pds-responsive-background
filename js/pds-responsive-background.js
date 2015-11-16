/**
 * Responsive Background PDS Module
 *
 * For dynamically switching background images at different screen sizes.
 *
 * DEPENDENCIES
 *
 *      1. jQuery
 *      2. 'debouncedresize' event (https://github.com/louisremi/jquery-smartresize)
 *      3. PDS.Breakpoints module
 *
 * =≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=
 *
 * USAGE EXAMPLE 1 – default usage
 *
 *      // Setup an HTML element with the class 'js-responsive-bg' and the data-bg-images attr.
 *      // This will automatically initialise based on the breakpoints set up in the attribute.
 *
 *      <div class="js-responsive-bg"
 *          data-bg-images='{"0":"img/xs.jpg", "320":"img/sm.jpg", "768":"img/md.jpg", "1024":"img/lg.jpg"}'>
 *      </div>
 *
 *
 * USAGE EXAMPLE 2 – manual init, the jQuery way
 *
 *      // Assuming we are using this on an element that does not have the 'js-responsive-bg' class.
 *
 *      <div class="some-other-element"
 *          data-bg-images='{"0":"img/xs.jpg", "320":"img/sm.jpg", "768":"img/md.jpg", "1024":"img/lg.jpg"}'>
 *      </div>
 *
 *      $('.some-other-element').responsiveBackground();
 *
 *
 * USAGE EXAMPLE 3 – manual init, the vanilla way
 *
 *      // Assuming we are using this on an element that does not have the 'js-responsive-bg' class.
 *
 *      <div class="some-other-element"
 *          data-bg-images='{"0":"img/xs.jpg", "320":"img/sm.jpg", "768":"img/md.jpg", "1024":"img/lg.jpg"}'>
 *      </div>
 *
 *      new PDS.ResponsiveBackground($('.some-other-element'));
 *      ...or...
 *      new PDS.ResponsiveBackground($('.some-other-element')[0]);
 *
 *
 * USAGE EXAMPLE 4 – manual init, without the data attr
 *
 *      // Assuming we are using this on an element that does not have the 'js-responsive-bg' class.
 *
 *      <div class="some-other-element"></div>
 *
 *      var respBgEl = new PDS.ResponsiveBackground($('.some-other-element'));
 *      respBgEl.sizes = { 0: "img/xs-alt.jpg", 320: "img/sm-alt.jpg", 768: "img/md-alt.jpg", 1024: "img/lg-alt.jpg"};
 *      respBgEl.init();
 *
 * NOTES
 *
 *      1. The breakpoint values are not fixed in any way. Use whatever numbers are necessary to match your breakpoint
 *      requirements.
 *      2. The plugin actively monitors and updates the background images on both resize and orientation change. This is
 *      a function of the PDS.Breakpoints module.
 *
 * =≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=
 */
var PDS = (function ($, window, document, PDS, undefined) {

    var CSS_CLASS = '.js-responsive-bg';

    // Adding jQuery utility
    $.fn.extend({
        responsiveBackground: function () {
            this.each(function () {
                new ResponsiveBackground(this);
            });
            return this;
        }
    });

    // Auto-init on elements with particular CSS class
    $(document).ready(function () {
        var $bgImages = $(CSS_CLASS);
        if ($bgImages.length)
            $bgImages.responsiveBackground();
    });

    /**
     * ResponsiveBackground
     * @param element
     * @constructor
     */
    function ResponsiveBackground(element) {
        var _this = this;
        var $this = (element instanceof jQuery) ? element : $(element);
        this.sizes = $this.data('bgImages');

        this.setBackgroundImage = function (src) {
            $this.css({
                backgroundImage: 'url(' + src + ')'
            });
        };

        this.init = function () {
            var breakpoints = new PDS.Breakpoints();
            for (var size in _this.sizes) {
                if (_this.sizes.hasOwnProperty(size)) {
                    var bpoint = breakpoints.make();
                    bpoint.width = parseInt(size);
                    bpoint.onEnter = (function (s) {
                        return function () {
                            _this.setBackgroundImage(_this.sizes[s])
                        };
                    })(size);
                    breakpoints.add(bpoint);
                }
            }
            // TODO - add ResponsiveBackground object to DOM via data attribute for accessing later on
        };

        // If sizes prop exists, auto init
        if (this.sizes !== undefined)
            this.init();
    }

    PDS.ResponsiveBackground = ResponsiveBackground;
    return PDS;

})(jQuery, window, document, PDS || {});