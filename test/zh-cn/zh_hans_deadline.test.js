import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Single Expression", function() {

    testSingleCase(chrono, '五天之内', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('五天之内');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8-1, 15, 12));
    });

    testSingleCase(chrono, '5日內', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('5日內');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8-1, 15, 12));
    });


    testSingleCase(chrono, '十日內', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('十日內');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(20);

        expect(result.start).toBeDate(new Date(2012, 8-1, 20, 12));
    });


    testSingleCase(chrono, '五分钟后', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('五分钟后');

        expect(result.start).toBeDate(new Date(2012,7,10,12,19));
    });

    testSingleCase(chrono.zhcn, '一个小时之内', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('一个小时之内');

        expect(result.start).toBeDate(new Date(2012,7,10,13,14));
    });

    testSingleCase(chrono, '5秒之后', new Date(2012,7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('5秒之后');

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 5));
    });

    testSingleCase(chrono, '5秒钟之后', new Date(2012,7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('5秒钟之后');

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 5));
    });

    testSingleCase(chrono.zhcn, '1刻之后', new Date(2012,7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('1刻之后');

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    testSingleCase(chrono, '1刻钟之后', new Date(2012,7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('1刻钟之后');

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    testSingleCase(chrono, '半小时之內', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('半小时之內');

        expect(result.start).toBeDate(new Date(2012,7,10,12,44));
    });


    testSingleCase(chrono, '两个星期内', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('两个星期内');

        expect(result.start).toBeDate(new Date(2012, 7, 24, 12));
    });


    testSingleCase(chrono, '1个月内', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('1个月内');

        expect(result.start).toBeDate(new Date(2012, 8, 10, 12));
    });


    testSingleCase(chrono, '三个小时后', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('三个小时后');

        expect(result.start).toBeDate(new Date(2012, 7, 10, 15));
    });


    testSingleCase(chrono, '1个半小时内', new Date(2012, 7, 10, 12, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('1个半小时内');

        expect(result.start).toBeDate(new Date(2013, 7, 10, 13, 40));
    });
});
