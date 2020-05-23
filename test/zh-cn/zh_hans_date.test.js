import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Single Expression", function() {

    testSingleCase(chrono, '2016年9月3号', new Date(2016, 9-1, 3, 12), (result) => {
        expect(result.text).toBe('2016年9月3号');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(3);

        expect(result.start).toBeDate(new Date(2016, 9-1, 3, 12));
    });

    testSingleCase(chrono, '2016年9月3日', new Date(), (result) => {
        expect(result.text).toBe('2016年9月3日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(3);
    });

    testSingleCase(chrono, '2016-9-3', new Date(2012,8-1,10), (result) => {
        expect(result.text).toBe('2016-9-3');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(3);
    });

    testSingleCase(chrono, '2016-09-03', new Date(2012,8-1,10), (result) => {
        expect(result.text).toBe('2016-09-03');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(3);
    });

    testSingleCase(chrono, '2016/9/3', new Date(2012,8-1,10), (result) => {
        expect(result.text).toBe('2016/9/3');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(3);
    });

    testSingleCase(chrono, '2016/09/03', new Date(2012,8-1,10), (result) => {
        expect(result.text).toBe('2016/09/03');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(3);
    });

    testSingleCase(chrono, '九月3号', new Date(2014,8-1,10), (result) => {
        expect(result.text).toBe('九月3号');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2014);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(3);

        expect(result.start).toBeDate(new Date(2014, 9-1, 3, 12));
    });
});


test("Test - Range Expression", function() {

    testSingleCase(chrono, '2016年9月3号-2017年10月24日', new Date(2012,8-1,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('2016年9月3号-2017年10月24日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(3);

        expect(result.start).toBeDate(new Date(2016, 9-1, 3, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2017);
        expect(result.end.get('month')).toBe(10);
        expect(result.end.get('day')).toBe(24);

        expect(result.end).toBeDate(new Date(2017, 10-1, 24, 12));
    });

    testSingleCase(chrono, '二零一六年九月三号ー2017年10月24号', new Date(2012,8-1,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('二零一六年九月三号ー2017年10月24号');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(3);

        expect(result.start).toBeDate(new Date(2016, 9-1, 3, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2017);
        expect(result.end.get('month')).toBe(10);
        expect(result.end.get('day')).toBe(24);

        expect(result.end).toBeDate(new Date(2017, 10-1, 24, 12));
    });

});
