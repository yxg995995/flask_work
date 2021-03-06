bplist00?_WebMainResource?	
^WebResourceURL_WebResourceFrameName_WebResourceData_WebResourceMIMEType_WebResourceTextEncodingName_Ahttp://cdn.staticfile.org/moment.js/2.24.0/moment-with-locales.jsPO ??<html><head></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">;(function (global, factory) {
    typeof exports === 'object' &amp;&amp; typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' &amp;&amp; define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null &amp;&amp; Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i &lt; arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null,
            rfc2822         : false,
            weekdayMismatch : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length &gt;&gt;&gt; 0;

            for (var i = 0; i &lt; len; i++) {
                if (i in t &amp;&amp; fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &amp;&amp;
                flags.overflow &lt; 0 &amp;&amp;
                !flags.empty &amp;&amp;
                !flags.invalidMonth &amp;&amp;
                !flags.invalidWeekday &amp;&amp;
                !flags.weekdayMismatch &amp;&amp;
                !flags.nullInput &amp;&amp;
                !flags.invalidFormat &amp;&amp;
                !flags.userInvalidated &amp;&amp;
                (!flags.meridiem || (flags.meridiem &amp;&amp; parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &amp;&amp;
                    flags.charsLeftOver === 0 &amp;&amp;
                    flags.unusedTokens.length === 0 &amp;&amp;
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length &gt; 0) {
            for (i = 0; i &lt; momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null &amp;&amp; obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number &lt; 0) {
            // -0 -&gt; 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 &amp;&amp; isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i &lt; len; i++) {
            if ((dontConvert &amp;&amp; array1[i] !== array2[i]) ||
                (!dontConvert &amp;&amp; toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &amp;&amp;
                (typeof console !==  'undefined') &amp;&amp; console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i &lt; arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) &amp;&amp; isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &amp;&amp;
                    !hasOwnProp(childConfig, prop) &amp;&amp;
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff &gt; 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number &gt;= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i &lt; length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i &lt; length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i &gt;= 0 &amp;&amp; localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict &amp;&amp; strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&amp;');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i &lt; token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null &amp;&amp; hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y &lt;= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 &amp;&amp; year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) &gt; 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid() &amp;&amp; !isNaN(value)) {
            if (unit === 'FullYear' &amp;&amp; isLeapYear(mom.year()) &amp;&amp; mom.month() === 1 &amp;&amp; mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i &lt; prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i &lt; this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i &lt; 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i &lt; 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict &amp;&amp; !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict &amp;&amp; !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict &amp;&amp; format === 'MMMM' &amp;&amp; this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict &amp;&amp; format === 'MMM' &amp;&amp; this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict &amp;&amp; this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex &amp;&amp; isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex &amp;&amp; isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i &lt; 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i &lt; 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i &lt; 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate (y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y &lt; 100 &amp;&amp; y &gt;= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate (y) {
        var date;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y &lt; 100 &amp;&amp; y &gt;= 0) {
            var args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear &lt;= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear &gt; daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week &lt; 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week &gt; weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays (ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        var weekdays = isArray(this._weekdays) ? this._weekdays :
            this._weekdays[(m &amp;&amp; m !== true &amp;&amp; this._weekdays.isFormat.test(format)) ? 'format' : 'standalone'];
        return (m === true) ? shiftWeekdays(weekdays, this._week.dow)
            : (m) ? weekdays[m.day()] : weekdays;
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i &lt; 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i &lt; 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict &amp;&amp; !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict &amp;&amp; format === 'dddd' &amp;&amp; this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict &amp;&amp; format === 'ddd' &amp;&amp; this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict &amp;&amp; format === 'dd' &amp;&amp; this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict &amp;&amp; this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex &amp;&amp; isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex &amp;&amp; isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex &amp;&amp; isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i &lt; 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i &lt; 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('k',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode &amp; IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours &gt; 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i &lt; names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j &gt; 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next &amp;&amp; next.length &gt;= j &amp;&amp; compareArrays(split, next, true) &gt;= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] &amp;&amp; (typeof module !== 'undefined') &amp;&amp;
                module &amp;&amp; module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
            else {
                if ((typeof console !==  'undefined') &amp;&amp; console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key &amp;&amp; key._locale &amp;&amp; key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a &amp;&amp; getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       &lt; 0 || a[MONTH]       &gt; 11  ? MONTH :
                a[DATE]        &lt; 1 || a[DATE]        &gt; daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        &lt; 0 || a[HOUR]        &gt; 24 || (a[HOUR] === 24 &amp;&amp; (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      &lt; 0 || a[MINUTE]      &gt; 59  ? MINUTE :
                a[SECOND]      &lt; 0 || a[SECOND]      &gt; 59  ? SECOND :
                a[MILLISECOND] &lt; 0 || a[MILLISECOND] &gt; 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear &amp;&amp; (overflow &lt; YEAR || overflow &gt; DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks &amp;&amp; overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday &amp;&amp; overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w &amp;&amp; config._a[DATE] == null &amp;&amp; config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear &gt; daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i &lt; 3 &amp;&amp; config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i &lt; 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &amp;&amp;
                config._a[MINUTE] === 0 &amp;&amp;
                config._a[SECOND] === 0 &amp;&amp;
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w &amp;&amp; typeof config._w.d !== 'undefined' &amp;&amp; config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday &lt; 1 || weekday &gt; 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday &lt; 0 || weekday &gt; 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e &lt; 0 || w.e &gt; 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week &lt; 1 || week &gt; weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i &lt; l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i &lt; l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime &amp;&amp; timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year &lt;= 49) {
            return 2000 + year;
        } else if (year &lt;= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i &lt; tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length &gt; 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict &amp;&amp; !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length &gt; 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is &lt;= 12
        if (config._a[HOUR] &lt;= 12 &amp;&amp;
            getParsingFlags(config).bigHour === true &amp;&amp;
            config._a[HOUR] &gt; 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm &amp;&amp; hour &lt; 12) {
                hour += 12;
            }
            if (!isPm &amp;&amp; hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i &lt; config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore &lt; scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj &amp;&amp; parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined &amp;&amp; input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) &amp;&amp; isObjectEmpty(input)) ||
                (isArray(input) &amp;&amp; input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() &amp;&amp; other.isValid()) {
                return other &lt; this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() &amp;&amp; other.isValid()) {
                return other &gt; this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 &amp;&amp; isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i &lt; moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 &amp;&amp; (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i &lt; ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number &lt; 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset &lt; 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' &gt; ['10',  '00']
    // '-1530'  &gt; ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]--&gt;
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) &lt; 16 &amp;&amp; !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC &amp;&amp; keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() &gt; this.clone().month(0).utcOffset() ||
            this.utcOffset() &gt; this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &amp;&amp;
                compareArrays(c._a, other.toArray()) &gt; 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC &amp;&amp; this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' &amp;&amp; ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) &amp;&amp; hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp &amp;&amp; parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() &amp;&amp; other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null &amp;&amp; !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff &lt; -6 ? 'sameElse' :
                diff &lt; -1 ? 'lastWeek' :
                diff &lt; 0 ? 'lastDay' :
                diff &lt; 1 ? 'sameDay' :
                diff &lt; 2 ? 'nextDay' :
                diff &lt; 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats &amp;&amp; (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() &amp;&amp; localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() &gt; localInput.valueOf();
        } else {
            return localInput.valueOf() &lt; this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() &amp;&amp; localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() &lt; localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() &lt; localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() &amp;&amp; localFrom.isValid() &amp;&amp; localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) &amp;&amp;
            (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() &amp;&amp; localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() &lt;= inputMs &amp;&amp; inputMs &lt;= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year': output = monthDiff(this, that) / 12; break;
            case 'month': output = monthDiff(this, that); break;
            case 'quarter': output = monthDiff(this, that) / 3; break;
            case 'second': output = (this - that) / 1e3; break; // 1000
            case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
            case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
            case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default: output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor &lt; 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() &lt; 0 || m.year() &gt; 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 &lt;= this.year() &amp;&amp; this.year() &lt;= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &amp;&amp;
                ((isMoment(time) &amp;&amp; time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &amp;&amp;
                ((isMoment(time) &amp;&amp; time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    var MS_PER_SECOND = 1000;
    var MS_PER_MINUTE = 60 * MS_PER_SECOND;
    var MS_PER_HOUR = 60 * MS_PER_MINUTE;
    var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y &lt; 100 &amp;&amp; y &gt;= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y &lt; 100 &amp;&amp; y &gt;= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week &gt; weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length &lt;= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length &lt;= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$2;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i &lt; 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i &lt; 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports

    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number &lt; 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds &gt;= 0 &amp;&amp; days &gt;= 0 &amp;&amp; months &gt;= 0) ||
                (milliseconds &lt;= 0 &amp;&amp; days &lt;= 0 &amp;&amp; months &lt;= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -&gt; 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':   return months;
                case 'quarter': return months / 3;
                case 'year':    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asQuarters     = makeAs('Q');
    var asYears        = makeAs('y');

    function clone$1 () {
        return createDuration(this);
    }

    function get$2 (units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s : 45,         // seconds to minute
        m : 45,         // minutes to hour
        h : 22,         // hours to day
        d : 26,         // days to month
        M : 11          // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds &lt;= thresholds.ss &amp;&amp; ['s', seconds]  ||
                seconds &lt; thresholds.s   &amp;&amp; ['ss', seconds] ||
                minutes &lt;= 1             &amp;&amp; ['m']           ||
                minutes &lt; thresholds.m   &amp;&amp; ['mm', minutes] ||
                hours   &lt;= 1             &amp;&amp; ['h']           ||
                hours   &lt; thresholds.h   &amp;&amp; ['hh', hours]   ||
                days    &lt;= 1             &amp;&amp; ['d']           ||
                days    &lt; thresholds.d   &amp;&amp; ['dd', days]    ||
                months  &lt;= 1             &amp;&amp; ['M']           ||
                months  &lt; thresholds.M   &amp;&amp; ['MM', months]  ||
                years   &lt;= 1             &amp;&amp; ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration &gt; 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize (withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x &gt; 0) - (x &lt; 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -&gt; 60 minutes -&gt; 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -&gt; 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total &lt; 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid        = isValid$1;
    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asQuarters     = asQuarters;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.clone          = clone$1;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports

    //! moment.js

    hooks.version = '2.24.0';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // &lt;input type="datetime-local" /&gt;
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // &lt;input type="datetime-local" step="1" /&gt;
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // &lt;input type="datetime-local" step="0.001" /&gt;
        DATE: 'YYYY-MM-DD',                             // &lt;input type="date" /&gt;
        TIME: 'HH:mm',                                  // &lt;input type="time" /&gt;
        TIME_SECONDS: 'HH:mm:ss',                       // &lt;input type="time" step="1" /&gt;
        TIME_MS: 'HH:mm:ss.SSS',                        // &lt;input type="time" step="0.001" /&gt;
        WEEK: 'GGGG-[W]WW',                             // &lt;input type="week" /&gt;
        MONTH: 'YYYY-MM'                                // &lt;input type="month" /&gt;
    };

    //! moment.js locale configuration

    hooks.defineLocale('af', {
        months : 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
        monthsShort : 'Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
        weekdays : 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
        weekdaysShort : 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
        weekdaysMin : 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
        meridiemParse: /vm|nm/i,
        isPM : function (input) {
            return /^nm$/i.test(input);
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours &lt; 12) {
                return isLower ? 'vm' : 'VM';
            } else {
                return isLower ? 'nm' : 'NM';
            }
        },
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Vandag om] LT',
            nextDay : '[M么re om] LT',
            nextWeek : 'dddd [om] LT',
            lastDay : '[Gister om] LT',
            lastWeek : '[Laas] dddd [om] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'oor %s',
            past : '%s gelede',
            s : '\'n paar sekondes',
            ss : '%d sekondes',
            m : '\'n minuut',
            mm : '%d minute',
            h : '\'n uur',
            hh : '%d ure',
            d : '\'n dag',
            dd : '%d dae',
            M : '\'n maand',
            MM : '%d maande',
            y : '\'n jaar',
            yy : '%d jaar'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal : function (number) {
            return number + ((number === 1 || number === 8 || number &gt;= 20) ? 'ste' : 'de'); // Thanks to Joris R枚ling : https://github.com/jjupiter
        },
        week : {
            dow : 1, // Maandag is die eerste dag van die week.
            doy : 4  // Die week wat die 4de Januarie bevat is die eerste week van die jaar.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('ar-dz', {
        months : '噩丕賳賮賷_賮賷賮乇賷_賲丕乇爻_兀賮乇賷賱_賲丕賷_噩賵丕賳_噩賵賷賱賷丞_兀賵鬲_爻亘鬲賲亘乇_兀賰鬲賵亘乇_賳賵賮賲亘乇_丿賷爻賲亘乇'.split('_'),
        monthsShort : '噩丕賳賮賷_賮賷賮乇賷_賲丕乇爻_兀賮乇賷賱_賲丕賷_噩賵丕賳_噩賵賷賱賷丞_兀賵鬲_爻亘鬲賲亘乇_兀賰鬲賵亘乇_賳賵賮賲亘乇_丿賷爻賲亘乇'.split('_'),
        weekdays : '丕賱兀丨丿_丕賱廿孬賳賷賳_丕賱孬賱丕孬丕亍_丕賱兀乇亘毓丕亍_丕賱禺賲賷爻_丕賱噩賲毓丞_丕賱爻亘鬲'.split('_'),
        weekdaysShort : '丕丨丿_丕孬賳賷賳_孬賱丕孬丕亍_丕乇亘毓丕亍_禺賲賷爻_噩賲毓丞_爻亘鬲'.split('_'),
        weekdaysMin : '兀丨_廿孬_孬賱丕_兀乇_禺賲_噩賲_爻亘'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[丕賱賷賵賲 毓賱賶 丕賱爻丕毓丞] LT',
            nextDay: '[睾丿丕 毓賱賶 丕賱爻丕毓丞] LT',
            nextWeek: 'dddd [毓賱賶 丕賱爻丕毓丞] LT',
            lastDay: '[兀賲爻 毓賱賶 丕賱爻丕毓丞] LT',
            lastWeek: 'dddd [毓賱賶 丕賱爻丕毓丞] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : '賮賷 %s',
            past : '賲賳匕 %s',
            s : '孬賵丕賳',
            ss : '%d 孬丕賳賷丞',
            m : '丿賯賷賯丞',
            mm : '%d 丿賯丕卅賯',
            h : '爻丕毓丞',
            hh : '%d 爻丕毓丕鬲',
            d : '賷賵賲',
            dd : '%d 兀賷丕賲',
            M : '卮賴乇',
            MM : '%d 兀卮賴乇',
            y : '爻賳丞',
            yy : '%d 爻賳賵丕鬲'
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('ar-kw', {
        months : '賷賳丕賷乇_賮亘乇丕賷乇_賲丕乇爻_兀亘乇賷賱_賲丕賷_賷賵賳賷賵_賷賵賱賷賵夭_睾卮鬲_卮鬲賳亘乇_兀賰鬲賵亘乇_賳賵賳亘乇_丿噩賳亘乇'.split('_'),
        monthsShort : '賷賳丕賷乇_賮亘乇丕賷乇_賲丕乇爻_兀亘乇賷賱_賲丕賷_賷賵賳賷賵_賷賵賱賷賵夭_睾卮鬲_卮鬲賳亘乇_兀賰鬲賵亘乇_賳賵賳亘乇_丿噩賳亘乇'.split('_'),
        weekdays : '丕賱兀丨丿_丕賱廿鬲賳賷賳_丕賱孬賱丕孬丕亍_丕賱兀乇亘毓丕亍_丕賱禺賲賷爻_丕賱噩賲毓丞_丕賱爻亘鬲'.split('_'),
        weekdaysShort : '丕丨丿_丕鬲賳賷賳_孬賱丕孬丕亍_丕乇亘毓丕亍_禺賲賷爻_噩賲毓丞_爻亘鬲'.split('_'),
        weekdaysMin : '丨_賳_孬_乇_禺_噩_爻'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[丕賱賷賵賲 毓賱賶 丕賱爻丕毓丞] LT',
            nextDay: '[睾丿丕 毓賱賶 丕賱爻丕毓丞] LT',
            nextWeek: 'dddd [毓賱賶 丕賱爻丕毓丞] LT',
            lastDay: '[兀賲爻 毓賱賶 丕賱爻丕毓丞] LT',
            lastWeek: 'dddd [毓賱賶 丕賱爻丕毓丞] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : '賮賷 %s',
            past : '賲賳匕 %s',
            s : '孬賵丕賳',
            ss : '%d 孬丕賳賷丞',
            m : '丿賯賷賯丞',
            mm : '%d 丿賯丕卅賯',
            h : '爻丕毓丞',
            hh : '%d 爻丕毓丕鬲',
            d : '賷賵賲',
            dd : '%d 兀賷丕賲',
            M : '卮賴乇',
            MM : '%d 兀卮賴乇',
            y : '爻賳丞',
            yy : '%d 爻賳賵丕鬲'
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 12  // The week that contains Jan 12th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var symbolMap = {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '0': '0'
    }, pluralForm = function (n) {
        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 &gt;= 3 &amp;&amp; n % 100 &lt;= 10 ? 3 : n % 100 &gt;= 11 ? 4 : 5;
    }, plurals = {
        s : ['兀賯賱 賲賳 孬丕賳賷丞', '孬丕賳賷丞 賵丕丨丿丞', ['孬丕賳賷鬲丕賳', '孬丕賳賷鬲賷賳'], '%d 孬賵丕賳', '%d 孬丕賳賷丞', '%d 孬丕賳賷丞'],
        m : ['兀賯賱 賲賳 丿賯賷賯丞', '丿賯賷賯丞 賵丕丨丿丞', ['丿賯賷賯鬲丕賳', '丿賯賷賯鬲賷賳'], '%d 丿賯丕卅賯', '%d 丿賯賷賯丞', '%d 丿賯賷賯丞'],
        h : ['兀賯賱 賲賳 爻丕毓丞', '爻丕毓丞 賵丕丨丿丞', ['爻丕毓鬲丕賳', '爻丕毓鬲賷賳'], '%d 爻丕毓丕鬲', '%d 爻丕毓丞', '%d 爻丕毓丞'],
        d : ['兀賯賱 賲賳 賷賵賲', '賷賵賲 賵丕丨丿', ['賷賵賲丕賳', '賷賵賲賷賳'], '%d 兀賷丕賲', '%d 賷賵賲賸丕', '%d 賷賵賲'],
        M : ['兀賯賱 賲賳 卮賴乇', '卮賴乇 賵丕丨丿', ['卮賴乇丕賳', '卮賴乇賷賳'], '%d 兀卮賴乇', '%d 卮賴乇丕', '%d 卮賴乇'],
        y : ['兀賯賱 賲賳 毓丕賲', '毓丕賲 賵丕丨丿', ['毓丕賲丕賳', '毓丕賲賷賳'], '%d 兀毓賵丕賲', '%d 毓丕賲賸丕', '%d 毓丕賲']
    }, pluralize = function (u) {
        return function (number, withoutSuffix, string, isFuture) {
            var f = pluralForm(number),
                str = plurals[u][pluralForm(number)];
            if (f === 2) {
                str = str[withoutSuffix ? 0 : 1];
            }
            return str.replace(/%d/i, number);
        };
    }, months$1 = [
        '賷賳丕賷乇',
        '賮亘乇丕賷乇',
        '賲丕乇爻',
        '兀亘乇賷賱',
        '賲丕賷賵',
        '賷賵賳賷賵',
        '賷賵賱賷賵',
        '兀睾爻胤爻',
        '爻亘鬲賲亘乇',
        '兀賰鬲賵亘乇',
        '賳賵賮賲亘乇',
        '丿賷爻賲亘乇'
    ];

    hooks.defineLocale('ar-ly', {
        months : months$1,
        monthsShort : months$1,
        weekdays : '丕賱兀丨丿_丕賱廿孬賳賷賳_丕賱孬賱丕孬丕亍_丕賱兀乇亘毓丕亍_丕賱禺賲賷爻_丕賱噩賲毓丞_丕賱爻亘鬲'.split('_'),
        weekdaysShort : '兀丨丿_廿孬賳賷賳_孬賱丕孬丕亍_兀乇亘毓丕亍_禺賲賷爻_噩賲毓丞_爻亘鬲'.split('_'),
        weekdaysMin : '丨_賳_孬_乇_禺_噩_爻'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'D/\u200FM/\u200FYYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /氐|賲/,
        isPM : function (input) {
            return '賲' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 12) {
                return '氐';
            } else {
                return '賲';
            }
        },
        calendar : {
            sameDay: '[丕賱賷賵賲 毓賳丿 丕賱爻丕毓丞] LT',
            nextDay: '[睾丿賸丕 毓賳丿 丕賱爻丕毓丞] LT',
            nextWeek: 'dddd [毓賳丿 丕賱爻丕毓丞] LT',
            lastDay: '[兀賲爻 毓賳丿 丕賱爻丕毓丞] LT',
            lastWeek: 'dddd [毓賳丿 丕賱爻丕毓丞] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : '亘毓丿 %s',
            past : '賲賳匕 %s',
            s : pluralize('s'),
            ss : pluralize('s'),
            m : pluralize('m'),
            mm : pluralize('m'),
            h : pluralize('h'),
            hh : pluralize('h'),
            d : pluralize('d'),
            dd : pluralize('d'),
            M : pluralize('M'),
            MM : pluralize('M'),
            y : pluralize('y'),
            yy : pluralize('y')
        },
        preparse: function (string) {
            return string.replace(/貙/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            }).replace(/,/g, '貙');
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 12th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('ar-ma', {
        months : '賷賳丕賷乇_賮亘乇丕賷乇_賲丕乇爻_兀亘乇賷賱_賲丕賷_賷賵賳賷賵_賷賵賱賷賵夭_睾卮鬲_卮鬲賳亘乇_兀賰鬲賵亘乇_賳賵賳亘乇_丿噩賳亘乇'.split('_'),
        monthsShort : '賷賳丕賷乇_賮亘乇丕賷乇_賲丕乇爻_兀亘乇賷賱_賲丕賷_賷賵賳賷賵_賷賵賱賷賵夭_睾卮鬲_卮鬲賳亘乇_兀賰鬲賵亘乇_賳賵賳亘乇_丿噩賳亘乇'.split('_'),
        weekdays : '丕賱兀丨丿_丕賱廿鬲賳賷賳_丕賱孬賱丕孬丕亍_丕賱兀乇亘毓丕亍_丕賱禺賲賷爻_丕賱噩賲毓丞_丕賱爻亘鬲'.split('_'),
        weekdaysShort : '丕丨丿_丕鬲賳賷賳_孬賱丕孬丕亍_丕乇亘毓丕亍_禺賲賷爻_噩賲毓丞_爻亘鬲'.split('_'),
        weekdaysMin : '丨_賳_孬_乇_禺_噩_爻'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[丕賱賷賵賲 毓賱賶 丕賱爻丕毓丞] LT',
            nextDay: '[睾丿丕 毓賱賶 丕賱爻丕毓丞] LT',
            nextWeek: 'dddd [毓賱賶 丕賱爻丕毓丞] LT',
            lastDay: '[兀賲爻 毓賱賶 丕賱爻丕毓丞] LT',
            lastWeek: 'dddd [毓賱賶 丕賱爻丕毓丞] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : '賮賷 %s',
            past : '賲賳匕 %s',
            s : '孬賵丕賳',
            ss : '%d 孬丕賳賷丞',
            m : '丿賯賷賯丞',
            mm : '%d 丿賯丕卅賯',
            h : '爻丕毓丞',
            hh : '%d 爻丕毓丕鬲',
            d : '賷賵賲',
            dd : '%d 兀賷丕賲',
            M : '卮賴乇',
            MM : '%d 兀卮賴乇',
            y : '爻賳丞',
            yy : '%d 爻賳賵丕鬲'
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 12th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var symbolMap$1 = {
        '1': '佟',
        '2': '佗',
        '3': '伲',
        '4': '伽',
        '5': '佶',
        '6': '佴',
        '7': '侑',
        '8': '侉',
        '9': '侃',
        '0': '贍'
    }, numberMap = {
        '佟': '1',
        '佗': '2',
        '伲': '3',
        '伽': '4',
        '佶': '5',
        '佴': '6',
        '侑': '7',
        '侉': '8',
        '侃': '9',
        '贍': '0'
    };

    hooks.defineLocale('ar-sa', {
        months : '賷賳丕賷乇_賮亘乇丕賷乇_賲丕乇爻_兀亘乇賷賱_賲丕賷賵_賷賵賳賷賵_賷賵賱賷賵_兀睾爻胤爻_爻亘鬲賲亘乇_兀賰鬲賵亘乇_賳賵賮賲亘乇_丿賷爻賲亘乇'.split('_'),
        monthsShort : '賷賳丕賷乇_賮亘乇丕賷乇_賲丕乇爻_兀亘乇賷賱_賲丕賷賵_賷賵賳賷賵_賷賵賱賷賵_兀睾爻胤爻_爻亘鬲賲亘乇_兀賰鬲賵亘乇_賳賵賮賲亘乇_丿賷爻賲亘乇'.split('_'),
        weekdays : '丕賱兀丨丿_丕賱廿孬賳賷賳_丕賱孬賱丕孬丕亍_丕賱兀乇亘毓丕亍_丕賱禺賲賷爻_丕賱噩賲毓丞_丕賱爻亘鬲'.split('_'),
        weekdaysShort : '兀丨丿_廿孬賳賷賳_孬賱丕孬丕亍_兀乇亘毓丕亍_禺賲賷爻_噩賲毓丞_爻亘鬲'.split('_'),
        weekdaysMin : '丨_賳_孬_乇_禺_噩_爻'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /氐|賲/,
        isPM : function (input) {
            return '賲' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 12) {
                return '氐';
            } else {
                return '賲';
            }
        },
        calendar : {
            sameDay: '[丕賱賷賵賲 毓賱賶 丕賱爻丕毓丞] LT',
            nextDay: '[睾丿丕 毓賱賶 丕賱爻丕毓丞] LT',
            nextWeek: 'dddd [毓賱賶 丕賱爻丕毓丞] LT',
            lastDay: '[兀賲爻 毓賱賶 丕賱爻丕毓丞] LT',
            lastWeek: 'dddd [毓賱賶 丕賱爻丕毓丞] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : '賮賷 %s',
            past : '賲賳匕 %s',
            s : '孬賵丕賳',
            ss : '%d 孬丕賳賷丞',
            m : '丿賯賷賯丞',
            mm : '%d 丿賯丕卅賯',
            h : '爻丕毓丞',
            hh : '%d 爻丕毓丕鬲',
            d : '賷賵賲',
            dd : '%d 兀賷丕賲',
            M : '卮賴乇',
            MM : '%d 兀卮賴乇',
            y : '爻賳丞',
            yy : '%d 爻賳賵丕鬲'
        },
        preparse: function (string) {
            return string.replace(/[佟佗伲伽佶佴侑侉侃贍]/g, function (match) {
                return numberMap[match];
            }).replace(/貙/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap$1[match];
            }).replace(/,/g, '貙');
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('ar-tn', {
        months: '噩丕賳賮賷_賮賷賮乇賷_賲丕乇爻_兀賮乇賷賱_賲丕賷_噩賵丕賳_噩賵賷賱賷丞_兀賵鬲_爻亘鬲賲亘乇_兀賰鬲賵亘乇_賳賵賮賲亘乇_丿賷爻賲亘乇'.split('_'),
        monthsShort: '噩丕賳賮賷_賮賷賮乇賷_賲丕乇爻_兀賮乇賷賱_賲丕賷_噩賵丕賳_噩賵賷賱賷丞_兀賵鬲_爻亘鬲賲亘乇_兀賰鬲賵亘乇_賳賵賮賲亘乇_丿賷爻賲亘乇'.split('_'),
        weekdays: '丕賱兀丨丿_丕賱廿孬賳賷賳_丕賱孬賱丕孬丕亍_丕賱兀乇亘毓丕亍_丕賱禺賲賷爻_丕賱噩賲毓丞_丕賱爻亘鬲'.split('_'),
        weekdaysShort: '兀丨丿_廿孬賳賷賳_孬賱丕孬丕亍_兀乇亘毓丕亍_禺賲賷爻_噩賲毓丞_爻亘鬲'.split('_'),
        weekdaysMin: '丨_賳_孬_乇_禺_噩_爻'.split('_'),
        weekdaysParseExact : true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[丕賱賷賵賲 毓賱賶 丕賱爻丕毓丞] LT',
            nextDay: '[睾丿丕 毓賱賶 丕賱爻丕毓丞] LT',
            nextWeek: 'dddd [毓賱賶 丕賱爻丕毓丞] LT',
            lastDay: '[兀賲爻 毓賱賶 丕賱爻丕毓丞] LT',
            lastWeek: 'dddd [毓賱賶 丕賱爻丕毓丞] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '賮賷 %s',
            past: '賲賳匕 %s',
            s: '孬賵丕賳',
            ss : '%d 孬丕賳賷丞',
            m: '丿賯賷賯丞',
            mm: '%d 丿賯丕卅賯',
            h: '爻丕毓丞',
            hh: '%d 爻丕毓丕鬲',
            d: '賷賵賲',
            dd: '%d 兀賷丕賲',
            M: '卮賴乇',
            MM: '%d 兀卮賴乇',
            y: '爻賳丞',
            yy: '%d 爻賳賵丕鬲'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var symbolMap$2 = {
        '1': '佟',
        '2': '佗',
        '3': '伲',
        '4': '伽',
        '5': '佶',
        '6': '佴',
        '7': '侑',
        '8': '侉',
        '9': '侃',
        '0': '贍'
    }, numberMap$1 = {
        '佟': '1',
        '佗': '2',
        '伲': '3',
        '伽': '4',
        '佶': '5',
        '佴': '6',
        '侑': '7',
        '侉': '8',
        '侃': '9',
        '贍': '0'
    }, pluralForm$1 = function (n) {
        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 &gt;= 3 &amp;&amp; n % 100 &lt;= 10 ? 3 : n % 100 &gt;= 11 ? 4 : 5;
    }, plurals$1 = {
        s : ['兀賯賱 賲賳 孬丕賳賷丞', '孬丕賳賷丞 賵丕丨丿丞', ['孬丕賳賷鬲丕賳', '孬丕賳賷鬲賷賳'], '%d 孬賵丕賳', '%d 孬丕賳賷丞', '%d 孬丕賳賷丞'],
        m : ['兀賯賱 賲賳 丿賯賷賯丞', '丿賯賷賯丞 賵丕丨丿丞', ['丿賯賷賯鬲丕賳', '丿賯賷賯鬲賷賳'], '%d 丿賯丕卅賯', '%d 丿賯賷賯丞', '%d 丿賯賷賯丞'],
        h : ['兀賯賱 賲賳 爻丕毓丞', '爻丕毓丞 賵丕丨丿丞', ['爻丕毓鬲丕賳', '爻丕毓鬲賷賳'], '%d 爻丕毓丕鬲', '%d 爻丕毓丞', '%d 爻丕毓丞'],
        d : ['兀賯賱 賲賳 賷賵賲', '賷賵賲 賵丕丨丿', ['賷賵賲丕賳', '賷賵賲賷賳'], '%d 兀賷丕賲', '%d 賷賵賲賸丕', '%d 賷賵賲'],
        M : ['兀賯賱 賲賳 卮賴乇', '卮賴乇 賵丕丨丿', ['卮賴乇丕賳', '卮賴乇賷賳'], '%d 兀卮賴乇', '%d 卮賴乇丕', '%d 卮賴乇'],
        y : ['兀賯賱 賲賳 毓丕賲', '毓丕賲 賵丕丨丿', ['毓丕賲丕賳', '毓丕賲賷賳'], '%d 兀毓賵丕賲', '%d 毓丕賲賸丕', '%d 毓丕賲']
    }, pluralize$1 = function (u) {
        return function (number, withoutSuffix, string, isFuture) {
            var f = pluralForm$1(number),
                str = plurals$1[u][pluralForm$1(number)];
            if (f === 2) {
                str = str[withoutSuffix ? 0 : 1];
            }
            return str.replace(/%d/i, number);
        };
    }, months$2 = [
        '賷賳丕賷乇',
        '賮亘乇丕賷乇',
        '賲丕乇爻',
        '兀亘乇賷賱',
        '賲丕賷賵',
        '賷賵賳賷賵',
        '賷賵賱賷賵',
        '兀睾爻胤爻',
        '爻亘鬲賲亘乇',
        '兀賰鬲賵亘乇',
        '賳賵賮賲亘乇',
        '丿賷爻賲亘乇'
    ];

    hooks.defineLocale('ar', {
        months : months$2,
        monthsShort : months$2,
        weekdays : '丕賱兀丨丿_丕賱廿孬賳賷賳_丕賱孬賱丕孬丕亍_丕賱兀乇亘毓丕亍_丕賱禺賲賷爻_丕賱噩賲毓丞_丕賱爻亘鬲'.split('_'),
        weekdaysShort : '兀丨丿_廿孬賳賷賳_孬賱丕孬丕亍_兀乇亘毓丕亍_禺賲賷爻_噩賲毓丞_爻亘鬲'.split('_'),
        weekdaysMin : '丨_賳_孬_乇_禺_噩_爻'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'D/\u200FM/\u200FYYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /氐|賲/,
        isPM : function (input) {
            return '賲' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 12) {
                return '氐';
            } else {
                return '賲';
            }
        },
        calendar : {
            sameDay: '[丕賱賷賵賲 毓賳丿 丕賱爻丕毓丞] LT',
            nextDay: '[睾丿賸丕 毓賳丿 丕賱爻丕毓丞] LT',
            nextWeek: 'dddd [毓賳丿 丕賱爻丕毓丞] LT',
            lastDay: '[兀賲爻 毓賳丿 丕賱爻丕毓丞] LT',
            lastWeek: 'dddd [毓賳丿 丕賱爻丕毓丞] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : '亘毓丿 %s',
            past : '賲賳匕 %s',
            s : pluralize$1('s'),
            ss : pluralize$1('s'),
            m : pluralize$1('m'),
            mm : pluralize$1('m'),
            h : pluralize$1('h'),
            hh : pluralize$1('h'),
            d : pluralize$1('d'),
            dd : pluralize$1('d'),
            M : pluralize$1('M'),
            MM : pluralize$1('M'),
            y : pluralize$1('y'),
            yy : pluralize$1('y')
        },
        preparse: function (string) {
            return string.replace(/[佟佗伲伽佶佴侑侉侃贍]/g, function (match) {
                return numberMap$1[match];
            }).replace(/貙/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap$2[match];
            }).replace(/,/g, '貙');
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 12th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var suffixes = {
        1: '-inci',
        5: '-inci',
        8: '-inci',
        70: '-inci',
        80: '-inci',
        2: '-nci',
        7: '-nci',
        20: '-nci',
        50: '-nci',
        3: '-眉nc眉',
        4: '-眉nc眉',
        100: '-眉nc眉',
        6: '-nc谋',
        9: '-uncu',
        10: '-uncu',
        30: '-uncu',
        60: '-谋nc谋',
        90: '-谋nc谋'
    };

    hooks.defineLocale('az', {
        months : 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
        monthsShort : 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
        weekdays : 'Bazar_Bazar ert蓹si_脟蓹r艧蓹nb蓹 ax艧am谋_脟蓹r艧蓹nb蓹_C眉m蓹 ax艧am谋_C眉m蓹_艦蓹nb蓹'.split('_'),
        weekdaysShort : 'Baz_BzE_脟Ax_脟蓹r_CAx_C眉m_艦蓹n'.split('_'),
        weekdaysMin : 'Bz_BE_脟A_脟蓹_CA_C眉_艦蓹'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[bug眉n saat] LT',
            nextDay : '[sabah saat] LT',
            nextWeek : '[g蓹l蓹n h蓹ft蓹] dddd [saat] LT',
            lastDay : '[d眉n蓹n] LT',
            lastWeek : '[ke莽蓹n h蓹ft蓹] dddd [saat] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s sonra',
            past : '%s 蓹vv蓹l',
            s : 'birne莽蓹 saniy蓹',
            ss : '%d saniy蓹',
            m : 'bir d蓹qiq蓹',
            mm : '%d d蓹qiq蓹',
            h : 'bir saat',
            hh : '%d saat',
            d : 'bir g眉n',
            dd : '%d g眉n',
            M : 'bir ay',
            MM : '%d ay',
            y : 'bir il',
            yy : '%d il'
        },
        meridiemParse: /gec蓹|s蓹h蓹r|g眉nd眉z|ax艧am/,
        isPM : function (input) {
            return /^(g眉nd眉z|ax艧am)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 4) {
                return 'gec蓹';
            } else if (hour &lt; 12) {
                return 's蓹h蓹r';
            } else if (hour &lt; 17) {
                return 'g眉nd眉z';
            } else {
                return 'ax艧am';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(谋nc谋|inci|nci|眉nc眉|nc谋|uncu)/,
        ordinal : function (number) {
            if (number === 0) {  // special case for zero
                return number + '-谋nc谋';
            }
            var a = number % 10,
                b = number % 100 - a,
                c = number &gt;= 100 ? 100 : null;
            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 &amp;&amp; num % 100 !== 11 ? forms[0] : (num % 10 &gt;= 2 &amp;&amp; num % 10 &lt;= 4 &amp;&amp; (num % 100 &lt; 10 || num % 100 &gt;= 20) ? forms[1] : forms[2]);
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'ss': withoutSuffix ? '褋械泻褍薪写邪_褋械泻褍薪写褘_褋械泻褍薪写' : '褋械泻褍薪写褍_褋械泻褍薪写褘_褋械泻褍薪写',
            'mm': withoutSuffix ? '褏胁褨谢褨薪邪_褏胁褨谢褨薪褘_褏胁褨谢褨薪' : '褏胁褨谢褨薪褍_褏胁褨谢褨薪褘_褏胁褨谢褨薪',
            'hh': withoutSuffix ? '谐邪写蟹褨薪邪_谐邪写蟹褨薪褘_谐邪写蟹褨薪' : '谐邪写蟹褨薪褍_谐邪写蟹褨薪褘_谐邪写蟹褨薪',
            'dd': '写蟹械薪褜_写薪褨_写蟹褢薪',
            'MM': '屑械褋褟褑_屑械褋褟褑褘_屑械褋褟褑邪褳',
            'yy': '谐芯写_谐邪写褘_谐邪写芯褳'
        };
        if (key === 'm') {
            return withoutSuffix ? '褏胁褨谢褨薪邪' : '褏胁褨谢褨薪褍';
        }
        else if (key === 'h') {
            return withoutSuffix ? '谐邪写蟹褨薪邪' : '谐邪写蟹褨薪褍';
        }
        else {
            return number + ' ' + plural(format[key], +number);
        }
    }

    hooks.defineLocale('be', {
        months : {
            format: '褋褌褍写蟹械薪褟_谢褞褌邪谐邪_褋邪泻邪胁褨泻邪_泻褉邪褋邪胁褨泻邪_褌褉邪褳薪褟_褔褝褉胁械薪褟_谢褨锌械薪褟_卸薪褨褳薪褟_胁械褉邪褋薪褟_泻邪褋褌褉褘褔薪褨泻邪_谢褨褋褌邪锌邪写邪_褋薪械卸薪褟'.split('_'),
            standalone: '褋褌褍写蟹械薪褜_谢褞褌褘_褋邪泻邪胁褨泻_泻褉邪褋邪胁褨泻_褌褉邪胁械薪褜_褔褝褉胁械薪褜_谢褨锌械薪褜_卸薪褨胁械薪褜_胁械褉邪褋械薪褜_泻邪褋褌褉褘褔薪褨泻_谢褨褋褌邪锌邪写_褋薪械卸邪薪褜'.split('_')
        },
        monthsShort : '褋褌褍写_谢褞褌_褋邪泻_泻褉邪褋_褌褉邪胁_褔褝褉胁_谢褨锌_卸薪褨胁_胁械褉_泻邪褋褌_谢褨褋褌_褋薪械卸'.split('_'),
        weekdays : {
            format: '薪褟写蟹械谢褞_锌邪薪褟写蟹械谢邪泻_邪褳褌芯褉邪泻_褋械褉邪写褍_褔邪褑胁械褉_锌褟褌薪褨褑褍_褋褍斜芯褌褍'.split('_'),
            standalone: '薪褟写蟹械谢褟_锌邪薪褟写蟹械谢邪泻_邪褳褌芯褉邪泻_褋械褉邪写邪_褔邪褑胁械褉_锌褟褌薪褨褑邪_褋褍斜芯褌邪'.split('_'),
            isFormat: /\[ ?[校褍褳] ?(?:屑褨薪褍谢褍褞|薪邪褋褌褍锌薪褍褞)? ?\] ?dddd/
        },
        weekdaysShort : '薪写_锌薪_邪褌_褋褉_褔褑_锌褌_褋斜'.split('_'),
        weekdaysMin : '薪写_锌薪_邪褌_褋褉_褔褑_锌褌_褋斜'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY 谐.',
            LLL : 'D MMMM YYYY 谐., HH:mm',
            LLLL : 'dddd, D MMMM YYYY 谐., HH:mm'
        },
        calendar : {
            sameDay: '[小褢薪薪褟 褳] LT',
            nextDay: '[袟邪褳褌褉邪 褳] LT',
            lastDay: '[校褔芯褉邪 褳] LT',
            nextWeek: function () {
                return '[校] dddd [褳] LT';
            },
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return '[校 屑褨薪褍谢褍褞] dddd [褳] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[校 屑褨薪褍谢褘] dddd [褳] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : '锌褉邪蟹 %s',
            past : '%s 褌邪屑褍',
            s : '薪械泻邪谢褜泻褨 褋械泻褍薪写',
            m : relativeTimeWithPlural,
            mm : relativeTimeWithPlural,
            h : relativeTimeWithPlural,
            hh : relativeTimeWithPlural,
            d : '写蟹械薪褜',
            dd : relativeTimeWithPlural,
            M : '屑械褋褟褑',
            MM : relativeTimeWithPlural,
            y : '谐芯写',
            yy : relativeTimeWithPlural
        },
        meridiemParse: /薪芯褔褘|褉邪薪褨褑褘|写薪褟|胁械褔邪褉邪/,
        isPM : function (input) {
            return /^(写薪褟|胁械褔邪褉邪)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 4) {
                return '薪芯褔褘';
            } else if (hour &lt; 12) {
                return '褉邪薪褨褑褘';
            } else if (hour &lt; 17) {
                return '写薪褟';
            } else {
                return '胁械褔邪褉邪';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(褨|褘|谐邪)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'M':
                case 'd':
                case 'DDD':
                case 'w':
                case 'W':
                    return (number % 10 === 2 || number % 10 === 3) &amp;&amp; (number % 100 !== 12 &amp;&amp; number % 100 !== 13) ? number + '-褨' : number + '-褘';
                case 'D':
                    return number + '-谐邪';
                default:
                    return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('bg', {
        months : '褟薪褍邪褉懈_褎械胁褉褍邪褉懈_屑邪褉褌_邪锌褉懈谢_屑邪泄_褞薪懈_褞谢懈_邪胁谐褍褋褌_褋械锌褌械屑胁褉懈_芯泻褌芯屑胁褉懈_薪芯械屑胁褉懈_写械泻械屑胁褉懈'.split('_'),
        monthsShort : '褟薪褉_褎械胁_屑邪褉_邪锌褉_屑邪泄_褞薪懈_褞谢懈_邪胁谐_褋械锌_芯泻褌_薪芯械_写械泻'.split('_'),
        weekdays : '薪械写械谢褟_锌芯薪械写械谢薪懈泻_胁褌芯褉薪懈泻_褋褉褟写邪_褔械褌胁褗褉褌褗泻_锌械褌褗泻_褋褗斜芯褌邪'.split('_'),
        weekdaysShort : '薪械写_锌芯薪_胁褌芯_褋褉褟_褔械褌_锌械褌_褋褗斜'.split('_'),
        weekdaysMin : '薪写_锌薪_胁褌_褋褉_褔褌_锌褌_褋斜'.split('_'),
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'D.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY H:mm',
            LLLL : 'dddd, D MMMM YYYY H:mm'
        },
        calendar : {
            sameDay : '[袛薪械褋 胁] LT',
            nextDay : '[校褌褉械 胁] LT',
            nextWeek : 'dddd [胁] LT',
            lastDay : '[袙褔械褉邪 胁] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return '[袙 懈蟹屑懈薪邪谢邪褌邪] dddd [胁] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[袙 懈蟹屑懈薪邪谢懈褟] dddd [胁] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : '褋谢械写 %s',
            past : '锌褉械写懈 %s',
            s : '薪褟泻芯谢泻芯 褋械泻褍薪写懈',
            ss : '%d 褋械泻褍薪写懈',
            m : '屑懈薪褍褌邪',
            mm : '%d 屑懈薪褍褌懈',
            h : '褔邪褋',
            hh : '%d 褔邪褋邪',
            d : '写械薪',
            dd : '%d 写薪懈',
            M : '屑械褋械褑',
            MM : '%d 屑械褋械褑邪',
            y : '谐芯写懈薪邪',
            yy : '%d 谐芯写懈薪懈'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(械胁|械薪|褌懈|胁懈|褉懈|屑懈)/,
        ordinal : function (number) {
            var lastDigit = number % 10,
                last2Digits = number % 100;
            if (number === 0) {
                return number + '-械胁';
            } else if (last2Digits === 0) {
                return number + '-械薪';
            } else if (last2Digits &gt; 10 &amp;&amp; last2Digits &lt; 20) {
                return number + '-褌懈';
            } else if (lastDigit === 1) {
                return number + '-胁懈';
            } else if (lastDigit === 2) {
                return number + '-褉懈';
            } else if (lastDigit === 7 || lastDigit === 8) {
                return number + '-屑懈';
            } else {
                return number + '-褌懈';
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('bm', {
        months : 'Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_M蓻kalo_Zuw蓻nkalo_Zuluyekalo_Utikalo_S蓻tanburukalo_蓴kut蓴burukalo_Nowanburukalo_Desanburukalo'.split('_'),
        monthsShort : 'Zan_Few_Mar_Awi_M蓻_Zuw_Zul_Uti_S蓻t_蓴ku_Now_Des'.split('_'),
        weekdays : 'Kari_Nt蓻n蓻n_Tarata_Araba_Alamisa_Juma_Sibiri'.split('_'),
        weekdaysShort : 'Kar_Nt蓻_Tar_Ara_Ala_Jum_Sib'.split('_'),
        weekdaysMin : 'Ka_Nt_Ta_Ar_Al_Ju_Si'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'MMMM [tile] D [san] YYYY',
            LLL : 'MMMM [tile] D [san] YYYY [l蓻r蓻] HH:mm',
            LLLL : 'dddd MMMM [tile] D [san] YYYY [l蓻r蓻] HH:mm'
        },
        calendar : {
            sameDay : '[Bi l蓻r蓻] LT',
            nextDay : '[Sini l蓻r蓻] LT',
            nextWeek : 'dddd [don l蓻r蓻] LT',
            lastDay : '[Kunu l蓻r蓻] LT',
            lastWeek : 'dddd [t蓻m蓻nen l蓻r蓻] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s k蓴n蓴',
            past : 'a b蓻 %s b蓴',
            s : 'sanga dama dama',
            ss : 'sekondi %d',
            m : 'miniti kelen',
            mm : 'miniti %d',
            h : 'l蓻r蓻 kelen',
            hh : 'l蓻r蓻 %d',
            d : 'tile kelen',
            dd : 'tile %d',
            M : 'kalo kelen',
            MM : 'kalo %d',
            y : 'san kelen',
            yy : 'san %d'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var symbolMap$3 = {
        '1': '唰�',
        '2': '唰�',
        '3': '唰�',
        '4': '唰�',
        '5': '唰�',
        '6': '唰�',
        '7': '唰�',
        '8': '唰�',
        '9': '唰�',
        '0': '唰�'
    },
    numberMap$2 = {
        '唰�': '1',
        '唰�': '2',
        '唰�': '3',
        '唰�': '4',
        '唰�': '5',
        '唰�': '6',
        '唰�': '7',
        '唰�': '8',
        '唰�': '9',
        '唰�': '0'
    };

    hooks.defineLocale('bn', {
        months : '唳溹唳ㄠ唰熰唳班_唳唳唳班唰熰唳班_唳唳班唳歘唳忇Κ唰嵿Π唳苦Σ_唳_唳溹唳╛唳溹唳侧唳嘷唳嗋唳膏唳焈唳膏唳唳熰唳唳Π_唳呧唰嵿唰嬥Μ唳癬唳ㄠΝ唰囙Ξ唰嵿Μ唳癬唳∴唳膏唳唳Π'.split('_'),
        monthsShort : '唳溹唳ㄠ_唳唳琠唳唳班唳歘唳忇Κ唰嵿Π_唳_唳溹唳╛唳溹唳瞋唳嗋_唳膏唳唳焈唳呧唰嵿唰媉唳ㄠΝ唰嘷唳∴唳膏'.split('_'),
        weekdays : '唳班Μ唳苦Μ唳距Π_唳膏唳Μ唳距Π_唳唰嵿唳侧Μ唳距Π_唳唳оΜ唳距Π_唳唳灌Ω唰嵿Κ唳む唳唳癬唳多唳曕唳班Μ唳距Π_唳多Θ唳苦Μ唳距Π'.split('_'),
        weekdaysShort : '唳班Μ唳縚唳膏唳甠唳唰嵿唳瞋唳唳唳唳灌Ω唰嵿Κ唳む_唳多唳曕唳癬唳多Θ唳�'.split('_'),
        weekdaysMin : '唳班Μ唳縚唳膏唳甠唳唰嵿_唳唳唳唳灌_唳多唳曕唳癬唳多Θ唳�'.split('_'),
        longDateFormat : {
            LT : 'A h:mm 唳膏Ξ唰�',
            LTS : 'A h:mm:ss 唳膏Ξ唰�',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm 唳膏Ξ唰�',
            LLLL : 'dddd, D MMMM YYYY, A h:mm 唳膏Ξ唰�'
        },
        calendar : {
            sameDay : '[唳嗋] LT',
            nextDay : '[唳嗋唳距Ξ唰€唳曕唳瞉 LT',
            nextWeek : 'dddd, LT',
            lastDay : '[唳椸Δ唳曕唳瞉 LT',
            lastWeek : '[唳椸Δ] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s 唳Π唰�',
            past : '%s 唳嗋唰�',
            s : '唳曕唰囙 唳膏唳曕唳ㄠ唳�',
            ss : '%d 唳膏唳曕唳ㄠ唳�',
            m : '唳忇 唳唳ㄠ唳�',
            mm : '%d 唳唳ㄠ唳�',
            h : '唳忇 唳樴Θ唰嵿唳�',
            hh : '%d 唳樴Θ唰嵿唳�',
            d : '唳忇 唳︵唳�',
            dd : '%d 唳︵唳�',
            M : '唳忇 唳唳�',
            MM : '%d 唳唳�',
            y : '唳忇 唳唳�',
            yy : '%d 唳唳�'
        },
        preparse: function (string) {
            return string.replace(/[唰оЖ唰┼И唰К唰М唰Е]/g, function (match) {
                return numberMap$2[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap$3[match];
            });
        },
        meridiemParse: /唳班唳唳膏唳距Σ|唳︵唳唳皘唳唳曕唳瞸唳班唳�/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if ((meridiem === '唳班唳�' &amp;&amp; hour &gt;= 4) ||
                    (meridiem === '唳︵唳唳�' &amp;&amp; hour &lt; 5) ||
                    meridiem === '唳唳曕唳�') {
                return hour + 12;
            } else {
                return hour;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 4) {
                return '唳班唳�';
            } else if (hour &lt; 10) {
                return '唳膏唳距Σ';
            } else if (hour &lt; 17) {
                return '唳︵唳唳�';
            } else if (hour &lt; 20) {
                return '唳唳曕唳�';
            } else {
                return '唳班唳�';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var symbolMap$4 = {
        '1': '嗉�',
        '2': '嗉�',
        '3': '嗉�',
        '4': '嗉�',
        '5': '嗉�',
        '6': '嗉�',
        '7': '嗉�',
        '8': '嗉�',
        '9': '嗉�',
        '0': '嗉�'
    },
    numberMap$3 = {
        '嗉�': '1',
        '嗉�': '2',
        '嗉�': '3',
        '嗉�': '4',
        '嗉�': '5',
        '嗉�': '6',
        '嗉�': '7',
        '嗉�': '8',
        '嗉�': '9',
        '嗉�': '0'
    };

    hooks.defineLocale('bo', {
        months : '嘟熰境嗉嬥綎嗉嬥綉嘟勦紜嘟斷郊_嘟熰境嗉嬥綎嗉嬥絺嘟夃讲嘟︵紜嘟擾嘟熰境嗉嬥綎嗉嬥絺嘟︵酱嘟樴紜嘟擾嘟熰境嗉嬥綎嗉嬥綎嘟炧讲嗉嬥綌_嘟熰境嗉嬥綎嗉嬥剑嗑斷紜嘟擾嘟熰境嗉嬥綎嗉嬥綉嗑侧酱嘟傕紜嘟擾嘟熰境嗉嬥綎嗉嬥綎嘟戉酱嘟撪紜嘟擾嘟熰境嗉嬥綎嗉嬥綎嘟⑧緬嗑编綉嗉嬥綌_嘟熰境嗉嬥綎嗉嬥綉嘟傕酱嗉嬥綌_嘟熰境嗉嬥綎嗉嬥綎嘟呧酱嗉嬥綌_嘟熰境嗉嬥綎嗉嬥綎嘟呧酱嗉嬥絺嘟呧讲嘟傕紜嘟擾嘟熰境嗉嬥綎嗉嬥綎嘟呧酱嗉嬥絺嘟夃讲嘟︵紜嘟�'.split('_'),
        monthsShort : '嘟熰境嗉嬥綎嗉嬥綉嘟勦紜嘟斷郊_嘟熰境嗉嬥綎嗉嬥絺嘟夃讲嘟︵紜嘟擾嘟熰境嗉嬥綎嗉嬥絺嘟︵酱嘟樴紜嘟擾嘟熰境嗉嬥綎嗉嬥綎嘟炧讲嗉嬥綌_嘟熰境嗉嬥綎嗉嬥剑嗑斷紜嘟擾嘟熰境嗉嬥綎嗉嬥綉嗑侧酱嘟傕紜嘟擾嘟熰境嗉嬥綎嗉嬥綎嘟戉酱嘟撪紜嘟擾嘟熰境嗉嬥綎嗉嬥綎嘟⑧緬嗑编綉嗉嬥綌_嘟熰境嗉嬥綎嗉嬥綉嘟傕酱嗉嬥綌_嘟熰境嗉嬥綎嗉嬥綎嘟呧酱嗉嬥綌_嘟熰境嗉嬥綎嗉嬥綎嘟呧酱嗉嬥絺嘟呧讲嘟傕紜嘟擾嘟熰境嗉嬥綎嗉嬥綎嘟呧酱嗉嬥絺嘟夃讲嘟︵紜嘟�'.split('_'),
        weekdays : '嘟傕綗嘟犩紜嘟夃讲嗉嬥綐嗉媉嘟傕綗嘟犩紜嘟熰境嗉嬥綎嗉媉嘟傕綗嘟犩紜嘟樴讲嘟傕紜嘟戉綐嘟⑧紜_嘟傕綗嘟犩紜嘟｀痉嘟傕紜嘟斷紜_嘟傕綗嘟犩紜嘟曕酱嘟⑧紜嘟栢酱_嘟傕綗嘟犩紜嘟斷紜嘟︵絼嘟︵紜_嘟傕綗嘟犩紜嘟︵兢嘟亨綋嗉嬥綌嗉�'.split('_'),
        weekdaysShort : '嘟夃讲嗉嬥綐嗉媉嘟熰境嗉嬥綎嗉媉嘟樴讲嘟傕紜嘟戉綐嘟⑧紜_嘟｀痉嘟傕紜嘟斷紜_嘟曕酱嘟⑧紜嘟栢酱_嘟斷紜嘟︵絼嘟︵紜_嘟︵兢嘟亨綋嗉嬥綌嗉�'.split('_'),
        weekdaysMin : '嘟夃讲嗉嬥綐嗉媉嘟熰境嗉嬥綎嗉媉嘟樴讲嘟傕紜嘟戉綐嘟⑧紜_嘟｀痉嘟傕紜嘟斷紜_嘟曕酱嘟⑧紜嘟栢酱_嘟斷紜嘟︵絼嘟︵紜_嘟︵兢嘟亨綋嗉嬥綌嗉�'.split('_'),
        longDateFormat : {
            LT : 'A h:mm',
            LTS : 'A h:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm',
            LLLL : 'dddd, D MMMM YYYY, A h:mm'
        },
        calendar : {
            sameDay : '[嘟戉讲嗉嬥舰嘟侧絼] LT',
            nextDay : '[嘟︵絼嗉嬥綁嘟侧綋] LT',
            nextWeek : '[嘟栢綉嘟脆綋嗉嬥綍嗑侧絺嗉嬥舰嗑椸胶嘟︵紜嘟榏, LT',
            lastDay : '[嘟佮紜嘟︵絼] LT',
            lastWeek : '[嘟栢綉嘟脆綋嗉嬥綍嗑侧絺嗉嬥綐嘟愢綘嗉嬥綐] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s 嘟｀紜',
            past : '%s 嘟︵緮嘟撪紜嘟�',
            s : '嘟｀綐嗉嬥溅嘟�',
            ss : '%d 嘟︵緪嘟⑧紜嘟嗋紞',
            m : '嘟︵緪嘟⑧紜嘟樴紜嘟傕絽嘟侧絺',
            mm : '%d 嘟︵緪嘟⑧紜嘟�',
            h : '嘟嗋酱嗉嬥綒嘟监綉嗉嬥絺嘟呧讲嘟�',
            hh : '%d 嘟嗋酱嗉嬥綒嘟监綉',
            d : '嘟夃讲嘟撪紜嘟傕絽嘟侧絺',
            dd : '%d 嘟夃讲嘟撪紜',
            M : '嘟熰境嗉嬥綎嗉嬥絺嘟呧讲嘟�',
            MM : '%d 嘟熰境嗉嬥綎',
            y : '嘟｀郊嗉嬥絺嘟呧讲嘟�',
            yy : '%d 嘟｀郊'
        },
        preparse: function (string) {
            return string.replace(/[嗉∴饥嗉｀激嗉ム鸡嗉о绩嗉┼紶]/g, function (match) {
                return numberMap$3[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap$4[match];
            });
        },
        meridiemParse: /嘟樴綒嘟撪紜嘟樴郊|嘟炧郊嘟傕溅嗉嬥絸嘟嘟夃讲嘟撪紜嘟傕酱嘟剕嘟戉絺嘟监絼嗉嬥綉嘟倈嘟樴綒嘟撪紜嘟樴郊/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if ((meridiem === '嘟樴綒嘟撪紜嘟樴郊' &amp;&amp; hour &gt;= 4) ||
                    (meridiem === '嘟夃讲嘟撪紜嘟傕酱嘟�' &amp;&amp; hour &lt; 5) ||
                    meridiem === '嘟戉絺嘟监絼嗉嬥綉嘟�') {
                return hour + 12;
            } else {
                return hour;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 4) {
                return '嘟樴綒嘟撪紜嘟樴郊';
            } else if (hour &lt; 10) {
                return '嘟炧郊嘟傕溅嗉嬥絸嘟�';
            } else if (hour &lt; 17) {
                return '嘟夃讲嘟撪紜嘟傕酱嘟�';
            } else if (hour &lt; 20) {
                return '嘟戉絺嘟监絼嗉嬥綉嘟�';
            } else {
                return '嘟樴綒嘟撪紜嘟樴郊';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    function relativeTimeWithMutation(number, withoutSuffix, key) {
        var format = {
            'mm': 'munutenn',
            'MM': 'miz',
            'dd': 'devezh'
        };
        return number + ' ' + mutation(format[key], number);
    }
    function specialMutationForYears(number) {
        switch (lastNumber(number)) {
            case 1:
            case 3:
            case 4:
            case 5:
            case 9:
                return number + ' bloaz';
            default:
                return number + ' vloaz';
        }
    }
    function lastNumber(number) {
        if (number &gt; 9) {
            return lastNumber(number % 10);
        }
        return number;
    }
    function mutation(text, number) {
        if (number === 2) {
            return softMutation(text);
        }
        return text;
    }
    function softMutation(text) {
        var mutationTable = {
            'm': 'v',
            'b': 'v',
            'd': 'z'
        };
        if (mutationTable[text.charAt(0)] === undefined) {
            return text;
        }
        return mutationTable[text.charAt(0)] + text.substring(1);
    }

    hooks.defineLocale('br', {
        months : 'Genver_C\'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
        monthsShort : 'Gen_C\'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
        weekdays : 'Sul_Lun_Meurzh_Merc\'her_Yaou_Gwener_Sadorn'.split('_'),
        weekdaysShort : 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
        weekdaysMin : 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'h[e]mm A',
            LTS : 'h[e]mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D [a viz] MMMM YYYY',
            LLL : 'D [a viz] MMMM YYYY h[e]mm A',
            LLLL : 'dddd, D [a viz] MMMM YYYY h[e]mm A'
        },
        calendar : {
            sameDay : '[Hiziv da] LT',
            nextDay : '[Warc\'hoazh da] LT',
            nextWeek : 'dddd [da] LT',
            lastDay : '[Dec\'h da] LT',
            lastWeek : 'dddd [paset da] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'a-benn %s',
            past : '%s \'zo',
            s : 'un nebeud segondenno霉',
            ss : '%d eilenn',
            m : 'ur vunutenn',
            mm : relativeTimeWithMutation,
            h : 'un eur',
            hh : '%d eur',
            d : 'un devezh',
            dd : relativeTimeWithMutation,
            M : 'ur miz',
            MM : relativeTimeWithMutation,
            y : 'ur bloaz',
            yy : specialMutationForYears
        },
        dayOfMonthOrdinalParse: /\d{1,2}(a帽|vet)/,
        ordinal : function (number) {
            var output = (number === 1) ? 'a帽' : 'vet';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    function translate(number, withoutSuffix, key) {
        var result = number + ' ';
        switch (key) {
            case 'ss':
                if (number === 1) {
                    result += 'sekunda';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'sekunde';
                } else {
                    result += 'sekundi';
                }
                return result;
            case 'm':
                return withoutSuffix ? 'jedna minuta' : 'jedne minute';
            case 'mm':
                if (number === 1) {
                    result += 'minuta';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'minute';
                } else {
                    result += 'minuta';
                }
                return result;
            case 'h':
                return withoutSuffix ? 'jedan sat' : 'jednog sata';
            case 'hh':
                if (number === 1) {
                    result += 'sat';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'sata';
                } else {
                    result += 'sati';
                }
                return result;
            case 'dd':
                if (number === 1) {
                    result += 'dan';
                } else {
                    result += 'dana';
                }
                return result;
            case 'MM':
                if (number === 1) {
                    result += 'mjesec';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'mjeseca';
                } else {
                    result += 'mjeseci';
                }
                return result;
            case 'yy':
                if (number === 1) {
                    result += 'godina';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'godine';
                } else {
                    result += 'godina';
                }
                return result;
        }
    }

    hooks.defineLocale('bs', {
        months : 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
        monthsShort : 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_膷etvrtak_petak_subota'.split('_'),
        weekdaysShort : 'ned._pon._uto._sri._膷et._pet._sub.'.split('_'),
        weekdaysMin : 'ne_po_ut_sr_膷e_pe_su'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd, D. MMMM YYYY H:mm'
        },
        calendar : {
            sameDay  : '[danas u] LT',
            nextDay  : '[sutra u] LT',
            nextWeek : function () {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedjelju] [u] LT';
                    case 3:
                        return '[u] [srijedu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay  : '[ju膷er u] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                        return '[pro拧lu] dddd [u] LT';
                    case 6:
                        return '[pro拧le] [subote] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[pro拧li] dddd [u] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'za %s',
            past   : 'prije %s',
            s      : 'par sekundi',
            ss     : translate,
            m      : translate,
            mm     : translate,
            h      : translate,
            hh     : translate,
            d      : 'dan',
            dd     : translate,
            M      : 'mjesec',
            MM     : translate,
            y      : 'godinu',
            yy     : translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('ca', {
        months : {
            standalone: 'gener_febrer_mar莽_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
            format: 'de gener_de febrer_de mar莽_d\'abril_de maig_de juny_de juliol_d\'agost_de setembre_d\'octubre_de novembre_de desembre'.split('_'),
            isFormat: /D[oD]?(\s)+MMMM/
        },
        monthsShort : 'gen._febr._mar莽_abr._maig_juny_jul._ag._set._oct._nov._des.'.split('_'),
        monthsParseExact : true,
        weekdays : 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
        weekdaysShort : 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
        weekdaysMin : 'dg_dl_dt_dc_dj_dv_ds'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM [de] YYYY',
            ll : 'D MMM YYYY',
            LLL : 'D MMMM [de] YYYY [a les] H:mm',
            lll : 'D MMM YYYY, H:mm',
            LLLL : 'dddd D MMMM [de] YYYY [a les] H:mm',
            llll : 'ddd D MMM YYYY, H:mm'
        },
        calendar : {
            sameDay : function () {
                return '[avui a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            nextDay : function () {
                return '[dem脿 a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            lastDay : function () {
                return '[ahir a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            lastWeek : function () {
                return '[el] dddd [passat a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'd\'aqu铆 %s',
            past : 'fa %s',
            s : 'uns segons',
            ss : '%d segons',
            m : 'un minut',
            mm : '%d minuts',
            h : 'una hora',
            hh : '%d hores',
            d : 'un dia',
            dd : '%d dies',
            M : 'un mes',
            MM : '%d mesos',
            y : 'un any',
            yy : '%d anys'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|猫|a)/,
        ordinal : function (number, period) {
            var output = (number === 1) ? 'r' :
                (number === 2) ? 'n' :
                (number === 3) ? 'r' :
                (number === 4) ? 't' : '猫';
            if (period === 'w' || period === 'W') {
                output = 'a';
            }
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var months$3 = 'leden_煤nor_b艡ezen_duben_kv臎ten_膷erven_膷ervenec_srpen_z谩艡铆_艡铆jen_listopad_prosinec'.split('_'),
        monthsShort = 'led_煤no_b艡e_dub_kv臎_膷vn_膷vc_srp_z谩艡_艡铆j_lis_pro'.split('_');

    var monthsParse = [/^led/i, /^煤no/i, /^b艡e/i, /^dub/i, /^kv臎/i, /^(膷vn|膷erven$|膷ervna)/i, /^(膷vc|膷ervenec|膷ervence)/i, /^srp/i, /^z谩艡/i, /^艡铆j/i, /^lis/i, /^pro/i];
    // NOTE: '膷erven' is substring of '膷ervenec'; therefore '膷ervenec' must precede '膷erven' in the regex to be fully matched.
    // Otherwise parser matches '1. 膷ervenec' as '1. 膷erven' + 'ec'.
    var monthsRegex$1 = /^(leden|煤nor|b艡ezen|duben|kv臎ten|膷ervenec|膷ervence|膷erven|膷ervna|srpen|z谩艡铆|艡铆jen|listopad|prosinec|led|煤no|b艡e|dub|kv臎|膷vn|膷vc|srp|z谩艡|艡铆j|lis|pro)/i;

    function plural$1(n) {
        return (n &gt; 1) &amp;&amp; (n &lt; 5) &amp;&amp; (~~(n / 10) !== 1);
    }
    function translate$1(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':  // a few seconds / in a few seconds / a few seconds ago
                return (withoutSuffix || isFuture) ? 'p谩r sekund' : 'p谩r sekundami';
            case 'ss': // 9 seconds / in 9 seconds / 9 seconds ago
                if (withoutSuffix || isFuture) {
                    return result + (plural$1(number) ? 'sekundy' : 'sekund');
                } else {
                    return result + 'sekundami';
                }
                break;
            case 'm':  // a minute / in a minute / a minute ago
                return withoutSuffix ? 'minuta' : (isFuture ? 'minutu' : 'minutou');
            case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
                if (withoutSuffix || isFuture) {
                    return result + (plural$1(number) ? 'minuty' : 'minut');
                } else {
                    return result + 'minutami';
                }
                break;
            case 'h':  // an hour / in an hour / an hour ago
                return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
            case 'hh': // 9 hours / in 9 hours / 9 hours ago
                if (withoutSuffix || isFuture) {
                    return result + (plural$1(number) ? 'hodiny' : 'hodin');
                } else {
                    return result + 'hodinami';
                }
                break;
            case 'd':  // a day / in a day / a day ago
                return (withoutSuffix || isFuture) ? 'den' : 'dnem';
            case 'dd': // 9 days / in 9 days / 9 days ago
                if (withoutSuffix || isFuture) {
                    return result + (plural$1(number) ? 'dny' : 'dn铆');
                } else {
                    return result + 'dny';
                }
                break;
            case 'M':  // a month / in a month / a month ago
                return (withoutSuffix || isFuture) ? 'm臎s铆c' : 'm臎s铆cem';
            case 'MM': // 9 months / in 9 months / 9 months ago
                if (withoutSuffix || isFuture) {
                    return result + (plural$1(number) ? 'm臎s铆ce' : 'm臎s铆c暖');
                } else {
                    return result + 'm臎s铆ci';
                }
                break;
            case 'y':  // a year / in a year / a year ago
                return (withoutSuffix || isFuture) ? 'rok' : 'rokem';
            case 'yy': // 9 years / in 9 years / 9 years ago
                if (withoutSuffix || isFuture) {
                    return result + (plural$1(number) ? 'roky' : 'let');
                } else {
                    return result + 'lety';
                }
                break;
        }
    }

    hooks.defineLocale('cs', {
        months : months$3,
        monthsShort : monthsShort,
        monthsRegex : monthsRegex$1,
        monthsShortRegex : monthsRegex$1,
        // NOTE: '膷erven' is substring of '膷ervenec'; therefore '膷ervenec' must precede '膷erven' in the regex to be fully matched.
        // Otherwise parser matches '1. 膷ervenec' as '1. 膷erven' + 'ec'.
        monthsStrictRegex : /^(leden|ledna|煤nora|煤nor|b艡ezen|b艡ezna|duben|dubna|kv臎ten|kv臎tna|膷ervenec|膷ervence|膷erven|膷ervna|srpen|srpna|z谩艡铆|艡铆jen|艡铆jna|listopadu|listopad|prosinec|prosince)/i,
        monthsShortStrictRegex : /^(led|煤no|b艡e|dub|kv臎|膷vn|膷vc|srp|z谩艡|艡铆j|lis|pro)/i,
        monthsParse : monthsParse,
        longMonthsParse : monthsParse,
        shortMonthsParse : monthsParse,
        weekdays : 'ned臎le_pond臎l铆_煤ter媒_st艡eda_膷tvrtek_p谩tek_sobota'.split('_'),
        weekdaysShort : 'ne_po_煤t_st_膷t_p谩_so'.split('_'),
        weekdaysMin : 'ne_po_煤t_st_膷t_p谩_so'.split('_'),
        longDateFormat : {
            LT: 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd D. MMMM YYYY H:mm',
            l : 'D. M. YYYY'
        },
        calendar : {
            sameDay: '[dnes v] LT',
            nextDay: '[z铆tra v] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[v ned臎li v] LT';
                    case 1:
                    case 2:
                        return '[v] dddd [v] LT';
                    case 3:
                        return '[ve st艡edu v] LT';
                    case 4:
                        return '[ve 膷tvrtek v] LT';
                    case 5:
                        return '[v p谩tek v] LT';
                    case 6:
                        return '[v sobotu v] LT';
                }
            },
            lastDay: '[v膷era v] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[minulou ned臎li v] LT';
                    case 1:
                    case 2:
                        return '[minul茅] dddd [v] LT';
                    case 3:
                        return '[minulou st艡edu v] LT';
                    case 4:
                    case 5:
                        return '[minul媒] dddd [v] LT';
                    case 6:
                        return '[minulou sobotu v] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'za %s',
            past : 'p艡ed %s',
            s : translate$1,
            ss : translate$1,
            m : translate$1,
            mm : translate$1,
            h : translate$1,
            hh : translate$1,
            d : translate$1,
            dd : translate$1,
            M : translate$1,
            MM : translate$1,
            y : translate$1,
            yy : translate$1
        },
        dayOfMonthOrdinalParse : /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('cv', {
        months : '泻討褉谢邪褔_薪邪褉討褋_锌褍褕_邪泻邪_屑邪泄_耀訔褉褌屑械_褍褌討_耀褍褉谢邪_邪胁討薪_褞锌邪_褔映泻_褉邪褕褌邪胁'.split('_'),
        monthsShort : '泻討褉_薪邪褉_锌褍褕_邪泻邪_屑邪泄_耀訔褉_褍褌討_耀褍褉_邪胁薪_褞锌邪_褔映泻_褉邪褕'.split('_'),
        weekdays : '胁褘褉褋邪褉薪懈泻褍薪_褌褍薪褌懈泻褍薪_褘褌谢邪褉懈泻褍薪_褞薪泻褍薪_泻訔耀薪械褉薪懈泻褍薪_褝褉薪械泻褍薪_褕討屑邪褌泻褍薪'.split('_'),
        weekdaysShort : '胁褘褉_褌褍薪_褘褌谢_褞薪_泻訔耀_褝褉薪_褕討屑'.split('_'),
        weekdaysMin : '胁褉_褌薪_褘褌_褞薪_泻耀_褝褉_褕屑'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD-MM-YYYY',
            LL : 'YYYY [耀褍谢褏懈] MMMM [褍泄討褏訔薪] D[-屑訔褕訔]',
            LLL : 'YYYY [耀褍谢褏懈] MMMM [褍泄討褏訔薪] D[-屑訔褕訔], HH:mm',
            LLLL : 'dddd, YYYY [耀褍谢褏懈] MMMM [褍泄討褏訔薪] D[-屑訔褕訔], HH:mm'
        },
        calendar : {
            sameDay: '[袩邪褟薪] LT [褋械褏械褌褉械]',
            nextDay: '[蝎褉邪薪] LT [褋械褏械褌褉械]',
            lastDay: '[訓薪械褉] LT [褋械褏械褌褉械]',
            nextWeek: '[要懈褌械褋] dddd LT [褋械褏械褌褉械]',
            lastWeek: '[袠褉褌薪訔] dddd LT [褋械褏械褌褉械]',
            sameElse: 'L'
        },
        relativeTime : {
            future : function (output) {
                var affix = /褋械褏械褌$/i.exec(output) ? '褉械薪' : /耀褍谢$/i.exec(output) ? '褌邪薪' : '褉邪薪';
                return output + affix;
            },
            past : '%s 泻邪褟谢谢邪',
            s : '锌訔褉-懈泻 耀械泻泻褍薪褌',
            ss : '%d 耀械泻泻褍薪褌',
            m : '锌訔褉 屑懈薪褍褌',
            mm : '%d 屑懈薪褍褌',
            h : '锌訔褉 褋械褏械褌',
            hh : '%d 褋械褏械褌',
            d : '锌訔褉 泻褍薪',
            dd : '%d 泻褍薪',
            M : '锌訔褉 褍泄討褏',
            MM : '%d 褍泄討褏',
            y : '锌訔褉 耀褍谢',
            yy : '%d 耀褍谢'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-屑訔褕/,
        ordinal : '%d-屑訔褕',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('cy', {
        months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
        monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
        weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
        weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
        weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
        weekdaysParseExact : true,
        // time formats are the same as en-gb
        longDateFormat: {
            LT: 'HH:mm',
            LTS : 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Heddiw am] LT',
            nextDay: '[Yfory am] LT',
            nextWeek: 'dddd [am] LT',
            lastDay: '[Ddoe am] LT',
            lastWeek: 'dddd [diwethaf am] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'mewn %s',
            past: '%s yn 么l',
            s: 'ychydig eiliadau',
            ss: '%d eiliad',
            m: 'munud',
            mm: '%d munud',
            h: 'awr',
            hh: '%d awr',
            d: 'diwrnod',
            dd: '%d diwrnod',
            M: 'mis',
            MM: '%d mis',
            y: 'blwyddyn',
            yy: '%d flynedd'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
        // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
        ordinal: function (number) {
            var b = number,
                output = '',
                lookup = [
                    '', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
                    'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
                ];
            if (b &gt; 20) {
                if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
                    output = 'fed'; // not 30ain, 70ain or 90ain
                } else {
                    output = 'ain';
                }
            } else if (b &gt; 0) {
                output = lookup[b];
            }
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('da', {
        months : 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
        weekdays : 's酶ndag_mandag_tirsdag_onsdag_torsdag_fredag_l酶rdag'.split('_'),
        weekdaysShort : 's酶n_man_tir_ons_tor_fre_l酶r'.split('_'),
        weekdaysMin : 's酶_ma_ti_on_to_fr_l酶'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY HH:mm',
            LLLL : 'dddd [d.] D. MMMM YYYY [kl.] HH:mm'
        },
        calendar : {
            sameDay : '[i dag kl.] LT',
            nextDay : '[i morgen kl.] LT',
            nextWeek : 'p氓 dddd [kl.] LT',
            lastDay : '[i g氓r kl.] LT',
            lastWeek : '[i] dddd[s kl.] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'om %s',
            past : '%s siden',
            s : 'f氓 sekunder',
            ss : '%d sekunder',
            m : 'et minut',
            mm : '%d minutter',
            h : 'en time',
            hh : '%d timer',
            d : 'en dag',
            dd : '%d dage',
            M : 'en m氓ned',
            MM : '%d m氓neder',
            y : 'et 氓r',
            yy : '%d 氓r'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    hooks.defineLocale('de-at', {
        months : 'J盲nner_Februar_M盲rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort : 'J盲n._Feb._M盲rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
        monthsParseExact : true,
        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY HH:mm',
            LLLL : 'dddd, D. MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[heute um] LT [Uhr]',
            sameElse: 'L',
            nextDay: '[morgen um] LT [Uhr]',
            nextWeek: 'dddd [um] LT [Uhr]',
            lastDay: '[gestern um] LT [Uhr]',
            lastWeek: '[letzten] dddd [um] LT [Uhr]'
        },
        relativeTime : {
            future : 'in %s',
            past : 'vor %s',
            s : 'ein paar Sekunden',
            ss : '%d Sekunden',
            m : processRelativeTime,
            mm : '%d Minuten',
            h : processRelativeTime,
            hh : '%d Stunden',
            d : processRelativeTime,
            dd : processRelativeTime,
            M : processRelativeTime,
            MM : processRelativeTime,
            y : processRelativeTime,
            yy : processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    function processRelativeTime$1(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    hooks.defineLocale('de-ch', {
        months : 'Januar_Februar_M盲rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort : 'Jan._Feb._M盲rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
        monthsParseExact : true,
        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
        weekdaysShort : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY HH:mm',
            LLLL : 'dddd, D. MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[heute um] LT [Uhr]',
            sameElse: 'L',
            nextDay: '[morgen um] LT [Uhr]',
            nextWeek: 'dddd [um] LT [Uhr]',
            lastDay: '[gestern um] LT [Uhr]',
            lastWeek: '[letzten] dddd [um] LT [Uhr]'
        },
        relativeTime : {
            future : 'in %s',
            past : 'vor %s',
            s : 'ein paar Sekunden',
            ss : '%d Sekunden',
            m : processRelativeTime$1,
            mm : '%d Minuten',
            h : processRelativeTime$1,
            hh : '%d Stunden',
            d : processRelativeTime$1,
            dd : processRelativeTime$1,
            M : processRelativeTime$1,
            MM : processRelativeTime$1,
            y : processRelativeTime$1,
            yy : processRelativeTime$1
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    function processRelativeTime$2(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    hooks.defineLocale('de', {
        months : 'Januar_Februar_M盲rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort : 'Jan._Feb._M盲rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
        monthsParseExact : true,
        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY HH:mm',
            LLLL : 'dddd, D. MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[heute um] LT [Uhr]',
            sameElse: 'L',
            nextDay: '[morgen um] LT [Uhr]',
            nextWeek: 'dddd [um] LT [Uhr]',
            lastDay: '[gestern um] LT [Uhr]',
            lastWeek: '[letzten] dddd [um] LT [Uhr]'
        },
        relativeTime : {
            future : 'in %s',
            past : 'vor %s',
            s : 'ein paar Sekunden',
            ss : '%d Sekunden',
            m : processRelativeTime$2,
            mm : '%d Minuten',
            h : processRelativeTime$2,
            hh : '%d Stunden',
            d : processRelativeTime$2,
            dd : processRelativeTime$2,
            M : processRelativeTime$2,
            MM : processRelativeTime$2,
            y : processRelativeTime$2,
            yy : processRelativeTime$2
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var months$4 = [
        '迻蕃迋蕺迖蕈迌蕞',
        '迠蕃迍薨迌蕺迖蕈迌蕞',
        '迚蕨迌蕤迼蕺',
        '迖蕲迺薨迌蕞迧蕺',
        '迚蕲',
        '迻瞢迋薨',
        '迻蕺迧蕈迖蕤',
        '迖薤迬蕈迱薨迵蕺',
        '迱蕃迺薨迵蕃迚薨迍蕈迌蕺',
        '迖蕻迒薨迵薤迍蕈迌蕺',
        '迋蕻迗蕃迚薨迍蕈迌蕺',
        '迲蕤迱蕃迚薨迍蕈迌蕺'
    ], weekdays = [
        '迖蕨迡蕤迖薨迣蕈',
        '迉薤迚蕈',
        '迖蕈迋薨迬蕨迌蕈',
        '迍蕺迡蕈',
        '迍蕺迌蕨迱薨迠蕈迣蕤',
        '迉蕺迒蕺迌蕺',
        '迉蕻迋蕤迉蕤迌蕺'
    ];

    hooks.defineLocale('dv', {
        months : months$4,
        monthsShort : months$4,
        weekdays : weekdays,
        weekdaysShort : weekdays,
        weekdaysMin : '迖蕨迡蕤_迉薤迚蕈_迖蕈迋薨_迍蕺迡蕈_迍蕺迌蕨_迉蕺迒蕺_迉蕻迋蕤'.split('_'),
        longDateFormat : {

            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'D/M/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /迚迒|迚迠/,
        isPM : function (input) {
            return '迚迠' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 12) {
                return '迚迒';
            } else {
                return '迚迠';
            }
        },
        calendar : {
            sameDay : '[迚蕤迖蕈迡蕺] LT',
            nextDay : '[迚蕨迡蕈迚蕨] LT',
            nextWeek : 'dddd LT',
            lastDay : '[迖蕤迖薨迶蕃] LT',
            lastWeek : '[迠蕨迖蕤迣蕺迗蕤] dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '迣蕃迌蕲迬蕈迖蕤 %s',
            past : '迒蕺迌蕤迋薨 %s',
            s : '迱蕤迒蕺迋薨迣蕺迒蕻迏蕃迖薨',
            ss : 'd% 迱蕤迒蕺迋薨迣蕺',
            m : '迚蕤迋蕤迵蕃迖薨',
            mm : '迚蕤迋蕤迵蕺 %d',
            h : '迬蕈迲蕤迖蕤迌蕃迖薨',
            hh : '迬蕈迲蕤迖蕤迌蕺 %d',
            d : '迡蕺迗蕈迉蕃迖薨',
            dd : '迡蕺迗蕈迱薨 %d',
            M : '迚蕈迉蕃迖薨',
            MM : '迚蕈迱薨 %d',
            y : '迖蕈迉蕈迌蕃迖薨',
            yy : '迖蕈迉蕈迌蕺 %d'
        },
        preparse: function (string) {
            return string.replace(/貙/g, ',');
        },
        postformat: function (string) {
            return string.replace(/,/g, '貙');
        },
        week : {
            dow : 7,  // Sunday is the first day of the week.
            doy : 12  // The week that contains Jan 12th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('el', {
        monthsNominativeEl : '螜伪谓慰蠀维蟻喂慰蟼_桅蔚尾蟻慰蠀维蟻喂慰蟼_螠维蟻蟿喂慰蟼_螒蟺蟻委位喂慰蟼_螠维喂慰蟼_螜慰蠉谓喂慰蟼_螜慰蠉位喂慰蟼_螒蠉纬慰蠀蟽蟿慰蟼_危蔚蟺蟿苇渭尾蟻喂慰蟼_螣魏蟿蠋尾蟻喂慰蟼_螡慰苇渭尾蟻喂慰蟼_螖蔚魏苇渭尾蟻喂慰蟼'.split('_'),
        monthsGenitiveEl : '螜伪谓慰蠀伪蟻委慰蠀_桅蔚尾蟻慰蠀伪蟻委慰蠀_螠伪蟻蟿委慰蠀_螒蟺蟻喂位委慰蠀_螠伪螑慰蠀_螜慰蠀谓委慰蠀_螜慰蠀位委慰蠀_螒蠀纬慰蠉蟽蟿慰蠀_危蔚蟺蟿蔚渭尾蟻委慰蠀_螣魏蟿蠅尾蟻委慰蠀_螡慰蔚渭尾蟻委慰蠀_螖蔚魏蔚渭尾蟻委慰蠀'.split('_'),
        months : function (momentToFormat, format) {
            if (!momentToFormat) {
                return this._monthsNominativeEl;
            } else if (typeof format === 'string' &amp;&amp; /D/.test(format.substring(0, format.indexOf('MMMM')))) { // if there is a day number before 'MMMM'
                return this._monthsGenitiveEl[momentToFormat.month()];
            } else {
                return this._monthsNominativeEl[momentToFormat.month()];
            }
        },
        monthsShort : '螜伪谓_桅蔚尾_螠伪蟻_螒蟺蟻_螠伪蠆_螜慰蠀谓_螜慰蠀位_螒蠀纬_危蔚蟺_螣魏蟿_螡慰蔚_螖蔚魏'.split('_'),
        weekdays : '螝蠀蟻喂伪魏萎_螖蔚蠀蟿苇蟻伪_韦蟻委蟿畏_韦蔚蟿维蟻蟿畏_螤苇渭蟺蟿畏_螤伪蟻伪蟽魏蔚蠀萎_危维尾尾伪蟿慰'.split('_'),
        weekdaysShort : '螝蠀蟻_螖蔚蠀_韦蟻喂_韦蔚蟿_螤蔚渭_螤伪蟻_危伪尾'.split('_'),
        weekdaysMin : '螝蠀_螖蔚_韦蟻_韦蔚_螤蔚_螤伪_危伪'.split('_'),
        meridiem : function (hours, minutes, isLower) {
            if (hours &gt; 11) {
                return isLower ? '渭渭' : '螠螠';
            } else {
                return isLower ? '蟺渭' : '螤螠';
            }
        },
        isPM : function (input) {
            return ((input + '').toLowerCase()[0] === '渭');
        },
        meridiemParse : /[螤螠]\.?螠?\.?/i,
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendarEl : {
            sameDay : '[危萎渭蔚蟻伪 {}] LT',
            nextDay : '[螒蠉蟻喂慰 {}] LT',
            nextWeek : 'dddd [{}] LT',
            lastDay : '[围胃蔚蟼 {}] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 6:
                        return '[蟿慰 蟺蟻慰畏纬慰蠉渭蔚谓慰] dddd [{}] LT';
                    default:
                        return '[蟿畏谓 蟺蟻慰畏纬慰蠉渭蔚谓畏] dddd [{}] LT';
                }
            },
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendarEl[key],
                hours = mom &amp;&amp; mom.hours();
            if (isFunction(output)) {
                output = output.apply(mom);
            }
            return output.replace('{}', (hours % 12 === 1 ? '蟽蟿畏' : '蟽蟿喂蟼'));
        },
        relativeTime : {
            future : '蟽蔚 %s',
            past : '%s 蟺蟻喂谓',
            s : '位委纬伪 未蔚蠀蟿蔚蟻蠈位蔚蟺蟿伪',
            ss : '%d 未蔚蠀蟿蔚蟻蠈位蔚蟺蟿伪',
            m : '苇谓伪 位蔚蟺蟿蠈',
            mm : '%d 位蔚蟺蟿维',
            h : '渭委伪 蠋蟻伪',
            hh : '%d 蠋蟻蔚蟼',
            d : '渭委伪 渭苇蟻伪',
            dd : '%d 渭苇蟻蔚蟼',
            M : '苇谓伪蟼 渭萎谓伪蟼',
            MM : '%d 渭萎谓蔚蟼',
            y : '苇谓伪蟼 蠂蟻蠈谓慰蟼',
            yy : '%d 蠂蟻蠈谓喂伪'
        },
        dayOfMonthOrdinalParse: /\d{1,2}畏/,
        ordinal: '%d畏',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4st is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('en-SG', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            ss : '%d seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('en-au', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            ss : '%d seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('en-ca', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'YYYY-MM-DD',
            LL : 'MMMM D, YYYY',
            LLL : 'MMMM D, YYYY h:mm A',
            LLLL : 'dddd, MMMM D, YYYY h:mm A'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            ss : '%d seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('en-gb', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            ss : '%d seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('en-ie', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            ss : '%d seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('en-il', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('en-nz', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            ss : '%d seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('eo', {
        months : 'januaro_februaro_marto_aprilo_majo_junio_julio_a怒gusto_septembro_oktobro_novembro_decembro'.split('_'),
        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_a怒g_sep_okt_nov_dec'.split('_'),
        weekdays : 'diman膲o_lundo_mardo_merkredo_牡a怒do_vendredo_sabato'.split('_'),
        weekdaysShort : 'dim_lun_mard_merk_牡a怒_ven_sab'.split('_'),
        weekdaysMin : 'di_lu_ma_me_牡a_ve_sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'D[-a de] MMMM, YYYY',
            LLL : 'D[-a de] MMMM, YYYY HH:mm',
            LLLL : 'dddd, [la] D[-a de] MMMM, YYYY HH:mm'
        },
        meridiemParse: /[ap]\.t\.m/i,
        isPM: function (input) {
            return input.charAt(0).toLowerCase() === 'p';
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours &gt; 11) {
                return isLower ? 'p.t.m.' : 'P.T.M.';
            } else {
                return isLower ? 'a.t.m.' : 'A.T.M.';
            }
        },
        calendar : {
            sameDay : '[Hodia怒 je] LT',
            nextDay : '[Morga怒 je] LT',
            nextWeek : 'dddd [je] LT',
            lastDay : '[Hiera怒 je] LT',
            lastWeek : '[pasinta] dddd [je] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'post %s',
            past : 'anta怒 %s',
            s : 'sekundoj',
            ss : '%d sekundoj',
            m : 'minuto',
            mm : '%d minutoj',
            h : 'horo',
            hh : '%d horoj',
            d : 'tago',//ne 'diurno', 膲ar estas uzita por proksimumo
            dd : '%d tagoj',
            M : 'monato',
            MM : '%d monatoj',
            y : 'jaro',
            yy : '%d jaroj'
        },
        dayOfMonthOrdinalParse: /\d{1,2}a/,
        ordinal : '%da',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
        monthsShort$1 = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

    var monthsParse$1 = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
    var monthsRegex$2 = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;

    hooks.defineLocale('es-do', {
        months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
        monthsShort : function (m, format) {
            if (!m) {
                return monthsShortDot;
            } else if (/-MMM-/.test(format)) {
                return monthsShort$1[m.month()];
            } else {
                return monthsShortDot[m.month()];
            }
        },
        monthsRegex: monthsRegex$2,
        monthsShortRegex: monthsRegex$2,
        monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
        monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
        monthsParse: monthsParse$1,
        longMonthsParse: monthsParse$1,
        shortMonthsParse: monthsParse$1,
        weekdays : 'domingo_lunes_martes_mi茅rcoles_jueves_viernes_s谩bado'.split('_'),
        weekdaysShort : 'dom._lun._mar._mi茅._jue._vie._s谩b.'.split('_'),
        weekdaysMin : 'do_lu_ma_mi_ju_vi_s谩'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY h:mm A',
            LLLL : 'dddd, D [de] MMMM [de] YYYY h:mm A'
        },
        calendar : {
            sameDay : function () {
                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextDay : function () {
                return '[ma帽ana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastDay : function () {
                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastWeek : function () {
                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'en %s',
            past : 'hace %s',
            s : 'unos segundos',
            ss : '%d segundos',
            m : 'un minuto',
            mm : '%d minutos',
            h : 'una hora',
            hh : '%d horas',
            d : 'un d铆a',
            dd : '%d d铆as',
            M : 'un mes',
            MM : '%d meses',
            y : 'un a帽o',
            yy : '%d a帽os'
        },
        dayOfMonthOrdinalParse : /\d{1,2}潞/,
        ordinal : '%d潞',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var monthsShortDot$1 = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
        monthsShort$2 = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

    var monthsParse$2 = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
    var monthsRegex$3 = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;

    hooks.defineLocale('es-us', {
        months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
        monthsShort : function (m, format) {
            if (!m) {
                return monthsShortDot$1;
            } else if (/-MMM-/.test(format)) {
                return monthsShort$2[m.month()];
            } else {
                return monthsShortDot$1[m.month()];
            }
        },
        monthsRegex: monthsRegex$3,
        monthsShortRegex: monthsRegex$3,
        monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
        monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
        monthsParse: monthsParse$2,
        longMonthsParse: monthsParse$2,
        shortMonthsParse: monthsParse$2,
        weekdays : 'domingo_lunes_martes_mi茅rcoles_jueves_viernes_s谩bado'.split('_'),
        weekdaysShort : 'dom._lun._mar._mi茅._jue._vie._s谩b.'.split('_'),
        weekdaysMin : 'do_lu_ma_mi_ju_vi_s谩'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'MM/DD/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY h:mm A',
            LLLL : 'dddd, D [de] MMMM [de] YYYY h:mm A'
        },
        calendar : {
            sameDay : function () {
                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextDay : function () {
                return '[ma帽ana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastDay : function () {
                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastWeek : function () {
                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'en %s',
            past : 'hace %s',
            s : 'unos segundos',
            ss : '%d segundos',
            m : 'un minuto',
            mm : '%d minutos',
            h : 'una hora',
            hh : '%d horas',
            d : 'un d铆a',
            dd : '%d d铆as',
            M : 'un mes',
            MM : '%d meses',
            y : 'un a帽o',
            yy : '%d a帽os'
        },
        dayOfMonthOrdinalParse : /\d{1,2}潞/,
        ordinal : '%d潞',
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var monthsShortDot$2 = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
        monthsShort$3 = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

    var monthsParse$3 = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
    var monthsRegex$4 = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;

    hooks.defineLocale('es', {
        months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
        monthsShort : function (m, format) {
            if (!m) {
                return monthsShortDot$2;
            } else if (/-MMM-/.test(format)) {
                return monthsShort$3[m.month()];
            } else {
                return monthsShortDot$2[m.month()];
            }
        },
        monthsRegex : monthsRegex$4,
        monthsShortRegex : monthsRegex$4,
        monthsStrictRegex : /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
        monthsShortStrictRegex : /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
        monthsParse : monthsParse$3,
        longMonthsParse : monthsParse$3,
        shortMonthsParse : monthsParse$3,
        weekdays : 'domingo_lunes_martes_mi茅rcoles_jueves_viernes_s谩bado'.split('_'),
        weekdaysShort : 'dom._lun._mar._mi茅._jue._vie._s谩b.'.split('_'),
        weekdaysMin : 'do_lu_ma_mi_ju_vi_s谩'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY H:mm',
            LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
        },
        calendar : {
            sameDay : function () {
                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextDay : function () {
                return '[ma帽ana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastDay : function () {
                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastWeek : function () {
                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'en %s',
            past : 'hace %s',
            s : 'unos segundos',
            ss : '%d segundos',
            m : 'un minuto',
            mm : '%d minutos',
            h : 'una hora',
            hh : '%d horas',
            d : 'un d铆a',
            dd : '%d d铆as',
            M : 'un mes',
            MM : '%d meses',
            y : 'un a帽o',
            yy : '%d a帽os'
        },
        dayOfMonthOrdinalParse : /\d{1,2}潞/,
        ordinal : '%d潞',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    function processRelativeTime$3(number, withoutSuffix, key, isFuture) {
        var format = {
            's' : ['m玫ne sekundi', 'm玫ni sekund', 'paar sekundit'],
            'ss': [number + 'sekundi', number + 'sekundit'],
            'm' : ['眉he minuti', '眉ks minut'],
            'mm': [number + ' minuti', number + ' minutit'],
            'h' : ['眉he tunni', 'tund aega', '眉ks tund'],
            'hh': [number + ' tunni', number + ' tundi'],
            'd' : ['眉he p盲eva', '眉ks p盲ev'],
            'M' : ['kuu aja', 'kuu aega', '眉ks kuu'],
            'MM': [number + ' kuu', number + ' kuud'],
            'y' : ['眉he aasta', 'aasta', '眉ks aasta'],
            'yy': [number + ' aasta', number + ' aastat']
        };
        if (withoutSuffix) {
            return format[key][2] ? format[key][2] : format[key][1];
        }
        return isFuture ? format[key][0] : format[key][1];
    }

    hooks.defineLocale('et', {
        months        : 'jaanuar_veebruar_m盲rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
        monthsShort   : 'jaan_veebr_m盲rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
        weekdays      : 'p眉hap盲ev_esmasp盲ev_teisip盲ev_kolmap盲ev_neljap盲ev_reede_laup盲ev'.split('_'),
        weekdaysShort : 'P_E_T_K_N_R_L'.split('_'),
        weekdaysMin   : 'P_E_T_K_N_R_L'.split('_'),
        longDateFormat : {
            LT   : 'H:mm',
            LTS : 'H:mm:ss',
            L    : 'DD.MM.YYYY',
            LL   : 'D. MMMM YYYY',
            LLL  : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd, D. MMMM YYYY H:mm'
        },
        calendar : {
            sameDay  : '[T盲na,] LT',
            nextDay  : '[Homme,] LT',
            nextWeek : '[J盲rgmine] dddd LT',
            lastDay  : '[Eile,] LT',
            lastWeek : '[Eelmine] dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s p盲rast',
            past   : '%s tagasi',
            s      : processRelativeTime$3,
            ss     : processRelativeTime$3,
            m      : processRelativeTime$3,
            mm     : processRelativeTime$3,
            h      : processRelativeTime$3,
            hh     : processRelativeTime$3,
            d      : processRelativeTime$3,
            dd     : '%d p盲eva',
            M      : processRelativeTime$3,
            MM     : processRelativeTime$3,
            y      : processRelativeTime$3,
            yy     : processRelativeTime$3
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('eu', {
        months : 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
        monthsShort : 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
        monthsParseExact : true,
        weekdays : 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
        weekdaysShort : 'ig._al._ar._az._og._ol._lr.'.split('_'),
        weekdaysMin : 'ig_al_ar_az_og_ol_lr'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'YYYY[ko] MMMM[ren] D[a]',
            LLL : 'YYYY[ko] MMMM[ren] D[a] HH:mm',
            LLLL : 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
            l : 'YYYY-M-D',
            ll : 'YYYY[ko] MMM D[a]',
            lll : 'YYYY[ko] MMM D[a] HH:mm',
            llll : 'ddd, YYYY[ko] MMM D[a] HH:mm'
        },
        calendar : {
            sameDay : '[gaur] LT[etan]',
            nextDay : '[bihar] LT[etan]',
            nextWeek : 'dddd LT[etan]',
            lastDay : '[atzo] LT[etan]',
            lastWeek : '[aurreko] dddd LT[etan]',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s barru',
            past : 'duela %s',
            s : 'segundo batzuk',
            ss : '%d segundo',
            m : 'minutu bat',
            mm : '%d minutu',
            h : 'ordu bat',
            hh : '%d ordu',
            d : 'egun bat',
            dd : '%d egun',
            M : 'hilabete bat',
            MM : '%d hilabete',
            y : 'urte bat',
            yy : '%d urte'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var symbolMap$5 = {
        '1': '郾',
        '2': '鄄',
        '3': '鄢',
        '4': '鄞',
        '5': '鄣',
        '6': '鄱',
        '7': '鄯',
        '8': '鄹',
        '9': '酃',
        '0': '郯'
    }, numberMap$4 = {
        '郾': '1',
        '鄄': '2',
        '鄢': '3',
        '鄞': '4',
        '鄣': '5',
        '鄱': '6',
        '鄯': '7',
        '鄹': '8',
        '酃': '9',
        '郯': '0'
    };

    hooks.defineLocale('fa', {
        months : '跇丕賳賵蹖賴_賮賵乇蹖賴_賲丕乇爻_丌賵乇蹖賱_賲賴_跇賵卅賳_跇賵卅蹖賴_丕賵鬲_爻倬鬲丕賲亘乇_丕讴鬲亘乇_賳賵丕賲亘乇_丿爻丕賲亘乇'.split('_'),
        monthsShort : '跇丕賳賵蹖賴_賮賵乇蹖賴_賲丕乇爻_丌賵乇蹖賱_賲賴_跇賵卅賳_跇賵卅蹖賴_丕賵鬲_爻倬鬲丕賲亘乇_丕讴鬲亘乇_賳賵丕賲亘乇_丿爻丕賲亘乇'.split('_'),
        weekdays : '蹖讴\u200c卮賳亘賴_丿賵卮賳亘賴_爻賴\u200c卮賳亘賴_趩賴丕乇卮賳亘賴_倬賳噩\u200c卮賳亘賴_噩賲毓賴_卮賳亘賴'.split('_'),
        weekdaysShort : '蹖讴\u200c卮賳亘賴_丿賵卮賳亘賴_爻賴\u200c卮賳亘賴_趩賴丕乇卮賳亘賴_倬賳噩\u200c卮賳亘賴_噩賲毓賴_卮賳亘賴'.split('_'),
        weekdaysMin : '蹖_丿_爻_趩_倬_噩_卮'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        meridiemParse: /賯亘賱 丕夭 馗賴乇|亘毓丿 丕夭 馗賴乇/,
        isPM: function (input) {
            return /亘毓丿 丕夭 馗賴乇/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 12) {
                return '賯亘賱 丕夭 馗賴乇';
            } else {
                return '亘毓丿 丕夭 馗賴乇';
            }
        },
        calendar : {
            sameDay : '[丕賲乇賵夭 爻丕毓鬲] LT',
            nextDay : '[賮乇丿丕 爻丕毓鬲] LT',
            nextWeek : 'dddd [爻丕毓鬲] LT',
            lastDay : '[丿蹖乇賵夭 爻丕毓鬲] LT',
            lastWeek : 'dddd [倬蹖卮] [爻丕毓鬲] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '丿乇 %s',
            past : '%s 倬蹖卮',
            s : '趩賳丿 孬丕賳蹖賴',
            ss : '孬丕賳蹖賴 d%',
            m : '蹖讴 丿賯蹖賯賴',
            mm : '%d 丿賯蹖賯賴',
            h : '蹖讴 爻丕毓鬲',
            hh : '%d 爻丕毓鬲',
            d : '蹖讴 乇賵夭',
            dd : '%d 乇賵夭',
            M : '蹖讴 賲丕賴',
            MM : '%d 賲丕賴',
            y : '蹖讴 爻丕賱',
            yy : '%d 爻丕賱'
        },
        preparse: function (string) {
            return string.replace(/[郯-酃]/g, function (match) {
                return numberMap$4[match];
            }).replace(/貙/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap$5[match];
            }).replace(/,/g, '貙');
        },
        dayOfMonthOrdinalParse: /\d{1,2}賲/,
        ordinal : '%d賲',
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12 // The week that contains Jan 12th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var numbersPast = 'nolla yksi kaksi kolme nelj盲 viisi kuusi seitsem盲n kahdeksan yhdeks盲n'.split(' '),
        numbersFuture = [
            'nolla', 'yhden', 'kahden', 'kolmen', 'nelj盲n', 'viiden', 'kuuden',
            numbersPast[7], numbersPast[8], numbersPast[9]
        ];
    function translate$2(number, withoutSuffix, key, isFuture) {
        var result = '';
        switch (key) {
            case 's':
                return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
            case 'ss':
                return isFuture ? 'sekunnin' : 'sekuntia';
            case 'm':
                return isFuture ? 'minuutin' : 'minuutti';
            case 'mm':
                result = isFuture ? 'minuutin' : 'minuuttia';
                break;
            case 'h':
                return isFuture ? 'tunnin' : 'tunti';
            case 'hh':
                result = isFuture ? 'tunnin' : 'tuntia';
                break;
            case 'd':
                return isFuture ? 'p盲iv盲n' : 'p盲iv盲';
            case 'dd':
                result = isFuture ? 'p盲iv盲n' : 'p盲iv盲盲';
                break;
            case 'M':
                return isFuture ? 'kuukauden' : 'kuukausi';
            case 'MM':
                result = isFuture ? 'kuukauden' : 'kuukautta';
                break;
            case 'y':
                return isFuture ? 'vuoden' : 'vuosi';
            case 'yy':
                result = isFuture ? 'vuoden' : 'vuotta';
                break;
        }
        result = verbalNumber(number, isFuture) + ' ' + result;
        return result;
    }
    function verbalNumber(number, isFuture) {
        return number &lt; 10 ? (isFuture ? numbersFuture[number] : numbersPast[number]) : number;
    }

    hooks.defineLocale('fi', {
        months : 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kes盲kuu_hein盲kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
        monthsShort : 'tammi_helmi_maalis_huhti_touko_kes盲_hein盲_elo_syys_loka_marras_joulu'.split('_'),
        weekdays : 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
        weekdaysShort : 'su_ma_ti_ke_to_pe_la'.split('_'),
        weekdaysMin : 'su_ma_ti_ke_to_pe_la'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD.MM.YYYY',
            LL : 'Do MMMM[ta] YYYY',
            LLL : 'Do MMMM[ta] YYYY, [klo] HH.mm',
            LLLL : 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
            l : 'D.M.YYYY',
            ll : 'Do MMM YYYY',
            lll : 'Do MMM YYYY, [klo] HH.mm',
            llll : 'ddd, Do MMM YYYY, [klo] HH.mm'
        },
        calendar : {
            sameDay : '[t盲n盲盲n] [klo] LT',
            nextDay : '[huomenna] [klo] LT',
            nextWeek : 'dddd [klo] LT',
            lastDay : '[eilen] [klo] LT',
            lastWeek : '[viime] dddd[na] [klo] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s p盲盲st盲',
            past : '%s sitten',
            s : translate$2,
            ss : translate$2,
            m : translate$2,
            mm : translate$2,
            h : translate$2,
            hh : translate$2,
            d : translate$2,
            dd : translate$2,
            M : translate$2,
            MM : translate$2,
            y : translate$2,
            yy : translate$2
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('fo', {
        months : 'januar_februar_mars_apr铆l_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
        weekdays : 'sunnudagur_m谩nadagur_t媒sdagur_mikudagur_h贸sdagur_fr铆ggjadagur_leygardagur'.split('_'),
        weekdaysShort : 'sun_m谩n_t媒s_mik_h贸s_fr铆_ley'.split('_'),
        weekdaysMin : 'su_m谩_t媒_mi_h贸_fr_le'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D. MMMM, YYYY HH:mm'
        },
        calendar : {
            sameDay : '[脥 dag kl.] LT',
            nextDay : '[脥 morgin kl.] LT',
            nextWeek : 'dddd [kl.] LT',
            lastDay : '[脥 gj谩r kl.] LT',
            lastWeek : '[s铆冒stu] dddd [kl] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'um %s',
            past : '%s s铆冒ani',
            s : 'f谩 sekund',
            ss : '%d sekundir',
            m : 'ein minuttur',
            mm : '%d minuttir',
            h : 'ein t铆mi',
            hh : '%d t铆mar',
            d : 'ein dagur',
            dd : '%d dagar',
            M : 'ein m谩na冒ur',
            MM : '%d m谩na冒ir',
            y : 'eitt 谩r',
            yy : '%d 谩r'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('fr-ca', {
        months : 'janvier_f茅vrier_mars_avril_mai_juin_juillet_ao没t_septembre_octobre_novembre_d茅cembre'.split('_'),
        monthsShort : 'janv._f茅vr._mars_avr._mai_juin_juil._ao没t_sept._oct._nov._d茅c.'.split('_'),
        monthsParseExact : true,
        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin : 'di_lu_ma_me_je_ve_sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Aujourd鈥檋ui 脿] LT',
            nextDay : '[Demain 脿] LT',
            nextWeek : 'dddd [脿] LT',
            lastDay : '[Hier 脿] LT',
            lastWeek : 'dddd [dernier 脿] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'dans %s',
            past : 'il y a %s',
            s : 'quelques secondes',
            ss : '%d secondes',
            m : 'une minute',
            mm : '%d minutes',
            h : 'une heure',
            hh : '%d heures',
            d : 'un jour',
            dd : '%d jours',
            M : 'un mois',
            MM : '%d mois',
            y : 'un an',
            yy : '%d ans'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
        ordinal : function (number, period) {
            switch (period) {
                // Words with masculine grammatical gender: mois, trimestre, jour
                default:
                case 'M':
                case 'Q':
                case 'D':
                case 'DDD':
                case 'd':
                    return number + (number === 1 ? 'er' : 'e');

                // Words with feminine grammatical gender: semaine
                case 'w':
                case 'W':
                    return number + (number === 1 ? 're' : 'e');
            }
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('fr-ch', {
        months : 'janvier_f茅vrier_mars_avril_mai_juin_juillet_ao没t_septembre_octobre_novembre_d茅cembre'.split('_'),
        monthsShort : 'janv._f茅vr._mars_avr._mai_juin_juil._ao没t_sept._oct._nov._d茅c.'.split('_'),
        monthsParseExact : true,
        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin : 'di_lu_ma_me_je_ve_sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Aujourd鈥檋ui 脿] LT',
            nextDay : '[Demain 脿] LT',
            nextWeek : 'dddd [脿] LT',
            lastDay : '[Hier 脿] LT',
            lastWeek : 'dddd [dernier 脿] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'dans %s',
            past : 'il y a %s',
            s : 'quelques secondes',
            ss : '%d secondes',
            m : 'une minute',
            mm : '%d minutes',
            h : 'une heure',
            hh : '%d heures',
            d : 'un jour',
            dd : '%d jours',
            M : 'un mois',
            MM : '%d mois',
            y : 'un an',
            yy : '%d ans'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
        ordinal : function (number, period) {
            switch (period) {
                // Words with masculine grammatical gender: mois, trimestre, jour
                default:
                case 'M':
                case 'Q':
                case 'D':
                case 'DDD':
                case 'd':
                    return number + (number === 1 ? 'er' : 'e');

                // Words with feminine grammatical gender: semaine
                case 'w':
                case 'W':
                    return number + (number === 1 ? 're' : 'e');
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('fr', {
        months : 'janvier_f茅vrier_mars_avril_mai_juin_juillet_ao没t_septembre_octobre_novembre_d茅cembre'.split('_'),
        monthsShort : 'janv._f茅vr._mars_avr._mai_juin_juil._ao没t_sept._oct._nov._d茅c.'.split('_'),
        monthsParseExact : true,
        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin : 'di_lu_ma_me_je_ve_sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Aujourd鈥檋ui 脿] LT',
            nextDay : '[Demain 脿] LT',
            nextWeek : 'dddd [脿] LT',
            lastDay : '[Hier 脿] LT',
            lastWeek : 'dddd [dernier 脿] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'dans %s',
            past : 'il y a %s',
            s : 'quelques secondes',
            ss : '%d secondes',
            m : 'une minute',
            mm : '%d minutes',
            h : 'une heure',
            hh : '%d heures',
            d : 'un jour',
            dd : '%d jours',
            M : 'un mois',
            MM : '%d mois',
            y : 'un an',
            yy : '%d ans'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
        ordinal : function (number, period) {
            switch (period) {
                // TODO: Return 'e' when day of month &gt; 1. Move this case inside
                // block for masculine words below.
                // See https://github.com/moment/moment/issues/3375
                case 'D':
                    return number + (number === 1 ? 'er' : '');

                // Words with masculine grammatical gender: mois, trimestre, jour
                default:
                case 'M':
                case 'Q':
                case 'DDD':
                case 'd':
                    return number + (number === 1 ? 'er' : 'e');

                // Words with feminine grammatical gender: semaine
                case 'w':
                case 'W':
                    return number + (number === 1 ? 're' : 'e');
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_'),
        monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_');

    hooks.defineLocale('fy', {
        months : 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
        monthsShort : function (m, format) {
            if (!m) {
                return monthsShortWithDots;
            } else if (/-MMM-/.test(format)) {
                return monthsShortWithoutDots[m.month()];
            } else {
                return monthsShortWithDots[m.month()];
            }
        },
        monthsParseExact : true,
        weekdays : 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
        weekdaysShort : 'si._mo._ti._wo._to._fr._so.'.split('_'),
        weekdaysMin : 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD-MM-YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[hjoed om] LT',
            nextDay: '[moarn om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[juster om] LT',
            lastWeek: '[么fr没ne] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'oer %s',
            past : '%s lyn',
            s : 'in pear sekonden',
            ss : '%d sekonden',
            m : 'ien min煤t',
            mm : '%d minuten',
            h : 'ien oere',
            hh : '%d oeren',
            d : 'ien dei',
            dd : '%d dagen',
            M : 'ien moanne',
            MM : '%d moannen',
            y : 'ien jier',
            yy : '%d jierren'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal : function (number) {
            return number + ((number === 1 || number === 8 || number &gt;= 20) ? 'ste' : 'de');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration


    var months$5 = [
        'Ean谩ir', 'Feabhra', 'M谩rta', 'Aibre谩n', 'Bealtaine', 'M茅itheamh', 'I煤il', 'L煤nasa', 'Me谩n F贸mhair', 'Deaireadh F贸mhair', 'Samhain', 'Nollaig'
    ];

    var monthsShort$4 = ['Ean谩', 'Feab', 'M谩rt', 'Aibr', 'Beal', 'M茅it', 'I煤il', 'L煤na', 'Me谩n', 'Deai', 'Samh', 'Noll'];

    var weekdays$1 = ['D茅 Domhnaigh', 'D茅 Luain', 'D茅 M谩irt', 'D茅 C茅adaoin', 'D茅ardaoin', 'D茅 hAoine', 'D茅 Satharn'];

    var weekdaysShort = ['Dom', 'Lua', 'M谩i', 'C茅a', 'D茅a', 'hAo', 'Sat'];

    var weekdaysMin = ['Do', 'Lu', 'M谩', 'Ce', 'D茅', 'hA', 'Sa'];

    hooks.defineLocale('ga', {
        months: months$5,
        monthsShort: monthsShort$4,
        monthsParseExact: true,
        weekdays: weekdays$1,
        weekdaysShort: weekdaysShort,
        weekdaysMin: weekdaysMin,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Inniu ag] LT',
            nextDay: '[Am谩rach ag] LT',
            nextWeek: 'dddd [ag] LT',
            lastDay: '[Inn茅 aig] LT',
            lastWeek: 'dddd [seo caite] [ag] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'i %s',
            past: '%s 贸 shin',
            s: 'c煤pla soicind',
            ss: '%d soicind',
            m: 'n贸im茅ad',
            mm: '%d n贸im茅ad',
            h: 'uair an chloig',
            hh: '%d uair an chloig',
            d: 'l谩',
            dd: '%d l谩',
            M: 'm铆',
            MM: '%d m铆',
            y: 'bliain',
            yy: '%d bliain'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
        ordinal: function (number) {
            var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var months$6 = [
        'Am Faoilleach', 'An Gearran', 'Am M脿rt', 'An Giblean', 'An C猫itean', 'An t-脪gmhios', 'An t-Iuchar', 'An L霉nastal', 'An t-Sultain', 'An D脿mhair', 'An t-Samhain', 'An D霉bhlachd'
    ];

    var monthsShort$5 = ['Faoi', 'Gear', 'M脿rt', 'Gibl', 'C猫it', '脪gmh', 'Iuch', 'L霉n', 'Sult', 'D脿mh', 'Samh', 'D霉bh'];

    var weekdays$2 = ['Did貌mhnaich', 'Diluain', 'Dim脿irt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne'];

    var weekdaysShort$1 = ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'];

    var weekdaysMin$1 = ['D貌', 'Lu', 'M脿', 'Ci', 'Ar', 'Ha', 'Sa'];

    hooks.defineLocale('gd', {
        months : months$6,
        monthsShort : monthsShort$5,
        monthsParseExact : true,
        weekdays : weekdays$2,
        weekdaysShort : weekdaysShort$1,
        weekdaysMin : weekdaysMin$1,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[An-diugh aig] LT',
            nextDay : '[A-m脿ireach aig] LT',
            nextWeek : 'dddd [aig] LT',
            lastDay : '[An-d猫 aig] LT',
            lastWeek : 'dddd [seo chaidh] [aig] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'ann an %s',
            past : 'bho chionn %s',
            s : 'beagan diogan',
            ss : '%d diogan',
            m : 'mionaid',
            mm : '%d mionaidean',
            h : 'uair',
            hh : '%d uairean',
            d : 'latha',
            dd : '%d latha',
            M : 'm矛os',
            MM : '%d m矛osan',
            y : 'bliadhna',
            yy : '%d bliadhna'
        },
        dayOfMonthOrdinalParse : /\d{1,2}(d|na|mh)/,
        ordinal : function (number) {
            var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('gl', {
        months : 'xaneiro_febreiro_marzo_abril_maio_xu帽o_xullo_agosto_setembro_outubro_novembro_decembro'.split('_'),
        monthsShort : 'xan._feb._mar._abr._mai._xu帽._xul._ago._set._out._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays : 'domingo_luns_martes_m茅rcores_xoves_venres_s谩bado'.split('_'),
        weekdaysShort : 'dom._lun._mar._m茅r._xov._ven._s谩b.'.split('_'),
        weekdaysMin : 'do_lu_ma_m茅_xo_ve_s谩'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY H:mm',
            LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
        },
        calendar : {
            sameDay : function () {
                return '[hoxe ' + ((this.hours() !== 1) ? '谩s' : '谩') + '] LT';
            },
            nextDay : function () {
                return '[ma帽谩 ' + ((this.hours() !== 1) ? '谩s' : '谩') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [' + ((this.hours() !== 1) ? '谩s' : 'a') + '] LT';
            },
            lastDay : function () {
                return '[onte ' + ((this.hours() !== 1) ? '谩' : 'a') + '] LT';
            },
            lastWeek : function () {
                return '[o] dddd [pasado ' + ((this.hours() !== 1) ? '谩s' : 'a') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : function (str) {
                if (str.indexOf('un') === 0) {
                    return 'n' + str;
                }
                return 'en ' + str;
            },
            past : 'hai %s',
            s : 'uns segundos',
            ss : '%d segundos',
            m : 'un minuto',
            mm : '%d minutos',
            h : 'unha hora',
            hh : '%d horas',
            d : 'un d铆a',
            dd : '%d d铆as',
            M : 'un mes',
            MM : '%d meses',
            y : 'un ano',
            yy : '%d anos'
        },
        dayOfMonthOrdinalParse : /\d{1,2}潞/,
        ordinal : '%d潞',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    function processRelativeTime$4(number, withoutSuffix, key, isFuture) {
        var format = {
            's': ['thodde secondanim', 'thodde second'],
            'ss': [number + ' secondanim', number + ' second'],
            'm': ['eka mintan', 'ek minute'],
            'mm': [number + ' mintanim', number + ' mintam'],
            'h': ['eka voran', 'ek vor'],
            'hh': [number + ' voranim', number + ' voram'],
            'd': ['eka disan', 'ek dis'],
            'dd': [number + ' disanim', number + ' dis'],
            'M': ['eka mhoinean', 'ek mhoino'],
            'MM': [number + ' mhoineanim', number + ' mhoine'],
            'y': ['eka vorsan', 'ek voros'],
            'yy': [number + ' vorsanim', number + ' vorsam']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    hooks.defineLocale('gom-latn', {
        months : 'Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr'.split('_'),
        monthsShort : 'Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.'.split('_'),
        monthsParseExact : true,
        weekdays : 'Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son\'var'.split('_'),
        weekdaysShort : 'Ait._Som._Mon._Bud._Bre._Suk._Son.'.split('_'),
        weekdaysMin : 'Ai_Sm_Mo_Bu_Br_Su_Sn'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'A h:mm [vazta]',
            LTS : 'A h:mm:ss [vazta]',
            L : 'DD-MM-YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY A h:mm [vazta]',
            LLLL : 'dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]',
            llll: 'ddd, D MMM YYYY, A h:mm [vazta]'
        },
        calendar : {
            sameDay: '[Aiz] LT',
            nextDay: '[Faleam] LT',
            nextWeek: '[Ieta to] dddd[,] LT',
            lastDay: '[Kal] LT',
            lastWeek: '[Fatlo] dddd[,] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : '%s',
            past : '%s adim',
            s : processRelativeTime$4,
            ss : processRelativeTime$4,
            m : processRelativeTime$4,
            mm : processRelativeTime$4,
            h : processRelativeTime$4,
            hh : processRelativeTime$4,
            d : processRelativeTime$4,
            dd : processRelativeTime$4,
            M : processRelativeTime$4,
            MM : processRelativeTime$4,
            y : processRelativeTime$4,
            yy : processRelativeTime$4
        },
        dayOfMonthOrdinalParse : /\d{1,2}(er)/,
        ordinal : function (number, period) {
            switch (period) {
                // the ordinal 'er' only applies to day of the month
                case 'D':
                    return number + 'er';
                default:
                case 'M':
                case 'Q':
                case 'DDD':
                case 'd':
                case 'w':
                case 'W':
                    return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        },
        meridiemParse: /rati|sokalli|donparam|sanje/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'rati') {
                return hour &lt; 4 ? hour : hour + 12;
            } else if (meridiem === 'sokalli') {
                return hour;
            } else if (meridiem === 'donparam') {
                return hour &gt; 12 ? hour : hour + 12;
            } else if (meridiem === 'sanje') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 4) {
                return 'rati';
            } else if (hour &lt; 12) {
                return 'sokalli';
            } else if (hour &lt; 16) {
                return 'donparam';
            } else if (hour &lt; 20) {
                return 'sanje';
            } else {
                return 'rati';
            }
        }
    });

    //! moment.js locale configuration

    var symbolMap$6 = {
            '1': '喃�',
            '2': '喃�',
            '3': '喃�',
            '4': '喃�',
            '5': '喃�',
            '6': '喃�',
            '7': '喃�',
            '8': '喃�',
            '9': '喃�',
            '0': '喃�'
        },
        numberMap$5 = {
            '喃�': '1',
            '喃�': '2',
            '喃�': '3',
            '喃�': '4',
            '喃�': '5',
            '喃�': '6',
            '喃�': '7',
            '喃�': '8',
            '喃�': '9',
            '喃�': '0'
        };

    hooks.defineLocale('gu', {
        months: '嗒溹嗒ㄠ珝嗒珌嗒嗋喃€_嗒珖嗒珝嗒班珌嗒嗋喃€_嗒嗒班珝嗒歘嗒忇喃嵿嗒苦_嗒珖_嗒溹珎嗒╛嗒溹珌嗒侧嗒坃嗒戉獥嗒膏珝嗒焈嗒膏喃嵿獰喃囙喃嵿嗒癬嗒戉獣喃嵿獰喃嵿嗒癬嗒ㄠ喃囙喃嵿嗒癬嗒∴嗒膏珖嗒珝嗒'.split('_'),
        monthsShort: '嗒溹嗒ㄠ珝嗒珌._嗒珖嗒珝嗒班珌._嗒嗒班珝嗒歘嗒忇喃嵿嗒�._嗒珖_嗒溹珎嗒╛嗒溹珌嗒侧._嗒戉獥._嗒膏喃嵿獰喃�._嗒戉獣喃嵿獰喃�._嗒ㄠ喃�._嗒∴嗒膏珖.'.split('_'),
        monthsParseExact: true,
        weekdays: '嗒班嗒苦嗒距_嗒膏珛嗒嗒距_嗒獋嗒椸嗒掂嗒癬嗒珌嗒о珝嗒掂嗒癬嗒椸珌嗒班珌嗒掂嗒癬嗒多珌嗒曕珝嗒班嗒距_嗒多嗒苦嗒距'.split('_'),
        weekdaysShort: '嗒班嗒縚嗒膏珛嗒甠嗒獋嗒椸_嗒珌嗒о珝_嗒椸珌嗒班珌_嗒多珌嗒曕珝嗒癬嗒多嗒�'.split('_'),
        weekdaysMin: '嗒癬嗒膏珛_嗒獋_嗒珌_嗒椸珌_嗒多珌_嗒�'.split('_'),
        longDateFormat: {
            LT: 'A h:mm 嗒掂嗒椸珝嗒珖',
            LTS: 'A h:mm:ss 嗒掂嗒椸珝嗒珖',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm 嗒掂嗒椸珝嗒珖',
            LLLL: 'dddd, D MMMM YYYY, A h:mm 嗒掂嗒椸珝嗒珖'
        },
        calendar: {
            sameDay: '[嗒嗋獪] LT',
            nextDay: '[嗒曕嗒侧珖] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[嗒椸獓嗒曕嗒侧珖] LT',
            lastWeek: '[嗒嗒涏嗒綸 dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s 嗒',
            past: '%s 嗒珖嗒灌嗒�',
            s: '嗒呧喃佮獣 嗒喃�',
            ss: '%d 嗒膏珖嗒曕獋嗒�',
            m: '嗒忇獣 嗒嗒ㄠ嗒�',
            mm: '%d 嗒嗒ㄠ嗒�',
            h: '嗒忇獣 嗒曕嗒距獣',
            hh: '%d 嗒曕嗒距獣',
            d: '嗒忇獣 嗒︵嗒掂',
            dd: '%d 嗒︵嗒掂',
            M: '嗒忇獣 嗒嗒苦喃�',
            MM: '%d 嗒嗒苦喃�',
            y: '嗒忇獣 嗒掂喃嵿',
            yy: '%d 嗒掂喃嵿'
        },
        preparse: function (string) {
            return string.replace(/[喃о喃┼喃喃喃]/g, function (match) {
                return numberMap$5[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap$6[match];
            });
        },
        // Gujarati notation for meridiems are quite fuzzy in practice. While there exists
        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Gujarati.
        meridiemParse: /嗒班嗒嗒喃嬥|嗒膏嗒距|嗒膏嗒傕獪/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '嗒班嗒�') {
                return hour &lt; 4 ? hour : hour + 12;
            } else if (meridiem === '嗒膏嗒距') {
                return hour;
            } else if (meridiem === '嗒喃嬥') {
                return hour &gt;= 10 ? hour : hour + 12;
            } else if (meridiem === '嗒膏嗒傕獪') {
                return hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour &lt; 4) {
                return '嗒班嗒�';
            } else if (hour &lt; 10) {
                return '嗒膏嗒距';
            } else if (hour &lt; 17) {
                return '嗒喃嬥';
            } else if (hour &lt; 20) {
                return '嗒膏嗒傕獪';
            } else {
                return '嗒班嗒�';
            }
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 6th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('he', {
        months : '讬谞讜讗专_驻讘专讜讗专_诪专抓_讗驻专讬诇_诪讗讬_讬讜谞讬_讬讜诇讬_讗讜讙讜住讟_住驻讟诪讘专_讗讜拽讟讜讘专_谞讜讘诪讘专_讚爪诪讘专'.split('_'),
        monthsShort : '讬谞讜壮_驻讘专壮_诪专抓_讗驻专壮_诪讗讬_讬讜谞讬_讬讜诇讬_讗讜讙壮_住驻讟壮_讗讜拽壮_谞讜讘壮_讚爪诪壮'.split('_'),
        weekdays : '专讗砖讜谉_砖谞讬_砖诇讬砖讬_专讘讬注讬_讞诪讬砖讬_砖讬砖讬_砖讘转'.split('_'),
        weekdaysShort : '讗壮_讘壮_讙壮_讚壮_讛壮_讜壮_砖壮'.split('_'),
        weekdaysMin : '讗_讘_讙_讚_讛_讜_砖'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [讘]MMMM YYYY',
            LLL : 'D [讘]MMMM YYYY HH:mm',
            LLLL : 'dddd, D [讘]MMMM YYYY HH:mm',
            l : 'D/M/YYYY',
            ll : 'D MMM YYYY',
            lll : 'D MMM YYYY HH:mm',
            llll : 'ddd, D MMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[讛讬讜诐 讘志]LT',
            nextDay : '[诪讞专 讘志]LT',
            nextWeek : 'dddd [讘砖注讛] LT',
            lastDay : '[讗转诪讜诇 讘志]LT',
            lastWeek : '[讘讬讜诐] dddd [讛讗讞专讜谉 讘砖注讛] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '讘注讜讚 %s',
            past : '诇驻谞讬 %s',
            s : '诪住驻专 砖谞讬讜转',
            ss : '%d 砖谞讬讜转',
            m : '讚拽讛',
            mm : '%d 讚拽讜转',
            h : '砖注讛',
            hh : function (number) {
                if (number === 2) {
                    return '砖注转讬讬诐';
                }
                return number + ' 砖注讜转';
            },
            d : '讬讜诐',
            dd : function (number) {
                if (number === 2) {
                    return '讬讜诪讬讬诐';
                }
                return number + ' 讬诪讬诐';
            },
            M : '讞讜讚砖',
            MM : function (number) {
                if (number === 2) {
                    return '讞讜讚砖讬讬诐';
                }
                return number + ' 讞讜讚砖讬诐';
            },
            y : '砖谞讛',
            yy : function (number) {
                if (number === 2) {
                    return '砖谞转讬讬诐';
                } else if (number % 10 === 0 &amp;&amp; number !== 10) {
                    return number + ' 砖谞讛';
                }
                return number + ' 砖谞讬诐';
            }
        },
        meridiemParse: /讗讞讛"爪|诇驻谞讛"爪|讗讞专讬 讛爪讛专讬讬诐|诇驻谞讬 讛爪讛专讬讬诐|诇驻谞讜转 讘讜拽专|讘讘讜拽专|讘注专讘/i,
        isPM : function (input) {
            return /^(讗讞讛"爪|讗讞专讬 讛爪讛专讬讬诐|讘注专讘)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 5) {
                return '诇驻谞讜转 讘讜拽专';
            } else if (hour &lt; 10) {
                return '讘讘讜拽专';
            } else if (hour &lt; 12) {
                return isLower ? '诇驻谞讛"爪' : '诇驻谞讬 讛爪讛专讬讬诐';
            } else if (hour &lt; 18) {
                return isLower ? '讗讞讛"爪' : '讗讞专讬 讛爪讛专讬讬诐';
            } else {
                return '讘注专讘';
            }
        }
    });

    //! moment.js locale configuration

    var symbolMap$7 = {
        '1': '啷�',
        '2': '啷�',
        '3': '啷�',
        '4': '啷�',
        '5': '啷�',
        '6': '啷�',
        '7': '啷�',
        '8': '啷�',
        '9': '啷�',
        '0': '啷�'
    },
    numberMap$6 = {
        '啷�': '1',
        '啷�': '2',
        '啷�': '3',
        '啷�': '4',
        '啷�': '5',
        '啷�': '6',
        '啷�': '7',
        '啷�': '8',
        '啷�': '9',
        '啷�': '0'
    };

    hooks.defineLocale('hi', {
        months : '啶溹え啶掂ぐ啷€_啶ぜ啶班さ啶班_啶ぞ啶班啶歘啶呧お啷嵿ぐ啷堗げ_啶_啶溹啶╛啶溹啶侧ぞ啶坃啶呧啶膏啶啶膏た啶むぎ啷嵿が啶癬啶呧啷嵿啷傕が啶癬啶ㄠさ啶啶ぐ_啶︵た啶膏ぎ啷嵿が啶�'.split('_'),
        monthsShort : '啶溹え._啶ぜ啶�._啶ぞ啶班啶歘啶呧お啷嵿ぐ啷�._啶_啶溹啶╛啶溹啶�._啶呧._啶膏た啶�._啶呧啷嵿啷�._啶ㄠさ._啶︵た啶�.'.split('_'),
        monthsParseExact: true,
        weekdays : '啶班さ啶苦さ啶距ぐ_啶膏啶さ啶距ぐ_啶啶椸げ啶掂ぞ啶癬啶啶оさ啶距ぐ_啶椸啶班啶掂ぞ啶癬啶多啶曕啶班さ啶距ぐ_啶多え啶苦さ啶距ぐ'.split('_'),
        weekdaysShort : '啶班さ啶縚啶膏啶甠啶啶椸げ_啶啶啶椸啶班_啶多啶曕啶癬啶多え啶�'.split('_'),
        weekdaysMin : '啶癬啶膏_啶_啶_啶椸_啶多_啶�'.split('_'),
        longDateFormat : {
            LT : 'A h:mm 啶啷�',
            LTS : 'A h:mm:ss 啶啷�',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm 啶啷�',
            LLLL : 'dddd, D MMMM YYYY, A h:mm 啶啷�'
        },
        calendar : {
            sameDay : '[啶嗋] LT',
            nextDay : '[啶曕げ] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[啶曕げ] LT',
            lastWeek : '[啶た啶涏げ啷嘳 dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s 啶啶�',
            past : '%s 啶す啶侧',
            s : '啶曕啶� 啶灌 啶曕啶粪ぃ',
            ss : '%d 啶膏啶曕啶�',
            m : '啶忇 啶た啶ㄠ',
            mm : '%d 啶た啶ㄠ',
            h : '啶忇 啶樴啶熰ぞ',
            hh : '%d 啶樴啶熰',
            d : '啶忇 啶︵た啶�',
            dd : '%d 啶︵た啶�',
            M : '啶忇 啶す啷€啶ㄠ',
            MM : '%d 啶す啷€啶ㄠ',
            y : '啶忇 啶掂ぐ啷嵿し',
            yy : '%d 啶掂ぐ啷嵿し'
        },
        preparse: function (string) {
            return string.replace(/[啷оエ啷┼オ啷ガ啷ギ啷ウ]/g, function (match) {
                return numberMap$6[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap$7[match];
            });
        },
        // Hindi notation for meridiems are quite fuzzy in practice. While there exists
        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
        meridiemParse: /啶班ぞ啶啶膏啶す|啶︵啶す啶皘啶多ぞ啶�/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '啶班ぞ啶�') {
                return hour &lt; 4 ? hour : hour + 12;
            } else if (meridiem === '啶膏啶す') {
                return hour;
            } else if (meridiem === '啶︵啶す啶�') {
                return hour &gt;= 10 ? hour : hour + 12;
            } else if (meridiem === '啶多ぞ啶�') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 4) {
                return '啶班ぞ啶�';
            } else if (hour &lt; 10) {
                return '啶膏啶す';
            } else if (hour &lt; 17) {
                return '啶︵啶す啶�';
            } else if (hour &lt; 20) {
                return '啶多ぞ啶�';
            } else {
                return '啶班ぞ啶�';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    function translate$3(number, withoutSuffix, key) {
        var result = number + ' ';
        switch (key) {
            case 'ss':
                if (number === 1) {
                    result += 'sekunda';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'sekunde';
                } else {
                    result += 'sekundi';
                }
                return result;
            case 'm':
                return withoutSuffix ? 'jedna minuta' : 'jedne minute';
            case 'mm':
                if (number === 1) {
                    result += 'minuta';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'minute';
                } else {
                    result += 'minuta';
                }
                return result;
            case 'h':
                return withoutSuffix ? 'jedan sat' : 'jednog sata';
            case 'hh':
                if (number === 1) {
                    result += 'sat';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'sata';
                } else {
                    result += 'sati';
                }
                return result;
            case 'dd':
                if (number === 1) {
                    result += 'dan';
                } else {
                    result += 'dana';
                }
                return result;
            case 'MM':
                if (number === 1) {
                    result += 'mjesec';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'mjeseca';
                } else {
                    result += 'mjeseci';
                }
                return result;
            case 'yy':
                if (number === 1) {
                    result += 'godina';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'godine';
                } else {
                    result += 'godina';
                }
                return result;
        }
    }

    hooks.defineLocale('hr', {
        months : {
            format: 'sije膷nja_velja膷e_o啪ujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_'),
            standalone: 'sije膷anj_velja膷a_o啪ujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_')
        },
        monthsShort : 'sij._velj._o啪u._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
        monthsParseExact: true,
        weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_膷etvrtak_petak_subota'.split('_'),
        weekdaysShort : 'ned._pon._uto._sri._膷et._pet._sub.'.split('_'),
        weekdaysMin : 'ne_po_ut_sr_膷e_pe_su'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd, D. MMMM YYYY H:mm'
        },
        calendar : {
            sameDay  : '[danas u] LT',
            nextDay  : '[sutra u] LT',
            nextWeek : function () {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedjelju] [u] LT';
                    case 3:
                        return '[u] [srijedu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay  : '[ju膷er u] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                        return '[pro拧lu] dddd [u] LT';
                    case 6:
                        return '[pro拧le] [subote] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[pro拧li] dddd [u] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'za %s',
            past   : 'prije %s',
            s      : 'par sekundi',
            ss     : translate$3,
            m      : translate$3,
            mm     : translate$3,
            h      : translate$3,
            hh     : translate$3,
            d      : 'dan',
            dd     : translate$3,
            M      : 'mjesec',
            MM     : translate$3,
            y      : 'godinu',
            yy     : translate$3
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var weekEndings = 'vas谩rnap h茅tf艖n kedden szerd谩n cs眉t枚rt枚k枚n p茅nteken szombaton'.split(' ');
    function translate$4(number, withoutSuffix, key, isFuture) {
        var num = number;
        switch (key) {
            case 's':
                return (isFuture || withoutSuffix) ? 'n茅h谩ny m谩sodperc' : 'n茅h谩ny m谩sodperce';
            case 'ss':
                return num + (isFuture || withoutSuffix) ? ' m谩sodperc' : ' m谩sodperce';
            case 'm':
                return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
            case 'mm':
                return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
            case 'h':
                return 'egy' + (isFuture || withoutSuffix ? ' 贸ra' : ' 贸r谩ja');
            case 'hh':
                return num + (isFuture || withoutSuffix ? ' 贸ra' : ' 贸r谩ja');
            case 'd':
                return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
            case 'dd':
                return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
            case 'M':
                return 'egy' + (isFuture || withoutSuffix ? ' h贸nap' : ' h贸napja');
            case 'MM':
                return num + (isFuture || withoutSuffix ? ' h贸nap' : ' h贸napja');
            case 'y':
                return 'egy' + (isFuture || withoutSuffix ? ' 茅v' : ' 茅ve');
            case 'yy':
                return num + (isFuture || withoutSuffix ? ' 茅v' : ' 茅ve');
        }
        return '';
    }
    function week(isFuture) {
        return (isFuture ? '' : '[m煤lt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
    }

    hooks.defineLocale('hu', {
        months : 'janu谩r_febru谩r_m谩rcius_谩prilis_m谩jus_j煤nius_j煤lius_augusztus_szeptember_okt贸ber_november_december'.split('_'),
        monthsShort : 'jan_feb_m谩rc_谩pr_m谩j_j煤n_j煤l_aug_szept_okt_nov_dec'.split('_'),
        weekdays : 'vas谩rnap_h茅tf艖_kedd_szerda_cs眉t枚rt枚k_p茅ntek_szombat'.split('_'),
        weekdaysShort : 'vas_h茅t_kedd_sze_cs眉t_p茅n_szo'.split('_'),
        weekdaysMin : 'v_h_k_sze_cs_p_szo'.split('_'),
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'YYYY.MM.DD.',
            LL : 'YYYY. MMMM D.',
            LLL : 'YYYY. MMMM D. H:mm',
            LLLL : 'YYYY. MMMM D., dddd H:mm'
        },
        meridiemParse: /de|du/i,
        isPM: function (input) {
            return input.charAt(1).toLowerCase() === 'u';
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours &lt; 12) {
                return isLower === true ? 'de' : 'DE';
            } else {
                return isLower === true ? 'du' : 'DU';
            }
        },
        calendar : {
            sameDay : '[ma] LT[-kor]',
            nextDay : '[holnap] LT[-kor]',
            nextWeek : function () {
                return week.call(this, true);
            },
            lastDay : '[tegnap] LT[-kor]',
            lastWeek : function () {
                return week.call(this, false);
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s m煤lva',
            past : '%s',
            s : translate$4,
            ss : translate$4,
            m : translate$4,
            mm : translate$4,
            h : translate$4,
            hh : translate$4,
            d : translate$4,
            dd : translate$4,
            M : translate$4,
            MM : translate$4,
            y : translate$4,
            yy : translate$4
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('hy-am', {
        months : {
            format: '瞻崭謧斩站铡謤斋_謨榨湛謤站铡謤斋_沾铡謤湛斋_铡蘸謤斋宅斋_沾铡盏斋战斋_瞻崭謧斩斋战斋_瞻崭謧宅斋战斋_謪眨崭战湛崭战斋_战榨蘸湛榨沾闸榨謤斋_瞻崭寨湛榨沾闸榨謤斋_斩崭盏榨沾闸榨謤斋_栅榨寨湛榨沾闸榨謤斋'.split('_'),
            standalone: '瞻崭謧斩站铡謤_謨榨湛謤站铡謤_沾铡謤湛_铡蘸謤斋宅_沾铡盏斋战_瞻崭謧斩斋战_瞻崭謧宅斋战_謪眨崭战湛崭战_战榨蘸湛榨沾闸榨謤_瞻崭寨湛榨沾闸榨謤_斩崭盏榨沾闸榨謤_栅榨寨湛榨沾闸榨謤'.split('_')
        },
        monthsShort : '瞻斩站_謨湛謤_沾謤湛_铡蘸謤_沾盏战_瞻斩战_瞻宅战_謪眨战_战蘸湛_瞻寨湛_斩沾闸_栅寨湛'.split('_'),
        weekdays : '寨斋謤铡寨斋_榨謤寨崭謧辗铡闸诈斋_榨謤榨謩辗铡闸诈斋_展崭謤榨謩辗铡闸诈斋_瞻斋斩眨辗铡闸诈斋_崭謧謤闸铡诈_辗铡闸铡诈'.split('_'),
        weekdaysShort : '寨謤寨_榨謤寨_榨謤謩_展謤謩_瞻斩眨_崭謧謤闸_辗闸诈'.split('_'),
        weekdaysMin : '寨謤寨_榨謤寨_榨謤謩_展謤謩_瞻斩眨_崭謧謤闸_辗闸诈'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY 诈.',
            LLL : 'D MMMM YYYY 诈., HH:mm',
            LLLL : 'dddd, D MMMM YYYY 诈., HH:mm'
        },
        calendar : {
            sameDay: '[铡盏战謪謤] LT',
            nextDay: '[站铡詹炸] LT',
            lastDay: '[榨謤榨寨] LT',
            nextWeek: function () {
                return 'dddd [謪謤炸 摘铡沾炸] LT';
            },
            lastWeek: function () {
                return '[铡斩謥铡债] dddd [謪謤炸 摘铡沾炸] LT';
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : '%s 瞻榨湛崭',
            past : '%s 铡占铡栈',
            s : '沾斋 謩铡斩斋 站铡盏謤寨盏铡斩',
            ss : '%d 站铡盏謤寨盏铡斩',
            m : '謤崭蘸榨',
            mm : '%d 謤崭蘸榨',
            h : '摘铡沾',
            hh : '%d 摘铡沾',
            d : '謪謤',
            dd : '%d 謪謤',
            M : '铡沾斋战',
            MM : '%d 铡沾斋战',
            y : '湛铡謤斋',
            yy : '%d 湛铡謤斋'
        },
        meridiemParse: /眨斋辗榨謤站铡|铡占铡站崭湛站铡|謥榨謤榨寨站铡|榨謤榨寨崭盏铡斩/,
        isPM: function (input) {
            return /^(謥榨謤榨寨站铡|榨謤榨寨崭盏铡斩)$/.test(input);
        },
        meridiem : function (hour) {
            if (hour &lt; 4) {
                return '眨斋辗榨謤站铡';
            } else if (hour &lt; 12) {
                return '铡占铡站崭湛站铡';
            } else if (hour &lt; 17) {
                return '謥榨謤榨寨站铡';
            } else {
                return '榨謤榨寨崭盏铡斩';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}|\d{1,2}-(斋斩|謤栅)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'DDD':
                case 'w':
                case 'W':
                case 'DDDo':
                    if (number === 1) {
                        return number + '-斋斩';
                    }
                    return number + '-謤栅';
                default:
                    return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('id', {
        months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des'.split('_'),
        weekdays : 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
        weekdaysShort : 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
        weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY [pukul] HH.mm',
            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /pagi|siang|sore|malam/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'pagi') {
                return hour;
            } else if (meridiem === 'siang') {
                return hour &gt;= 11 ? hour : hour + 12;
            } else if (meridiem === 'sore' || meridiem === 'malam') {
                return hour + 12;
            }
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours &lt; 11) {
                return 'pagi';
            } else if (hours &lt; 15) {
                return 'siang';
            } else if (hours &lt; 19) {
                return 'sore';
            } else {
                return 'malam';
            }
        },
        calendar : {
            sameDay : '[Hari ini pukul] LT',
            nextDay : '[Besok pukul] LT',
            nextWeek : 'dddd [pukul] LT',
            lastDay : '[Kemarin pukul] LT',
            lastWeek : 'dddd [lalu pukul] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'dalam %s',
            past : '%s yang lalu',
            s : 'beberapa detik',
            ss : '%d detik',
            m : 'semenit',
            mm : '%d menit',
            h : 'sejam',
            hh : '%d jam',
            d : 'sehari',
            dd : '%d hari',
            M : 'sebulan',
            MM : '%d bulan',
            y : 'setahun',
            yy : '%d tahun'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    function plural$2(n) {
        if (n % 100 === 11) {
            return true;
        } else if (n % 10 === 1) {
            return false;
        }
        return true;
    }
    function translate$5(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':
                return withoutSuffix || isFuture ? 'nokkrar sek煤ndur' : 'nokkrum sek煤ndum';
            case 'ss':
                if (plural$2(number)) {
                    return result + (withoutSuffix || isFuture ? 'sek煤ndur' : 'sek煤ndum');
                }
                return result + 'sek煤nda';
            case 'm':
                return withoutSuffix ? 'm铆n煤ta' : 'm铆n煤tu';
            case 'mm':
                if (plural$2(number)) {
                    return result + (withoutSuffix || isFuture ? 'm铆n煤tur' : 'm铆n煤tum');
                } else if (withoutSuffix) {
                    return result + 'm铆n煤ta';
                }
                return result + 'm铆n煤tu';
            case 'hh':
                if (plural$2(number)) {
                    return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
                }
                return result + 'klukkustund';
            case 'd':
                if (withoutSuffix) {
                    return 'dagur';
                }
                return isFuture ? 'dag' : 'degi';
            case 'dd':
                if (plural$2(number)) {
                    if (withoutSuffix) {
                        return result + 'dagar';
                    }
                    return result + (isFuture ? 'daga' : 'd枚gum');
                } else if (withoutSuffix) {
                    return result + 'dagur';
                }
                return result + (isFuture ? 'dag' : 'degi');
            case 'M':
                if (withoutSuffix) {
                    return 'm谩nu冒ur';
                }
                return isFuture ? 'm谩nu冒' : 'm谩nu冒i';
            case 'MM':
                if (plural$2(number)) {
                    if (withoutSuffix) {
                        return result + 'm谩nu冒ir';
                    }
                    return result + (isFuture ? 'm谩nu冒i' : 'm谩nu冒um');
                } else if (withoutSuffix) {
                    return result + 'm谩nu冒ur';
                }
                return result + (isFuture ? 'm谩nu冒' : 'm谩nu冒i');
            case 'y':
                return withoutSuffix || isFuture ? '谩r' : '谩ri';
            case 'yy':
                if (plural$2(number)) {
                    return result + (withoutSuffix || isFuture ? '谩r' : '谩rum');
                }
                return result + (withoutSuffix || isFuture ? '谩r' : '谩ri');
        }
    }

    hooks.defineLocale('is', {
        months : 'jan煤ar_febr煤ar_mars_apr铆l_ma铆_j煤n铆_j煤l铆_谩g煤st_september_okt贸ber_n贸vember_desember'.split('_'),
        monthsShort : 'jan_feb_mar_apr_ma铆_j煤n_j煤l_谩g煤_sep_okt_n贸v_des'.split('_'),
        weekdays : 'sunnudagur_m谩nudagur_镁ri冒judagur_mi冒vikudagur_fimmtudagur_f枚studagur_laugardagur'.split('_'),
        weekdaysShort : 'sun_m谩n_镁ri_mi冒_fim_f枚s_lau'.split('_'),
        weekdaysMin : 'Su_M谩_脼r_Mi_Fi_F枚_La'.split('_'),
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY [kl.] H:mm',
            LLLL : 'dddd, D. MMMM YYYY [kl.] H:mm'
        },
        calendar : {
            sameDay : '[铆 dag kl.] LT',
            nextDay : '[谩 morgun kl.] LT',
            nextWeek : 'dddd [kl.] LT',
            lastDay : '[铆 g忙r kl.] LT',
            lastWeek : '[s铆冒asta] dddd [kl.] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'eftir %s',
            past : 'fyrir %s s铆冒an',
            s : translate$5,
            ss : translate$5,
            m : translate$5,
            mm : translate$5,
            h : 'klukkustund',
            hh : translate$5,
            d : translate$5,
            dd : translate$5,
            M : translate$5,
            MM : translate$5,
            y : translate$5,
            yy : translate$5
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('it-ch', {
        months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
        monthsShort : 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
        weekdays : 'domenica_luned矛_marted矛_mercoled矛_gioved矛_venerd矛_sabato'.split('_'),
        weekdaysShort : 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
        weekdaysMin : 'do_lu_ma_me_gi_ve_sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Oggi alle] LT',
            nextDay: '[Domani alle] LT',
            nextWeek: 'dddd [alle] LT',
            lastDay: '[Ieri alle] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[la scorsa] dddd [alle] LT';
                    default:
                        return '[lo scorso] dddd [alle] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : function (s) {
                return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
            },
            past : '%s fa',
            s : 'alcuni secondi',
            ss : '%d secondi',
            m : 'un minuto',
            mm : '%d minuti',
            h : 'un\'ora',
            hh : '%d ore',
            d : 'un giorno',
            dd : '%d giorni',
            M : 'un mese',
            MM : '%d mesi',
            y : 'un anno',
            yy : '%d anni'
        },
        dayOfMonthOrdinalParse : /\d{1,2}潞/,
        ordinal: '%d潞',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('it', {
        months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
        monthsShort : 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
        weekdays : 'domenica_luned矛_marted矛_mercoled矛_gioved矛_venerd矛_sabato'.split('_'),
        weekdaysShort : 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
        weekdaysMin : 'do_lu_ma_me_gi_ve_sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Oggi alle] LT',
            nextDay: '[Domani alle] LT',
            nextWeek: 'dddd [alle] LT',
            lastDay: '[Ieri alle] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[la scorsa] dddd [alle] LT';
                    default:
                        return '[lo scorso] dddd [alle] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : function (s) {
                return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
            },
            past : '%s fa',
            s : 'alcuni secondi',
            ss : '%d secondi',
            m : 'un minuto',
            mm : '%d minuti',
            h : 'un\'ora',
            hh : '%d ore',
            d : 'un giorno',
            dd : '%d giorni',
            M : 'un mese',
            MM : '%d mesi',
            y : 'un anno',
            yy : '%d anni'
        },
        dayOfMonthOrdinalParse : /\d{1,2}潞/,
        ordinal: '%d潞',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('ja', {
        months : '涓€鏈坃浜屾湀_涓夋湀_鍥涙湀_浜旀湀_鍏湀_涓冩湀_鍏湀_涔濇湀_鍗佹湀_鍗佷竴鏈坃鍗佷簩鏈�'.split('_'),
        monthsShort : '1鏈坃2鏈坃3鏈坃4鏈坃5鏈坃6鏈坃7鏈坃8鏈坃9鏈坃10鏈坃11鏈坃12鏈�'.split('_'),
        weekdays : '鏃ユ洔鏃鏈堟洔鏃鐏洔鏃姘存洔鏃鏈ㄦ洔鏃閲戞洔鏃鍦熸洔鏃�'.split('_'),
        weekdaysShort : '鏃鏈坃鐏玙姘確鏈╛閲慱鍦�'.split('_'),
        weekdaysMin : '鏃鏈坃鐏玙姘確鏈╛閲慱鍦�'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY/MM/DD',
            LL : 'YYYY骞碝鏈圖鏃�',
            LLL : 'YYYY骞碝鏈圖鏃� HH:mm',
            LLLL : 'YYYY骞碝鏈圖鏃� dddd HH:mm',
            l : 'YYYY/MM/DD',
            ll : 'YYYY骞碝鏈圖鏃�',
            lll : 'YYYY骞碝鏈圖鏃� HH:mm',
            llll : 'YYYY骞碝鏈圖鏃�(ddd) HH:mm'
        },
        meridiemParse: /鍗堝墠|鍗堝緦/i,
        isPM : function (input) {
            return input === '鍗堝緦';
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 12) {
                return '鍗堝墠';
            } else {
                return '鍗堝緦';
            }
        },
        calendar : {
            sameDay : '[浠婃棩] LT',
            nextDay : '[鏄庢棩] LT',
            nextWeek : function (now) {
                if (now.week() &lt; this.week()) {
                    return '[鏉ラ€盷dddd LT';
                } else {
                    return 'dddd LT';
                }
            },
            lastDay : '[鏄ㄦ棩] LT',
            lastWeek : function (now) {
                if (this.week() &lt; now.week()) {
                    return '[鍏堥€盷dddd LT';
                } else {
                    return 'dddd LT';
                }
            },
            sameElse : 'L'
        },
        dayOfMonthOrdinalParse : /\d{1,2}鏃�/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '鏃�';
                default:
                    return number;
            }
        },
        relativeTime : {
            future : '%s寰�',
            past : '%s鍓�',
            s : '鏁扮',
            ss : '%d绉�',
            m : '1鍒�',
            mm : '%d鍒�',
            h : '1鏅傞枔',
            hh : '%d鏅傞枔',
            d : '1鏃�',
            dd : '%d鏃�',
            M : '1銉舵湀',
            MM : '%d銉舵湀',
            y : '1骞�',
            yy : '%d骞�'
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('jv', {
        months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
        weekdays : 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
        weekdaysShort : 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
        weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY [pukul] HH.mm',
            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /enjing|siyang|sonten|ndalu/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'enjing') {
                return hour;
            } else if (meridiem === 'siyang') {
                return hour &gt;= 11 ? hour : hour + 12;
            } else if (meridiem === 'sonten' || meridiem === 'ndalu') {
                return hour + 12;
            }
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours &lt; 11) {
                return 'enjing';
            } else if (hours &lt; 15) {
                return 'siyang';
            } else if (hours &lt; 19) {
                return 'sonten';
            } else {
                return 'ndalu';
            }
        },
        calendar : {
            sameDay : '[Dinten puniko pukul] LT',
            nextDay : '[Mbenjang pukul] LT',
            nextWeek : 'dddd [pukul] LT',
            lastDay : '[Kala wingi pukul] LT',
            lastWeek : 'dddd [kepengker pukul] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'wonten ing %s',
            past : '%s ingkang kepengker',
            s : 'sawetawis detik',
            ss : '%d detik',
            m : 'setunggal menit',
            mm : '%d menit',
            h : 'setunggal jam',
            hh : '%d jam',
            d : 'sedinten',
            dd : '%d dinten',
            M : 'sewulan',
            MM : '%d wulan',
            y : 'setaun',
            yy : '%d taun'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('ka', {
        months : {
            standalone: '醿樶儛醿溼儠醿愥儬醿榑醿椺償醿戓償醿犪儠醿愥儦醿榑醿涐儛醿犪儮醿榑醿愥優醿犪儤醿氠儤_醿涐儛醿樶儭醿榑醿樶儠醿溼儤醿♂儤_醿樶儠醿氠儤醿♂儤_醿愥儝醿曖儤醿♂儮醿漘醿♂償醿メ儮醿斸儧醿戓償醿犪儤_醿濁儱醿⑨儩醿涐儜醿斸儬醿榑醿溼儩醿斸儧醿戓償醿犪儤_醿撫償醿欋償醿涐儜醿斸儬醿�'.split('_'),
            format: '醿樶儛醿溼儠醿愥儬醿醿椺償醿戓償醿犪儠醿愥儦醿醿涐儛醿犪儮醿醿愥優醿犪儤醿氠儤醿醿涐儛醿樶儭醿醿樶儠醿溼儤醿♂儭_醿樶儠醿氠儤醿♂儭_醿愥儝醿曖儤醿♂儮醿醿♂償醿メ儮醿斸儧醿戓償醿犪儭_醿濁儱醿⑨儩醿涐儜醿斸儬醿醿溼儩醿斸儧醿戓償醿犪儭_醿撫償醿欋償醿涐儜醿斸儬醿�'.split('_')
        },
        monthsShort : '醿樶儛醿淿醿椺償醿慱醿涐儛醿燺醿愥優醿燺醿涐儛醿榑醿樶儠醿淿醿樶儠醿歘醿愥儝醿昣醿♂償醿醿濁儱醿醿溼儩醿擾醿撫償醿�'.split('_'),
        weekdays : {
            standalone: '醿欋儠醿樶儬醿恄醿濁儬醿ㄡ儛醿戓儛醿椺儤_醿♂儛醿涐儴醿愥儜醿愥儣醿榑醿濁儣醿儴醿愥儜醿愥儣醿榑醿儯醿椺儴醿愥儜醿愥儣醿榑醿炨儛醿犪儛醿♂儥醿斸儠醿榑醿ㄡ儛醿戓儛醿椺儤'.split('_'),
            format: '醿欋儠醿樶儬醿愥儭_醿濁儬醿ㄡ儛醿戓儛醿椺儭_醿♂儛醿涐儴醿愥儜醿愥儣醿醿濁儣醿儴醿愥儜醿愥儣醿醿儯醿椺儴醿愥儜醿愥儣醿醿炨儛醿犪儛醿♂儥醿斸儠醿醿ㄡ儛醿戓儛醿椺儭'.split('_'),
            isFormat: /(醿儤醿溼儛|醿ㄡ償醿涐儞醿斸儝)/
        },
        weekdaysShort : '醿欋儠醿榑醿濁儬醿╛醿♂儛醿沖醿濁儣醿甠醿儯醿梍醿炨儛醿燺醿ㄡ儛醿�'.split('_'),
        weekdaysMin : '醿欋儠_醿濁儬_醿♂儛_醿濁儣_醿儯_醿炨儛_醿ㄡ儛'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendar : {
            sameDay : '[醿撫儲醿斸儭] LT[-醿栣償]',
            nextDay : '[醿儠醿愥儦] LT[-醿栣償]',
            lastDay : '[醿掅儯醿ㄡ儤醿淽 LT[-醿栣償]',
            nextWeek : '[醿ㄡ償醿涐儞醿斸儝] dddd LT[-醿栣償]',
            lastWeek : '[醿儤醿溼儛] dddd LT-醿栣償',
            sameElse : 'L'
        },
        relativeTime : {
            future : function (s) {
                return (/(醿儛醿涐儤|醿儯醿椺儤|醿♂儛醿愥儣醿榺醿償醿氠儤)/).test(s) ?
                    s.replace(/醿�$/, '醿ㄡ儤') :
                    s + '醿ㄡ儤';
            },
            past : function (s) {
                if ((/(醿儛醿涐儤|醿儯醿椺儤|醿♂儛醿愥儣醿榺醿撫儲醿攟醿椺儠醿�)/).test(s)) {
                    return s.replace(/(醿榺醿�)$/, '醿樶儭 醿儤醿�');
                }
                if ((/醿償醿氠儤/).test(s)) {
                    return s.replace(/醿償醿氠儤$/, '醿儦醿樶儭 醿儤醿�');
                }
            },
            s : '醿犪儛醿涐儞醿斸儨醿樶儧醿� 醿儛醿涐儤',
            ss : '%d 醿儛醿涐儤',
            m : '醿儯醿椺儤',
            mm : '%d 醿儯醿椺儤',
            h : '醿♂儛醿愥儣醿�',
            hh : '%d 醿♂儛醿愥儣醿�',
            d : '醿撫儲醿�',
            dd : '%d 醿撫儲醿�',
            M : '醿椺儠醿�',
            MM : '%d 醿椺儠醿�',
            y : '醿償醿氠儤',
            yy : '%d 醿償醿氠儤'
        },
        dayOfMonthOrdinalParse: /0|1-醿氠儤|醿涐償-\d{1,2}|\d{1,2}-醿�/,
        ordinal : function (number) {
            if (number === 0) {
                return number;
            }
            if (number === 1) {
                return number + '-醿氠儤';
            }
            if ((number &lt; 20) || (number &lt;= 100 &amp;&amp; (number % 20 === 0)) || (number % 100 === 0)) {
                return '醿涐償-' + number;
            }
            return number + '-醿�';
        },
        week : {
            dow : 1,
            doy : 7
        }
    });

    //! moment.js locale configuration

    var suffixes$1 = {
        0: '-褕褨',
        1: '-褕褨',
        2: '-褕褨',
        3: '-褕褨',
        4: '-褕褨',
        5: '-褕褨',
        6: '-褕褘',
        7: '-褕褨',
        8: '-褕褨',
        9: '-褕褘',
        10: '-褕褘',
        20: '-褕褘',
        30: '-褕褘',
        40: '-褕褘',
        50: '-褕褨',
        60: '-褕褘',
        70: '-褕褨',
        80: '-褕褨',
        90: '-褕褘',
        100: '-褕褨'
    };

    hooks.defineLocale('kk', {
        months : '覜邪遥褌邪褉_邪覜锌邪薪_薪邪褍褉褘蟹_褋訖褍褨褉_屑邪屑褘褉_屑邪褍褋褘屑_褕褨谢写械_褌邪屑褘蟹_覜褘褉泻爷泄械泻_覜邪蟹邪薪_覜邪褉邪褕邪_卸械谢褌芯覜褋邪薪'.split('_'),
        monthsShort : '覜邪遥_邪覜锌_薪邪褍_褋訖褍_屑邪屑_屑邪褍_褕褨谢_褌邪屑_覜褘褉_覜邪蟹_覜邪褉_卸械谢'.split('_'),
        weekdays : '卸械泻褋械薪斜褨_写爷泄褋械薪斜褨_褋械泄褋械薪斜褨_褋訖褉褋械薪斜褨_斜械泄褋械薪斜褨_卸冶屑邪_褋械薪斜褨'.split('_'),
        weekdaysShort : '卸械泻_写爷泄_褋械泄_褋訖褉_斜械泄_卸冶屑_褋械薪'.split('_'),
        weekdaysMin : '卸泻_写泄_褋泄_褋褉_斜泄_卸屑_褋薪'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[袘爷谐褨薪 褋邪覔邪褌] LT',
            nextDay : '[袝褉褌械遥 褋邪覔邪褌] LT',
            nextWeek : 'dddd [褋邪覔邪褌] LT',
            lastDay : '[袣械褕械 褋邪覔邪褌] LT',
            lastWeek : '[莹褌泻械薪 邪锌褌邪薪褘遥] dddd [褋邪覔邪褌] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s 褨褕褨薪写械',
            past : '%s 斜冶褉褘薪',
            s : '斜褨褉薪械褕械 褋械泻褍薪写',
            ss : '%d 褋械泻褍薪写',
            m : '斜褨褉 屑懈薪褍褌',
            mm : '%d 屑懈薪褍褌',
            h : '斜褨褉 褋邪覔邪褌',
            hh : '%d 褋邪覔邪褌',
            d : '斜褨褉 泻爷薪',
            dd : '%d 泻爷薪',
            M : '斜褨褉 邪泄',
            MM : '%d 邪泄',
            y : '斜褨褉 卸褘谢',
            yy : '%d 卸褘谢'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(褕褨|褕褘)/,
        ordinal : function (number) {
            var a = number % 10,
                b = number &gt;= 100 ? 100 : null;
            return number + (suffixes$1[number] || suffixes$1[a] || suffixes$1[b]);
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var symbolMap$8 = {
        '1': '釤�',
        '2': '釤�',
        '3': '釤�',
        '4': '釤�',
        '5': '釤�',
        '6': '釤�',
        '7': '釤�',
        '8': '釤�',
        '9': '釤�',
        '0': '釤�'
    }, numberMap$7 = {
        '釤�': '1',
        '釤�': '2',
        '釤�': '3',
        '釤�': '4',
        '釤�': '5',
        '釤�': '6',
        '釤�': '7',
        '釤�': '8',
        '釤�': '9',
        '釤�': '0'
    };

    hooks.defineLocale('km', {
        months: '釣樶瀫釣氠灦_釣€釣会灅釤掅灄釤坃釣樶灨釣撫灦_釣樶焷釣熱灦_釣п灍釣椺灦_釣樶灧釣愥灮釣撫灦_釣€釣€釤掅瀫釣娽灦_釣熱灨釣犪灦_釣€釣夅煉釣夅灦_釣忈灮釣涐灦_釣溼灧釣呩煉釣嗎灧釣€釣禵釣掅煉釣撫灱'.split(
            '_'
        ),
        monthsShort: '釣樶瀫釣氠灦_釣€釣会灅釤掅灄釤坃釣樶灨釣撫灦_釣樶焷釣熱灦_釣п灍釣椺灦_釣樶灧釣愥灮釣撫灦_釣€釣€釤掅瀫釣娽灦_釣熱灨釣犪灦_釣€釣夅煉釣夅灦_釣忈灮釣涐灦_釣溼灧釣呩煉釣嗎灧釣€釣禵釣掅煉釣撫灱'.split(
            '_'
        ),
        weekdays: '釣⑨灦釣戓灧釣忈煉釣檁釣呩煇釣撫煉釣慱釣⑨瀯釤掅瀭釣夺灇_釣栣灮釣抇釣栣煉釣氠灎釣熱煉釣斸瀼釣丰煃_釣熱灮釣€釤掅灇_釣熱焻釣氠煃'.split('_'),
        weekdaysShort: '釣⑨灦_釣卂釣釣朹釣栣煉釣歘釣熱灮_釣�'.split('_'),
        weekdaysMin: '釣⑨灦_釣卂釣釣朹釣栣煉釣歘釣熱灮_釣�'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        meridiemParse: /釣栣煉釣氠灩釣€|釣涐煉釣勧灦釣�/,
        isPM: function (input) {
            return input === '釣涐煉釣勧灦釣�';
        },
        meridiem: function (hour, minute, isLower) {
            if (hour &lt; 12) {
                return '釣栣煉釣氠灩釣€';
            } else {
                return '釣涐煉釣勧灦釣�';
            }
        },
        calendar: {
            sameDay: '[釣愥煉釣勧焹釣撫焷釤� 釣樶焿釤勧瀯] LT',
            nextDay: '[釣熱煉釣⑨焸釣€ 釣樶焿釤勧瀯] LT',
            nextWeek: 'dddd [釣樶焿釤勧瀯] LT',
            lastDay: '[釣樶煉釣熱灧釣涐灅釣丰瀴 釣樶焿釤勧瀯] LT',
            lastWeek: 'dddd [釣熱灁釤掅瀼釣夺灎釤嶀灅釣会灀] [釣樶焿釤勧瀯] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s釣戓焵釣�',
            past: '%s釣樶灮釣�',
            s: '釣斸焿釣会灀釤掅灅釣夺灀釣溼灧釣撫灦釣戓灨',
            ss: '%d 釣溼灧釣撫灦釣戓灨',
            m: '釣樶灲釣欋灀釣夺瀾釣�',
            mm: '%d 釣撫灦釣戓灨',
            h: '釣樶灲釣欋灅釤夅焺釣�',
            hh: '%d 釣樶焿釤勧瀯',
            d: '釣樶灲釣欋瀽釤掅瀯釤�',
            dd: '%d 釣愥煉釣勧焹',
            M: '釣樶灲釣欋瀬釤�',
            MM: '%d 釣佱焸',
            y: '釣樶灲釣欋瀱釤掅灀釣夺焼',
            yy: '%d 釣嗎煉釣撫灦釤�'
        },
        dayOfMonthOrdinalParse : /釣戓灨\d{1,2}/,
        ordinal : '釣戓灨%d',
        preparse: function (string) {
            return string.replace(/[釤♂煝釤ａ煠釤メ煢釤п煥釤┽煚]/g, function (match) {
                return numberMap$7[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap$8[match];
            });
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var symbolMap$9 = {
        '1': '喑�',
        '2': '喑�',
        '3': '喑�',
        '4': '喑�',
        '5': '喑�',
        '6': '喑�',
        '7': '喑�',
        '8': '喑�',
        '9': '喑�',
        '0': '喑�'
    },
    numberMap$8 = {
        '喑�': '1',
        '喑�': '2',
        '喑�': '3',
        '喑�': '4',
        '喑�': '5',
        '喑�': '6',
        '喑�': '7',
        '喑�': '8',
        '喑�': '9',
        '喑�': '0'
    };

    hooks.defineLocale('kn', {
        months : '嗖溹波嗖掂舶嗖縚嗖硢嗖硩嗖班驳嗖班部_嗖簿嗖班硩嗖氞硩_嗖忇勃喑嵿舶嗖苦膊喑峗嗖硢喑昣嗖溹硞嗖ㄠ硩_嗖溹硜嗖侧硢喑朹嗖嗋矖嗖膏硩嗖熰硩_嗖膏硢嗖硩嗖熰硢嗖傕铂嗖班硩_嗖呧矔喑嵿矡喑嗋硞喑曕铂嗖班硩_嗖ㄠ驳喑嗋矀嗖舶喑峗嗖∴部嗖膏硢嗖傕铂嗖班硩'.split('_'),
        monthsShort : '嗖溹波_嗖硢嗖硩嗖癬嗖簿嗖班硩嗖氞硩_嗖忇勃喑嵿舶嗖苦膊喑峗嗖硢喑昣嗖溹硞嗖ㄠ硩_嗖溹硜嗖侧硢喑朹嗖嗋矖嗖膏硩嗖熰硩_嗖膏硢嗖硩嗖熰硢嗖俖嗖呧矔喑嵿矡喑嗋硞喑昣嗖ㄠ驳喑嗋矀_嗖∴部嗖膏硢嗖�'.split('_'),
        monthsParseExact: true,
        weekdays : '嗖簿嗖ㄠ硜嗖掂簿嗖癬嗖膏硢喑傕硶嗖驳嗖距舶_嗖矀嗖椸渤嗖掂簿嗖癬嗖硜嗖о驳嗖距舶_嗖椸硜嗖班硜嗖掂簿嗖癬嗖多硜嗖曕硩嗖班驳嗖距舶_嗖多波嗖苦驳嗖距舶'.split('_'),
        weekdaysShort : '嗖簿嗖ㄠ硜_嗖膏硢喑傕硶嗖甠嗖矀嗖椸渤_嗖硜嗖嗖椸硜嗖班硜_嗖多硜嗖曕硩嗖癬嗖多波嗖�'.split('_'),
        weekdaysMin : '嗖簿_嗖膏硢喑傕硶_嗖矀_嗖硜_嗖椸硜_嗖多硜_嗖�'.split('_'),
        longDateFormat : {
            LT : 'A h:mm',
            LTS : 'A h:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm',
            LLLL : 'dddd, D MMMM YYYY, A h:mm'
        },
        calendar : {
            sameDay : '[嗖囙矀嗖︵硜] LT',
            nextDay : '[嗖ㄠ簿嗖赤硢] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[嗖ㄠ部嗖ㄠ硩嗖ㄠ硢] LT',
            lastWeek : '[嗖曕硢喑傕波喑嗋帛] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s 嗖ㄠ矀嗖む舶',
            past : '%s 嗖灌部嗖傕拨喑�',
            s : '嗖曕硢嗖侧驳喑� 嗖曕硩嗖粪玻嗖椸渤喑�',
            ss : '%d 嗖膏硢嗖曕硢嗖傕病喑佮矖嗖赤硜',
            m : '嗖掄矀嗖︵硜 嗖ㄠ部嗖部嗖�',
            mm : '%d 嗖ㄠ部嗖部嗖�',
            h : '嗖掄矀嗖︵硜 嗖椸矀嗖熰硢',
            hh : '%d 嗖椸矀嗖熰硢',
            d : '嗖掄矀嗖︵硜 嗖︵部嗖�',
            dd : '%d 嗖︵部嗖�',
            M : '嗖掄矀嗖︵硜 嗖む部嗖傕矖嗖赤硜',
            MM : '%d 嗖む部嗖傕矖嗖赤硜',
            y : '嗖掄矀嗖︵硜 嗖掂舶喑嵿卜',
            yy : '%d 嗖掂舶喑嵿卜'
        },
        preparse: function (string) {
            return string.replace(/[喑о敞喑┼唱喑超喑钞喑肠]/g, function (match) {
                return numberMap$8[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap$9[match];
            });
        },
        meridiemParse: /嗖班簿嗖む硩嗖班部|嗖硢嗖赤部嗖椸硩嗖椸硢|嗖钵喑嵿帛嗖距补喑嵿波|嗖膏矀嗖溹硢/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '嗖班簿嗖む硩嗖班部') {
                return hour &lt; 4 ? hour : hour + 12;
            } else if (meridiem === '嗖硢嗖赤部嗖椸硩嗖椸硢') {
                return hour;
            } else if (meridiem === '嗖钵喑嵿帛嗖距补喑嵿波') {
                return hour &gt;= 10 ? hour : hour + 12;
            } else if (meridiem === '嗖膏矀嗖溹硢') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 4) {
                return '嗖班簿嗖む硩嗖班部';
            } else if (hour &lt; 10) {
                return '嗖硢嗖赤部嗖椸硩嗖椸硢';
            } else if (hour &lt; 17) {
                return '嗖钵喑嵿帛嗖距补喑嵿波';
            } else if (hour &lt; 20) {
                return '嗖膏矀嗖溹硢';
            } else {
                return '嗖班簿嗖む硩嗖班部';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}(嗖ㄠ硢喑�)/,
        ordinal : function (number) {
            return number + '嗖ㄠ硢喑�';
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('ko', {
        months : '1鞗擾2鞗擾3鞗擾4鞗擾5鞗擾6鞗擾7鞗擾8鞗擾9鞗擾10鞗擾11鞗擾12鞗�'.split('_'),
        monthsShort : '1鞗擾2鞗擾3鞗擾4鞗擾5鞗擾6鞗擾7鞗擾8鞗擾9鞗擾10鞗擾11鞗擾12鞗�'.split('_'),
        weekdays : '鞚检殧鞚糭鞗旍殧鞚糭頇旍殧鞚糭靾橃殧鞚糭氇╈殧鞚糭旮堨殧鞚糭韱犾殧鞚�'.split('_'),
        weekdaysShort : '鞚糭鞗擾頇擾靾榑氇旮坃韱�'.split('_'),
        weekdaysMin : '鞚糭鞗擾頇擾靾榑氇旮坃韱�'.split('_'),
        longDateFormat : {
            LT : 'A h:mm',
            LTS : 'A h:mm:ss',
            L : 'YYYY.MM.DD.',
            LL : 'YYYY雲� MMMM D鞚�',
            LLL : 'YYYY雲� MMMM D鞚� A h:mm',
            LLLL : 'YYYY雲� MMMM D鞚� dddd A h:mm',
            l : 'YYYY.MM.DD.',
            ll : 'YYYY雲� MMMM D鞚�',
            lll : 'YYYY雲� MMMM D鞚� A h:mm',
            llll : 'YYYY雲� MMMM D鞚� dddd A h:mm'
        },
        calendar : {
            sameDay : '鞓る姌 LT',
            nextDay : '雮挫澕 LT',
            nextWeek : 'dddd LT',
            lastDay : '鞏挫牅 LT',
            lastWeek : '歆€雮滌＜ dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s 頉�',
            past : '%s 鞝�',
            s : '氇� 齑�',
            ss : '%d齑�',
            m : '1攵�',
            mm : '%d攵�',
            h : '頃� 鞁滉皠',
            hh : '%d鞁滉皠',
            d : '頃橂（',
            dd : '%d鞚�',
            M : '頃� 雼�',
            MM : '%d雼�',
            y : '鞚� 雲�',
            yy : '%d雲�'
        },
        dayOfMonthOrdinalParse : /\d{1,2}(鞚紎鞗攟欤�)/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '鞚�';
                case 'M':
                    return number + '鞗�';
                case 'w':
                case 'W':
                    return number + '欤�';
                default:
                    return number;
            }
        },
        meridiemParse : /鞓れ爠|鞓ろ泟/,
        isPM : function (token) {
            return token === '鞓ろ泟';
        },
        meridiem : function (hour, minute, isUpper) {
            return hour &lt; 12 ? '鞓れ爠' : '鞓ろ泟';
        }
    });

    //! moment.js locale configuration

    var symbolMap$a = {
        '1': '佟',
        '2': '佗',
        '3': '伲',
        '4': '伽',
        '5': '佶',
        '6': '佴',
        '7': '侑',
        '8': '侉',
        '9': '侃',
        '0': '贍'
    }, numberMap$9 = {
        '佟': '1',
        '佗': '2',
        '伲': '3',
        '伽': '4',
        '佶': '5',
        '佴': '6',
        '侑': '7',
        '侉': '8',
        '侃': '9',
        '贍': '0'
    },
    months$7 = [
        '讴丕賳賵賳蹖 丿賵賵蹠賲',
        '卮賵亘丕鬲',
        '卅丕夭丕乇',
        '賳蹖爻丕賳',
        '卅丕蹖丕乇',
        '丨賵夭蹠蹖乇丕賳',
        '鬲蹠賲賲賵夭',
        '卅丕亘',
        '卅蹠蹖賱賵賵賱',
        '鬲卮乇蹖賳蹖 蹖蹠賰蹠賲',
        '鬲卮乇蹖賳蹖 丿賵賵蹠賲',
        '賰丕賳賵賳蹖 蹖蹠讴蹠賲'
    ];


    hooks.defineLocale('ku', {
        months : months$7,
        monthsShort : months$7,
        weekdays : '蹖賴鈥屬冐促団€屬呝呝団€宊丿賵賵卮賴鈥屬呝呝団€宊爻蹘卮賴鈥屬呝呝団€宊趩賵丕乇卮賴鈥屬呝呝団€宊倬蹘賳噩卮賴鈥屬呝呝団€宊賴賴鈥屰屬嗃宊卮賴鈥屬呝呝団€�'.split('_'),
        weekdaysShort : '蹖賴鈥屬冐促団€屬卂丿賵賵卮賴鈥屬卂爻蹘卮賴鈥屬卂趩賵丕乇卮賴鈥屬卂倬蹘賳噩卮賴鈥屬卂賴賴鈥屰屬嗃宊卮賴鈥屬呝呝団€�'.split('_'),
        weekdaysMin : '蹖_丿_爻_趩_倬_賴_卮'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        meridiemParse: /卅蹘賵丕乇賴鈥寍亘賴鈥屰屫з嗃�/,
        isPM: function (input) {
            return /卅蹘賵丕乇賴鈥�/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 12) {
                return '亘賴鈥屰屫з嗃�';
            } else {
                return '卅蹘賵丕乇賴鈥�';
            }
        },
        calendar : {
            sameDay : '[卅賴鈥屬呚臂� 賰丕鬲跇賲蹘乇] LT',
            nextDay : '[亘賴鈥屰屫з嗃� 賰丕鬲跇賲蹘乇] LT',
            nextWeek : 'dddd [賰丕鬲跇賲蹘乇] LT',
            lastDay : '[丿賵蹘賳蹘 賰丕鬲跇賲蹘乇] LT',
            lastWeek : 'dddd [賰丕鬲跇賲蹘乇] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '賱賴鈥� %s',
            past : '%s',
            s : '趩賴鈥屬嗀� 趩乇賰賴鈥屰屬団€屬�',
            ss : '趩乇賰賴鈥� %d',
            m : '蹖賴鈥屬� 禺賵賱賴鈥屬�',
            mm : '%d 禺賵賱賴鈥屬�',
            h : '蹖賴鈥屬� 賰丕鬲跇賲蹘乇',
            hh : '%d 賰丕鬲跇賲蹘乇',
            d : '蹖賴鈥屬� 跁蹎跇',
            dd : '%d 跁蹎跇',
            M : '蹖賴鈥屬� 賲丕賳诏',
            MM : '%d 賲丕賳诏',
            y : '蹖賴鈥屬� 爻丕诘',
            yy : '%d 爻丕诘'
        },
        preparse: function (string) {
            return string.replace(/[佟佗伲伽佶佴侑侉侃贍]/g, function (match) {
                return numberMap$9[match];
            }).replace(/貙/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap$a[match];
            }).replace(/,/g, '貙');
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12 // The week that contains Jan 12th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var suffixes$2 = {
        0: '-褔爷',
        1: '-褔懈',
        2: '-褔懈',
        3: '-褔爷',
        4: '-褔爷',
        5: '-褔懈',
        6: '-褔褘',
        7: '-褔懈',
        8: '-褔懈',
        9: '-褔褍',
        10: '-褔褍',
        20: '-褔褘',
        30: '-褔褍',
        40: '-褔褘',
        50: '-褔爷',
        60: '-褔褘',
        70: '-褔懈',
        80: '-褔懈',
        90: '-褔褍',
        100: '-褔爷'
    };

    hooks.defineLocale('ky', {
        months : '褟薪胁邪褉褜_褎械胁褉邪谢褜_屑邪褉褌_邪锌褉械谢褜_屑邪泄_懈褞薪褜_懈褞谢褜_邪胁谐褍褋褌_褋械薪褌褟斜褉褜_芯泻褌褟斜褉褜_薪芯褟斜褉褜_写械泻邪斜褉褜'.split('_'),
        monthsShort : '褟薪胁_褎械胁_屑邪褉褌_邪锌褉_屑邪泄_懈褞薪褜_懈褞谢褜_邪胁谐_褋械薪_芯泻褌_薪芯褟_写械泻'.split('_'),
        weekdays : '袞械泻褕械屑斜懈_袛爷泄褕萤屑斜爷_楔械泄褕械屑斜懈_楔邪褉褕械屑斜懈_袘械泄褕械屑斜懈_袞褍屑邪_袠褕械屑斜懈'.split('_'),
        weekdaysShort : '袞械泻_袛爷泄_楔械泄_楔邪褉_袘械泄_袞褍屑_袠褕械'.split('_'),
        weekdaysMin : '袞泻_袛泄_楔泄_楔褉_袘泄_袞屑_袠褕'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[袘爷谐爷薪 褋邪邪褌] LT',
            nextDay : '[协褉褌械遥 褋邪邪褌] LT',
            nextWeek : 'dddd [褋邪邪褌] LT',
            lastDay : '[袣械褔褝褝 褋邪邪褌] LT',
            lastWeek : '[莹褌泻萤薪 邪锌褌邪薪褘薪] dddd [泻爷薪爷] [褋邪邪褌] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s 懈褔懈薪写械',
            past : '%s 屑褍褉褍薪',
            s : '斜懈褉薪械褔械 褋械泻褍薪写',
            ss : '%d 褋械泻褍薪写',
            m : '斜懈褉 屑爷薪萤褌',
            mm : '%d 屑爷薪萤褌',
            h : '斜懈褉 褋邪邪褌',
            hh : '%d 褋邪邪褌',
            d : '斜懈褉 泻爷薪',
            dd : '%d 泻爷薪',
            M : '斜懈褉 邪泄',
            MM : '%d 邪泄',
            y : '斜懈褉 卸褘谢',
            yy : '%d 卸褘谢'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(褔懈|褔褘|褔爷|褔褍)/,
        ordinal : function (number) {
            var a = number % 10,
                b = number &gt;= 100 ? 100 : null;
            return number + (suffixes$2[number] || suffixes$2[a] || suffixes$2[b]);
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    function processRelativeTime$5(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eng Minutt', 'enger Minutt'],
            'h': ['eng Stonn', 'enger Stonn'],
            'd': ['een Dag', 'engem Dag'],
            'M': ['ee Mount', 'engem Mount'],
            'y': ['ee Joer', 'engem Joer']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }
    function processFutureTime(string) {
        var number = string.substr(0, string.indexOf(' '));
        if (eifelerRegelAppliesToNumber(number)) {
            return 'a ' + string;
        }
        return 'an ' + string;
    }
    function processPastTime(string) {
        var number = string.substr(0, string.indexOf(' '));
        if (eifelerRegelAppliesToNumber(number)) {
            return 'viru ' + string;
        }
        return 'virun ' + string;
    }
    /**
     * Returns true if the word before the given number loses the '-n' ending.
     * e.g. 'an 10 Deeg' but 'a 5 Deeg'
     *
     * @param number {integer}
     * @returns {boolean}
     */
    function eifelerRegelAppliesToNumber(number) {
        number = parseInt(number, 10);
        if (isNaN(number)) {
            return false;
        }
        if (number &lt; 0) {
            // Negative Number --&gt; always true
            return true;
        } else if (number &lt; 10) {
            // Only 1 digit
            if (4 &lt;= number &amp;&amp; number &lt;= 7) {
                return true;
            }
            return false;
        } else if (number &lt; 100) {
            // 2 digits
            var lastDigit = number % 10, firstDigit = number / 10;
            if (lastDigit === 0) {
                return eifelerRegelAppliesToNumber(firstDigit);
            }
            return eifelerRegelAppliesToNumber(lastDigit);
        } else if (number &lt; 10000) {
            // 3 or 4 digits --&gt; recursively check first digit
            while (number &gt;= 10) {
                number = number / 10;
            }
            return eifelerRegelAppliesToNumber(number);
        } else {
            // Anything larger than 4 digits: recursively check first n-3 digits
            number = number / 1000;
            return eifelerRegelAppliesToNumber(number);
        }
    }

    hooks.defineLocale('lb', {
        months: 'Januar_Februar_M盲erz_Abr毛ll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
        monthsParseExact : true,
        weekdays: 'Sonndeg_M茅indeg_D毛nschdeg_M毛ttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
        weekdaysShort: 'So._M茅._D毛._M毛._Do._Fr._Sa.'.split('_'),
        weekdaysMin: 'So_M茅_D毛_M毛_Do_Fr_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat: {
            LT: 'H:mm [Auer]',
            LTS: 'H:mm:ss [Auer]',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm [Auer]',
            LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
        },
        calendar: {
            sameDay: '[Haut um] LT',
            sameElse: 'L',
            nextDay: '[Muer um] LT',
            nextWeek: 'dddd [um] LT',
            lastDay: '[G毛schter um] LT',
            lastWeek: function () {
                // Different date string for 'D毛nschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
                switch (this.day()) {
                    case 2:
                    case 4:
                        return '[Leschten] dddd [um] LT';
                    default:
                        return '[Leschte] dddd [um] LT';
                }
            }
        },
        relativeTime : {
            future : processFutureTime,
            past : processPastTime,
            s : 'e puer Sekonnen',
            ss : '%d Sekonnen',
            m : processRelativeTime$5,
            mm : '%d Minutten',
            h : processRelativeTime$5,
            hh : '%d Stonnen',
            d : processRelativeTime$5,
            dd : '%d Deeg',
            M : processRelativeTime$5,
            MM : '%d M茅int',
            y : processRelativeTime$5,
            yy : '%d Joer'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('lo', {
        months : '嗪∴罕嗪囙簛嗪簷_嗪佮焊嗪∴簽嗪瞋嗪∴旱嗪權翰_嗷€嗪∴邯嗪瞋嗪炧憾嗪斷邯嗪班簽嗪瞋嗪∴捍嗪栢焊嗪權翰_嗪佮粛嗪ム喊嗪佮夯嗪擾嗪捍嗪囙韩嗪瞋嗪佮罕嗪權簫嗪瞋嗪曕焊嗪ム翰_嗪炧喊嗪堗捍嗪乢嗪椸罕嗪權骇嗪�'.split('_'),
        monthsShort : '嗪∴罕嗪囙簛嗪簷_嗪佮焊嗪∴簽嗪瞋嗪∴旱嗪權翰_嗷€嗪∴邯嗪瞋嗪炧憾嗪斷邯嗪班簽嗪瞋嗪∴捍嗪栢焊嗪權翰_嗪佮粛嗪ム喊嗪佮夯嗪擾嗪捍嗪囙韩嗪瞋嗪佮罕嗪權簫嗪瞋嗪曕焊嗪ム翰_嗪炧喊嗪堗捍嗪乢嗪椸罕嗪權骇嗪�'.split('_'),
        weekdays : '嗪翰嗪椸捍嗪擾嗪堗罕嗪檁嗪罕嗪囙簞嗪侧簷_嗪炧焊嗪擾嗪炧喊嗪罕嗪擾嗪焊嗪乢嗷€嗪夯嗪�'.split('_'),
        weekdaysShort : '嗪椸捍嗪擾嗪堗罕嗪檁嗪罕嗪囙簞嗪侧簷_嗪炧焊嗪擾嗪炧喊嗪罕嗪擾嗪焊嗪乢嗷€嗪夯嗪�'.split('_'),
        weekdaysMin : '嗪梍嗪坃嗪簞_嗪瀇嗪炧韩_嗪簛_嗪�'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : '嗪о罕嗪檇ddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /嗪曕涵嗪權粈嗪娻夯嗷夃翰|嗪曕涵嗪權粊嗪ム簢/,
        isPM: function (input) {
            return input === '嗪曕涵嗪權粊嗪ム簢';
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 12) {
                return '嗪曕涵嗪權粈嗪娻夯嗷夃翰';
            } else {
                return '嗪曕涵嗪權粊嗪ム簢';
            }
        },
        calendar : {
            sameDay : '[嗪∴悍嗷夃簷嗪掂粔嗷€嗪о亥嗪瞉 LT',
            nextDay : '[嗪∴悍嗷夃涵嗪粪粓嗪權粈嗪о亥嗪瞉 LT',
            nextWeek : '[嗪о罕嗪橾dddd[嗷溹粔嗪侧粈嗪о亥嗪瞉 LT',
            lastDay : '[嗪∴悍嗷夃骇嗪侧簷嗪權旱嗷夃粈嗪о亥嗪瞉 LT',
            lastWeek : '[嗪о罕嗪橾dddd[嗷佮亥嗷夃骇嗪權旱嗷夃粈嗪о亥嗪瞉 LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '嗪旱嗪� %s',
            past : '%s嗪溹粓嗪侧簷嗪∴翰',
            s : '嗪氞粛嗷堗粈嗪椸夯嗷堗翰嗷冟簲嗪о捍嗪權翰嗪椸旱',
            ss : '%d 嗪о捍嗪權翰嗪椸旱' ,
            m : '1 嗪權翰嗪椸旱',
            mm : '%d 嗪權翰嗪椸旱',
            h : '1 嗪娻夯嗷堗骇嗷傕骸嗪�',
            hh : '%d 嗪娻夯嗷堗骇嗷傕骸嗪�',
            d : '1 嗪∴悍嗷�',
            dd : '%d 嗪∴悍嗷�',
            M : '1 嗷€嗪斷悍嗪簷',
            MM : '%d 嗷€嗪斷悍嗪簷',
            y : '1 嗪涏旱',
            yy : '%d 嗪涏旱'
        },
        dayOfMonthOrdinalParse: /(嗪椸旱嗷�)\d{1,2}/,
        ordinal : function (number) {
            return '嗪椸旱嗷�' + number;
        }
    });

    //! moment.js locale configuration

    var units = {
        'ss' : 'sekund臈_sekund啪i懦_sekundes',
        'm' : 'minut臈_minut臈s_minut臋',
        'mm': 'minut臈s_minu膷i懦_minutes',
        'h' : 'valanda_valandos_valand膮',
        'hh': 'valandos_valand懦_valandas',
        'd' : 'diena_dienos_dien膮',
        'dd': 'dienos_dien懦_dienas',
        'M' : 'm臈nuo_m臈nesio_m臈nes寞',
        'MM': 'm臈nesiai_m臈nesi懦_m臈nesius',
        'y' : 'metai_met懦_metus',
        'yy': 'metai_met懦_metus'
    };
    function translateSeconds(number, withoutSuffix, key, isFuture) {
        if (withoutSuffix) {
            return 'kelios sekund臈s';
        } else {
            return isFuture ? 'keli懦 sekund啪i懦' : 'kelias sekundes';
        }
    }
    function translateSingular(number, withoutSuffix, key, isFuture) {
        return withoutSuffix ? forms(key)[0] : (isFuture ? forms(key)[1] : forms(key)[2]);
    }
    function special(number) {
        return number % 10 === 0 || (number &gt; 10 &amp;&amp; number &lt; 20);
    }
    function forms(key) {
        return units[key].split('_');
    }
    function translate$6(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        if (number === 1) {
            return result + translateSingular(number, withoutSuffix, key[0], isFuture);
        } else if (withoutSuffix) {
            return result + (special(number) ? forms(key)[1] : forms(key)[0]);
        } else {
            if (isFuture) {
                return result + forms(key)[1];
            } else {
                return result + (special(number) ? forms(key)[1] : forms(key)[2]);
            }
        }
    }
    hooks.defineLocale('lt', {
        months : {
            format: 'sausio_vasario_kovo_baland啪io_gegu啪臈s_bir啪elio_liepos_rugpj奴膷io_rugs臈jo_spalio_lapkri膷io_gruod啪io'.split('_'),
            standalone: 'sausis_vasaris_kovas_balandis_gegu啪臈_bir啪elis_liepa_rugpj奴tis_rugs臈jis_spalis_lapkritis_gruodis'.split('_'),
            isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
        },
        monthsShort : 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
        weekdays : {
            format: 'sekmadien寞_pirmadien寞_antradien寞_tre膷iadien寞_ketvirtadien寞_penktadien寞_拧e拧tadien寞'.split('_'),
            standalone: 'sekmadienis_pirmadienis_antradienis_tre膷iadienis_ketvirtadienis_penktadienis_拧e拧tadienis'.split('_'),
            isFormat: /dddd HH:mm/
        },
        weekdaysShort : 'Sek_Pir_Ant_Tre_Ket_Pen_艩e拧'.split('_'),
        weekdaysMin : 'S_P_A_T_K_Pn_艩'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'YYYY [m.] MMMM D [d.]',
            LLL : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
            LLLL : 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
            l : 'YYYY-MM-DD',
            ll : 'YYYY [m.] MMMM D [d.]',
            lll : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
            llll : 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
        },
        calendar : {
            sameDay : '[艩iandien] LT',
            nextDay : '[Rytoj] LT',
            nextWeek : 'dddd LT',
            lastDay : '[Vakar] LT',
            lastWeek : '[Pra臈jus寞] dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'po %s',
            past : 'prie拧 %s',
            s : translateSeconds,
            ss : translate$6,
            m : translateSingular,
            mm : translate$6,
            h : translateSingular,
            hh : translate$6,
            d : translateSingular,
            dd : translate$6,
            M : translateSingular,
            MM : translate$6,
            y : translateSingular,
            yy : translate$6
        },
        dayOfMonthOrdinalParse: /\d{1,2}-oji/,
        ordinal : function (number) {
            return number + '-oji';
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var units$1 = {
        'ss': 'sekundes_sekund膿m_sekunde_sekundes'.split('_'),
        'm': 'min奴tes_min奴t膿m_min奴te_min奴tes'.split('_'),
        'mm': 'min奴tes_min奴t膿m_min奴te_min奴tes'.split('_'),
        'h': 'stundas_stund膩m_stunda_stundas'.split('_'),
        'hh': 'stundas_stund膩m_stunda_stundas'.split('_'),
        'd': 'dienas_dien膩m_diena_dienas'.split('_'),
        'dd': 'dienas_dien膩m_diena_dienas'.split('_'),
        'M': 'm膿ne拧a_m膿ne拧iem_m膿nesis_m膿ne拧i'.split('_'),
        'MM': 'm膿ne拧a_m膿ne拧iem_m膿nesis_m膿ne拧i'.split('_'),
        'y': 'gada_gadiem_gads_gadi'.split('_'),
        'yy': 'gada_gadiem_gads_gadi'.split('_')
    };
    /**
     * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
     */
    function format$1(forms, number, withoutSuffix) {
        if (withoutSuffix) {
            // E.g. "21 min奴te", "3 min奴tes".
            return number % 10 === 1 &amp;&amp; number % 100 !== 11 ? forms[2] : forms[3];
        } else {
            // E.g. "21 min奴tes" as in "p膿c 21 min奴tes".
            // E.g. "3 min奴t膿m" as in "p膿c 3 min奴t膿m".
            return number % 10 === 1 &amp;&amp; number % 100 !== 11 ? forms[0] : forms[1];
        }
    }
    function relativeTimeWithPlural$1(number, withoutSuffix, key) {
        return number + ' ' + format$1(units$1[key], number, withoutSuffix);
    }
    function relativeTimeWithSingular(number, withoutSuffix, key) {
        return format$1(units$1[key], number, withoutSuffix);
    }
    function relativeSeconds(number, withoutSuffix) {
        return withoutSuffix ? 'da啪as sekundes' : 'da啪膩m sekund膿m';
    }

    hooks.defineLocale('lv', {
        months : 'janv膩ris_febru膩ris_marts_apr墨lis_maijs_j奴nijs_j奴lijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
        monthsShort : 'jan_feb_mar_apr_mai_j奴n_j奴l_aug_sep_okt_nov_dec'.split('_'),
        weekdays : 'sv膿tdiena_pirmdiena_otrdiena_tre拧diena_ceturtdiena_piektdiena_sestdiena'.split('_'),
        weekdaysShort : 'Sv_P_O_T_C_Pk_S'.split('_'),
        weekdaysMin : 'Sv_P_O_T_C_Pk_S'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY.',
            LL : 'YYYY. [gada] D. MMMM',
            LLL : 'YYYY. [gada] D. MMMM, HH:mm',
            LLLL : 'YYYY. [gada] D. MMMM, dddd, HH:mm'
        },
        calendar : {
            sameDay : '[艩odien pulksten] LT',
            nextDay : '[R墨t pulksten] LT',
            nextWeek : 'dddd [pulksten] LT',
            lastDay : '[Vakar pulksten] LT',
            lastWeek : '[Pag膩ju拧膩] dddd [pulksten] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'p膿c %s',
            past : 'pirms %s',
            s : relativeSeconds,
            ss : relativeTimeWithPlural$1,
            m : relativeTimeWithSingular,
            mm : relativeTimeWithPlural$1,
            h : relativeTimeWithSingular,
            hh : relativeTimeWithPlural$1,
            d : relativeTimeWithSingular,
            dd : relativeTimeWithPlural$1,
            M : relativeTimeWithSingular,
            MM : relativeTimeWithPlural$1,
            y : relativeTimeWithSingular,
            yy : relativeTimeWithPlural$1
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var translator = {
        words: { //Different grammatical cases
            ss: ['sekund', 'sekunda', 'sekundi'],
            m: ['jedan minut', 'jednog minuta'],
            mm: ['minut', 'minuta', 'minuta'],
            h: ['jedan sat', 'jednog sata'],
            hh: ['sat', 'sata', 'sati'],
            dd: ['dan', 'dana', 'dana'],
            MM: ['mjesec', 'mjeseca', 'mjeseci'],
            yy: ['godina', 'godine', 'godina']
        },
        correctGrammaticalCase: function (number, wordKey) {
            return number === 1 ? wordKey[0] : (number &gt;= 2 &amp;&amp; number &lt;= 4 ? wordKey[1] : wordKey[2]);
        },
        translate: function (number, withoutSuffix, key) {
            var wordKey = translator.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    hooks.defineLocale('me', {
        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
        monthsParseExact : true,
        weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_膷etvrtak_petak_subota'.split('_'),
        weekdaysShort: 'ned._pon._uto._sri._膷et._pet._sub.'.split('_'),
        weekdaysMin: 'ne_po_ut_sr_膷e_pe_su'.split('_'),
        weekdaysParseExact : true,
        longDateFormat: {
            LT: 'H:mm',
            LTS : 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[danas u] LT',
            nextDay: '[sjutra u] LT',

            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedjelju] [u] LT';
                    case 3:
                        return '[u] [srijedu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay  : '[ju膷e u] LT',
            lastWeek : function () {
                var lastWeekDays = [
                    '[pro拧le] [nedjelje] [u] LT',
                    '[pro拧log] [ponedjeljka] [u] LT',
                    '[pro拧log] [utorka] [u] LT',
                    '[pro拧le] [srijede] [u] LT',
                    '[pro拧log] [膷etvrtka] [u] LT',
                    '[pro拧log] [petka] [u] LT',
                    '[pro拧le] [subote] [u] LT'
                ];
                return lastWeekDays[this.day()];
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'za %s',
            past   : 'prije %s',
            s      : 'nekoliko sekundi',
            ss     : translator.translate,
            m      : translator.translate,
            mm     : translator.translate,
            h      : translator.translate,
            hh     : translator.translate,
            d      : 'dan',
            dd     : translator.translate,
            M      : 'mjesec',
            MM     : translator.translate,
            y      : 'godinu',
            yy     : translator.translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('mi', {
        months: 'Kohi-t膩te_Hui-tanguru_Pout奴-te-rangi_Paenga-wh膩wh膩_Haratua_Pipiri_H艒ngoingoi_Here-turi-k艒k膩_Mahuru_Whiringa-膩-nuku_Whiringa-膩-rangi_Hakihea'.split('_'),
        monthsShort: 'Kohi_Hui_Pou_Pae_Hara_Pipi_H艒ngoi_Here_Mahu_Whi-nu_Whi-ra_Haki'.split('_'),
        monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
        weekdays: 'R膩tapu_Mane_T奴rei_Wenerei_T膩ite_Paraire_H膩tarei'.split('_'),
        weekdaysShort: 'Ta_Ma_T奴_We_T膩i_Pa_H膩'.split('_'),
        weekdaysMin: 'Ta_Ma_T奴_We_T膩i_Pa_H膩'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY [i] HH:mm',
            LLLL: 'dddd, D MMMM YYYY [i] HH:mm'
        },
        calendar: {
            sameDay: '[i teie mahana, i] LT',
            nextDay: '[apopo i] LT',
            nextWeek: 'dddd [i] LT',
            lastDay: '[inanahi i] LT',
            lastWeek: 'dddd [whakamutunga i] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'i roto i %s',
            past: '%s i mua',
            s: 'te h膿kona ruarua',
            ss: '%d h膿kona',
            m: 'he meneti',
            mm: '%d meneti',
            h: 'te haora',
            hh: '%d haora',
            d: 'he ra',
            dd: '%d ra',
            M: 'he marama',
            MM: '%d marama',
            y: 'he tau',
            yy: '%d tau'
        },
        dayOfMonthOrdinalParse: /\d{1,2}潞/,
        ordinal: '%d潞',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('mk', {
        months : '褬邪薪褍邪褉懈_褎械胁褉褍邪褉懈_屑邪褉褌_邪锌褉懈谢_屑邪褬_褬褍薪懈_褬褍谢懈_邪胁谐褍褋褌_褋械锌褌械屑胁褉懈_芯泻褌芯屑胁褉懈_薪芯械屑胁褉懈_写械泻械屑胁褉懈'.split('_'),
        monthsShort : '褬邪薪_褎械胁_屑邪褉_邪锌褉_屑邪褬_褬褍薪_褬褍谢_邪胁谐_褋械锌_芯泻褌_薪芯械_写械泻'.split('_'),
        weekdays : '薪械写械谢邪_锌芯薪械写械谢薪懈泻_胁褌芯褉薪懈泻_褋褉械写邪_褔械褌胁褉褌芯泻_锌械褌芯泻_褋邪斜芯褌邪'.split('_'),
        weekdaysShort : '薪械写_锌芯薪_胁褌芯_褋褉械_褔械褌_锌械褌_褋邪斜'.split('_'),
        weekdaysMin : '薪e_锌o_胁褌_褋褉_褔械_锌械_褋a'.split('_'),
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'D.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY H:mm',
            LLLL : 'dddd, D MMMM YYYY H:mm'
        },
        calendar : {
            sameDay : '[袛械薪械褋 胁芯] LT',
            nextDay : '[校褌褉械 胁芯] LT',
            nextWeek : '[袙芯] dddd [胁芯] LT',
            lastDay : '[袙褔械褉邪 胁芯] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return '[袠蟹屑懈薪邪褌邪褌邪] dddd [胁芯] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[袠蟹屑懈薪邪褌懈芯褌] dddd [胁芯] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : '锌芯褋谢械 %s',
            past : '锌褉械写 %s',
            s : '薪械泻芯谢泻褍 褋械泻褍薪写懈',
            ss : '%d 褋械泻褍薪写懈',
            m : '屑懈薪褍褌邪',
            mm : '%d 屑懈薪褍褌懈',
            h : '褔邪褋',
            hh : '%d 褔邪褋邪',
            d : '写械薪',
            dd : '%d 写械薪邪',
            M : '屑械褋械褑',
            MM : '%d 屑械褋械褑懈',
            y : '谐芯写懈薪邪',
            yy : '%d 谐芯写懈薪懈'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(械胁|械薪|褌懈|胁懈|褉懈|屑懈)/,
        ordinal : function (number) {
            var lastDigit = number % 10,
                last2Digits = number % 100;
            if (number === 0) {
                return number + '-械胁';
            } else if (last2Digits === 0) {
                return number + '-械薪';
            } else if (last2Digits &gt; 10 &amp;&amp; last2Digits &lt; 20) {
                return number + '-褌懈';
            } else if (lastDigit === 1) {
                return number + '-胁懈';
            } else if (lastDigit === 2) {
                return number + '-褉懈';
            } else if (lastDigit === 7 || lastDigit === 8) {
                return number + '-屑懈';
            } else {
                return number + '-褌懈';
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('ml', {
        months : '啻溹川嗟佮吹啻班纯_啻祮啻祶啻班祦啻掂窗啻縚啻淳嗟监礆嗟嵿礆嗟峗啻忇椽嗟嵿窗啻苦到_啻祰啻祶_啻溹祩嗟篲啻溹祩啻侧祱_啻撪礂啻膏祶啻编祶啻编祶_啻膏祮啻祶啻编祶啻编磦啻导_啻掄磿嗟嵿礋嗟嬥船嗟糭啻ㄠ吹啻傕船嗟糭啻∴纯啻膏磦啻导'.split('_'),
        monthsShort : '啻溹川嗟�._啻祮啻祶啻班祦._啻淳嗟�._啻忇椽嗟嵿窗啻�._啻祰啻祶_啻溹祩嗟篲啻溹祩啻侧祱._啻撪礂._啻膏祮啻祶啻编祶啻�._啻掄磿嗟嵿礋嗟�._啻ㄠ吹啻�._啻∴纯啻膏磦.'.split('_'),
        monthsParseExact : true,
        weekdays : '啻炧淳啻幢啻距创嗟嵿礆_啻む纯啻權祶啻曕闯啻距创嗟嵿礆_啻氞祳啻掂祶啻掂淳啻脆祶啻歘啻祦啻о川啻距创嗟嵿礆_啻掂祶啻淳啻脆淳啻脆祶啻歘啻掂祮啻赤祶啻赤纯啻淳啻脆祶啻歘啻多川啻苦疮啻距创嗟嵿礆'.split('_'),
        weekdaysShort : '啻炧淳啻导_啻む纯啻權祶啻曕稻_啻氞祳啻掂祶啻礯啻祦啻о祷_啻掂祶啻淳啻脆磦_啻掂祮啻赤祶啻赤纯_啻多川啻�'.split('_'),
        weekdaysMin : '啻炧淳_啻む纯_啻氞祳_啻祦_啻掂祶啻淳_啻掂祮_啻�'.split('_'),
        longDateFormat : {
            LT : 'A h:mm -啻ㄠ祦',
            LTS : 'A h:mm:ss -啻ㄠ祦',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm -啻ㄠ祦',
            LLLL : 'dddd, D MMMM YYYY, A h:mm -啻ㄠ祦'
        },
        calendar : {
            sameDay : '[啻囙川嗟嵿川嗟峕 LT',
            nextDay : '[啻ㄠ淳啻赤祮] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[啻囙川嗟嵿川啻侧祮] LT',
            lastWeek : '[啻曕创啻苦礊嗟嵿礊] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s 啻曕创啻苦礊嗟嵿礊嗟�',
            past : '%s 啻祦嗟秽椽嗟�',
            s : '啻呧到啻� 啻ㄠ纯啻纯啻粪礄嗟嵿礄嗟�',
            ss : '%d 啻膏祮啻曕祶啻曕祷啻∴祶',
            m : '啻掄窗嗟� 啻纯啻ㄠ纯啻编祶啻编祶',
            mm : '%d 啻纯啻ㄠ纯啻编祶啻编祶',
            h : '啻掄窗嗟� 啻矗啻苦磿嗟嵿磿嗟傕导',
            hh : '%d 啻矗啻苦磿嗟嵿磿嗟傕导',
            d : '啻掄窗嗟� 啻︵纯啻掂锤啻�',
            dd : '%d 啻︵纯啻掂锤啻�',
            M : '啻掄窗嗟� 啻淳啻膏磦',
            MM : '%d 啻淳啻膏磦',
            y : '啻掄窗嗟� 啻掂导啻粪磦',
            yy : '%d 啻掂导啻粪磦'
        },
        meridiemParse: /啻班淳啻む祶啻班纯|啻班淳啻掂纯啻侧祮|啻夃礆嗟嵿礆 啻曕创啻苦礊嗟嵿礊嗟峾啻掂祱啻曕祦啻ㄠ祶啻ㄠ祰啻班磦|啻班淳啻む祶啻班纯/i,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if ((meridiem === '啻班淳啻む祶啻班纯' &amp;&amp; hour &gt;= 4) ||
                    meridiem === '啻夃礆嗟嵿礆 啻曕创啻苦礊嗟嵿礊嗟�' ||
                    meridiem === '啻掂祱啻曕祦啻ㄠ祶啻ㄠ祰啻班磦') {
                return hour + 12;
            } else {
                return hour;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 4) {
                return '啻班淳啻む祶啻班纯';
            } else if (hour &lt; 12) {
                return '啻班淳啻掂纯啻侧祮';
            } else if (hour &lt; 17) {
                return '啻夃礆嗟嵿礆 啻曕创啻苦礊嗟嵿礊嗟�';
            } else if (hour &lt; 20) {
                return '啻掂祱啻曕祦啻ㄠ祶啻ㄠ祰啻班磦';
            } else {
                return '啻班淳啻む祶啻班纯';
            }
        }
    });

    //! moment.js locale configuration

    function translate$7(number, withoutSuffix, key, isFuture) {
        switch (key) {
            case 's':
                return withoutSuffix ? '褏褝写褏褝薪 褋械泻褍薪写' : '褏褝写褏褝薪 褋械泻褍薪写褘薪';
            case 'ss':
                return number + (withoutSuffix ? ' 褋械泻褍薪写' : ' 褋械泻褍薪写褘薪');
            case 'm':
            case 'mm':
                return number + (withoutSuffix ? ' 屑懈薪褍褌' : ' 屑懈薪褍褌褘薪');
            case 'h':
            case 'hh':
                return number + (withoutSuffix ? ' 褑邪谐' : ' 褑邪谐懈泄薪');
            case 'd':
            case 'dd':
                return number + (withoutSuffix ? ' 萤写萤褉' : ' 萤写褉懈泄薪');
            case 'M':
            case 'MM':
                return number + (withoutSuffix ? ' 褋邪褉' : ' 褋邪褉褘薪');
            case 'y':
            case 'yy':
                return number + (withoutSuffix ? ' 卸懈谢' : ' 卸懈谢懈泄薪');
            default:
                return number;
        }
    }

    hooks.defineLocale('mn', {
        months : '袧褝谐写爷谐褝褝褉 褋邪褉_啸芯褢褉写褍谐邪邪褉 褋邪褉_袚褍褉邪胁写褍谐邪邪褉 褋邪褉_袛萤褉萤胁写爷谐褝褝褉 褋邪褉_孝邪胁写褍谐邪邪褉 褋邪褉_袟褍褉谐邪写褍谐邪邪褉 褋邪褉_袛芯谢写褍谐邪邪褉 褋邪褉_袧邪泄屑写褍谐邪邪褉 褋邪褉_袝褋写爷谐褝褝褉 褋邪褉_袗褉邪胁写褍谐邪邪褉 褋邪褉_袗褉胁邪薪 薪褝谐写爷谐褝褝褉 褋邪褉_袗褉胁邪薪 褏芯褢褉写褍谐邪邪褉 褋邪褉'.split('_'),
        monthsShort : '1 褋邪褉_2 褋邪褉_3 褋邪褉_4 褋邪褉_5 褋邪褉_6 褋邪褉_7 褋邪褉_8 褋邪褉_9 褋邪褉_10 褋邪褉_11 褋邪褉_12 褋邪褉'.split('_'),
        monthsParseExact : true,
        weekdays : '袧褟屑_袛邪胁邪邪_袦褟谐屑邪褉_袥褏邪谐胁邪_袩爷褉褝胁_袘邪邪褋邪薪_袘褟屑斜邪'.split('_'),
        weekdaysShort : '袧褟屑_袛邪胁_袦褟谐_袥褏邪_袩爷褉_袘邪邪_袘褟屑'.split('_'),
        weekdaysMin : '袧褟_袛邪_袦褟_袥褏_袩爷_袘邪_袘褟'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'YYYY 芯薪褘 MMMM褘薪 D',
            LLL : 'YYYY 芯薪褘 MMMM褘薪 D HH:mm',
            LLLL : 'dddd, YYYY 芯薪褘 MMMM褘薪 D HH:mm'
        },
        meridiemParse: /耶莹|耶啸/i,
        isPM : function (input) {
            return input === '耶啸';
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 12) {
                return '耶莹';
            } else {
                return '耶啸';
            }
        },
        calendar : {
            sameDay : '[莹薪萤萤写萤褉] LT',
            nextDay : '[袦邪褉谐邪邪褕] LT',
            nextWeek : '[袠褉褝褏] dddd LT',
            lastDay : '[莹褔懈谐写萤褉] LT',
            lastWeek : '[莹薪谐萤褉褋萤薪] dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s 写邪褉邪邪',
            past : '%s 萤屑薪萤',
            s : translate$7,
            ss : translate$7,
            m : translate$7,
            mm : translate$7,
            h : translate$7,
            hh : translate$7,
            d : translate$7,
            dd : translate$7,
            M : translate$7,
            MM : translate$7,
            y : translate$7,
            yy : translate$7
        },
        dayOfMonthOrdinalParse: /\d{1,2} 萤写萤褉/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + ' 萤写萤褉';
                default:
                    return number;
            }
        }
    });

    //! moment.js locale configuration

    var symbolMap$b = {
        '1': '啷�',
        '2': '啷�',
        '3': '啷�',
        '4': '啷�',
        '5': '啷�',
        '6': '啷�',
        '7': '啷�',
        '8': '啷�',
        '9': '啷�',
        '0': '啷�'
    },
    numberMap$a = {
        '啷�': '1',
        '啷�': '2',
        '啷�': '3',
        '啷�': '4',
        '啷�': '5',
        '啷�': '6',
        '啷�': '7',
        '啷�': '8',
        '啷�': '9',
        '啷�': '0'
    };

    function relativeTimeMr(number, withoutSuffix, string, isFuture)
    {
        var output = '';
        if (withoutSuffix) {
            switch (string) {
                case 's': output = '啶曕ぞ啶灌 啶膏啶曕啶�'; break;
                case 'ss': output = '%d 啶膏啶曕啶�'; break;
                case 'm': output = '啶忇 啶た啶ㄠた啶�'; break;
                case 'mm': output = '%d 啶た啶ㄠた啶熰'; break;
                case 'h': output = '啶忇 啶むぞ啶�'; break;
                case 'hh': output = '%d 啶むぞ啶�'; break;
                case 'd': output = '啶忇 啶︵た啶掂じ'; break;
                case 'dd': output = '%d 啶︵た啶掂じ'; break;
                case 'M': output = '啶忇 啶す啶苦え啶�'; break;
                case 'MM': output = '%d 啶す啶苦え啷�'; break;
                case 'y': output = '啶忇 啶掂ぐ啷嵿し'; break;
                case 'yy': output = '%d 啶掂ぐ啷嵿し啷�'; break;
            }
        }
        else {
            switch (string) {
                case 's': output = '啶曕ぞ啶灌 啶膏啶曕啶︵ぞ啶�'; break;
                case 'ss': output = '%d 啶膏啶曕啶︵ぞ啶�'; break;
                case 'm': output = '啶忇啶� 啶た啶ㄠた啶熰ぞ'; break;
                case 'mm': output = '%d 啶た啶ㄠた啶熰ぞ啶�'; break;
                case 'h': output = '啶忇啶� 啶むぞ啶膏ぞ'; break;
                case 'hh': output = '%d 啶むぞ啶膏ぞ啶�'; break;
                case 'd': output = '啶忇啶� 啶︵た啶掂じ啶�'; break;
                case 'dd': output = '%d 啶︵た啶掂じ啶距'; break;
                case 'M': output = '啶忇啶� 啶す啶苦え啷嵿く啶�'; break;
                case 'MM': output = '%d 啶す啶苦え啷嵿く啶距'; break;
                case 'y': output = '啶忇啶� 啶掂ぐ啷嵿し啶�'; break;
                case 'yy': output = '%d 啶掂ぐ啷嵿し啶距'; break;
            }
        }
        return output.replace(/%d/i, number);
    }

    hooks.defineLocale('mr', {
        months : '啶溹ぞ啶ㄠ啶掂ぞ啶班_啶啶啶班啶掂ぞ啶班_啶ぞ啶班啶歘啶忇お啷嵿ぐ啶苦げ_啶_啶溹啶╛啶溹啶侧_啶戉啶膏啶焈啶膏お啷嵿啷囙啶ぐ_啶戉啷嵿啷嬥が啶癬啶ㄠ啶掂啶灌啶傕が啶癬啶∴た啶膏啶傕が啶�'.split('_'),
        monthsShort: '啶溹ぞ啶ㄠ._啶啶啶班._啶ぞ啶班啶�._啶忇お啷嵿ぐ啶�._啶._啶溹啶�._啶溹啶侧._啶戉._啶膏お啷嵿啷囙._啶戉啷嵿啷�._啶ㄠ啶掂啶灌啶�._啶∴た啶膏啶�.'.split('_'),
        monthsParseExact : true,
        weekdays : '啶班さ啶苦さ啶距ぐ_啶膏啶さ啶距ぐ_啶啶椸こ啶掂ぞ啶癬啶啶оさ啶距ぐ_啶椸啶班啶掂ぞ啶癬啶多啶曕啶班さ啶距ぐ_啶多え啶苦さ啶距ぐ'.split('_'),
        weekdaysShort : '啶班さ啶縚啶膏啶甠啶啶椸こ_啶啶啶椸啶班_啶多啶曕啶癬啶多え啶�'.split('_'),
        weekdaysMin : '啶癬啶膏_啶_啶_啶椸_啶多_啶�'.split('_'),
        longDateFormat : {
            LT : 'A h:mm 啶掂ぞ啶溹い啶�',
            LTS : 'A h:mm:ss 啶掂ぞ啶溹い啶�',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm 啶掂ぞ啶溹い啶�',
            LLLL : 'dddd, D MMMM YYYY, A h:mm 啶掂ぞ啶溹い啶�'
        },
        calendar : {
            sameDay : '[啶嗋] LT',
            nextDay : '[啶夃う啷嵿く啶綸 LT',
            nextWeek : 'dddd, LT',
            lastDay : '[啶曕ぞ啶瞉 LT',
            lastWeek: '[啶ぞ啶椸啶瞉 dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future: '%s啶ぇ啷嵿く啷�',
            past: '%s啶啶班啶掂',
            s: relativeTimeMr,
            ss: relativeTimeMr,
            m: relativeTimeMr,
            mm: relativeTimeMr,
            h: relativeTimeMr,
            hh: relativeTimeMr,
            d: relativeTimeMr,
            dd: relativeTimeMr,
            M: relativeTimeMr,
            MM: relativeTimeMr,
            y: relativeTimeMr,
            yy: relativeTimeMr
        },
        preparse: function (string) {
            return string.replace(/[啷оエ啷┼オ啷ガ啷ギ啷ウ]/g, function (match) {
                return numberMap$a[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap$b[match];
            });
        },
        meridiemParse: /啶班ぞ啶む啶班|啶膏啶距こ啷€|啶︵啶ぞ啶班|啶膏ぞ啶啶曕ぞ啶赤/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '啶班ぞ啶む啶班') {
                return hour &lt; 4 ? hour : hour + 12;
            } else if (meridiem === '啶膏啶距こ啷€') {
                return hour;
            } else if (meridiem === '啶︵啶ぞ啶班') {
                return hour &gt;= 10 ? hour : hour + 12;
            } else if (meridiem === '啶膏ぞ啶啶曕ぞ啶赤') {
                return hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour &lt; 4) {
                return '啶班ぞ啶む啶班';
            } else if (hour &lt; 10) {
                return '啶膏啶距こ啷€';
            } else if (hour &lt; 17) {
                return '啶︵啶ぞ啶班';
            } else if (hour &lt; 20) {
                return '啶膏ぞ啶啶曕ぞ啶赤';
            } else {
                return '啶班ぞ啶む啶班';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('ms-my', {
        months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
        weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
        weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
        weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY [pukul] HH.mm',
            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /pagi|tengahari|petang|malam/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'pagi') {
                return hour;
            } else if (meridiem === 'tengahari') {
                return hour &gt;= 11 ? hour : hour + 12;
            } else if (meridiem === 'petang' || meridiem === 'malam') {
                return hour + 12;
            }
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours &lt; 11) {
                return 'pagi';
            } else if (hours &lt; 15) {
                return 'tengahari';
            } else if (hours &lt; 19) {
                return 'petang';
            } else {
                return 'malam';
            }
        },
        calendar : {
            sameDay : '[Hari ini pukul] LT',
            nextDay : '[Esok pukul] LT',
            nextWeek : 'dddd [pukul] LT',
            lastDay : '[Kelmarin pukul] LT',
            lastWeek : 'dddd [lepas pukul] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'dalam %s',
            past : '%s yang lepas',
            s : 'beberapa saat',
            ss : '%d saat',
            m : 'seminit',
            mm : '%d minit',
            h : 'sejam',
            hh : '%d jam',
            d : 'sehari',
            dd : '%d hari',
            M : 'sebulan',
            MM : '%d bulan',
            y : 'setahun',
            yy : '%d tahun'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('ms', {
        months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
        weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
        weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
        weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY [pukul] HH.mm',
            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /pagi|tengahari|petang|malam/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'pagi') {
                return hour;
            } else if (meridiem === 'tengahari') {
                return hour &gt;= 11 ? hour : hour + 12;
            } else if (meridiem === 'petang' || meridiem === 'malam') {
                return hour + 12;
            }
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours &lt; 11) {
                return 'pagi';
            } else if (hours &lt; 15) {
                return 'tengahari';
            } else if (hours &lt; 19) {
                return 'petang';
            } else {
                return 'malam';
            }
        },
        calendar : {
            sameDay : '[Hari ini pukul] LT',
            nextDay : '[Esok pukul] LT',
            nextWeek : 'dddd [pukul] LT',
            lastDay : '[Kelmarin pukul] LT',
            lastWeek : 'dddd [lepas pukul] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'dalam %s',
            past : '%s yang lepas',
            s : 'beberapa saat',
            ss : '%d saat',
            m : 'seminit',
            mm : '%d minit',
            h : 'sejam',
            hh : '%d jam',
            d : 'sehari',
            dd : '%d hari',
            M : 'sebulan',
            MM : '%d bulan',
            y : 'setahun',
            yy : '%d tahun'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('mt', {
        months : 'Jannar_Frar_Marzu_April_Mejju_臓unju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Di膵embru'.split('_'),
        monthsShort : 'Jan_Fra_Mar_Apr_Mej_臓un_Lul_Aww_Set_Ott_Nov_Di膵'.split('_'),
        weekdays : 'Il-摩add_It-Tnejn_It-Tlieta_L-Erbg魔a_Il-摩amis_Il-臓img魔a_Is-Sibt'.split('_'),
        weekdaysShort : '摩ad_Tne_Tli_Erb_摩am_臓im_Sib'.split('_'),
        weekdaysMin : '摩a_Tn_Tl_Er_摩a_臓i_Si'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Illum fil-]LT',
            nextDay : '[G魔ada fil-]LT',
            nextWeek : 'dddd [fil-]LT',
            lastDay : '[Il-biera魔 fil-]LT',
            lastWeek : 'dddd [li g魔adda] [fil-]LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'f鈥� %s',
            past : '%s ilu',
            s : 'ftit sekondi',
            ss : '%d sekondi',
            m : 'minuta',
            mm : '%d minuti',
            h : 'sieg魔a',
            hh : '%d sieg魔at',
            d : '摹urnata',
            dd : '%d 摹ranet',
            M : 'xahar',
            MM : '%d xhur',
            y : 'sena',
            yy : '%d sni'
        },
        dayOfMonthOrdinalParse : /\d{1,2}潞/,
        ordinal: '%d潞',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var symbolMap$c = {
        '1': '醽�',
        '2': '醽�',
        '3': '醽�',
        '4': '醽�',
        '5': '醽�',
        '6': '醽�',
        '7': '醽�',
        '8': '醽�',
        '9': '醽�',
        '0': '醽€'
    }, numberMap$b = {
        '醽�': '1',
        '醽�': '2',
        '醽�': '3',
        '醽�': '4',
        '醽�': '5',
        '醽�': '6',
        '醽�': '7',
        '醽�': '8',
        '醽�': '9',
        '醽€': '0'
    };

    hooks.defineLocale('my', {
        months: '醼囜€斸€横€斸€濁€€涐€甠醼栣€贬€栣€贬€€横€濁€€涐€甠醼欋€愥€篲醼п€曖€坚€甠醼欋€盻醼囜€结€斸€篲醼囜€搬€溼€€€勧€篲醼炨€坚€傖€€愥€篲醼呩€€醼横€愥€勧€横€樶€琠醼♂€贬€€€醼横€愥€€€樶€琠醼斸€€€濁€勧€横€樶€琠醼掅€€囜€勧€横€樶€�'.split('_'),
        monthsShort: '醼囜€斸€篲醼栣€盻醼欋€愥€篲醼曖€坚€甠醼欋€盻醼囜€结€斸€篲醼溼€€€勧€篲醼炨€糭醼呩€€醼篲醼♂€贬€€€醼篲醼斸€€痏醼掅€�'.split('_'),
        weekdays: '醼愥€斸€勧€横€贯€傖€斸€结€盻醼愥€斸€勧€横€贯€溼€琠醼♂€勧€横€贯€傖€玙醼椺€€掅€贯€撫€熱€搬€竉醼€醼坚€€炨€曖€愥€贬€竉醼炨€贬€€€醼坚€琠醼呩€斸€�'.split('_'),
        weekdaysShort: '醼斸€结€盻醼溼€琠醼傖€玙醼熱€搬€竉醼€醼坚€琠醼炨€贬€琠醼斸€�'.split('_'),
        weekdaysMin: '醼斸€结€盻醼溼€琠醼傖€玙醼熱€搬€竉醼€醼坚€琠醼炨€贬€琠醼斸€�'.split('_'),

        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[醼氠€斸€�.] LT [醼欋€踞€琞',
            nextDay: '[醼欋€斸€€醼横€栣€坚€斸€篯 LT [醼欋€踞€琞',
            nextWeek: 'dddd LT [醼欋€踞€琞',
            lastDay: '[醼欋€斸€�.醼€] LT [醼欋€踞€琞',
            lastWeek: '[醼曖€坚€€羔€佱€册€丰€炨€贬€琞 dddd LT [醼欋€踞€琞',
            sameElse: 'L'
        },
        relativeTime: {
            future: '醼溼€€欋€娽€横€� %s 醼欋€踞€�',
            past: '醼溼€结€斸€横€佱€册€丰€炨€贬€� %s 醼€',
            s: '醼呩€€醼贯€€醼斸€�.醼♂€斸€娽€横€羔€勧€氠€�',
            ss : '%d 醼呩€€醼贯€€醼斸€丰€�',
            m: '醼愥€呩€横€欋€€斸€呩€�',
            mm: '%d 醼欋€€斸€呩€�',
            h: '醼愥€呩€横€斸€€涐€�',
            hh: '%d 醼斸€€涐€�',
            d: '醼愥€呩€横€涐€€醼�',
            dd: '%d 醼涐€€醼�',
            M: '醼愥€呩€横€�',
            MM: '%d 醼�',
            y: '醼愥€呩€横€斸€踞€呩€�',
            yy: '%d 醼斸€踞€呩€�'
        },
        preparse: function (string) {
            return string.replace(/[醽佱亗醽冡亜醽呩亞醽囜亪醽夅亐]/g, function (match) {
                return numberMap$b[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap$c[match];
            });
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('nb', {
        months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
        monthsShort : 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
        monthsParseExact : true,
        weekdays : 's酶ndag_mandag_tirsdag_onsdag_torsdag_fredag_l酶rdag'.split('_'),
        weekdaysShort : 's酶._ma._ti._on._to._fr._l酶.'.split('_'),
        weekdaysMin : 's酶_ma_ti_on_to_fr_l酶'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY [kl.] HH:mm',
            LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
        },
        calendar : {
            sameDay: '[i dag kl.] LT',
            nextDay: '[i morgen kl.] LT',
            nextWeek: 'dddd [kl.] LT',
            lastDay: '[i g氓r kl.] LT',
            lastWeek: '[forrige] dddd [kl.] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'om %s',
            past : '%s siden',
            s : 'noen sekunder',
            ss : '%d sekunder',
            m : 'ett minutt',
            mm : '%d minutter',
            h : 'en time',
            hh : '%d timer',
            d : 'en dag',
            dd : '%d dager',
            M : 'en m氓ned',
            MM : '%d m氓neder',
            y : 'ett 氓r',
            yy : '%d 氓r'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var symbolMap$d = {
        '1': '啷�',
        '2': '啷�',
        '3': '啷�',
        '4': '啷�',
        '5': '啷�',
        '6': '啷�',
        '7': '啷�',
        '8': '啷�',
        '9': '啷�',
        '0': '啷�'
    },
    numberMap$c = {
        '啷�': '1',
        '啷�': '2',
        '啷�': '3',
        '啷�': '4',
        '啷�': '5',
        '啷�': '6',
        '啷�': '7',
        '啷�': '8',
        '啷�': '9',
        '啷�': '0'
    };

    hooks.defineLocale('ne', {
        months : '啶溹え啶掂ぐ啷€_啶啶啶班啶掂ぐ啷€_啶ぞ啶班啶歘啶呧お啷嵿ぐ啶苦げ_啶_啶溹啶╛啶溹啶侧ぞ啶坃啶呧啶粪啶焈啶膏啶啶熰啶啶ぐ_啶呧啷嵿啷嬥が啶癬啶ㄠ啶啶啶ぐ_啶∴た啶膏啶啶ぐ'.split('_'),
        monthsShort : '啶溹え._啶啶啶班._啶ぞ啶班啶歘啶呧お啷嵿ぐ啶�._啶_啶溹啶╛啶溹啶侧ぞ啶�._啶呧._啶膏啶啶�._啶呧啷嵿啷�._啶ㄠ啶._啶∴た啶膏.'.split('_'),
        monthsParseExact : true,
        weekdays : '啶嗋啶むが啶距ぐ_啶膏啶が啶距ぐ_啶啷嵿啶侧が啶距ぐ_啶啶оが啶距ぐ_啶た啶灌た啶ぞ啶癬啶多啶曕啶班が啶距ぐ_啶多え啶苦が啶距ぐ'.split('_'),
        weekdaysShort : '啶嗋啶�._啶膏啶�._啶啷嵿啶�._啶啶�._啶た啶灌た._啶多啶曕啶�._啶多え啶�.'.split('_'),
        weekdaysMin : '啶�._啶膏._啶._啶._啶た._啶多._啶�.'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'A啶曕 h:mm 啶啷�',
            LTS : 'A啶曕 h:mm:ss 啶啷�',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A啶曕 h:mm 啶啷�',
            LLLL : 'dddd, D MMMM YYYY, A啶曕 h:mm 啶啷�'
        },
        preparse: function (string) {
            return string.replace(/[啷оエ啷┼オ啷ガ啷ギ啷ウ]/g, function (match) {
                return numberMap$c[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap$d[match];
            });
        },
        meridiemParse: /啶班ぞ啶むた|啶た啶灌ぞ啶▅啶︵た啶夃啶膏|啶膏ぞ啶佮/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '啶班ぞ啶むた') {
                return hour &lt; 4 ? hour : hour + 12;
            } else if (meridiem === '啶た啶灌ぞ啶�') {
                return hour;
            } else if (meridiem === '啶︵た啶夃啶膏') {
                return hour &gt;= 10 ? hour : hour + 12;
            } else if (meridiem === '啶膏ぞ啶佮') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 3) {
                return '啶班ぞ啶むた';
            } else if (hour &lt; 12) {
                return '啶た啶灌ぞ啶�';
            } else if (hour &lt; 16) {
                return '啶︵た啶夃啶膏';
            } else if (hour &lt; 20) {
                return '啶膏ぞ啶佮';
            } else {
                return '啶班ぞ啶むた';
            }
        },
        calendar : {
            sameDay : '[啶嗋] LT',
            nextDay : '[啶啶侧た] LT',
            nextWeek : '[啶嗋啶佮う啷媇 dddd[,] LT',
            lastDay : '[啶灌た啶溹] LT',
            lastWeek : '[啶椸啶曕] dddd[,] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s啶ぞ',
            past : '%s 啶呧啶距ぁ啶�',
            s : '啶曕啶灌 啶曕啶粪ぃ',
            ss : '%d 啶膏啶曕啶｀啶�',
            m : '啶忇 啶た啶ㄠ啶�',
            mm : '%d 啶た啶ㄠ啶�',
            h : '啶忇 啶樴ぃ啷嵿啶�',
            hh : '%d 啶樴ぃ啷嵿啶�',
            d : '啶忇 啶︵た啶�',
            dd : '%d 啶︵た啶�',
            M : '啶忇 啶す啶苦え啶�',
            MM : '%d 啶す啶苦え啶�',
            y : '啶忇 啶ぐ啷嵿し',
            yy : '%d 啶ぐ啷嵿し'
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var monthsShortWithDots$1 = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'),
        monthsShortWithoutDots$1 = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

    var monthsParse$4 = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
    var monthsRegex$5 = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

    hooks.defineLocale('nl-be', {
        months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
        monthsShort : function (m, format) {
            if (!m) {
                return monthsShortWithDots$1;
            } else if (/-MMM-/.test(format)) {
                return monthsShortWithoutDots$1[m.month()];
            } else {
                return monthsShortWithDots$1[m.month()];
            }
        },

        monthsRegex: monthsRegex$5,
        monthsShortRegex: monthsRegex$5,
        monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,
        monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

        monthsParse : monthsParse$4,
        longMonthsParse : monthsParse$4,
        shortMonthsParse : monthsParse$4,

        weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
        weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
        weekdaysMin : 'zo_ma_di_wo_do_vr_za'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[vandaag om] LT',
            nextDay: '[morgen om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[gisteren om] LT',
            lastWeek: '[afgelopen] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'over %s',
            past : '%s geleden',
            s : 'een paar seconden',
            ss : '%d seconden',
            m : '茅茅n minuut',
            mm : '%d minuten',
            h : '茅茅n uur',
            hh : '%d uur',
            d : '茅茅n dag',
            dd : '%d dagen',
            M : '茅茅n maand',
            MM : '%d maanden',
            y : '茅茅n jaar',
            yy : '%d jaar'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal : function (number) {
            return number + ((number === 1 || number === 8 || number &gt;= 20) ? 'ste' : 'de');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var monthsShortWithDots$2 = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'),
        monthsShortWithoutDots$2 = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

    var monthsParse$5 = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
    var monthsRegex$6 = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

    hooks.defineLocale('nl', {
        months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
        monthsShort : function (m, format) {
            if (!m) {
                return monthsShortWithDots$2;
            } else if (/-MMM-/.test(format)) {
                return monthsShortWithoutDots$2[m.month()];
            } else {
                return monthsShortWithDots$2[m.month()];
            }
        },

        monthsRegex: monthsRegex$6,
        monthsShortRegex: monthsRegex$6,
        monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,
        monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

        monthsParse : monthsParse$5,
        longMonthsParse : monthsParse$5,
        shortMonthsParse : monthsParse$5,

        weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
        weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
        weekdaysMin : 'zo_ma_di_wo_do_vr_za'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD-MM-YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[vandaag om] LT',
            nextDay: '[morgen om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[gisteren om] LT',
            lastWeek: '[afgelopen] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'over %s',
            past : '%s geleden',
            s : 'een paar seconden',
            ss : '%d seconden',
            m : '茅茅n minuut',
            mm : '%d minuten',
            h : '茅茅n uur',
            hh : '%d uur',
            d : '茅茅n dag',
            dd : '%d dagen',
            M : '茅茅n maand',
            MM : '%d maanden',
            y : '茅茅n jaar',
            yy : '%d jaar'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal : function (number) {
            return number + ((number === 1 || number === 8 || number &gt;= 20) ? 'ste' : 'de');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('nn', {
        months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
        weekdays : 'sundag_m氓ndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
        weekdaysShort : 'sun_m氓n_tys_ons_tor_fre_lau'.split('_'),
        weekdaysMin : 'su_m氓_ty_on_to_fr_l酶'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY [kl.] H:mm',
            LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
        },
        calendar : {
            sameDay: '[I dag klokka] LT',
            nextDay: '[I morgon klokka] LT',
            nextWeek: 'dddd [klokka] LT',
            lastDay: '[I g氓r klokka] LT',
            lastWeek: '[F酶reg氓ande] dddd [klokka] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'om %s',
            past : '%s sidan',
            s : 'nokre sekund',
            ss : '%d sekund',
            m : 'eit minutt',
            mm : '%d minutt',
            h : 'ein time',
            hh : '%d timar',
            d : 'ein dag',
            dd : '%d dagar',
            M : 'ein m氓nad',
            MM : '%d m氓nader',
            y : 'eit 氓r',
            yy : '%d 氓r'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var symbolMap$e = {
        '1': '喋�',
        '2': '喋�',
        '3': '喋�',
        '4': '喋�',
        '5': '喋�',
        '6': '喋�',
        '7': '喋�',
        '8': '喋�',
        '9': '喋�',
        '0': '喋�'
    },
    numberMap$d = {
        '喋�': '1',
        '喋�': '2',
        '喋�': '3',
        '喋�': '4',
        '喋�': '5',
        '喋�': '6',
        '喋�': '7',
        '喋�': '8',
        '喋�': '9',
        '喋�': '0'
    };

    hooks.defineLocale('pa-in', {
        // There are months name as per Nanakshahi Calendar but they are not used as rigidly in modern Punjabi.
        months : '啜溹è啜掂ò喋€_啜ḿ啜班ǖ啜班﹢_啜ň啜班_啜呧í喋嵿ò喋堗ú_啜▓_啜溹﹤啜╛啜溹﹣啜侧ň啜坃啜呧啜膏à_啜膏à喋班ì啜癬啜呧〞啜む﹤啜ò_啜ㄠǖ喋班ì啜癬啜︵ǜ喋班ì啜�'.split('_'),
        monthsShort : '啜溹è啜掂ò喋€_啜ḿ啜班ǖ啜班﹢_啜ň啜班_啜呧í喋嵿ò喋堗ú_啜▓_啜溹﹤啜╛啜溹﹣啜侧ň啜坃啜呧啜膏à_啜膏à喋班ì啜癬啜呧〞啜む﹤啜ò_啜ㄠǖ喋班ì啜癬啜︵ǜ喋班ì啜�'.split('_'),
        weekdays : '啜愢à啜掂ň啜癬啜膏⿱啜ǖ啜距ò_啜┌啜椸ú啜掂ň啜癬啜﹣啜оǖ啜距ò_啜掂﹢啜班ǖ啜距ò_啜膏ḿ喋佮┍啜曕ò啜掂ň啜癬啜膏ḿ啜ㄠ﹢啜氞ò啜掂ň啜�'.split('_'),
        weekdaysShort : '啜愢à_啜膏⿱啜甠啜┌啜椸ú_啜﹣啜啜掂﹢啜癬啜膏ḿ喋佮〞啜癬啜膏ḿ啜ㄠ﹢'.split('_'),
        weekdaysMin : '啜愢à_啜膏⿱啜甠啜┌啜椸ú_啜﹣啜啜掂﹢啜癬啜膏ḿ喋佮〞啜癬啜膏ḿ啜ㄠ﹢'.split('_'),
        longDateFormat : {
            LT : 'A h:mm 啜掂喋�',
            LTS : 'A h:mm:ss 啜掂喋�',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm 啜掂喋�',
            LLLL : 'dddd, D MMMM YYYY, A h:mm 啜掂喋�'
        },
        calendar : {
            sameDay : '[啜呧] LT',
            nextDay : '[啜曕ú] LT',
            nextWeek : '[啜呧啜侧ň] dddd, LT',
            lastDay : '[啜曕ú] LT',
            lastWeek : '[啜ǹ啜涏ú喋嘳 dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s 啜掂ǹ喋编',
            past : '%s 啜ǹ啜涏ú喋�',
            s : '啜曕﹣啜� 啜膏〞啜苦┌啜�',
            ss : '%d 啜膏〞啜苦┌啜�',
            m : '啜囙〞 啜ǹ喋班',
            mm : '%d 啜ǹ喋班',
            h : '啜囙┍啜� 啜樴┌啜熰ň',
            hh : '%d 啜樴┌啜熰﹪',
            d : '啜囙┍啜� 啜︵ǹ啜�',
            dd : '%d 啜︵ǹ啜�',
            M : '啜囙┍啜� 啜ü喋€啜ㄠň',
            MM : '%d 啜ü喋€啜ㄠ﹪',
            y : '啜囙┍啜� 啜膏ň啜�',
            yy : '%d 啜膏ň啜�'
        },
        preparse: function (string) {
            return string.replace(/[喋о┄喋┼┆喋┈喋┊喋│]/g, function (match) {
                return numberMap$d[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap$e[match];
            });
        },
        // Punjabi notation for meridiems are quite fuzzy in practice. While there exists
        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Punjabi.
        meridiemParse: /啜班ň啜啜膏ǖ喋囙ò|啜︵﹣啜ü啜苦ò|啜膏ḿ啜距ó/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '啜班ň啜�') {
                return hour &lt; 4 ? hour : hour + 12;
            } else if (meridiem === '啜膏ǖ喋囙ò') {
                return hour;
            } else if (meridiem === '啜︵﹣啜ü啜苦ò') {
                return hour &gt;= 10 ? hour : hour + 12;
            } else if (meridiem === '啜膏ḿ啜距ó') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 4) {
                return '啜班ň啜�';
            } else if (hour &lt; 10) {
                return '啜膏ǖ喋囙ò';
            } else if (hour &lt; 17) {
                return '啜︵﹣啜ü啜苦ò';
            } else if (hour &lt; 20) {
                return '啜膏ḿ啜距ó';
            } else {
                return '啜班ň啜�';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var monthsNominative = 'stycze艅_luty_marzec_kwiecie艅_maj_czerwiec_lipiec_sierpie艅_wrzesie艅_pa藕dziernik_listopad_grudzie艅'.split('_'),
        monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_wrze艣nia_pa藕dziernika_listopada_grudnia'.split('_');
    function plural$3(n) {
        return (n % 10 &lt; 5) &amp;&amp; (n % 10 &gt; 1) &amp;&amp; ((~~(n / 10) % 10) !== 1);
    }
    function translate$8(number, withoutSuffix, key) {
        var result = number + ' ';
        switch (key) {
            case 'ss':
                return result + (plural$3(number) ? 'sekundy' : 'sekund');
            case 'm':
                return withoutSuffix ? 'minuta' : 'minut臋';
            case 'mm':
                return result + (plural$3(number) ? 'minuty' : 'minut');
            case 'h':
                return withoutSuffix  ? 'godzina'  : 'godzin臋';
            case 'hh':
                return result + (plural$3(number) ? 'godziny' : 'godzin');
            case 'MM':
                return result + (plural$3(number) ? 'miesi膮ce' : 'miesi臋cy');
            case 'yy':
                return result + (plural$3(number) ? 'lata' : 'lat');
        }
    }

    hooks.defineLocale('pl', {
        months : function (momentToFormat, format) {
            if (!momentToFormat) {
                return monthsNominative;
            } else if (format === '') {
                // Hack: if format empty we know this is used to generate
                // RegExp by moment. Give then back both valid forms of months
                // in RegExp ready format.
                return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
            } else if (/D MMMM/.test(format)) {
                return monthsSubjective[momentToFormat.month()];
            } else {
                return monthsNominative[momentToFormat.month()];
            }
        },
        monthsShort : 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_pa藕_lis_gru'.split('_'),
        weekdays : 'niedziela_poniedzia艂ek_wtorek_艣roda_czwartek_pi膮tek_sobota'.split('_'),
        weekdaysShort : 'ndz_pon_wt_艣r_czw_pt_sob'.split('_'),
        weekdaysMin : 'Nd_Pn_Wt_艢r_Cz_Pt_So'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Dzi艣 o] LT',
            nextDay: '[Jutro o] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[W niedziel臋 o] LT';

                    case 2:
                        return '[We wtorek o] LT';

                    case 3:
                        return '[W 艣rod臋 o] LT';

                    case 6:
                        return '[W sobot臋 o] LT';

                    default:
                        return '[W] dddd [o] LT';
                }
            },
            lastDay: '[Wczoraj o] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[W zesz艂膮 niedziel臋 o] LT';
                    case 3:
                        return '[W zesz艂膮 艣rod臋 o] LT';
                    case 6:
                        return '[W zesz艂膮 sobot臋 o] LT';
                    default:
                        return '[W zesz艂y] dddd [o] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'za %s',
            past : '%s temu',
            s : 'kilka sekund',
            ss : translate$8,
            m : translate$8,
            mm : translate$8,
            h : translate$8,
            hh : translate$8,
            d : '1 dzie艅',
            dd : '%d dni',
            M : 'miesi膮c',
            MM : translate$8,
            y : 'rok',
            yy : translate$8
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('pt-br', {
        months : 'Janeiro_Fevereiro_Mar莽o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        weekdays : 'Domingo_Segunda-feira_Ter莽a-feira_Quarta-feira_Quinta-feira_Sexta-feira_S谩bado'.split('_'),
        weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_S谩b'.split('_'),
        weekdaysMin : 'Do_2陋_3陋_4陋_5陋_6陋_S谩'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY [脿s] HH:mm',
            LLLL : 'dddd, D [de] MMMM [de] YYYY [脿s] HH:mm'
        },
        calendar : {
            sameDay: '[Hoje 脿s] LT',
            nextDay: '[Amanh茫 脿s] LT',
            nextWeek: 'dddd [脿s] LT',
            lastDay: '[Ontem 脿s] LT',
            lastWeek: function () {
                return (this.day() === 0 || this.day() === 6) ?
                    '[脷ltimo] dddd [脿s] LT' : // Saturday + Sunday
                    '[脷ltima] dddd [脿s] LT'; // Monday - Friday
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'em %s',
            past : 'h谩 %s',
            s : 'poucos segundos',
            ss : '%d segundos',
            m : 'um minuto',
            mm : '%d minutos',
            h : 'uma hora',
            hh : '%d horas',
            d : 'um dia',
            dd : '%d dias',
            M : 'um m锚s',
            MM : '%d meses',
            y : 'um ano',
            yy : '%d anos'
        },
        dayOfMonthOrdinalParse: /\d{1,2}潞/,
        ordinal : '%d潞'
    });

    //! moment.js locale configuration

    hooks.defineLocale('pt', {
        months : 'Janeiro_Fevereiro_Mar莽o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        weekdays : 'Domingo_Segunda-feira_Ter莽a-feira_Quarta-feira_Quinta-feira_Sexta-feira_S谩bado'.split('_'),
        weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_S谩b'.split('_'),
        weekdaysMin : 'Do_2陋_3陋_4陋_5陋_6陋_S谩'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY HH:mm',
            LLLL : 'dddd, D [de] MMMM [de] YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Hoje 脿s] LT',
            nextDay: '[Amanh茫 脿s] LT',
            nextWeek: 'dddd [脿s] LT',
            lastDay: '[Ontem 脿s] LT',
            lastWeek: function () {
                return (this.day() === 0 || this.day() === 6) ?
                    '[脷ltimo] dddd [脿s] LT' : // Saturday + Sunday
                    '[脷ltima] dddd [脿s] LT'; // Monday - Friday
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'em %s',
            past : 'h谩 %s',
            s : 'segundos',
            ss : '%d segundos',
            m : 'um minuto',
            mm : '%d minutos',
            h : 'uma hora',
            hh : '%d horas',
            d : 'um dia',
            dd : '%d dias',
            M : 'um m锚s',
            MM : '%d meses',
            y : 'um ano',
            yy : '%d anos'
        },
        dayOfMonthOrdinalParse: /\d{1,2}潞/,
        ordinal : '%d潞',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    function relativeTimeWithPlural$2(number, withoutSuffix, key) {
        var format = {
                'ss': 'secunde',
                'mm': 'minute',
                'hh': 'ore',
                'dd': 'zile',
                'MM': 'luni',
                'yy': 'ani'
            },
            separator = ' ';
        if (number % 100 &gt;= 20 || (number &gt;= 100 &amp;&amp; number % 100 === 0)) {
            separator = ' de ';
        }
        return number + separator + format[key];
    }

    hooks.defineLocale('ro', {
        months : 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
        monthsShort : 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays : 'duminic膬_luni_mar葲i_miercuri_joi_vineri_s芒mb膬t膬'.split('_'),
        weekdaysShort : 'Dum_Lun_Mar_Mie_Joi_Vin_S芒m'.split('_'),
        weekdaysMin : 'Du_Lu_Ma_Mi_Jo_Vi_S芒'.split('_'),
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY H:mm',
            LLLL : 'dddd, D MMMM YYYY H:mm'
        },
        calendar : {
            sameDay: '[azi la] LT',
            nextDay: '[m芒ine la] LT',
            nextWeek: 'dddd [la] LT',
            lastDay: '[ieri la] LT',
            lastWeek: '[fosta] dddd [la] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'peste %s',
            past : '%s 卯n urm膬',
            s : 'c芒teva secunde',
            ss : relativeTimeWithPlural$2,
            m : 'un minut',
            mm : relativeTimeWithPlural$2,
            h : 'o or膬',
            hh : relativeTimeWithPlural$2,
            d : 'o zi',
            dd : relativeTimeWithPlural$2,
            M : 'o lun膬',
            MM : relativeTimeWithPlural$2,
            y : 'un an',
            yy : relativeTimeWithPlural$2
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    function plural$4(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 &amp;&amp; num % 100 !== 11 ? forms[0] : (num % 10 &gt;= 2 &amp;&amp; num % 10 &lt;= 4 &amp;&amp; (num % 100 &lt; 10 || num % 100 &gt;= 20) ? forms[1] : forms[2]);
    }
    function relativeTimeWithPlural$3(number, withoutSuffix, key) {
        var format = {
            'ss': withoutSuffix ? '褋械泻褍薪写邪_褋械泻褍薪写褘_褋械泻褍薪写' : '褋械泻褍薪写褍_褋械泻褍薪写褘_褋械泻褍薪写',
            'mm': withoutSuffix ? '屑懈薪褍褌邪_屑懈薪褍褌褘_屑懈薪褍褌' : '屑懈薪褍褌褍_屑懈薪褍褌褘_屑懈薪褍褌',
            'hh': '褔邪褋_褔邪褋邪_褔邪褋芯胁',
            'dd': '写械薪褜_写薪褟_写薪械泄',
            'MM': '屑械褋褟褑_屑械褋褟褑邪_屑械褋褟褑械胁',
            'yy': '谐芯写_谐芯写邪_谢械褌'
        };
        if (key === 'm') {
            return withoutSuffix ? '屑懈薪褍褌邪' : '屑懈薪褍褌褍';
        }
        else {
            return number + ' ' + plural$4(format[key], +number);
        }
    }
    var monthsParse$6 = [/^褟薪胁/i, /^褎械胁/i, /^屑邪褉/i, /^邪锌褉/i, /^屑邪[泄褟]/i, /^懈褞薪/i, /^懈褞谢/i, /^邪胁谐/i, /^褋械薪/i, /^芯泻褌/i, /^薪芯褟/i, /^写械泻/i];

    // http://new.gramota.ru/spravka/rules/139-prop : 搂 103
    // 小芯泻褉邪褖械薪懈褟 屑械褋褟褑械胁: http://new.gramota.ru/spravka/buro/search-answer?s=242637
    // CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
    hooks.defineLocale('ru', {
        months : {
            format: '褟薪胁邪褉褟_褎械胁褉邪谢褟_屑邪褉褌邪_邪锌褉械谢褟_屑邪褟_懈褞薪褟_懈褞谢褟_邪胁谐褍褋褌邪_褋械薪褌褟斜褉褟_芯泻褌褟斜褉褟_薪芯褟斜褉褟_写械泻邪斜褉褟'.split('_'),
            standalone: '褟薪胁邪褉褜_褎械胁褉邪谢褜_屑邪褉褌_邪锌褉械谢褜_屑邪泄_懈褞薪褜_懈褞谢褜_邪胁谐褍褋褌_褋械薪褌褟斜褉褜_芯泻褌褟斜褉褜_薪芯褟斜褉褜_写械泻邪斜褉褜'.split('_')
        },
        monthsShort : {
            // 锌芯 CLDR 懈屑械薪薪芯 "懈褞谢." 懈 "懈褞薪.", 薪芯 泻邪泻芯泄 褋屑褘褋谢 屑械薪褟褌褜 斜褍泻胁褍 薪邪 褌芯褔泻褍 ?
            format: '褟薪胁._褎械胁褉._屑邪褉._邪锌褉._屑邪褟_懈褞薪褟_懈褞谢褟_邪胁谐._褋械薪褌._芯泻褌._薪芯褟斜._写械泻.'.split('_'),
            standalone: '褟薪胁._褎械胁褉._屑邪褉褌_邪锌褉._屑邪泄_懈褞薪褜_懈褞谢褜_邪胁谐._褋械薪褌._芯泻褌._薪芯褟斜._写械泻.'.split('_')
        },
        weekdays : {
            standalone: '胁芯褋泻褉械褋械薪褜械_锌芯薪械写械谢褜薪懈泻_胁褌芯褉薪懈泻_褋褉械写邪_褔械褌胁械褉谐_锌褟褌薪懈褑邪_褋褍斜斜芯褌邪'.split('_'),
            format: '胁芯褋泻褉械褋械薪褜械_锌芯薪械写械谢褜薪懈泻_胁褌芯褉薪懈泻_褋褉械写褍_褔械褌胁械褉谐_锌褟褌薪懈褑褍_褋褍斜斜芯褌褍'.split('_'),
            isFormat: /\[ ?[袙胁] ?(?:锌褉芯褕谢褍褞|褋谢械写褍褞褖褍褞|褝褌褍)? ?\] ?dddd/
        },
        weekdaysShort : '胁褋_锌薪_胁褌_褋褉_褔褌_锌褌_褋斜'.split('_'),
        weekdaysMin : '胁褋_锌薪_胁褌_褋褉_褔褌_锌褌_褋斜'.split('_'),
        monthsParse : monthsParse$6,
        longMonthsParse : monthsParse$6,
        shortMonthsParse : monthsParse$6,

        // 锌芯谢薪褘械 薪邪蟹胁邪薪懈褟 褋 锌邪写械卸邪屑懈, 锌芯 褌褉懈 斜褍泻胁褘, 写谢褟 薪械泻芯褌芯褉褘褏, 锌芯 4 斜褍泻胁褘, 褋芯泻褉邪褖械薪懈褟 褋 褌芯褔泻芯泄 懈 斜械蟹 褌芯褔泻懈
        monthsRegex: /^(褟薪胁邪褉[褜褟]|褟薪胁\.?|褎械胁褉邪谢[褜褟]|褎械胁褉?\.?|屑邪褉褌邪?|屑邪褉\.?|邪锌褉械谢[褜褟]|邪锌褉\.?|屑邪[泄褟]|懈褞薪[褜褟]|懈褞薪\.?|懈褞谢[褜褟]|懈褞谢\.?|邪胁谐褍褋褌邪?|邪胁谐\.?|褋械薪褌褟斜褉[褜褟]|褋械薪褌?\.?|芯泻褌褟斜褉[褜褟]|芯泻褌\.?|薪芯褟斜褉[褜褟]|薪芯褟斜?\.?|写械泻邪斜褉[褜褟]|写械泻\.?)/i,

        // 泻芯锌懈褟 锌褉械写褘写褍褖械谐芯
        monthsShortRegex: /^(褟薪胁邪褉[褜褟]|褟薪胁\.?|褎械胁褉邪谢[褜褟]|褎械胁褉?\.?|屑邪褉褌邪?|屑邪褉\.?|邪锌褉械谢[褜褟]|邪锌褉\.?|屑邪[泄褟]|懈褞薪[褜褟]|懈褞薪\.?|懈褞谢[褜褟]|懈褞谢\.?|邪胁谐褍褋褌邪?|邪胁谐\.?|褋械薪褌褟斜褉[褜褟]|褋械薪褌?\.?|芯泻褌褟斜褉[褜褟]|芯泻褌\.?|薪芯褟斜褉[褜褟]|薪芯褟斜?\.?|写械泻邪斜褉[褜褟]|写械泻\.?)/i,

        // 锌芯谢薪褘械 薪邪蟹胁邪薪懈褟 褋 锌邪写械卸邪屑懈
        monthsStrictRegex: /^(褟薪胁邪褉[褟褜]|褎械胁褉邪谢[褟褜]|屑邪褉褌邪?|邪锌褉械谢[褟褜]|屑邪[褟泄]|懈褞薪[褟褜]|懈褞谢[褟褜]|邪胁谐褍褋褌邪?|褋械薪褌褟斜褉[褟褜]|芯泻褌褟斜褉[褟褜]|薪芯褟斜褉[褟褜]|写械泻邪斜褉[褟褜])/i,

        // 袙褘褉邪卸械薪懈械, 泻芯褌芯褉芯械 褋芯芯褌胁械褋褌胁褍械褌 褌芯谢褜泻芯 褋芯泻褉邪褖褢薪薪褘屑 褎芯褉屑邪屑
        monthsShortStrictRegex: /^(褟薪胁\.|褎械胁褉?\.|屑邪褉[褌.]|邪锌褉\.|屑邪[褟泄]|懈褞薪[褜褟.]|懈褞谢[褜褟.]|邪胁谐\.|褋械薪褌?\.|芯泻褌\.|薪芯褟斜?\.|写械泻\.)/i,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY 谐.',
            LLL : 'D MMMM YYYY 谐., H:mm',
            LLLL : 'dddd, D MMMM YYYY 谐., H:mm'
        },
        calendar : {
            sameDay: '[小械谐芯写薪褟, 胁] LT',
            nextDay: '[袟邪胁褌褉邪, 胁] LT',
            lastDay: '[袙褔械褉邪, 胁] LT',
            nextWeek: function (now) {
                if (now.week() !== this.week()) {
                    switch (this.day()) {
                        case 0:
                            return '[袙 褋谢械写褍褞褖械械] dddd, [胁] LT';
                        case 1:
                        case 2:
                        case 4:
                            return '[袙 褋谢械写褍褞褖懈泄] dddd, [胁] LT';
                        case 3:
                        case 5:
                        case 6:
                            return '[袙 褋谢械写褍褞褖褍褞] dddd, [胁] LT';
                    }
                } else {
                    if (this.day() === 2) {
                        return '[袙芯] dddd, [胁] LT';
                    } else {
                        return '[袙] dddd, [胁] LT';
                    }
                }
            },
            lastWeek: function (now) {
                if (now.week() !== this.week()) {
                    switch (this.day()) {
                        case 0:
                            return '[袙 锌褉芯褕谢芯械] dddd, [胁] LT';
                        case 1:
                        case 2:
                        case 4:
                            return '[袙 锌褉芯褕谢褘泄] dddd, [胁] LT';
                        case 3:
                        case 5:
                        case 6:
                            return '[袙 锌褉芯褕谢褍褞] dddd, [胁] LT';
                    }
                } else {
                    if (this.day() === 2) {
                        return '[袙芯] dddd, [胁] LT';
                    } else {
                        return '[袙] dddd, [胁] LT';
                    }
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : '褔械褉械蟹 %s',
            past : '%s 薪邪蟹邪写',
            s : '薪械褋泻芯谢褜泻芯 褋械泻褍薪写',
            ss : relativeTimeWithPlural$3,
            m : relativeTimeWithPlural$3,
            mm : relativeTimeWithPlural$3,
            h : '褔邪褋',
            hh : relativeTimeWithPlural$3,
            d : '写械薪褜',
            dd : relativeTimeWithPlural$3,
            M : '屑械褋褟褑',
            MM : relativeTimeWithPlural$3,
            y : '谐芯写',
            yy : relativeTimeWithPlural$3
        },
        meridiemParse: /薪芯褔懈|褍褌褉邪|写薪褟|胁械褔械褉邪/i,
        isPM : function (input) {
            return /^(写薪褟|胁械褔械褉邪)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 4) {
                return '薪芯褔懈';
            } else if (hour &lt; 12) {
                return '褍褌褉邪';
            } else if (hour &lt; 17) {
                return '写薪褟';
            } else {
                return '胁械褔械褉邪';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(泄|谐芯|褟)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'M':
                case 'd':
                case 'DDD':
                    return number + '-泄';
                case 'D':
                    return number + '-谐芯';
                case 'w':
                case 'W':
                    return number + '-褟';
                default:
                    return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var months$8 = [
        '噩賳賵乇賷',
        '賮賷亘乇賵乇賷',
        '賲丕乇趩',
        '丕倬乇賷賱',
        '賲卅賷',
        '噩賵賳',
        '噩賵賱丕亍賽',
        '丌诏爻俳',
        '爻賷倬俳賲亘乇',
        '丌讵俳賵亘乇',
        '賳賵賲亘乇',
        '趭爻賲亘乇'
    ];
    var days$1 = [
        '丌趩乇',
        '爻賵賲乇',
        '丕诒丕乇賵',
        '丕乇亘毓',
        '禺賲賷爻',
        '噩賲毓',
        '趪賳趪乇'
    ];

    hooks.defineLocale('sd', {
        months : months$8,
        monthsShort : months$8,
        weekdays : days$1,
        weekdaysShort : days$1,
        weekdaysMin : days$1,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd貙 D MMMM YYYY HH:mm'
        },
        meridiemParse: /氐亘丨|卮丕賲/,
        isPM : function (input) {
            return '卮丕賲' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 12) {
                return '氐亘丨';
            }
            return '卮丕賲';
        },
        calendar : {
            sameDay : '[丕趧] LT',
            nextDay : '[爻趢丕诨賷] LT',
            nextWeek : 'dddd [丕诔賷賳 賴賮鬲賷 鬲賷] LT',
            lastDay : '[讵丕賱賴賴] LT',
            lastWeek : '[诏夭乇賷賱 賴賮鬲賷] dddd [鬲賷] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s 倬賵亍',
            past : '%s 丕诔',
            s : '趩賳丿 爻賷讵賳趭',
            ss : '%d 爻賷讵賳趭',
            m : '賴讵 賲賳俳',
            mm : '%d 賲賳俳',
            h : '賴讵 讵賱丕讵',
            hh : '%d 讵賱丕讵',
            d : '賴讵 趶賷賳賴賳',
            dd : '%d 趶賷賳賴賳',
            M : '賴讵 賲賴賷賳賵',
            MM : '%d 賲賴賷賳丕',
            y : '賴讵 爻丕賱',
            yy : '%d 爻丕賱'
        },
        preparse: function (string) {
            return string.replace(/貙/g, ',');
        },
        postformat: function (string) {
            return string.replace(/,/g, '貙');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('se', {
        months : 'o膽膽ajagem谩nnu_guovvam谩nnu_njuk膷am谩nnu_cuo艐om谩nnu_miessem谩nnu_geassem谩nnu_suoidnem谩nnu_borgem谩nnu_膷ak膷am谩nnu_golggotm谩nnu_sk谩bmam谩nnu_juovlam谩nnu'.split('_'),
        monthsShort : 'o膽膽j_guov_njuk_cuo_mies_geas_suoi_borg_膷ak膷_golg_sk谩b_juov'.split('_'),
        weekdays : 'sotnabeaivi_vuoss谩rga_ma艐艐eb谩rga_gaskavahkku_duorastat_bearjadat_l谩vvardat'.split('_'),
        weekdaysShort : 'sotn_vuos_ma艐_gask_duor_bear_l谩v'.split('_'),
        weekdaysMin : 's_v_m_g_d_b_L'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'MMMM D. [b.] YYYY',
            LLL : 'MMMM D. [b.] YYYY [ti.] HH:mm',
            LLLL : 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
        },
        calendar : {
            sameDay: '[otne ti] LT',
            nextDay: '[ihttin ti] LT',
            nextWeek: 'dddd [ti] LT',
            lastDay: '[ikte ti] LT',
            lastWeek: '[ovddit] dddd [ti] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : '%s gea啪es',
            past : 'ma艐it %s',
            s : 'moadde sekunddat',
            ss: '%d sekunddat',
            m : 'okta minuhta',
            mm : '%d minuhtat',
            h : 'okta diimmu',
            hh : '%d diimmut',
            d : 'okta beaivi',
            dd : '%d beaivvit',
            M : 'okta m谩nnu',
            MM : '%d m谩nut',
            y : 'okta jahki',
            yy : '%d jagit'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    /*jshint -W100*/
    hooks.defineLocale('si', {
        months : '喽⑧侗喾€喾忇痘喾抇喽脆窓喽多痘喾€喾忇痘喾抇喽膏窂喽秽穵喽窋_喽呧洞喾娾€嵿痘喾氞督喾奯喽膏窅喽亨窉_喽⑧窎喽编窉_喽⑧窎喽洁窉_喽呧稖喾澿穬喾娻董喾擾喾冟窅喽脆穵喽窅喽膏穵喽多痘喾奯喽斷稓喾娻董喾澿抖喽秽穵_喽编窚喾€喾愢陡喾娻抖喽秽穵_喽窓喾冟窅喽膏穵喽多痘喾�'.split('_'),
        monthsShort : '喽⑧侗_喽脆窓喽禵喽膏窂喽秽穵_喽呧洞喾奯喽膏窅喽亨窉_喽⑧窎喽编窉_喽⑧窎喽洁窉_喽呧稖喾漘喾冟窅喽脆穵_喽斷稓喾奯喽编窚喾€喾恄喽窓喾冟窅'.split('_'),
        weekdays : '喽夃痘喾掄动喾廮喾冟冻喾斷动喾廮喽呧稛喾勦痘喾斷穩喾忇动喾廮喽多动喾忇动喾廮喽多穵鈥嵿痘喾勦穬喾娻洞喽窉喽编穵喽窂_喾冟窉喽氞窋喽秽窂喽窂_喾冟窓喽编穬喾斷痘喾忇动喾�'.split('_'),
        weekdaysShort : '喽夃痘喾抇喾冟冻喾擾喽呧稛_喽多动喾廮喽多穵鈥嵿痘喾刜喾冟窉喽氞窋_喾冟窓喽�'.split('_'),
        weekdaysMin : '喽塤喾僟喽卂喽禵喽多穵鈥嵿痘_喾冟窉_喾冟窓'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'a h:mm',
            LTS : 'a h:mm:ss',
            L : 'YYYY/MM/DD',
            LL : 'YYYY MMMM D',
            LLL : 'YYYY MMMM D, a h:mm',
            LLLL : 'YYYY MMMM D [喾€喾愢侗喾抅 dddd, a h:mm:ss'
        },
        calendar : {
            sameDay : '[喽呧动] LT[喽',
            nextDay : '[喾勦窓喽 LT[喽',
            nextWeek : 'dddd LT[喽',
            lastDay : '[喽娻逗喾歖 LT[喽',
            lastWeek : '[喽脆穬喾斷稖喾掄逗] dddd LT[喽',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s喽氞窉喽编穵',
            past : '%s喽氞锭 喽脆窓喽�',
            s : '喽董喾娻洞喽� 喽氞窉喾勦窉喽脆逗',
            ss : '喽董喾娻洞喽� %d',
            m : '喽膏窉喽编窉喽穵喽窋喾€',
            mm : '喽膏窉喽编窉喽穵喽窋 %d',
            h : '喽脆窅喽�',
            hh : '喽脆窅喽� %d',
            d : '喽窉喽编逗',
            dd : '喽窉喽� %d',
            M : '喽膏窂喾冟逗',
            MM : '喽膏窂喾� %d',
            y : '喾€喾冟痘',
            yy : '喾€喾冟痘 %d'
        },
        dayOfMonthOrdinalParse: /\d{1,2} 喾€喾愢侗喾�/,
        ordinal : function (number) {
            return number + ' 喾€喾愢侗喾�';
        },
        meridiemParse : /喽脆窓喽� 喾€喽秽窋|喽脆穬喾� 喾€喽秽窋|喽脆窓.喾€|喽�.喾€./,
        isPM : function (input) {
            return input === '喽�.喾€.' || input === '喽脆穬喾� 喾€喽秽窋';
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours &gt; 11) {
                return isLower ? '喽�.喾€.' : '喽脆穬喾� 喾€喽秽窋';
            } else {
                return isLower ? '喽脆窓.喾€.' : '喽脆窓喽� 喾€喽秽窋';
            }
        }
    });

    //! moment.js locale configuration

    var months$9 = 'janu谩r_febru谩r_marec_apr铆l_m谩j_j煤n_j煤l_august_september_okt贸ber_november_december'.split('_'),
        monthsShort$6 = 'jan_feb_mar_apr_m谩j_j煤n_j煤l_aug_sep_okt_nov_dec'.split('_');
    function plural$5(n) {
        return (n &gt; 1) &amp;&amp; (n &lt; 5);
    }
    function translate$9(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':  // a few seconds / in a few seconds / a few seconds ago
                return (withoutSuffix || isFuture) ? 'p谩r sek煤nd' : 'p谩r sekundami';
            case 'ss': // 9 seconds / in 9 seconds / 9 seconds ago
                if (withoutSuffix || isFuture) {
                    return result + (plural$5(number) ? 'sekundy' : 'sek煤nd');
                } else {
                    return result + 'sekundami';
                }
                break;
            case 'm':  // a minute / in a minute / a minute ago
                return withoutSuffix ? 'min煤ta' : (isFuture ? 'min煤tu' : 'min煤tou');
            case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
                if (withoutSuffix || isFuture) {
                    return result + (plural$5(number) ? 'min煤ty' : 'min煤t');
                } else {
                    return result + 'min煤tami';
                }
                break;
            case 'h':  // an hour / in an hour / an hour ago
                return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
            case 'hh': // 9 hours / in 9 hours / 9 hours ago
                if (withoutSuffix || isFuture) {
                    return result + (plural$5(number) ? 'hodiny' : 'hod铆n');
                } else {
                    return result + 'hodinami';
                }
                break;
            case 'd':  // a day / in a day / a day ago
                return (withoutSuffix || isFuture) ? 'de艌' : 'd艌om';
            case 'dd': // 9 days / in 9 days / 9 days ago
                if (withoutSuffix || isFuture) {
                    return result + (plural$5(number) ? 'dni' : 'dn铆');
                } else {
                    return result + 'd艌ami';
                }
                break;
            case 'M':  // a month / in a month / a month ago
                return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
            case 'MM': // 9 months / in 9 months / 9 months ago
                if (withoutSuffix || isFuture) {
                    return result + (plural$5(number) ? 'mesiace' : 'mesiacov');
                } else {
                    return result + 'mesiacmi';
                }
                break;
            case 'y':  // a year / in a year / a year ago
                return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
            case 'yy': // 9 years / in 9 years / 9 years ago
                if (withoutSuffix || isFuture) {
                    return result + (plural$5(number) ? 'roky' : 'rokov');
                } else {
                    return result + 'rokmi';
                }
                break;
        }
    }

    hooks.defineLocale('sk', {
        months : months$9,
        monthsShort : monthsShort$6,
        weekdays : 'nede木a_pondelok_utorok_streda_拧tvrtok_piatok_sobota'.split('_'),
        weekdaysShort : 'ne_po_ut_st_拧t_pi_so'.split('_'),
        weekdaysMin : 'ne_po_ut_st_拧t_pi_so'.split('_'),
        longDateFormat : {
            LT: 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd D. MMMM YYYY H:mm'
        },
        calendar : {
            sameDay: '[dnes o] LT',
            nextDay: '[zajtra o] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[v nede木u o] LT';
                    case 1:
                    case 2:
                        return '[v] dddd [o] LT';
                    case 3:
                        return '[v stredu o] LT';
                    case 4:
                        return '[vo 拧tvrtok o] LT';
                    case 5:
                        return '[v piatok o] LT';
                    case 6:
                        return '[v sobotu o] LT';
                }
            },
            lastDay: '[v膷era o] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[minul煤 nede木u o] LT';
                    case 1:
                    case 2:
                        return '[minul媒] dddd [o] LT';
                    case 3:
                        return '[minul煤 stredu o] LT';
                    case 4:
                    case 5:
                        return '[minul媒] dddd [o] LT';
                    case 6:
                        return '[minul煤 sobotu o] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'za %s',
            past : 'pred %s',
            s : translate$9,
            ss : translate$9,
            m : translate$9,
            mm : translate$9,
            h : translate$9,
            hh : translate$9,
            d : translate$9,
            dd : translate$9,
            M : translate$9,
            MM : translate$9,
            y : translate$9,
            yy : translate$9
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    function processRelativeTime$6(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':
                return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';
            case 'ss':
                if (number === 1) {
                    result += withoutSuffix ? 'sekundo' : 'sekundi';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'sekundi' : 'sekundah';
                } else if (number &lt; 5) {
                    result += withoutSuffix || isFuture ? 'sekunde' : 'sekundah';
                } else {
                    result += 'sekund';
                }
                return result;
            case 'm':
                return withoutSuffix ? 'ena minuta' : 'eno minuto';
            case 'mm':
                if (number === 1) {
                    result += withoutSuffix ? 'minuta' : 'minuto';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
                } else if (number &lt; 5) {
                    result += withoutSuffix || isFuture ? 'minute' : 'minutami';
                } else {
                    result += withoutSuffix || isFuture ? 'minut' : 'minutami';
                }
                return result;
            case 'h':
                return withoutSuffix ? 'ena ura' : 'eno uro';
            case 'hh':
                if (number === 1) {
                    result += withoutSuffix ? 'ura' : 'uro';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'uri' : 'urama';
                } else if (number &lt; 5) {
                    result += withoutSuffix || isFuture ? 'ure' : 'urami';
                } else {
                    result += withoutSuffix || isFuture ? 'ur' : 'urami';
                }
                return result;
            case 'd':
                return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';
            case 'dd':
                if (number === 1) {
                    result += withoutSuffix || isFuture ? 'dan' : 'dnem';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
                } else {
                    result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
                }
                return result;
            case 'M':
                return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';
            case 'MM':
                if (number === 1) {
                    result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
                } else if (number &lt; 5) {
                    result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
                } else {
                    result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
                }
                return result;
            case 'y':
                return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';
            case 'yy':
                if (number === 1) {
                    result += withoutSuffix || isFuture ? 'leto' : 'letom';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'leti' : 'letoma';
                } else if (number &lt; 5) {
                    result += withoutSuffix || isFuture ? 'leta' : 'leti';
                } else {
                    result += withoutSuffix || isFuture ? 'let' : 'leti';
                }
                return result;
        }
    }

    hooks.defineLocale('sl', {
        months : 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
        monthsShort : 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays : 'nedelja_ponedeljek_torek_sreda_膷etrtek_petek_sobota'.split('_'),
        weekdaysShort : 'ned._pon._tor._sre._膷et._pet._sob.'.split('_'),
        weekdaysMin : 'ne_po_to_sr_膷e_pe_so'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd, D. MMMM YYYY H:mm'
        },
        calendar : {
            sameDay  : '[danes ob] LT',
            nextDay  : '[jutri ob] LT',

            nextWeek : function () {
                switch (this.day()) {
                    case 0:
                        return '[v] [nedeljo] [ob] LT';
                    case 3:
                        return '[v] [sredo] [ob] LT';
                    case 6:
                        return '[v] [soboto] [ob] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[v] dddd [ob] LT';
                }
            },
            lastDay  : '[v膷eraj ob] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 0:
                        return '[prej拧njo] [nedeljo] [ob] LT';
                    case 3:
                        return '[prej拧njo] [sredo] [ob] LT';
                    case 6:
                        return '[prej拧njo] [soboto] [ob] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[prej拧nji] dddd [ob] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : '膷ez %s',
            past   : 'pred %s',
            s      : processRelativeTime$6,
            ss     : processRelativeTime$6,
            m      : processRelativeTime$6,
            mm     : processRelativeTime$6,
            h      : processRelativeTime$6,
            hh     : processRelativeTime$6,
            d      : processRelativeTime$6,
            dd     : processRelativeTime$6,
            M      : processRelativeTime$6,
            MM     : processRelativeTime$6,
            y      : processRelativeTime$6,
            yy     : processRelativeTime$6
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('sq', {
        months : 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_N毛ntor_Dhjetor'.split('_'),
        monthsShort : 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_N毛n_Dhj'.split('_'),
        weekdays : 'E Diel_E H毛n毛_E Mart毛_E M毛rkur毛_E Enjte_E Premte_E Shtun毛'.split('_'),
        weekdaysShort : 'Die_H毛n_Mar_M毛r_Enj_Pre_Sht'.split('_'),
        weekdaysMin : 'D_H_Ma_M毛_E_P_Sh'.split('_'),
        weekdaysParseExact : true,
        meridiemParse: /PD|MD/,
        isPM: function (input) {
            return input.charAt(0) === 'M';
        },
        meridiem : function (hours, minutes, isLower) {
            return hours &lt; 12 ? 'PD' : 'MD';
        },
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Sot n毛] LT',
            nextDay : '[Nes毛r n毛] LT',
            nextWeek : 'dddd [n毛] LT',
            lastDay : '[Dje n毛] LT',
            lastWeek : 'dddd [e kaluar n毛] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'n毛 %s',
            past : '%s m毛 par毛',
            s : 'disa sekonda',
            ss : '%d sekonda',
            m : 'nj毛 minut毛',
            mm : '%d minuta',
            h : 'nj毛 or毛',
            hh : '%d or毛',
            d : 'nj毛 dit毛',
            dd : '%d dit毛',
            M : 'nj毛 muaj',
            MM : '%d muaj',
            y : 'nj毛 vit',
            yy : '%d vite'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var translator$1 = {
        words: { //Different grammatical cases
            ss: ['褋械泻褍薪写邪', '褋械泻褍薪写械', '褋械泻褍薪写懈'],
            m: ['褬械写邪薪 屑懈薪褍褌', '褬械写薪械 屑懈薪褍褌械'],
            mm: ['屑懈薪褍褌', '屑懈薪褍褌械', '屑懈薪褍褌邪'],
            h: ['褬械写邪薪 褋邪褌', '褬械写薪芯谐 褋邪褌邪'],
            hh: ['褋邪褌', '褋邪褌邪', '褋邪褌懈'],
            dd: ['写邪薪', '写邪薪邪', '写邪薪邪'],
            MM: ['屑械褋械褑', '屑械褋械褑邪', '屑械褋械褑懈'],
            yy: ['谐芯写懈薪邪', '谐芯写懈薪械', '谐芯写懈薪邪']
        },
        correctGrammaticalCase: function (number, wordKey) {
            return number === 1 ? wordKey[0] : (number &gt;= 2 &amp;&amp; number &lt;= 4 ? wordKey[1] : wordKey[2]);
        },
        translate: function (number, withoutSuffix, key) {
            var wordKey = translator$1.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + translator$1.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    hooks.defineLocale('sr-cyrl', {
        months: '褬邪薪褍邪褉_褎械斜褉褍邪褉_屑邪褉褌_邪锌褉懈谢_屑邪褬_褬褍薪_褬褍谢_邪胁谐褍褋褌_褋械锌褌械屑斜邪褉_芯泻褌芯斜邪褉_薪芯胁械屑斜邪褉_写械褑械屑斜邪褉'.split('_'),
        monthsShort: '褬邪薪._褎械斜._屑邪褉._邪锌褉._屑邪褬_褬褍薪_褬褍谢_邪胁谐._褋械锌._芯泻褌._薪芯胁._写械褑.'.split('_'),
        monthsParseExact: true,
        weekdays: '薪械写械褭邪_锌芯薪械写械褭邪泻_褍褌芯褉邪泻_褋褉械写邪_褔械褌胁褉褌邪泻_锌械褌邪泻_褋褍斜芯褌邪'.split('_'),
        weekdaysShort: '薪械写._锌芯薪._褍褌芯._褋褉械._褔械褌._锌械褌._褋褍斜.'.split('_'),
        weekdaysMin: '薪械_锌芯_褍褌_褋褉_褔械_锌械_褋褍'.split('_'),
        weekdaysParseExact : true,
        longDateFormat: {
            LT: 'H:mm',
            LTS : 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[写邪薪邪褋 褍] LT',
            nextDay: '[褋褍褌褉邪 褍] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[褍] [薪械写械褭褍] [褍] LT';
                    case 3:
                        return '[褍] [褋褉械写褍] [褍] LT';
                    case 6:
                        return '[褍] [褋褍斜芯褌褍] [褍] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[褍] dddd [褍] LT';
                }
            },
            lastDay  : '[褬褍褔械 褍] LT',
            lastWeek : function () {
                var lastWeekDays = [
                    '[锌褉芯褕谢械] [薪械写械褭械] [褍] LT',
                    '[锌褉芯褕谢芯谐] [锌芯薪械写械褭泻邪] [褍] LT',
                    '[锌褉芯褕谢芯谐] [褍褌芯褉泻邪] [褍] LT',
                    '[锌褉芯褕谢械] [褋褉械写械] [褍] LT',
                    '[锌褉芯褕谢芯谐] [褔械褌胁褉褌泻邪] [褍] LT',
                    '[锌褉芯褕谢芯谐] [锌械褌泻邪] [褍] LT',
                    '[锌褉芯褕谢械] [褋褍斜芯褌械] [褍] LT'
                ];
                return lastWeekDays[this.day()];
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : '蟹邪 %s',
            past   : '锌褉械 %s',
            s      : '薪械泻芯谢懈泻芯 褋械泻褍薪写懈',
            ss     : translator$1.translate,
            m      : translator$1.translate,
            mm     : translator$1.translate,
            h      : translator$1.translate,
            hh     : translator$1.translate,
            d      : '写邪薪',
            dd     : translator$1.translate,
            M      : '屑械褋械褑',
            MM     : translator$1.translate,
            y      : '谐芯写懈薪褍',
            yy     : translator$1.translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var translator$2 = {
        words: { //Different grammatical cases
            ss: ['sekunda', 'sekunde', 'sekundi'],
            m: ['jedan minut', 'jedne minute'],
            mm: ['minut', 'minute', 'minuta'],
            h: ['jedan sat', 'jednog sata'],
            hh: ['sat', 'sata', 'sati'],
            dd: ['dan', 'dana', 'dana'],
            MM: ['mesec', 'meseca', 'meseci'],
            yy: ['godina', 'godine', 'godina']
        },
        correctGrammaticalCase: function (number, wordKey) {
            return number === 1 ? wordKey[0] : (number &gt;= 2 &amp;&amp; number &lt;= 4 ? wordKey[1] : wordKey[2]);
        },
        translate: function (number, withoutSuffix, key) {
            var wordKey = translator$2.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + translator$2.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    hooks.defineLocale('sr', {
        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays: 'nedelja_ponedeljak_utorak_sreda_膷etvrtak_petak_subota'.split('_'),
        weekdaysShort: 'ned._pon._uto._sre._膷et._pet._sub.'.split('_'),
        weekdaysMin: 'ne_po_ut_sr_膷e_pe_su'.split('_'),
        weekdaysParseExact : true,
        longDateFormat: {
            LT: 'H:mm',
            LTS : 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[danas u] LT',
            nextDay: '[sutra u] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedelju] [u] LT';
                    case 3:
                        return '[u] [sredu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay  : '[ju膷e u] LT',
            lastWeek : function () {
                var lastWeekDays = [
                    '[pro拧le] [nedelje] [u] LT',
                    '[pro拧log] [ponedeljka] [u] LT',
                    '[pro拧log] [utorka] [u] LT',
                    '[pro拧le] [srede] [u] LT',
                    '[pro拧log] [膷etvrtka] [u] LT',
                    '[pro拧log] [petka] [u] LT',
                    '[pro拧le] [subote] [u] LT'
                ];
                return lastWeekDays[this.day()];
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'za %s',
            past   : 'pre %s',
            s      : 'nekoliko sekundi',
            ss     : translator$2.translate,
            m      : translator$2.translate,
            mm     : translator$2.translate,
            h      : translator$2.translate,
            hh     : translator$2.translate,
            d      : 'dan',
            dd     : translator$2.translate,
            M      : 'mesec',
            MM     : translator$2.translate,
            y      : 'godinu',
            yy     : translator$2.translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('ss', {
        months : "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split('_'),
        monthsShort : 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
        weekdays : 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split('_'),
        weekdaysShort : 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
        weekdaysMin : 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendar : {
            sameDay : '[Namuhla nga] LT',
            nextDay : '[Kusasa nga] LT',
            nextWeek : 'dddd [nga] LT',
            lastDay : '[Itolo nga] LT',
            lastWeek : 'dddd [leliphelile] [nga] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'nga %s',
            past : 'wenteka nga %s',
            s : 'emizuzwana lomcane',
            ss : '%d mzuzwana',
            m : 'umzuzu',
            mm : '%d emizuzu',
            h : 'lihora',
            hh : '%d emahora',
            d : 'lilanga',
            dd : '%d emalanga',
            M : 'inyanga',
            MM : '%d tinyanga',
            y : 'umnyaka',
            yy : '%d iminyaka'
        },
        meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
        meridiem : function (hours, minutes, isLower) {
            if (hours &lt; 11) {
                return 'ekuseni';
            } else if (hours &lt; 15) {
                return 'emini';
            } else if (hours &lt; 19) {
                return 'entsambama';
            } else {
                return 'ebusuku';
            }
        },
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'ekuseni') {
                return hour;
            } else if (meridiem === 'emini') {
                return hour &gt;= 11 ? hour : hour + 12;
            } else if (meridiem === 'entsambama' || meridiem === 'ebusuku') {
                if (hour === 0) {
                    return 0;
                }
                return hour + 12;
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal : '%d',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('sv', {
        months : 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
        weekdays : 's枚ndag_m氓ndag_tisdag_onsdag_torsdag_fredag_l枚rdag'.split('_'),
        weekdaysShort : 's枚n_m氓n_tis_ons_tor_fre_l枚r'.split('_'),
        weekdaysMin : 's枚_m氓_ti_on_to_fr_l枚'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY [kl.] HH:mm',
            LLLL : 'dddd D MMMM YYYY [kl.] HH:mm',
            lll : 'D MMM YYYY HH:mm',
            llll : 'ddd D MMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Idag] LT',
            nextDay: '[Imorgon] LT',
            lastDay: '[Ig氓r] LT',
            nextWeek: '[P氓] dddd LT',
            lastWeek: '[I] dddd[s] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'om %s',
            past : 'f枚r %s sedan',
            s : 'n氓gra sekunder',
            ss : '%d sekunder',
            m : 'en minut',
            mm : '%d minuter',
            h : 'en timme',
            hh : '%d timmar',
            d : 'en dag',
            dd : '%d dagar',
            M : 'en m氓nad',
            MM : '%d m氓nader',
            y : 'ett 氓r',
            yy : '%d 氓r'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(e|a)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'e' :
                (b === 1) ? 'a' :
                (b === 2) ? 'a' :
                (b === 3) ? 'e' : 'e';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('sw', {
        months : 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split('_'),
        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
        weekdays : 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
        weekdaysShort : 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
        weekdaysMin : 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[leo saa] LT',
            nextDay : '[kesho saa] LT',
            nextWeek : '[wiki ijayo] dddd [saat] LT',
            lastDay : '[jana] LT',
            lastWeek : '[wiki iliyopita] dddd [saat] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s baadaye',
            past : 'tokea %s',
            s : 'hivi punde',
            ss : 'sekunde %d',
            m : 'dakika moja',
            mm : 'dakika %d',
            h : 'saa limoja',
            hh : 'masaa %d',
            d : 'siku moja',
            dd : 'masiku %d',
            M : 'mwezi mmoja',
            MM : 'miezi %d',
            y : 'mwaka mmoja',
            yy : 'miaka %d'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var symbolMap$f = {
        '1': '喁�',
        '2': '喁�',
        '3': '喁�',
        '4': '喁�',
        '5': '喁�',
        '6': '喁�',
        '7': '喁�',
        '8': '喁�',
        '9': '喁�',
        '0': '喁�'
    }, numberMap$e = {
        '喁�': '1',
        '喁�': '2',
        '喁�': '3',
        '喁�': '4',
        '喁�': '5',
        '喁�': '6',
        '喁�': '7',
        '喁�': '8',
        '喁�': '9',
        '喁�': '0'
    };

    hooks.defineLocale('ta', {
        months : '喈溹喈掂喈縚喈喈瘝喈班喈班_喈喈班瘝喈氞瘝_喈忇喁嵿喈侧瘝_喈瘒_喈溹瘋喈┼瘝_喈溹瘋喈侧瘓_喈嗋畷喈膏瘝喈熰瘝_喈氞瘑喈瘝喈熰瘑喈瘝喈喁峗喈呧畷喁嵿疅喁囙喈喁峗喈ㄠ喈瘝喈喁峗喈熰喈氞喁嵿喈班瘝'.split('_'),
        monthsShort : '喈溹喈掂喈縚喈喈瘝喈班喈班_喈喈班瘝喈氞瘝_喈忇喁嵿喈侧瘝_喈瘒_喈溹瘋喈┼瘝_喈溹瘋喈侧瘓_喈嗋畷喈膏瘝喈熰瘝_喈氞瘑喈瘝喈熰瘑喈瘝喈喁峗喈呧畷喁嵿疅喁囙喈喁峗喈ㄠ喈瘝喈喁峗喈熰喈氞喁嵿喈班瘝'.split('_'),
        weekdays : '喈炧喈喈编瘝喈编瘉喈曕瘝喈曕喈脆喁坃喈む喈權瘝喈曕疅喁嵿畷喈苦喈瘓_喈氞瘑喈掂瘝喈掂喈瘝喈曕喈脆喁坃喈瘉喈む喁嵿畷喈苦喈瘓_喈掂喈喈脆畷喁嵿畷喈苦喈瘓_喈掂瘑喈赤瘝喈赤喈曕瘝喈曕喈脆喁坃喈氞喈苦畷喁嵿畷喈苦喈瘓'.split('_'),
        weekdaysShort : '喈炧喈喈编瘉_喈む喈權瘝喈曕喁峗喈氞瘑喈掂瘝喈掂喈瘝_喈瘉喈む喁峗喈掂喈喈脆喁峗喈掂瘑喈赤瘝喈赤_喈氞喈�'.split('_'),
        weekdaysMin : '喈炧_喈む_喈氞瘑_喈瘉_喈掂_喈掂瘑_喈�'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, HH:mm',
            LLLL : 'dddd, D MMMM YYYY, HH:mm'
        },
        calendar : {
            sameDay : '[喈囙喁嵿喁乚 LT',
            nextDay : '[喈ㄠ喈赤瘓] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[喈ㄠ瘒喈编瘝喈编瘉] LT',
            lastWeek : '[喈曕疅喈ㄠ瘝喈� 喈掂喈班喁峕 dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s 喈囙喁�',
            past : '%s 喈瘉喈┼瘝',
            s : '喈掄喁� 喈氞喈� 喈掂喈ㄠ喈熰喈曕喁�',
            ss : '%d 喈掂喈ㄠ喈熰喈曕喁�',
            m : '喈掄喁� 喈ㄠ喈喈熰喁�',
            mm : '%d 喈ㄠ喈喈熰畽喁嵿畷喈赤瘝',
            h : '喈掄喁� 喈喈� 喈ㄠ瘒喈班喁�',
            hh : '%d 喈喈� 喈ㄠ瘒喈班喁�',
            d : '喈掄喁� 喈ㄠ喈赤瘝',
            dd : '%d 喈ㄠ喈熰瘝喈曕喁�',
            M : '喈掄喁� 喈喈む喁�',
            MM : '%d 喈喈む畽喁嵿畷喈赤瘝',
            y : '喈掄喁� 喈掂喁佮疅喈瘝',
            yy : '%d 喈嗋喁嵿疅喁佮畷喈赤瘝'
        },
        dayOfMonthOrdinalParse: /\d{1,2}喈掂喁�/,
        ordinal : function (number) {
            return number + '喈掂喁�';
        },
        preparse: function (string) {
            return string.replace(/[喁о喁┼喁喁喁]/g, function (match) {
                return numberMap$e[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap$f[match];
            });
        },
        // refer http://ta.wikipedia.org/s/1er1
        meridiemParse: /喈喈喁峾喈掂瘓喈曕喁坾喈曕喈侧瘓|喈ㄠ喁嵿喈曕喁峾喈庎喁嵿喈距疅喁亅喈喈侧瘓/,
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 2) {
                return ' 喈喈喁�';
            } else if (hour &lt; 6) {
                return ' 喈掂瘓喈曕喁�';  // 喈掂瘓喈曕喁�
            } else if (hour &lt; 10) {
                return ' 喈曕喈侧瘓'; // 喈曕喈侧瘓
            } else if (hour &lt; 14) {
                return ' 喈ㄠ喁嵿喈曕喁�'; // 喈ㄠ喁嵿喈曕喁�
            } else if (hour &lt; 18) {
                return ' 喈庎喁嵿喈距疅喁�'; // 喈庎喁嵿喈距疅喁�
            } else if (hour &lt; 22) {
                return ' 喈喈侧瘓'; // 喈喈侧瘓
            } else {
                return ' 喈喈喁�';
            }
        },
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '喈喈喁�') {
                return hour &lt; 2 ? hour : hour + 12;
            } else if (meridiem === '喈掂瘓喈曕喁�' || meridiem === '喈曕喈侧瘓') {
                return hour;
            } else if (meridiem === '喈ㄠ喁嵿喈曕喁�') {
                return hour &gt;= 10 ? hour : hour + 12;
            } else {
                return hour + 12;
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('te', {
        months : '喟溹皑喟掂鞍喟縚喟翱喟睄喟班暗喟班翱_喟熬喟班睄喟氞翱_喟忇蔼啾嵿鞍喟苦安啾峗喟眹_喟溹眰喟ㄠ睄_喟溹眮喟侧眻_喟嗋皸喟膏睄喟熰眮_喟膏眴喟睄喟熰眴喟傕艾喟班睄_喟呧皶啾嵿盁啾嬥艾喟班睄_喟ㄠ暗喟傕艾喟班睄_喟∴翱喟膏眴喟傕艾喟班睄'.split('_'),
        monthsShort : '喟溹皑._喟翱喟睄喟�._喟熬喟班睄喟氞翱_喟忇蔼啾嵿鞍喟�._喟眹_喟溹眰喟ㄠ睄_喟溹眮喟侧眻_喟嗋皸._喟膏眴喟睄._喟呧皶啾嵿盁啾�._喟ㄠ暗._喟∴翱喟膏眴.'.split('_'),
        monthsParseExact : true,
        weekdays : '喟嗋唉喟苦暗喟距鞍喟俖喟膏眿喟暗喟距鞍喟俖喟皞喟椸俺喟掂熬喟班皞_喟眮喟о暗喟距鞍喟俖喟椸眮喟班眮喟掂熬喟班皞_喟多眮喟曕睄喟班暗喟距鞍喟俖喟多皑喟苦暗喟距鞍喟�'.split('_'),
        weekdaysShort : '喟嗋唉喟縚喟膏眿喟甠喟皞喟椸俺_喟眮喟喟椸眮喟班眮_喟多眮喟曕睄喟癬喟多皑喟�'.split('_'),
        weekdaysMin : '喟哶喟膏眿_喟皞_喟眮_喟椸眮_喟多眮_喟�'.split('_'),
        longDateFormat : {
            LT : 'A h:mm',
            LTS : 'A h:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm',
            LLLL : 'dddd, D MMMM YYYY, A h:mm'
        },
        calendar : {
            sameDay : '[喟ㄠ眹喟∴眮] LT',
            nextDay : '[喟班眹喟眮] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[喟ㄠ翱喟ㄠ睄喟╙ LT',
            lastWeek : '[喟椸挨] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s 喟侧眿',
            past : '%s 喟曕睄喟班翱喟む皞',
            s : '喟曕眾喟ㄠ睄喟ㄠ翱 喟曕睄喟粪埃喟距安啾�',
            ss : '%d 喟膏眴喟曕皑啾嵿安啾�',
            m : '喟掄皶 喟ㄠ翱喟翱喟粪皞',
            mm : '%d 喟ㄠ翱喟翱喟粪熬喟侧眮',
            h : '喟掄皶 喟椸皞喟�',
            hh : '%d 喟椸皞喟熰安啾�',
            d : '喟掄皶 喟班眿喟溹眮',
            dd : '%d 喟班眿喟溹眮喟侧眮',
            M : '喟掄皶 喟ㄠ眴喟�',
            MM : '%d 喟ㄠ眴喟侧安啾�',
            y : '喟掄皶 喟膏皞喟掂挨啾嵿案喟班皞',
            yy : '%d 喟膏皞喟掂挨啾嵿案喟班熬喟侧眮'
        },
        dayOfMonthOrdinalParse : /\d{1,2}喟�/,
        ordinal : '%d喟�',
        meridiemParse: /喟班熬喟む睄喟班翱|喟夃唉喟皞|喟哀啾嵿隘喟距肮啾嵿皑喟倈喟膏熬喟皞喟む睄喟班皞/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '喟班熬喟む睄喟班翱') {
                return hour &lt; 4 ? hour : hour + 12;
            } else if (meridiem === '喟夃唉喟皞') {
                return hour;
            } else if (meridiem === '喟哀啾嵿隘喟距肮啾嵿皑喟�') {
                return hour &gt;= 10 ? hour : hour + 12;
            } else if (meridiem === '喟膏熬喟皞喟む睄喟班皞') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 4) {
                return '喟班熬喟む睄喟班翱';
            } else if (hour &lt; 10) {
                return '喟夃唉喟皞';
            } else if (hour &lt; 17) {
                return '喟哀啾嵿隘喟距肮啾嵿皑喟�';
            } else if (hour &lt; 20) {
                return '喟膏熬喟皞喟む睄喟班皞';
            } else {
                return '喟班熬喟む睄喟班翱';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('tet', {
        months : 'Janeiru_Fevereiru_Marsu_Abril_Maiu_Ju帽u_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru'.split('_'),
        monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        weekdays : 'Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu'.split('_'),
        weekdaysShort : 'Dom_Seg_Ters_Kua_Kint_Sest_Sab'.split('_'),
        weekdaysMin : 'Do_Seg_Te_Ku_Ki_Ses_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Ohin iha] LT',
            nextDay: '[Aban iha] LT',
            nextWeek: 'dddd [iha] LT',
            lastDay: '[Horiseik iha] LT',
            lastWeek: 'dddd [semana kotuk] [iha] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'iha %s',
            past : '%s liuba',
            s : 'minutu balun',
            ss : 'minutu %d',
            m : 'minutu ida',
            mm : 'minutu %d',
            h : 'oras ida',
            hh : 'oras %d',
            d : 'loron ida',
            dd : 'loron %d',
            M : 'fulan ida',
            MM : 'fulan %d',
            y : 'tinan ida',
            yy : 'tinan %d'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var suffixes$3 = {
        0: '-褍屑',
        1: '-褍屑',
        2: '-褞屑',
        3: '-褞屑',
        4: '-褍屑',
        5: '-褍屑',
        6: '-褍屑',
        7: '-褍屑',
        8: '-褍屑',
        9: '-褍屑',
        10: '-褍屑',
        12: '-褍屑',
        13: '-褍屑',
        20: '-褍屑',
        30: '-褞屑',
        40: '-褍屑',
        50: '-褍屑',
        60: '-褍屑',
        70: '-褍屑',
        80: '-褍屑',
        90: '-褍屑',
        100: '-褍屑'
    };

    hooks.defineLocale('tg', {
        months : '褟薪胁邪褉_褎械胁褉邪谢_屑邪褉褌_邪锌褉械谢_屑邪泄_懈褞薪_懈褞谢_邪胁谐褍褋褌_褋械薪褌褟斜褉_芯泻褌褟斜褉_薪芯褟斜褉_写械泻邪斜褉'.split('_'),
        monthsShort : '褟薪胁_褎械胁_屑邪褉_邪锌褉_屑邪泄_懈褞薪_懈褞谢_邪胁谐_褋械薪_芯泻褌_薪芯褟_写械泻'.split('_'),
        weekdays : '褟泻褕邪薪斜械_写褍褕邪薪斜械_褋械褕邪薪斜械_褔芯褉褕邪薪斜械_锌邪薪曳褕邪薪斜械_曳褍屑褗邪_褕邪薪斜械'.split('_'),
        weekdaysShort : '褟褕斜_写褕斜_褋褕斜_褔褕斜_锌褕斜_曳褍屑_褕薪斜'.split('_'),
        weekdaysMin : '褟褕_写褕_褋褕_褔褕_锌褕_曳屑_褕斜'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[袠屑褉盈蟹 褋芯邪褌懈] LT',
            nextDay : '[袩邪谐芯页 褋芯邪褌懈] LT',
            lastDay : '[袛懈褉盈蟹 褋芯邪褌懈] LT',
            nextWeek : 'dddd[懈] [页邪褎褌邪懈 芯褟薪写邪 褋芯邪褌懈] LT',
            lastWeek : 'dddd[懈] [页邪褎褌邪懈 谐褍蟹邪褕褌邪 褋芯邪褌懈] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '斜邪褗写懈 %s',
            past : '%s 锌械褕',
            s : '褟泻褔邪薪写 褋芯薪懈褟',
            m : '褟泻 写邪覜懈覜邪',
            mm : '%d 写邪覜懈覜邪',
            h : '褟泻 褋芯邪褌',
            hh : '%d 褋芯邪褌',
            d : '褟泻 褉盈蟹',
            dd : '%d 褉盈蟹',
            M : '褟泻 屑芯页',
            MM : '%d 屑芯页',
            y : '褟泻 褋芯谢',
            yy : '%d 褋芯谢'
        },
        meridiemParse: /褕邪斜|褋褍斜页|褉盈蟹|斜械谐芯页/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '褕邪斜') {
                return hour &lt; 4 ? hour : hour + 12;
            } else if (meridiem === '褋褍斜页') {
                return hour;
            } else if (meridiem === '褉盈蟹') {
                return hour &gt;= 11 ? hour : hour + 12;
            } else if (meridiem === '斜械谐芯页') {
                return hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour &lt; 4) {
                return '褕邪斜';
            } else if (hour &lt; 11) {
                return '褋褍斜页';
            } else if (hour &lt; 16) {
                return '褉盈蟹';
            } else if (hour &lt; 19) {
                return '斜械谐芯页';
            } else {
                return '褕邪斜';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(褍屑|褞屑)/,
        ordinal: function (number) {
            var a = number % 10,
                b = number &gt;= 100 ? 100 : null;
            return number + (suffixes$3[number] || suffixes$3[a] || suffixes$3[b]);
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('th', {
        months : '喔∴竵喔｀覆喔勦浮_喔佮父喔∴笭喔侧笧喔编笝喔樴箤_喔∴傅喔權覆喔勦浮_喙€喔∴俯喔侧涪喔檁喔炧袱喔┼笭喔侧竸喔喔∴复喔栢父喔權覆喔⑧笝_喔佮福喔佮笌喔侧竸喔喔复喔囙斧喔侧竸喔喔佮副喔權涪喔侧涪喔檁喔曕父喔ム覆喔勦浮_喔炧袱喔ㄠ笀喔脆竵喔侧涪喔檁喔樴副喔權抚喔侧竸喔�'.split('_'),
        monthsShort : '喔�.喔�._喔�.喔�._喔∴傅.喔�._喙€喔�.喔�._喔�.喔�._喔∴复.喔�._喔�.喔�._喔�.喔�._喔�.喔�._喔�.喔�._喔�.喔�._喔�.喔�.'.split('_'),
        monthsParseExact: true,
        weekdays : '喔覆喔椸复喔曕涪喙宊喔堗副喔權笚喔｀箤_喔副喔囙竸喔侧福_喔炧父喔榑喔炧袱喔副喔笟喔斷傅_喔ㄠ父喔佮福喙宊喙€喔覆喔｀箤'.split('_'),
        weekdaysShort : '喔覆喔椸复喔曕涪喙宊喔堗副喔權笚喔｀箤_喔副喔囙竸喔侧福_喔炧父喔榑喔炧袱喔副喔猒喔ㄠ父喔佮福喙宊喙€喔覆喔｀箤'.split('_'), // yes, three characters difference
        weekdaysMin : '喔覆._喔�._喔�._喔�._喔炧袱._喔�._喔�.'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY 喙€喔о弗喔� H:mm',
            LLLL : '喔о副喔檇ddd喔椸傅喙� D MMMM YYYY 喙€喔о弗喔� H:mm'
        },
        meridiemParse: /喔佮箞喔笝喙€喔椸傅喙堗涪喔噟喔弗喔编竾喙€喔椸傅喙堗涪喔�/,
        isPM: function (input) {
            return input === '喔弗喔编竾喙€喔椸傅喙堗涪喔�';
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 12) {
                return '喔佮箞喔笝喙€喔椸傅喙堗涪喔�';
            } else {
                return '喔弗喔编竾喙€喔椸傅喙堗涪喔�';
            }
        },
        calendar : {
            sameDay : '[喔о副喔權笝喔掂箟 喙€喔о弗喔瞉 LT',
            nextDay : '[喔炧福喔膏箞喔囙笝喔掂箟 喙€喔о弗喔瞉 LT',
            nextWeek : 'dddd[喔笝喙夃覆 喙€喔о弗喔瞉 LT',
            lastDay : '[喙€喔∴阜喙堗腑喔о覆喔權笝喔掂箟 喙€喔о弗喔瞉 LT',
            lastWeek : '[喔о副喔橾dddd[喔椸傅喙堗箒喔ム箟喔� 喙€喔о弗喔瞉 LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '喔傅喔� %s',
            past : '%s喔椸傅喙堗箒喔ム箟喔�',
            s : '喙勦浮喙堗竵喔掂箞喔о复喔權覆喔椸傅',
            ss : '%d 喔о复喔權覆喔椸傅',
            m : '1 喔權覆喔椸傅',
            mm : '%d 喔權覆喔椸傅',
            h : '1 喔娻副喙堗抚喙傕浮喔�',
            hh : '%d 喔娻副喙堗抚喙傕浮喔�',
            d : '1 喔о副喔�',
            dd : '%d 喔о副喔�',
            M : '1 喙€喔斷阜喔笝',
            MM : '%d 喙€喔斷阜喔笝',
            y : '1 喔涏傅',
            yy : '%d 喔涏傅'
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('tl-ph', {
        months : 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
        monthsShort : 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
        weekdays : 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
        weekdaysShort : 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
        weekdaysMin : 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'MM/D/YYYY',
            LL : 'MMMM D, YYYY',
            LLL : 'MMMM D, YYYY HH:mm',
            LLLL : 'dddd, MMMM DD, YYYY HH:mm'
        },
        calendar : {
            sameDay: 'LT [ngayong araw]',
            nextDay: '[Bukas ng] LT',
            nextWeek: 'LT [sa susunod na] dddd',
            lastDay: 'LT [kahapon]',
            lastWeek: 'LT [noong nakaraang] dddd',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'sa loob ng %s',
            past : '%s ang nakalipas',
            s : 'ilang segundo',
            ss : '%d segundo',
            m : 'isang minuto',
            mm : '%d minuto',
            h : 'isang oras',
            hh : '%d oras',
            d : 'isang araw',
            dd : '%d araw',
            M : 'isang buwan',
            MM : '%d buwan',
            y : 'isang taon',
            yy : '%d taon'
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal : function (number) {
            return number;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var numbersNouns = 'pagh_wa鈥檁cha鈥檁wej_loS_vagh_jav_Soch_chorgh_Hut'.split('_');

    function translateFuture(output) {
        var time = output;
        time = (output.indexOf('jaj') !== -1) ?
        time.slice(0, -3) + 'leS' :
        (output.indexOf('jar') !== -1) ?
        time.slice(0, -3) + 'waQ' :
        (output.indexOf('DIS') !== -1) ?
        time.slice(0, -3) + 'nem' :
        time + ' pIq';
        return time;
    }

    function translatePast(output) {
        var time = output;
        time = (output.indexOf('jaj') !== -1) ?
        time.slice(0, -3) + 'Hu鈥�' :
        (output.indexOf('jar') !== -1) ?
        time.slice(0, -3) + 'wen' :
        (output.indexOf('DIS') !== -1) ?
        time.slice(0, -3) + 'ben' :
        time + ' ret';
        return time;
    }

    function translate$a(number, withoutSuffix, string, isFuture) {
        var numberNoun = numberAsNoun(number);
        switch (string) {
            case 'ss':
                return numberNoun + ' lup';
            case 'mm':
                return numberNoun + ' tup';
            case 'hh':
                return numberNoun + ' rep';
            case 'dd':
                return numberNoun + ' jaj';
            case 'MM':
                return numberNoun + ' jar';
            case 'yy':
                return numberNoun + ' DIS';
        }
    }

    function numberAsNoun(number) {
        var hundred = Math.floor((number % 1000) / 100),
        ten = Math.floor((number % 100) / 10),
        one = number % 10,
        word = '';
        if (hundred &gt; 0) {
            word += numbersNouns[hundred] + 'vatlh';
        }
        if (ten &gt; 0) {
            word += ((word !== '') ? ' ' : '') + numbersNouns[ten] + 'maH';
        }
        if (one &gt; 0) {
            word += ((word !== '') ? ' ' : '') + numbersNouns[one];
        }
        return (word === '') ? 'pagh' : word;
    }

    hooks.defineLocale('tlh', {
        months : 'tera鈥� jar wa鈥檁tera鈥� jar cha鈥檁tera鈥� jar wej_tera鈥� jar loS_tera鈥� jar vagh_tera鈥� jar jav_tera鈥� jar Soch_tera鈥� jar chorgh_tera鈥� jar Hut_tera鈥� jar wa鈥檓aH_tera鈥� jar wa鈥檓aH wa鈥檁tera鈥� jar wa鈥檓aH cha鈥�'.split('_'),
        monthsShort : 'jar wa鈥檁jar cha鈥檁jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa鈥檓aH_jar wa鈥檓aH wa鈥檁jar wa鈥檓aH cha鈥�'.split('_'),
        monthsParseExact : true,
        weekdays : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
        weekdaysShort : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
        weekdaysMin : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[DaHjaj] LT',
            nextDay: '[wa鈥檒eS] LT',
            nextWeek: 'LLL',
            lastDay: '[wa鈥橦u鈥橾 LT',
            lastWeek: 'LLL',
            sameElse: 'L'
        },
        relativeTime : {
            future : translateFuture,
            past : translatePast,
            s : 'puS lup',
            ss : translate$a,
            m : 'wa鈥� tup',
            mm : translate$a,
            h : 'wa鈥� rep',
            hh : translate$a,
            d : 'wa鈥� jaj',
            dd : translate$a,
            M : 'wa鈥� jar',
            MM : translate$a,
            y : 'wa鈥� DIS',
            yy : translate$a
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    var suffixes$4 = {
        1: '\'inci',
        5: '\'inci',
        8: '\'inci',
        70: '\'inci',
        80: '\'inci',
        2: '\'nci',
        7: '\'nci',
        20: '\'nci',
        50: '\'nci',
        3: '\'眉nc眉',
        4: '\'眉nc眉',
        100: '\'眉nc眉',
        6: '\'nc谋',
        9: '\'uncu',
        10: '\'uncu',
        30: '\'uncu',
        60: '\'谋nc谋',
        90: '\'谋nc谋'
    };

    hooks.defineLocale('tr', {
        months : 'Ocak_艦ubat_Mart_Nisan_May谋s_Haziran_Temmuz_A臒ustos_Eyl眉l_Ekim_Kas谋m_Aral谋k'.split('_'),
        monthsShort : 'Oca_艦ub_Mar_Nis_May_Haz_Tem_A臒u_Eyl_Eki_Kas_Ara'.split('_'),
        weekdays : 'Pazar_Pazartesi_Sal谋_脟ar艧amba_Per艧embe_Cuma_Cumartesi'.split('_'),
        weekdaysShort : 'Paz_Pts_Sal_脟ar_Per_Cum_Cts'.split('_'),
        weekdaysMin : 'Pz_Pt_Sa_脟a_Pe_Cu_Ct'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[bug眉n saat] LT',
            nextDay : '[yar谋n saat] LT',
            nextWeek : '[gelecek] dddd [saat] LT',
            lastDay : '[d眉n] LT',
            lastWeek : '[ge莽en] dddd [saat] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s sonra',
            past : '%s 枚nce',
            s : 'birka莽 saniye',
            ss : '%d saniye',
            m : 'bir dakika',
            mm : '%d dakika',
            h : 'bir saat',
            hh : '%d saat',
            d : 'bir g眉n',
            dd : '%d g眉n',
            M : 'bir ay',
            MM : '%d ay',
            y : 'bir y谋l',
            yy : '%d y谋l'
        },
        ordinal: function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'Do':
                case 'DD':
                    return number;
                default:
                    if (number === 0) {  // special case for zero
                        return number + '\'谋nc谋';
                    }
                    var a = number % 10,
                        b = number % 100 - a,
                        c = number &gt;= 100 ? 100 : null;
                    return number + (suffixes$4[a] || suffixes$4[b] || suffixes$4[c]);
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    // After the year there should be a slash and the amount of years since December 26, 1979 in Roman numerals.
    // This is currently too difficult (maybe even impossible) to add.
    hooks.defineLocale('tzl', {
        months : 'Januar_Fevraglh_Mar莽_Avr茂u_Mai_G眉n_Julia_Guscht_Setemvar_Listop盲ts_Noemvar_Zecemvar'.split('_'),
        monthsShort : 'Jan_Fev_Mar_Avr_Mai_G眉n_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
        weekdays : 'S煤ladi_L煤ne莽i_Maitzi_M谩rcuri_Xh煤adi_Vi茅ner莽i_S谩turi'.split('_'),
        weekdaysShort : 'S煤l_L煤n_Mai_M谩r_Xh煤_Vi茅_S谩t'.split('_'),
        weekdaysMin : 'S煤_L煤_Ma_M谩_Xh_Vi_S谩'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM [dallas] YYYY',
            LLL : 'D. MMMM [dallas] YYYY HH.mm',
            LLLL : 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
        },
        meridiemParse: /d\'o|d\'a/i,
        isPM : function (input) {
            return 'd\'o' === input.toLowerCase();
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours &gt; 11) {
                return isLower ? 'd\'o' : 'D\'O';
            } else {
                return isLower ? 'd\'a' : 'D\'A';
            }
        },
        calendar : {
            sameDay : '[oxhi 脿] LT',
            nextDay : '[dem脿 脿] LT',
            nextWeek : 'dddd [脿] LT',
            lastDay : '[ieiri 脿] LT',
            lastWeek : '[s眉r el] dddd [lasteu 脿] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'osprei %s',
            past : 'ja%s',
            s : processRelativeTime$7,
            ss : processRelativeTime$7,
            m : processRelativeTime$7,
            mm : processRelativeTime$7,
            h : processRelativeTime$7,
            hh : processRelativeTime$7,
            d : processRelativeTime$7,
            dd : processRelativeTime$7,
            M : processRelativeTime$7,
            MM : processRelativeTime$7,
            y : processRelativeTime$7,
            yy : processRelativeTime$7
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    function processRelativeTime$7(number, withoutSuffix, key, isFuture) {
        var format = {
            's': ['viensas secunds', '\'iensas secunds'],
            'ss': [number + ' secunds', '' + number + ' secunds'],
            'm': ['\'n m铆ut', '\'iens m铆ut'],
            'mm': [number + ' m铆uts', '' + number + ' m铆uts'],
            'h': ['\'n 镁ora', '\'iensa 镁ora'],
            'hh': [number + ' 镁oras', '' + number + ' 镁oras'],
            'd': ['\'n ziua', '\'iensa ziua'],
            'dd': [number + ' ziuas', '' + number + ' ziuas'],
            'M': ['\'n mes', '\'iens mes'],
            'MM': [number + ' mesen', '' + number + ' mesen'],
            'y': ['\'n ar', '\'iens ar'],
            'yy': [number + ' ars', '' + number + ' ars']
        };
        return isFuture ? format[key][0] : (withoutSuffix ? format[key][0] : format[key][1]);
    }

    //! moment.js locale configuration

    hooks.defineLocale('tzm-latn', {
        months : 'innayr_br摔ayr摔_mar摔s摔_ibrir_mayyw_ywnyw_ywlywz_桑w拧t_拧wtanbir_kt摔wbr摔_nwwanbir_dwjnbir'.split('_'),
        monthsShort : 'innayr_br摔ayr摔_mar摔s摔_ibrir_mayyw_ywnyw_ywlywz_桑w拧t_拧wtanbir_kt摔wbr摔_nwwanbir_dwjnbir'.split('_'),
        weekdays : 'asamas_aynas_asinas_akras_akwas_asimwas_asi岣峺as'.split('_'),
        weekdaysShort : 'asamas_aynas_asinas_akras_akwas_asimwas_asi岣峺as'.split('_'),
        weekdaysMin : 'asamas_aynas_asinas_akras_akwas_asimwas_asi岣峺as'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[asdkh g] LT',
            nextDay: '[aska g] LT',
            nextWeek: 'dddd [g] LT',
            lastDay: '[assant g] LT',
            lastWeek: 'dddd [g] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'dadkh s yan %s',
            past : 'yan %s',
            s : 'imik',
            ss : '%d imik',
            m : 'minu岣�',
            mm : '%d minu岣�',
            h : 'sa蓻a',
            hh : '%d tassa蓻in',
            d : 'ass',
            dd : '%d ossan',
            M : 'ayowr',
            MM : '%d iyyirn',
            y : 'asgas',
            yy : '%d isgasn'
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 12th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('tzm', {
        months : '獾夆祻獾忊窗獾⑩禂_獯扁禃獯扳耽獾昣獾庘窗獾曗禋_獾夆幢獾斺祲獾擾獾庘窗獾⑩耽獾揰獾⑩祿獾忊耽獾揰獾⑩祿獾嶁耽獾撯担_獾栤祿獾涒禍_獾涒祿獾溾窗獾忊幢獾夆禂_獯解禑獾撯幢獾昣獾忊祿獾♀窗獾忊幢獾夆禂_獯封祿獾娾祻獯扁祲獾�'.split('_'),
        monthsShort : '獾夆祻獾忊窗獾⑩禂_獯扁禃獯扳耽獾昣獾庘窗獾曗禋_獾夆幢獾斺祲獾擾獾庘窗獾⑩耽獾揰獾⑩祿獾忊耽獾揰獾⑩祿獾嶁耽獾撯担_獾栤祿獾涒禍_獾涒祿獾溾窗獾忊幢獾夆禂_獯解禑獾撯幢獾昣獾忊祿獾♀窗獾忊幢獾夆禂_獯封祿獾娾祻獯扁祲獾�'.split('_'),
        weekdays : '獯扳禉獯扳祹獯扳禉_獯扳耽獾忊窗獾檁獯扳禉獾夆祻獯扳禉_獯扳唇獾斺窗獾檁獯扳唇獾♀窗獾檁獯扳禉獾夆祹獾♀窗獾檁獯扳禉獾夆垂獾⑩窗獾�'.split('_'),
        weekdaysShort : '獯扳禉獯扳祹獯扳禉_獯扳耽獾忊窗獾檁獯扳禉獾夆祻獯扳禉_獯扳唇獾斺窗獾檁獯扳唇獾♀窗獾檁獯扳禉獾夆祹獾♀窗獾檁獯扳禉獾夆垂獾⑩窗獾�'.split('_'),
        weekdaysMin : '獯扳禉獯扳祹獯扳禉_獯扳耽獾忊窗獾檁獯扳禉獾夆祻獯扳禉_獯扳唇獾斺窗獾檁獯扳唇獾♀窗獾檁獯扳禉獾夆祹獾♀窗獾檁獯扳禉獾夆垂獾⑩窗獾�'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS: 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[獯扳禉獯封祬 獯碷 LT',
            nextDay: '[獯扳禉獯解窗 獯碷 LT',
            nextWeek: 'dddd [獯碷 LT',
            lastDay: '[獯扳禋獯扳祻獾� 獯碷 LT',
            lastWeek: 'dddd [獯碷 LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : '獯封窗獯封祬 獾� 獾⑩窗獾� %s',
            past : '獾⑩窗獾� %s',
            s : '獾夆祹獾夆唇',
            ss : '%d 獾夆祹獾夆唇',
            m : '獾庘祲獾忊祿獯�',
            mm : '%d 獾庘祲獾忊祿獯�',
            h : '獾欌窗獾勨窗',
            hh : '%d 獾溾窗獾欌禉獯扳祫獾夆祻',
            d : '獯扳禉獾�',
            dd : '%d o獾欌禉獯扳祻',
            M : '獯扳耽o獾撯禂',
            MM : '%d 獾夆耽獾⑩祲獾斺祻',
            y : '獯扳禉獯斥窗獾�',
            yy : '%d 獾夆禉獯斥窗獾欌祻'
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 12th is the first week of the year.
        }
    });

    //! moment.js language configuration

    hooks.defineLocale('ug-cn', {
        months: '賷丕賳蹕丕乇_賮蹛蹕乇丕賱_賲丕乇鬲_卅丕倬乇蹛賱_賲丕賷_卅賶賷蹏賳_卅賶賷蹏賱_卅丕蹕睾蹏爻鬲_爻蹛賳鬲蹠亘賶乇_卅蹎賰鬲蹠亘賶乇_賳賵賷丕亘賶乇_丿蹛賰丕亘賶乇'.split(
            '_'
        ),
        monthsShort: '賷丕賳蹕丕乇_賮蹛蹕乇丕賱_賲丕乇鬲_卅丕倬乇蹛賱_賲丕賷_卅賶賷蹏賳_卅賶賷蹏賱_卅丕蹕睾蹏爻鬲_爻蹛賳鬲蹠亘賶乇_卅蹎賰鬲蹠亘賶乇_賳賵賷丕亘賶乇_丿蹛賰丕亘賶乇'.split(
            '_'
        ),
        weekdays: '賷蹠賰卮蹠賳亘蹠_丿蹐卮蹠賳亘蹠_爻蹠賷卮蹠賳亘蹠_趩丕乇卮蹠賳亘蹠_倬蹠賷卮蹠賳亘蹠_噩蹐賲蹠_卮蹠賳亘蹠'.split(
            '_'
        ),
        weekdaysShort: '賷蹠_丿蹐_爻蹠_趩丕_倬蹠_噩蹐_卮蹠'.split('_'),
        weekdaysMin: '賷蹠_丿蹐_爻蹠_趩丕_倬蹠_噩蹐_卮蹠'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY-MM-DD',
            LL: 'YYYY-賷賶賱賶M-卅丕賷賳賶诃D-賰蹐賳賶',
            LLL: 'YYYY-賷賶賱賶M-卅丕賷賳賶诃D-賰蹐賳賶貙 HH:mm',
            LLLL: 'dddd貙 YYYY-賷賶賱賶M-卅丕賷賳賶诃D-賰蹐賳賶貙 HH:mm'
        },
        meridiemParse: /賷蹛乇賶賲 賰蹛趩蹠|爻蹠诰蹠乇|趩蹐卮鬲賶賳 亘蹏乇蹏賳|趩蹐卮|趩蹐卮鬲賶賳 賰蹛賷賶賳|賰蹠趩/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (
                meridiem === '賷蹛乇賶賲 賰蹛趩蹠' ||
                meridiem === '爻蹠诰蹠乇' ||
                meridiem === '趩蹐卮鬲賶賳 亘蹏乇蹏賳'
            ) {
                return hour;
            } else if (meridiem === '趩蹐卮鬲賶賳 賰蹛賷賶賳' || meridiem === '賰蹠趩') {
                return hour + 12;
            } else {
                return hour &gt;= 11 ? hour : hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm &lt; 600) {
                return '賷蹛乇賶賲 賰蹛趩蹠';
            } else if (hm &lt; 900) {
                return '爻蹠诰蹠乇';
            } else if (hm &lt; 1130) {
                return '趩蹐卮鬲賶賳 亘蹏乇蹏賳';
            } else if (hm &lt; 1230) {
                return '趩蹐卮';
            } else if (hm &lt; 1800) {
                return '趩蹐卮鬲賶賳 賰蹛賷賶賳';
            } else {
                return '賰蹠趩';
            }
        },
        calendar: {
            sameDay: '[亘蹐诏蹐賳 爻丕卅蹠鬲] LT',
            nextDay: '[卅蹠鬲蹠 爻丕卅蹠鬲] LT',
            nextWeek: '[賰蹛賱蹠乇賰賶] dddd [爻丕卅蹠鬲] LT',
            lastDay: '[鬲蹎賳蹐诏蹐賳] LT',
            lastWeek: '[卅丕賱丿賶賳賯賶] dddd [爻丕卅蹠鬲] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s 賰蹛賷賶賳',
            past: '%s 亘蹏乇蹏賳',
            s: '賳蹠趩趩蹠 爻蹛賰賵賳鬲',
            ss: '%d 爻蹛賰賵賳鬲',
            m: '亘賶乇 賲賶賳蹏鬲',
            mm: '%d 賲賶賳蹏鬲',
            h: '亘賶乇 爻丕卅蹠鬲',
            hh: '%d 爻丕卅蹠鬲',
            d: '亘賶乇 賰蹐賳',
            dd: '%d 賰蹐賳',
            M: '亘賶乇 卅丕賷',
            MM: '%d 卅丕賷',
            y: '亘賶乇 賷賶賱',
            yy: '%d 賷賶賱'
        },

        dayOfMonthOrdinalParse: /\d{1,2}(-賰蹐賳賶|-卅丕賷|-诰蹠倬鬲蹠)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '-賰蹐賳賶';
                case 'w':
                case 'W':
                    return number + '-诰蹠倬鬲蹠';
                default:
                    return number;
            }
        },
        preparse: function (string) {
            return string.replace(/貙/g, ',');
        },
        postformat: function (string) {
            return string.replace(/,/g, '貙');
        },
        week: {
            // GB/T 7408-1994銆婃暟鎹厓鍜屼氦鎹㈡牸寮徛蜂俊鎭氦鎹⒙锋棩鏈熷拰鏃堕棿琛ㄧず娉曘€嬩笌ISO 8601:1988绛夋晥
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    //! moment.js locale configuration

    function plural$6(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 &amp;&amp; num % 100 !== 11 ? forms[0] : (num % 10 &gt;= 2 &amp;&amp; num % 10 &lt;= 4 &amp;&amp; (num % 100 &lt; 10 || num % 100 &gt;= 20) ? forms[1] : forms[2]);
    }
    function relativeTimeWithPlural$4(number, withoutSuffix, key) {
        var format = {
            'ss': withoutSuffix ? '褋械泻褍薪写邪_褋械泻褍薪写懈_褋械泻褍薪写' : '褋械泻褍薪写褍_褋械泻褍薪写懈_褋械泻褍薪写',
            'mm': withoutSuffix ? '褏胁懈谢懈薪邪_褏胁懈谢懈薪懈_褏胁懈谢懈薪' : '褏胁懈谢懈薪褍_褏胁懈谢懈薪懈_褏胁懈谢懈薪',
            'hh': withoutSuffix ? '谐芯写懈薪邪_谐芯写懈薪懈_谐芯写懈薪' : '谐芯写懈薪褍_谐芯写懈薪懈_谐芯写懈薪',
            'dd': '写械薪褜_写薪褨_写薪褨胁',
            'MM': '屑褨褋褟褑褜_屑褨褋褟褑褨_屑褨褋褟褑褨胁',
            'yy': '褉褨泻_褉芯泻懈_褉芯泻褨胁'
        };
        if (key === 'm') {
            return withoutSuffix ? '褏胁懈谢懈薪邪' : '褏胁懈谢懈薪褍';
        }
        else if (key === 'h') {
            return withoutSuffix ? '谐芯写懈薪邪' : '谐芯写懈薪褍';
        }
        else {
            return number + ' ' + plural$6(format[key], +number);
        }
    }
    function weekdaysCaseReplace(m, format) {
        var weekdays = {
            'nominative': '薪械写褨谢褟_锌芯薪械写褨谢芯泻_胁褨胁褌芯褉芯泻_褋械褉械写邪_褔械褌胁械褉_锌鈥櫻徰傂叫秆喲廮褋褍斜芯褌邪'.split('_'),
            'accusative': '薪械写褨谢褞_锌芯薪械写褨谢芯泻_胁褨胁褌芯褉芯泻_褋械褉械写褍_褔械褌胁械褉_锌鈥櫻徰傂叫秆喲巁褋褍斜芯褌褍'.split('_'),
            'genitive': '薪械写褨谢褨_锌芯薪械写褨谢泻邪_胁褨胁褌芯褉泻邪_褋械褉械写懈_褔械褌胁械褉谐邪_锌鈥櫻徰傂叫秆喲朹褋褍斜芯褌懈'.split('_')
        };

        if (m === true) {
            return weekdays['nominative'].slice(1, 7).concat(weekdays['nominative'].slice(0, 1));
        }
        if (!m) {
            return weekdays['nominative'];
        }

        var nounCase = (/(\[[袙胁校褍]\]) ?dddd/).test(format) ?
            'accusative' :
            ((/\[?(?:屑懈薪褍谢芯褩|薪邪褋褌褍锌薪芯褩)? ?\] ?dddd/).test(format) ?
                'genitive' :
                'nominative');
        return weekdays[nounCase][m.day()];
    }
    function processHoursFunction(str) {
        return function () {
            return str + '芯' + (this.hours() === 11 ? '斜' : '') + '] LT';
        };
    }

    hooks.defineLocale('uk', {
        months : {
            'format': '褋褨褔薪褟_谢褞褌芯谐芯_斜械褉械蟹薪褟_泻胁褨褌薪褟_褌褉邪胁薪褟_褔械褉胁薪褟_谢懈锌薪褟_褋械褉锌薪褟_胁械褉械褋薪褟_卸芯胁褌薪褟_谢懈褋褌芯锌邪写邪_谐褉褍写薪褟'.split('_'),
            'standalone': '褋褨褔械薪褜_谢褞褌懈泄_斜械褉械蟹械薪褜_泻胁褨褌械薪褜_褌褉邪胁械薪褜_褔械褉胁械薪褜_谢懈锌械薪褜_褋械褉锌械薪褜_胁械褉械褋械薪褜_卸芯胁褌械薪褜_谢懈褋褌芯锌邪写_谐褉褍写械薪褜'.split('_')
        },
        monthsShort : '褋褨褔_谢褞褌_斜械褉_泻胁褨褌_褌褉邪胁_褔械褉胁_谢懈锌_褋械褉锌_胁械褉_卸芯胁褌_谢懈褋褌_谐褉褍写'.split('_'),
        weekdays : weekdaysCaseReplace,
        weekdaysShort : '薪写_锌薪_胁褌_褋褉_褔褌_锌褌_褋斜'.split('_'),
        weekdaysMin : '薪写_锌薪_胁褌_褋褉_褔褌_锌褌_褋斜'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY 褉.',
            LLL : 'D MMMM YYYY 褉., HH:mm',
            LLLL : 'dddd, D MMMM YYYY 褉., HH:mm'
        },
        calendar : {
            sameDay: processHoursFunction('[小褜芯谐芯写薪褨 '),
            nextDay: processHoursFunction('[袟邪胁褌褉邪 '),
            lastDay: processHoursFunction('[袙褔芯褉邪 '),
            nextWeek: processHoursFunction('[校] dddd ['),
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return processHoursFunction('[袦懈薪褍谢芯褩] dddd [').call(this);
                    case 1:
                    case 2:
                    case 4:
                        return processHoursFunction('[袦懈薪褍谢芯谐芯] dddd [').call(this);
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : '蟹邪 %s',
            past : '%s 褌芯屑褍',
            s : '写械泻褨谢褜泻邪 褋械泻褍薪写',
            ss : relativeTimeWithPlural$4,
            m : relativeTimeWithPlural$4,
            mm : relativeTimeWithPlural$4,
            h : '谐芯写懈薪褍',
            hh : relativeTimeWithPlural$4,
            d : '写械薪褜',
            dd : relativeTimeWithPlural$4,
            M : '屑褨褋褟褑褜',
            MM : relativeTimeWithPlural$4,
            y : '褉褨泻',
            yy : relativeTimeWithPlural$4
        },
        // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
        meridiemParse: /薪芯褔褨|褉邪薪泻褍|写薪褟|胁械褔芯褉邪/,
        isPM: function (input) {
            return /^(写薪褟|胁械褔芯褉邪)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 4) {
                return '薪芯褔褨';
            } else if (hour &lt; 12) {
                return '褉邪薪泻褍';
            } else if (hour &lt; 17) {
                return '写薪褟';
            } else {
                return '胁械褔芯褉邪';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(泄|谐芯)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'M':
                case 'd':
                case 'DDD':
                case 'w':
                case 'W':
                    return number + '-泄';
                case 'D':
                    return number + '-谐芯';
                default:
                    return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    var months$a = [
        '噩賳賵乇蹖',
        '賮乇賵乇蹖',
        '賲丕乇趩',
        '丕倬乇蹖賱',
        '賲卅蹖',
        '噩賵賳',
        '噩賵賱丕卅蹖',
        '丕诏爻鬲',
        '爻鬲賲亘乇',
        '丕讴鬲賵亘乇',
        '賳賵賲亘乇',
        '丿爻賲亘乇'
    ];
    var days$2 = [
        '丕鬲賵丕乇',
        '倬蹖乇',
        '賲賳诏賱',
        '亘丿诰',
        '噩賲毓乇丕鬲',
        '噩賲毓蹃',
        '蹃賮鬲蹃'
    ];

    hooks.defineLocale('ur', {
        months : months$a,
        monthsShort : months$a,
        weekdays : days$2,
        weekdaysShort : days$2,
        weekdaysMin : days$2,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd貙 D MMMM YYYY HH:mm'
        },
        meridiemParse: /氐亘丨|卮丕賲/,
        isPM : function (input) {
            return '卮丕賲' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour &lt; 12) {
                return '氐亘丨';
            }
            return '卮丕賲';
        },
        calendar : {
            sameDay : '[丌噩 亘賵賯鬲] LT',
            nextDay : '[讴賱 亘賵賯鬲] LT',
            nextWeek : 'dddd [亘賵賯鬲] LT',
            lastDay : '[诏匕卮鬲蹃 乇賵夭 亘賵賯鬲] LT',
            lastWeek : '[诏匕卮鬲蹃] dddd [亘賵賯鬲] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s 亘毓丿',
            past : '%s 賯亘賱',
            s : '趩賳丿 爻蹖讴賳趫',
            ss : '%d 爻蹖讴賳趫',
            m : '丕蹖讴 賲賳俟',
            mm : '%d 賲賳俟',
            h : '丕蹖讴 诏诰賳俟蹃',
            hh : '%d 诏诰賳俟蹝',
            d : '丕蹖讴 丿賳',
            dd : '%d 丿賳',
            M : '丕蹖讴 賲丕蹃',
            MM : '%d 賲丕蹃',
            y : '丕蹖讴 爻丕賱',
            yy : '%d 爻丕賱'
        },
        preparse: function (string) {
            return string.replace(/貙/g, ',');
        },
        postformat: function (string) {
            return string.replace(/,/g, '貙');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('uz-latn', {
        months : 'Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr'.split('_'),
        monthsShort : 'Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek'.split('_'),
        weekdays : 'Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba'.split('_'),
        weekdaysShort : 'Yak_Dush_Sesh_Chor_Pay_Jum_Shan'.split('_'),
        weekdaysMin : 'Ya_Du_Se_Cho_Pa_Ju_Sha'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'D MMMM YYYY, dddd HH:mm'
        },
        calendar : {
            sameDay : '[Bugun soat] LT [da]',
            nextDay : '[Ertaga] LT [da]',
            nextWeek : 'dddd [kuni soat] LT [da]',
            lastDay : '[Kecha soat] LT [da]',
            lastWeek : '[O\'tgan] dddd [kuni soat] LT [da]',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'Yaqin %s ichida',
            past : 'Bir necha %s oldin',
            s : 'soniya',
            ss : '%d soniya',
            m : 'bir daqiqa',
            mm : '%d daqiqa',
            h : 'bir soat',
            hh : '%d soat',
            d : 'bir kun',
            dd : '%d kun',
            M : 'bir oy',
            MM : '%d oy',
            y : 'bir yil',
            yy : '%d yil'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('uz', {
        months : '褟薪胁邪褉_褎械胁褉邪谢_屑邪褉褌_邪锌褉械谢_屑邪泄_懈褞薪_懈褞谢_邪胁谐褍褋褌_褋械薪褌褟斜褉_芯泻褌褟斜褉_薪芯褟斜褉_写械泻邪斜褉'.split('_'),
        monthsShort : '褟薪胁_褎械胁_屑邪褉_邪锌褉_屑邪泄_懈褞薪_懈褞谢_邪胁谐_褋械薪_芯泻褌_薪芯褟_写械泻'.split('_'),
        weekdays : '携泻褕邪薪斜邪_袛褍褕邪薪斜邪_小械褕邪薪斜邪_效芯褉褕邪薪斜邪_袩邪泄褕邪薪斜邪_袞褍屑邪_楔邪薪斜邪'.split('_'),
        weekdaysShort : '携泻褕_袛褍褕_小械褕_效芯褉_袩邪泄_袞褍屑_楔邪薪'.split('_'),
        weekdaysMin : '携泻_袛褍_小械_效芯_袩邪_袞褍_楔邪'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'D MMMM YYYY, dddd HH:mm'
        },
        calendar : {
            sameDay : '[袘褍谐褍薪 褋芯邪褌] LT [写邪]',
            nextDay : '[协褉褌邪谐邪] LT [写邪]',
            nextWeek : 'dddd [泻褍薪懈 褋芯邪褌] LT [写邪]',
            lastDay : '[袣械褔邪 褋芯邪褌] LT [写邪]',
            lastWeek : '[校褌谐邪薪] dddd [泻褍薪懈 褋芯邪褌] LT [写邪]',
            sameElse : 'L'
        },
        relativeTime : {
            future : '携泻懈薪 %s 懈褔懈写邪',
            past : '袘懈褉 薪械褔邪 %s 芯谢写懈薪',
            s : '褎褍褉褋邪褌',
            ss : '%d 褎褍褉褋邪褌',
            m : '斜懈褉 写邪泻懈泻邪',
            mm : '%d 写邪泻懈泻邪',
            h : '斜懈褉 褋芯邪褌',
            hh : '%d 褋芯邪褌',
            d : '斜懈褉 泻褍薪',
            dd : '%d 泻褍薪',
            M : '斜懈褉 芯泄',
            MM : '%d 芯泄',
            y : '斜懈褉 泄懈谢',
            yy : '%d 泄懈谢'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('vi', {
        months : 'th谩ng 1_th谩ng 2_th谩ng 3_th谩ng 4_th谩ng 5_th谩ng 6_th谩ng 7_th谩ng 8_th谩ng 9_th谩ng 10_th谩ng 11_th谩ng 12'.split('_'),
        monthsShort : 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
        monthsParseExact : true,
        weekdays : 'ch峄� nh岷璽_th峄� hai_th峄� ba_th峄� t瓢_th峄� n膬m_th峄� s谩u_th峄� b岷'.split('_'),
        weekdaysShort : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
        weekdaysMin : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
        weekdaysParseExact : true,
        meridiemParse: /sa|ch/i,
        isPM : function (input) {
            return /^ch$/i.test(input);
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours &lt; 12) {
                return isLower ? 'sa' : 'SA';
            } else {
                return isLower ? 'ch' : 'CH';
            }
        },
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM [n膬m] YYYY',
            LLL : 'D MMMM [n膬m] YYYY HH:mm',
            LLLL : 'dddd, D MMMM [n膬m] YYYY HH:mm',
            l : 'DD/M/YYYY',
            ll : 'D MMM YYYY',
            lll : 'D MMM YYYY HH:mm',
            llll : 'ddd, D MMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[H么m nay l煤c] LT',
            nextDay: '[Ng脿y mai l煤c] LT',
            nextWeek: 'dddd [tu岷 t峄沬 l煤c] LT',
            lastDay: '[H么m qua l煤c] LT',
            lastWeek: 'dddd [tu岷 r峄搃 l煤c] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : '%s t峄沬',
            past : '%s tr瓢峄沜',
            s : 'v脿i gi芒y',
            ss : '%d gi芒y' ,
            m : 'm峄檛 ph煤t',
            mm : '%d ph煤t',
            h : 'm峄檛 gi峄�',
            hh : '%d gi峄�',
            d : 'm峄檛 ng脿y',
            dd : '%d ng脿y',
            M : 'm峄檛 th谩ng',
            MM : '%d th谩ng',
            y : 'm峄檛 n膬m',
            yy : '%d n膬m'
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal : function (number) {
            return number;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('x-pseudo', {
        months : 'J~谩帽煤谩~r媒_F~茅br煤~谩r媒_~M谩rc~h_脕p~r铆l_~M谩媒_~J煤帽茅~_J煤l~媒_脕煤~g煤st~_S茅p~t茅mb~茅r_脫~ct贸b~茅r_脩~贸v茅m~b茅r_~D茅c茅~mb茅r'.split('_'),
        monthsShort : 'J~谩帽_~F茅b_~M谩r_~脕pr_~M谩媒_~J煤帽_~J煤l_~脕煤g_~S茅p_~脫ct_~脩贸v_~D茅c'.split('_'),
        monthsParseExact : true,
        weekdays : 'S~煤帽d谩~媒_M贸~帽d谩媒~_T煤茅~sd谩媒~_W茅d~帽茅sd~谩媒_T~h煤rs~d谩媒_~Fr铆d~谩媒_S~谩t煤r~d谩媒'.split('_'),
        weekdaysShort : 'S~煤帽_~M贸帽_~T煤茅_~W茅d_~Th煤_~Fr铆_~S谩t'.split('_'),
        weekdaysMin : 'S~煤_M贸~_T煤_~W茅_T~h_Fr~_S谩'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[T~贸d谩~媒 谩t] LT',
            nextDay : '[T~贸m贸~rr贸~w 谩t] LT',
            nextWeek : 'dddd [谩t] LT',
            lastDay : '[脻~茅st~茅rd谩~媒 谩t] LT',
            lastWeek : '[L~谩st] dddd [谩t] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '铆~帽 %s',
            past : '%s 谩~g贸',
            s : '谩 ~f茅w ~s茅c贸~帽ds',
            ss : '%d s~茅c贸帽~ds',
            m : '谩 ~m铆帽~煤t茅',
            mm : '%d m~铆帽煤~t茅s',
            h : '谩~帽 h贸~煤r',
            hh : '%d h~贸煤rs',
            d : '谩 ~d谩媒',
            dd : '%d d~谩媒s',
            M : '谩 ~m贸帽~th',
            MM : '%d m~贸帽t~hs',
            y : '谩 ~媒茅谩r',
            yy : '%d 媒~茅谩rs'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('yo', {
        months : 'S岷固乺岷固乢E虁re虁le虁_岷竢岷固€na虁_I虁gbe虂_E虁bibi_O虁ku虁du_Ag岷筸o_O虁gu虂n_Owewe_峄屘€wa虁ra虁_Be虂lu虂_峄屘€p岷固€虁'.split('_'),
        monthsShort : 'S岷固乺_E虁rl_岷竢n_I虁gb_E虁bi_O虁ku虁_Ag岷筥O虁gu虂_Owe_峄屘€wa虁_Be虂l_峄屘€p岷固€虁'.split('_'),
        weekdays : 'A虁i虁ku虂_Aje虂_I虁s岷固乬un_峄宩峄嵦乺u虂_峄宩峄嵦乥峄峗岷竧i虁_A虁ba虂m岷固乼a'.split('_'),
        weekdaysShort : 'A虁i虁k_Aje虂_I虁s岷固乢峄宩r_峄宩b_岷竧i虁_A虁ba虂'.split('_'),
        weekdaysMin : 'A虁i虁_Aj_I虁s_峄宺_峄宐_岷竧_A虁b'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendar : {
            sameDay : '[O虁ni虁 ni] LT',
            nextDay : '[峄屘€la ni] LT',
            nextWeek : 'dddd [峄宻岷固€ to虂n\'b峄峕 [ni] LT',
            lastDay : '[A虁na ni] LT',
            lastWeek : 'dddd [峄宻岷固€ to虂l峄嵦乚 [ni] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'ni虂 %s',
            past : '%s k峄峧a虂',
            s : 'i虁s岷筳u虂 aaya虂 die',
            ss :'aaya虂 %d',
            m : 'i虁s岷筳u虂 kan',
            mm : 'i虁s岷筳u虂 %d',
            h : 'wa虂kati kan',
            hh : 'wa虂kati %d',
            d : '峄峧峄嵦� kan',
            dd : '峄峧峄嵦� %d',
            M : 'osu虁 kan',
            MM : 'osu虁 %d',
            y : '峄峝u虂n kan',
            yy : '峄峝u虂n %d'
        },
        dayOfMonthOrdinalParse : /峄峧峄嵦乗s\d{1,2}/,
        ordinal : '峄峧峄嵦� %d',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('zh-cn', {
        months : '涓€鏈坃浜屾湀_涓夋湀_鍥涙湀_浜旀湀_鍏湀_涓冩湀_鍏湀_涔濇湀_鍗佹湀_鍗佷竴鏈坃鍗佷簩鏈�'.split('_'),
        monthsShort : '1鏈坃2鏈坃3鏈坃4鏈坃5鏈坃6鏈坃7鏈坃8鏈坃9鏈坃10鏈坃11鏈坃12鏈�'.split('_'),
        weekdays : '鏄熸湡鏃鏄熸湡涓€_鏄熸湡浜宊鏄熸湡涓塤鏄熸湡鍥沖鏄熸湡浜擾鏄熸湡鍏�'.split('_'),
        weekdaysShort : '鍛ㄦ棩_鍛ㄤ竴_鍛ㄤ簩_鍛ㄤ笁_鍛ㄥ洓_鍛ㄤ簲_鍛ㄥ叚'.split('_'),
        weekdaysMin : '鏃涓€_浜宊涓塤鍥沖浜擾鍏�'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY/MM/DD',
            LL : 'YYYY骞碝鏈圖鏃�',
            LLL : 'YYYY骞碝鏈圖鏃h鐐筸m鍒�',
            LLLL : 'YYYY骞碝鏈圖鏃dddAh鐐筸m鍒�',
            l : 'YYYY/M/D',
            ll : 'YYYY骞碝鏈圖鏃�',
            lll : 'YYYY骞碝鏈圖鏃� HH:mm',
            llll : 'YYYY骞碝鏈圖鏃ddd HH:mm'
        },
        meridiemParse: /鍑屾櫒|鏃╀笂|涓婂崍|涓崍|涓嬪崍|鏅氫笂/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '鍑屾櫒' || meridiem === '鏃╀笂' ||
                    meridiem === '涓婂崍') {
                return hour;
            } else if (meridiem === '涓嬪崍' || meridiem === '鏅氫笂') {
                return hour + 12;
            } else {
                // '涓崍'
                return hour &gt;= 11 ? hour : hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm &lt; 600) {
                return '鍑屾櫒';
            } else if (hm &lt; 900) {
                return '鏃╀笂';
            } else if (hm &lt; 1130) {
                return '涓婂崍';
            } else if (hm &lt; 1230) {
                return '涓崍';
            } else if (hm &lt; 1800) {
                return '涓嬪崍';
            } else {
                return '鏅氫笂';
            }
        },
        calendar : {
            sameDay : '[浠婂ぉ]LT',
            nextDay : '[鏄庡ぉ]LT',
            nextWeek : '[涓媇ddddLT',
            lastDay : '[鏄ㄥぉ]LT',
            lastWeek : '[涓奭ddddLT',
            sameElse : 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(鏃鏈坾鍛�)/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '鏃�';
                case 'M':
                    return number + '鏈�';
                case 'w':
                case 'W':
                    return number + '鍛�';
                default:
                    return number;
            }
        },
        relativeTime : {
            future : '%s鍐�',
            past : '%s鍓�',
            s : '鍑犵',
            ss : '%d 绉�',
            m : '1 鍒嗛挓',
            mm : '%d 鍒嗛挓',
            h : '1 灏忔椂',
            hh : '%d 灏忔椂',
            d : '1 澶�',
            dd : '%d 澶�',
            M : '1 涓湀',
            MM : '%d 涓湀',
            y : '1 骞�',
            yy : '%d 骞�'
        },
        week : {
            // GB/T 7408-1994銆婃暟鎹厓鍜屼氦鎹㈡牸寮徛蜂俊鎭氦鎹⒙锋棩鏈熷拰鏃堕棿琛ㄧず娉曘€嬩笌ISO 8601:1988绛夋晥
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('zh-hk', {
        months : '涓€鏈坃浜屾湀_涓夋湀_鍥涙湀_浜旀湀_鍏湀_涓冩湀_鍏湀_涔濇湀_鍗佹湀_鍗佷竴鏈坃鍗佷簩鏈�'.split('_'),
        monthsShort : '1鏈坃2鏈坃3鏈坃4鏈坃5鏈坃6鏈坃7鏈坃8鏈坃9鏈坃10鏈坃11鏈坃12鏈�'.split('_'),
        weekdays : '鏄熸湡鏃鏄熸湡涓€_鏄熸湡浜宊鏄熸湡涓塤鏄熸湡鍥沖鏄熸湡浜擾鏄熸湡鍏�'.split('_'),
        weekdaysShort : '閫辨棩_閫变竴_閫变簩_閫变笁_閫卞洓_閫变簲_閫卞叚'.split('_'),
        weekdaysMin : '鏃涓€_浜宊涓塤鍥沖浜擾鍏�'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY/MM/DD',
            LL : 'YYYY骞碝鏈圖鏃�',
            LLL : 'YYYY骞碝鏈圖鏃� HH:mm',
            LLLL : 'YYYY骞碝鏈圖鏃ddd HH:mm',
            l : 'YYYY/M/D',
            ll : 'YYYY骞碝鏈圖鏃�',
            lll : 'YYYY骞碝鏈圖鏃� HH:mm',
            llll : 'YYYY骞碝鏈圖鏃ddd HH:mm'
        },
        meridiemParse: /鍑屾櫒|鏃╀笂|涓婂崍|涓崍|涓嬪崍|鏅氫笂/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '鍑屾櫒' || meridiem === '鏃╀笂' || meridiem === '涓婂崍') {
                return hour;
            } else if (meridiem === '涓崍') {
                return hour &gt;= 11 ? hour : hour + 12;
            } else if (meridiem === '涓嬪崍' || meridiem === '鏅氫笂') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm &lt; 600) {
                return '鍑屾櫒';
            } else if (hm &lt; 900) {
                return '鏃╀笂';
            } else if (hm &lt; 1130) {
                return '涓婂崍';
            } else if (hm &lt; 1230) {
                return '涓崍';
            } else if (hm &lt; 1800) {
                return '涓嬪崍';
            } else {
                return '鏅氫笂';
            }
        },
        calendar : {
            sameDay : '[浠婂ぉ]LT',
            nextDay : '[鏄庡ぉ]LT',
            nextWeek : '[涓媇ddddLT',
            lastDay : '[鏄ㄥぉ]LT',
            lastWeek : '[涓奭ddddLT',
            sameElse : 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(鏃鏈坾閫�)/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd' :
                case 'D' :
                case 'DDD' :
                    return number + '鏃�';
                case 'M' :
                    return number + '鏈�';
                case 'w' :
                case 'W' :
                    return number + '閫�';
                default :
                    return number;
            }
        },
        relativeTime : {
            future : '%s鍏�',
            past : '%s鍓�',
            s : '骞剧',
            ss : '%d 绉�',
            m : '1 鍒嗛悩',
            mm : '%d 鍒嗛悩',
            h : '1 灏忔檪',
            hh : '%d 灏忔檪',
            d : '1 澶�',
            dd : '%d 澶�',
            M : '1 鍊嬫湀',
            MM : '%d 鍊嬫湀',
            y : '1 骞�',
            yy : '%d 骞�'
        }
    });

    //! moment.js locale configuration

    hooks.defineLocale('zh-tw', {
        months : '涓€鏈坃浜屾湀_涓夋湀_鍥涙湀_浜旀湀_鍏湀_涓冩湀_鍏湀_涔濇湀_鍗佹湀_鍗佷竴鏈坃鍗佷簩鏈�'.split('_'),
        monthsShort : '1鏈坃2鏈坃3鏈坃4鏈坃5鏈坃6鏈坃7鏈坃8鏈坃9鏈坃10鏈坃11鏈坃12鏈�'.split('_'),
        weekdays : '鏄熸湡鏃鏄熸湡涓€_鏄熸湡浜宊鏄熸湡涓塤鏄熸湡鍥沖鏄熸湡浜擾鏄熸湡鍏�'.split('_'),
        weekdaysShort : '閫辨棩_閫变竴_閫变簩_閫变笁_閫卞洓_閫变簲_閫卞叚'.split('_'),
        weekdaysMin : '鏃涓€_浜宊涓塤鍥沖浜擾鍏�'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY/MM/DD',
            LL : 'YYYY骞碝鏈圖鏃�',
            LLL : 'YYYY骞碝鏈圖鏃� HH:mm',
            LLLL : 'YYYY骞碝鏈圖鏃ddd HH:mm',
            l : 'YYYY/M/D',
            ll : 'YYYY骞碝鏈圖鏃�',
            lll : 'YYYY骞碝鏈圖鏃� HH:mm',
            llll : 'YYYY骞碝鏈圖鏃ddd HH:mm'
        },
        meridiemParse: /鍑屾櫒|鏃╀笂|涓婂崍|涓崍|涓嬪崍|鏅氫笂/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '鍑屾櫒' || meridiem === '鏃╀笂' || meridiem === '涓婂崍') {
                return hour;
            } else if (meridiem === '涓崍') {
                return hour &gt;= 11 ? hour : hour + 12;
            } else if (meridiem === '涓嬪崍' || meridiem === '鏅氫笂') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm &lt; 600) {
                return '鍑屾櫒';
            } else if (hm &lt; 900) {
                return '鏃╀笂';
            } else if (hm &lt; 1130) {
                return '涓婂崍';
            } else if (hm &lt; 1230) {
                return '涓崍';
            } else if (hm &lt; 1800) {
                return '涓嬪崍';
            } else {
                return '鏅氫笂';
            }
        },
        calendar : {
            sameDay : '[浠婂ぉ] LT',
            nextDay : '[鏄庡ぉ] LT',
            nextWeek : '[涓媇dddd LT',
            lastDay : '[鏄ㄥぉ] LT',
            lastWeek : '[涓奭dddd LT',
            sameElse : 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(鏃鏈坾閫�)/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd' :
                case 'D' :
                case 'DDD' :
                    return number + '鏃�';
                case 'M' :
                    return number + '鏈�';
                case 'w' :
                case 'W' :
                    return number + '閫�';
                default :
                    return number;
            }
        },
        relativeTime : {
            future : '%s鍏�',
            past : '%s鍓�',
            s : '骞剧',
            ss : '%d 绉�',
            m : '1 鍒嗛悩',
            mm : '%d 鍒嗛悩',
            h : '1 灏忔檪',
            hh : '%d 灏忔檪',
            d : '1 澶�',
            dd : '%d 澶�',
            M : '1 鍊嬫湀',
            MM : '%d 鍊嬫湀',
            y : '1 骞�',
            yy : '%d 骞�'
        }
    });

    hooks.locale('en');

    return hooks;

})));
</pre></body></html>_application/javascriptUUTF-8            (   7   N   `   v   ?   ?   ? ?r ??                          ??