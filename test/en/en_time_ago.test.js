import * as chrono from '../../src/chrono';
import { testSingleCase, testUnexpectedResult } from '../test_util';

test("Test - Single Expression", function() {

    testSingleCase(chrono, '5 days ago, we did something', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe('5 days ago');

        expect(result.start).toBeDate(new Date(2012, 8-1, 5, 12));
    });

    testSingleCase(chrono, '10 days ago, we did something', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 days ago');

        expect(result.start).toBeDate(new Date(2012, 7-1, 31, 12));
    });


    testSingleCase(chrono, '15 minute ago', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('15 minute ago');
        expect(result.start.get('hour')).toBe(11);
        expect(result.start.get('minute')).toBe(59);

        expect(result.start).toBeDate(new Date(2012,7,10,11,59));
    });

    testSingleCase(chrono, '15 minute earlier', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('15 minute earlier');
        expect(result.start.get('hour')).toBe(11);
        expect(result.start.get('minute')).toBe(59);

        expect(result.start).toBeDate(new Date(2012,7,10,11,59));
    });

    testSingleCase(chrono, '15 minute before', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('15 minute before');
        expect(result.start.get('hour')).toBe(11);
        expect(result.start.get('minute')).toBe(59);

        expect(result.start).toBeDate(new Date(2012,7,10,11,59));
    });

    testSingleCase(chrono, '   12 hours ago', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe('12 hours ago');
        expect(result.start.get('hour')).toBe(0);
        expect(result.start.get('minute')).toBe(14);

        expect(result.start).toBeDate(new Date(2012,7,10,0,14));
    });

    testSingleCase(chrono, '1h ago', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('1h ago');
        expect(result.start.get('hour')).toBe(11);
        expect(result.start.get('minute')).toBe(14);
    });

    testSingleCase(chrono, '1hr ago', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('1hr ago');
        expect(result.start.get('hour')).toBe(11);
        expect(result.start.get('minute')).toBe(14);
    });

    testSingleCase(chrono, '   half an hour ago', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe('half an hour ago');
        expect(result.start.get('hour')).toBe(11);
        expect(result.start.get('minute')).toBe(44);

        expect(result.start).toBeDate(new Date(2012,7,10,11,44));
    });


    testSingleCase(chrono, '12 hours ago I did something', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('12 hours ago');
        expect(result.start.get('hour')).toBe(0);
        expect(result.start.get('minute')).toBe(14);

        expect(result.start).toBeDate(new Date(2012,7,10,0,14));
    });


    testSingleCase(chrono, '12 seconds ago I did something', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('12 seconds ago');
        expect(result.start.get('hour')).toBe(12);
        expect(result.start.get('minute')).toBe(13);
        expect(result.start.get('second')).toBe(48);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13, 48));
    });


    testSingleCase(chrono, 'three seconds ago I did something', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('three seconds ago');
        expect(result.start.get('hour')).toBe(12);
        expect(result.start.get('minute')).toBe(13);
        expect(result.start.get('second')).toBe(57);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13, 57));
    });



    testSingleCase(chrono, '5 Days ago, we did something', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe('5 Days ago');

        expect(result.start).toBeDate(new Date(2012, 8-1, 5, 12));
    });


    testSingleCase(chrono, '   half An hour ago', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe('half An hour ago');
        expect(result.start.get('hour')).toBe(11);
        expect(result.start.get('minute')).toBe(44);

        expect(result.start).toBeDate(new Date(2012,7,10,11,44));
    });


    testSingleCase(chrono, 'A days ago, we did something', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe('A days ago');

        expect(result.start).toBeDate(new Date(2012, 8-1, 9, 12));
    });


    testSingleCase(chrono, 'a min before', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('a min before');
        expect(result.start.get('hour')).toBe(12);
        expect(result.start.get('minute')).toBe(13);

        expect(result.start).toBeDate(new Date(2012,7,10,12,13));
    });

});


test("Test - Single Expression (Casual)", function() {

    testSingleCase(chrono, '5 months ago, we did something', new Date(2012, 8-1,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(3);
        expect(result.start.get('day')).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe('5 months ago');

        expect(result.start).toBeDate(new Date(2012, 3-1, 10, 12));
    });

    testSingleCase(chrono, '5 years ago, we did something', new Date(2012, 8-1,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2007);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe('5 years ago');

        expect(result.start).toBeDate(new Date(2007, 8-1, 10, 12));
    });


    testSingleCase(chrono, 'a week ago, we did something', new Date(2012, 8-1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(27);

        expect(result.index).toBe(0);
        expect(result.text).toBe('a week ago');

        expect(result.start).toBeDate(new Date(2012, 7-1, 27, 12));
    });


    testSingleCase(chrono, 'a few days ago, we did something', new Date(2012, 8-1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe('a few days ago');

        expect(result.start).toBeDate(new Date(2012, 7-1, 31, 12));
    });
});


test("Test - Nested time ago", function() {

    var text = "15 hours 29 min ago";
    var results = chrono.parse(text, new Date(2012,7,10,22,30));
    expect(results.length).toBe(1);
    expect(results[0].text).toBe('15 hours 29 min ago');
    expect(results[0].start.get('day')).toBe(10);
    expect(results[0].start.get('hour')).toBe(7);
    expect(results[0].start.get('minute')).toBe(1);

    var text = "1 day 21 hours ago ";
    var results = chrono.parse(text, new Date(2012,7,10,22,30));
    expect(results.length).toBe(1);
    expect(results[0].text).toBe('1 day 21 hours ago');
    expect(results[0].start.get('day')).toBe(9);
    expect(results[0].start.get('hour')).toBe(1);
    expect(results[0].start.get('minute')).toBe(30);

    var text = "3 min 49 sec ago ";
    var results = chrono.parse(text, new Date(2012,7,10,22,30));
    expect(results.length).toBe(1);
    expect(results[0].text).toBe('3 min 49 sec ago');
    expect(results[0].start.get('day')).toBe(10);
    expect(results[0].start.get('hour')).toBe(22);
    expect(results[0].start.get('minute')).toBe(26);
    expect(results[0].start.get('second')).toBe(11);
});

test("Test - Single Expression (Strict)", function() {

    testUnexpectedResult(chrono.strict, '15 minute before', new Date(2012,7,10,12,14));

    testUnexpectedResult(chrono.strict, 'a week ago, we did something', new Date(2012, 8-1, 3))
});
