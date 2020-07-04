const dayjs = require('dayjs');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var util = require('../../utils/ZH.js');

var PATTERN = new RegExp(
    '(\\d{2,4}|[' + Object.keys(util.NUMBER).join('') + ']{2,4})?' +
    '(?:\\s*)' +
    '(?:年|-|/)?' +
    '(?:\\s*)' +
    '(\\d{1,2}|[' + Object.keys(util.NUMBER).join('') + ']{1,2})' +
    '(?:\\s*)' +
    '(?:月|-|/)?' +
    '(?:\\s*)' +
    '(\\d{1,2}|[' + Object.keys(util.NUMBER).join('') + ']{1,2})?' +
    '(?:\\s*)' +
    '(?:日|号)?'
);

var YEAR_GROUP = 1;
var MONTH_GROUP = 2;
var DAY_GROUP = 3;

exports.Parser = function ZHHansDateParser() {

    Parser.apply(this, arguments);

    this.pattern = function() {
        return PATTERN;
    };

    this.extract = function(text, ref, match, opt) {
        var startMoment = dayjs(ref);
        var result = new ParsedResult({
            text: match[0],
            index: match.index,
            ref: ref,
        });

        //Month
        var month = parseInt(match[MONTH_GROUP]);
        if (isNaN(month)) month = util.zhStringToNumber(match[MONTH_GROUP]);
        if (month > 12) {
            month = 12;
        } else if (month < 0) {
            month = 0;
        }
        result.start.assign('month', month);

        //Day
        if (match[DAY_GROUP]) {
            var day = parseInt(match[DAY_GROUP]);
            if (isNaN(day)) day = util.zhStringToNumber(match[DAY_GROUP]);
            if (day < 0) {
                day = 0;
            } else if (day > 31) {
                day = 31;
            }
            result.start.assign('day', day);
        } else {
            result.start.imply('day', startMoment.date());
        }

        //Year
        if (match[YEAR_GROUP]) {
            var year = parseInt(match[YEAR_GROUP]);
            if (isNaN(year)) year = util.zhStringToYear(match[YEAR_GROUP]);
            if (year > 2030) {
                year = 2030;
            }
            result.start.assign('year', year);
        } else {
            result.start.imply('year', startMoment.year());
        }

        result.tags.ZHHansDateParser = true;
        return result;
    };
};
