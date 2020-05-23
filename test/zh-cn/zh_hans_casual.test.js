import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Single Expression", function() {
    // Say.."Tomorrow" in the late night (1 AM)
    testSingleCase(chrono.casual, '明天全部都', new Date(2012, 7, 10, 2), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 11, 12));
    });

    testSingleCase(chrono.casual, '后天凌晨全部', new Date(2012, 7, 10, 0, 0), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 12, 0, 0));
    });

    testSingleCase(chrono.casual, '大前天凌晨全部都', new Date(2012, 7, 10, 0, 0), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 7, 0, 0));
    });

    testSingleCase(chrono.casual, '昨天晚上全部都', new Date(2012, 7, 10, 12), (result) => {
        expect(result.text).toBe('昨天晚上');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(9);
        expect(result.start.get('hour')).toBe(22);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 22));
    });


    testSingleCase(chrono.casual, '今天早上全部都', new Date(2012, 7, 10, 12), (result) => {
        expect(result.text).toBe('今天早上');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(6);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6));
    });


    testSingleCase(chrono.casual, '今天下午全部都', new Date(2012, 7, 10, 12), (result) => {
        expect(result.text).toBe('今天下午');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 15));
    });


    testSingleCase(chrono.casual, '今晚', new Date(2012, 7, 10, 12), (result) => {
        expect(result.text).toBe('今晚');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(22);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 22));
    });
});


test("Test - Combined Expression", function() {
    testSingleCase(chrono.casual, '今天下午5点', new Date(2012, 7, 10, 12), (result) => {
        expect(result.text).toBe('今天下午5点');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(17);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 17));
    });
});

test('Test - Random text', function() {
    testSingleCase(chrono, '今天晚上', new Date(2012, 1-1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(22);
        expect(result.start.get('meridiem') ).toBe(1);
    });

    testSingleCase(chrono, '今晚8点整', new Date(2012, 1-1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get('hour') ).toBe(20);
        expect(result.start.get('year') ).toBe(2012);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')  ).toBe(1);
        expect(result.start.get('meridiem') ).toBe(1);
    });


    testSingleCase(chrono, '晚上8点', new Date(2012, 1-1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get('hour') ).toBe(20);
        expect(result.start.get('year') ).toBe(2012);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')  ).toBe(1);
        expect(result.start.get('meridiem') ).toBe(1);
    });


    testSingleCase(chrono, '星期四', (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get('weekday')).toBe(4);
    });
});
