import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Single Expression", function() {
    testSingleCase(chrono.zhcn, '上午6点13分全部都', new Date(2012,7,10), (result) => {
        expect(result.text).toBe('上午6点13分');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(6);
        expect(result.start.get('minute')).toBe(13);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 13))
    });

    testSingleCase(chrono.zhcn, '后天凌晨全部都', new Date(2012, 7, 10, 0, 0), (result) => {
        expect(result.text).toBe('后天凌晨');

        expect(result.start).toBeDate(new Date(2012, 7, 12, 0, 0))
    });

    testSingleCase(chrono.zhcn, '到大后天凌晨全部都', new Date(2012, 7, 10, 0, 0), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('大后天凌晨');

        expect(result.start).toBeDate(new Date(2012, 7, 13, 0, 0))
    });
});

test("Test - Range Expression", function() {
    testSingleCase(chrono.zhcn, '从今天八点十分至下午11点32分全部都', new Date(2012,7,10), (result) => {
        expect(result.text).toBe('从今天八点十分至下午11点32分');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(8);
        expect(result.start.get('minute')).toBe(10);

        expect(result.start.isCertain('day')).toBe(true);
        expect(result.start.isCertain('month')).toBe(true);
        expect(result.start.isCertain('year')).toBe(true);
        expect(result.start.isCertain('hour')).toBe(true);
        expect(result.start.isCertain('minute')).toBe(true);
        expect(result.start.isCertain('second')).toBe(false);
        expect(result.start.isCertain('millisecond')).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 10))

        expect(result.end).not.toBeNull();
        expect(result.end.get('hour')).toBe(23);
        expect(result.end.get('minute')).toBe(32);

        expect(result.end.isCertain('day')).toBe(false);
        expect(result.end.isCertain('month')).toBe(false);
        expect(result.end.isCertain('year')).toBe(false);
        expect(result.end.isCertain('hour')).toBe(true);
        expect(result.end.isCertain('minute')).toBe(true);
        expect(result.end.isCertain('second')).toBe(false);
        expect(result.end.isCertain('millisecond')).toBe(false);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 23, 32));
    });

    testSingleCase(chrono, '6点30pm-11点pm', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('6点30pm-11点pm');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(18);
        expect(result.start.get('minute')).toBe(30);
        expect(result.start.get('meridiem')).toBe(1);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 18, 30));

        expect(result.end).not.toBeNull();
        expect(result.end.get('hour')).toBe(23);
        expect(result.end.get('minute')).toBe(0);
        expect(result.end.get('meridiem')).toBe(1);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 23, 0));
    });

});

test("Test - Date + Time Expression", function() {

    testSingleCase(chrono.zhcn, '二零一八年十一月廿六日下午三点半五十九秒全部', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('二零一八年十一月廿六日下午三時半五十九秒');

        expect(result.start.get('year')).toBe(2018);
        expect(result.start.get('month')).toBe(11);
        expect(result.start.get('day')).toBe(26);
        expect(result.start.get('hour')).toBe(15);
        expect(result.start.get('minute')).toBe(30);
        expect(result.start.get('second')).toBe(59);
        expect(result.start.get('millisecond')).toBe(0);
        expect(result.start.isCertain('millisecond')).toBe(false);

        expect(result.start).toBeDate(new Date(2018, 11-1, 26, 15, 30, 59));
    });

});


test("Test - Time Expression's Meridiem imply", function() {

    testSingleCase(chrono.zhcn, '1点pm～3点', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('1点pm～3点');

        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(13);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);
        expect(result.start.get('millisecond')).toBe(0);
        expect(result.start.get('meridiem')).toBe(1);
        expect(result.start.isCertain('meridiem')).toBe(true);

        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(11);
        expect(result.end.get('hour')).toBe(3);
        expect(result.end.get('minute')).toBe(0);
        expect(result.end.get('second')).toBe(0);
        expect(result.end.get('millisecond')).toBe(0);
        expect(result.end.isCertain('meridiem')).toBe(false)
    });
});


test("Test - Random date + time expression", function() {

    testSingleCase(chrono.zhcn, '2014年, 3月5日下午 6 点至 7 点', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.zhcn, '下星期六凌晨1点30分29秒', (result, text) => {

        expect(result.text).toBe(text);
    });


    testSingleCase(chrono, '六月四日3:00am', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, '上個礼拜五16点', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, '3月17日 20点15', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, '10点', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, '中午12点', (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('hour')).toBe(12);
    });
});
