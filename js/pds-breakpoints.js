/**
 * Breakpoints PDS Module
 *
 * For handling different JS logic at different device widths. Evaluation takes place on document.ready and on resize
 * via the debouncedresize event.
 *
 * DEPENDENCIES
 *
 *      1. jQuery
 *      2. 'debouncedresize' event (https://github.com/louisremi/jquery-smartresize)
 *
 * =≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=
 *
 * USAGE EXAMPLE 1
 *
 *      var breakpoints = new PDS.Breakpoints();
 *      breakpoints.define(320,
 *      function () {
 *             console.log('Entered 320');
 *         },
 *      function () {
 *             console.log('Exited 320');
 *         });
 *
 *      breakpoints.define(640,
 *      function () {
 *             console.log('Entered 640');
 *         },
 *      function () {
 *             console.log('Exited 640');
 *         });
 *
 *      breakpoints.define(720,
 *      function () {
 *             console.log('Entered 720');
 *         },
 *      function () {
 *             console.log('Exited 720');
 *         });
 *
 *
 * USAGE EXAMPLE 2
 *
 *      var breakpoints = new PDS.Breakpoints();
 *      var breakpoint = breakpoints.make();
 *      breakpoint.width = 100;
 *      breakpoint.onEnter = function () { console.log('entering special'); };
 *      breakpoint.onExit = function () { console.log('leaving special...'); };
 *      breakpoints.add(breakpoint);
 *
 *
 * NOTES
 *
 *      1. If two breakpoints are set with the same width, only the latest will fire. If you need to use the same width
 *      more than once, either create a new Breakpoints() instance, or define a custom event that you can then hook onto.
 *
 * =≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=
 */
var PDS = (function ($, window, document, PDS, undefined) {

    /**
     * Breakpoints Constructor
     * @returns {{define: Function, add: Function, make: Function}}
     * @constructor
     */
    function Breakpoints() {

        var _this = this,
            $window = $(window);

        /**
         * Breakpoint constructor
         *
         * @param width
         * @param enterCallback
         * @param exitCallback
         * @constructor
         */
        function Breakpoint(width, enterCallback, exitCallback) {
            this.width = width || 0;
            this.onEnter = enterCallback || function () {
                };
            this.onExit = exitCallback || function () {
                };
        }

        /**
         * Breakpoint array. For Breakpoint instances only!
         * @type {Array}
         */
        this.breakpoints = [];

        /**
         * Reference to current breakpoint
         * @type {object|null}
         */
        this.currentBreakpoint = null;

        /**
         * Sorts breakpoints in order of breakpoint width
         */
        function sortBreakpoints() {
            _this.breakpoints.sort(function (a, b) {
                return a.width - b.width;
            });
        }

        /**
         * Sets a new breakpoint
         * @param width
         * @param enterCallback
         * @param exitCallback
         */
        function setBreakpoint(width, enterCallback, exitCallback) {
            _this.breakpoints.push(new Breakpoint(width, enterCallback, exitCallback));
        }

        /**
         * Evaluates current screen width and sets up
         */
        function evaluate() {
            // No breakpoints? Bail.
            if (!_this.breakpoints)
                return;

            var ww = $window.width();

            // Establish the correct breakpoint
            var lastMatchIndex = false;
            for (var i = 0; i < _this.breakpoints.length; i++) {
                if (ww >= _this.breakpoints[i].width) {
                    lastMatchIndex = i;
                } else {
                    break;
                }
            }

            // No hit? We must be below the lowest breakpoint
            if (false === lastMatchIndex) {
                if (_this.currentBreakpoint) {
                    _this.currentBreakpoint.onExit();
                    _this.currentBreakpoint = null;
                }
                return;
            }

            // If matched bp is the same as current, don't do anything
            if (_this.currentBreakpoint === _this.breakpoints[lastMatchIndex]) {
                return;
            }

            // If matched breakpoint differs to current, current.onExit(); current = correct; correct.onEnter();
            if (_this.currentBreakpoint !== null)
                _this.currentBreakpoint.onExit();
            _this.currentBreakpoint = _this.breakpoints[lastMatchIndex];
            _this.currentBreakpoint.onEnter();

        }

        // Setting up event handlers
        $(document).ready(evaluate);
        $window.on('debouncedresize orientationchange', evaluate);

        /**
         * Public Methods
         */
        return {
            define: function (width, enterCallback, exitCallback) {
                setBreakpoint(width, enterCallback, exitCallback);
                sortBreakpoints();
                return _this;
            },
            /**
             * Add a Breakpoint object
             * @param {Breakpoint} Breakpoint
             */
            add: function (Breakpoint) {
                _this.breakpoints.push(Breakpoint);
                sortBreakpoints();
            },
            /**
             * Returns a new Breakpoint object
             * @returns {Breakpoint}
             */
            make: function () {
                return new Breakpoint();
            }
        }
    }

    PDS.Breakpoints = Breakpoints;

    return PDS;

})(jQuery, window, document, PDS || {});