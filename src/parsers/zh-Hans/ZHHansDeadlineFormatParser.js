const dayjs = require('dayjs');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var util = require('../../utils/ZH.js');

var PATTERN = new RegExp(
  '(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+|半)(?:\\s*)' +
  '(?:个)?' +
  '(秒钟?|分钟|小时|刻钟?|日|天|星期|礼拜|月|年)' +
  '(?:(?:之|过)?后|(?:之)?内)', 'i'
);

var NUMBER_GROUP = 1;
var UNIT_GROUP = 2;

exports.Parser = function ZHHansCasualDateParser() {

  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index;
    text = match[0];

    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });

    var number = parseInt(match[NUMBER_GROUP]);
    if (isNaN(number)) {
      number = util.zhStringToNumber(match[NUMBER_GROUP]);
    }

    if (isNaN(number)) {
      var string = match[NUMBER_GROUP];
      if (string === '半') {
        number = 0.5;
      } else {
        //just in case
        return null;
      }
    }

    var date = dayjs(ref);
    var unit = match[UNIT_GROUP];
    var unitAbbr = unit[0];

    if (unitAbbr.match(/[日天星礼月年]/)) {
      if (unitAbbr == '日' || unitAbbr == '天') {
        date = date.add(number, 'd');
      } else if (unitAbbr == '星' || unitAbbr == '礼') {
        date = date.add(number * 7, 'd');
      } else if (unitAbbr == '月') {
        date = date.add(number, 'month');
      } else if (unitAbbr == '年') {
        date = date.add(number, 'year');
      }

      result.start.assign('year', date.year());
      result.start.assign('month', date.month() + 1);
      result.start.assign('day', date.date());
      return result;
    }

    if (unitAbbr == '秒') {
      date = date.add(number, 'second');
    } else if (unitAbbr == '分') {
      date = date.add(number, 'minute');
    } else if (unitAbbr == '小') {
      date = date.add(number, 'hour');
    } else if (unitAbbr == '刻') {
      date = date.add(number * 15, 'minute');
    }

    result.start.imply('year', date.year());
    result.start.imply('month', date.month() + 1);
    result.start.imply('day', date.date());
    result.start.assign('hour', date.hour());
    result.start.assign('minute', date.minute());
    result.start.assign('second', date.second());

    result.tags.ZHHansDeadlineFormatParser = true;
    return result;
  };
};