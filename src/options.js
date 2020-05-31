import * as parser from './parsers/parser';
import * as refiner from './refiners/refiner';

export function mergeOptions(options) {

    var addedTypes = {};
    var mergedOption = {
        parsers: [],
        refiners: []
    };

    options.forEach(function (option) {

        if (option.call) {
            option = option.call();
        }

        if (option.parsers) {
            option.parsers.forEach(function (p) {
                if (!addedTypes[p.constructor]) {
                    mergedOption.parsers.push(p);
                    addedTypes[p.constructor] = true;
                }
            });
        }

        if (option.refiners) {
            option.refiners.forEach(function (r) {
                if (!addedTypes[r.constructor]) {
                    mergedOption.refiners.push(r);
                    addedTypes[r.constructor] = true;
                }
            });
        }
    });

    return mergedOption;
}


export function commonPostProcessing() {
    return {
        refiners: [
            // These should be after all other refiners
            new refiner.ExtractTimezoneOffsetRefiner(),
            new refiner.ExtractTimezoneAbbrRefiner(),
            new refiner.UnlikelyFormatFilter()
        ]
    }
}


// -------------------------------------------------------------

export function strictOption() {
    var strictConfig = {
        strict: true
    };

    return mergeOptions([
        en(strictConfig),
        de(strictConfig),
        nl(strictConfig),
        pt(strictConfig),
        es(strictConfig),
        fr(strictConfig),
        ja(strictConfig),
        zh,
        zhcn,
        commonPostProcessing
    ]);
}

export function casualOption() {
    return mergeOptions([
        en.casual,
        // Some German abbriviate overlap with common English
        de({ strict: true }),
        nl,
        pt,
        es,
        fr,
        ja,
        zh,
        zhcn,
        commonPostProcessing
    ]);
}

// -------------------------------------------------------------

export const de = function de(config) {
    return {
        parsers: [
            new parser.DEDeadlineFormatParser(config),
            new parser.DEMonthNameLittleEndianParser(config),
            new parser.DEMonthNameParser(config),
            new parser.DESlashDateFormatParser(config),
            new parser.DETimeAgoFormatParser(config),
            new parser.DETimeExpressionParser(config)
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),
            new refiner.DEMergeDateTimeRefiner(),
            new refiner.DEMergeDateRangeRefiner()
        ]
    }
};

de.casual = function() {
    var option = de({
        strict: false
    });
    option.parsers.unshift(new parser.DECasualDateParser());
    option.parsers.unshift(new parser.DEWeekdayParser());
    return option;
};



// -------------------------------------------------------------

export const nl = function nl(config) {
    return {
        parsers: [
            new parser.NLMonthNameLittleEndianParser(config),
            new parser.NLMonthNameParser(config),
            new parser.NLSlashDateFormatParser(config),
            new parser.NLTimeExpressionParser(config),
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),
            new refiner.NLMergeDateTimeRefiner(),
            new refiner.NLMergeDateRangeRefiner()
        ]
    }
};

nl.casual = function() {
    var option = nl({
        strict: false
    });
    option.parsers.unshift(new parser.NLCasualDateParser());
    option.parsers.unshift(new parser.NLCasualTimeParser());
    option.parsers.unshift(new parser.NLWeekdayParser());
    return option;
};



// -------------------------------------------------------------


export const en = function en(config) {
    return {
        parsers: [
            new parser.ENISOFormatParser(config),
            new parser.ENDeadlineFormatParser(config),
            new parser.ENMonthNameLittleEndianParser(config),
            new parser.ENMonthNameMiddleEndianParser(config),
            new parser.ENMonthNameParser(config),
            new parser.ENSlashDateFormatParser(config),
            new parser.ENSlashDateFormatStartWithYearParser(config),
            new parser.ENSlashMonthFormatParser(config),
            new parser.ENTimeAgoFormatParser(config),
            new parser.ENTimeLaterFormatParser(config),
            new parser.ENTimeExpressionParser(config)
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),

            // English
            new refiner.ENMergeDateTimeRefiner(),
            new refiner.ENMergeDateRangeRefiner(),
            new refiner.ENPrioritizeSpecificDateRefiner()
        ]
    }
};

en.casual = function(config) {
    config = config || {};
    config.strict = false;
    var option = en(config);

    // en
    option.parsers.unshift(new parser.ENCasualDateParser());
    option.parsers.unshift(new parser.ENCasualTimeParser());
    option.parsers.unshift(new parser.ENWeekdayParser());
    option.parsers.unshift(new parser.ENRelativeDateFormatParser());
    return option;
};


export const en_GB = function en_GB(config) {
    config = config || {};
    config.littleEndian = true;
    return en(config);
};

en_GB.casual = function(config) {
    config = config || {};
    config.littleEndian = true;
    return en.casual(config);
};

// -------------------------------------------------------------

export const ja = function ja() {
    return {
        parsers: [
            new parser.JPStandardParser()
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),
            new refiner.JPMergeDateRangeRefiner()
        ]
    }
};

ja.casual = function() {
    var option = ja();
    option.parsers.unshift(new parser.JPCasualDateParser());
    return option;
};

// -------------------------------------------------------------


export const pt = function pt(config) {
    return {
        parsers: [
            new parser.PTTimeAgoFormatParser(config),
            new parser.PTDeadlineFormatParser(config),
            new parser.PTTimeExpressionParser(config),
            new parser.PTMonthNameLittleEndianParser(config),
            new parser.PTSlashDateFormatParser(config)
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner()
        ]
    }
};

pt.casual = function() {
    var option = pt({
        strict: false
    });

    option.parsers.unshift(new parser.PTCasualDateParser());
    option.parsers.unshift(new parser.PTWeekdayParser());
    return option;
};

// -------------------------------------------------------------


export const es = function es(config) {
    return {
        parsers: [
            new parser.ESTimeAgoFormatParser(config),
            new parser.ESDeadlineFormatParser(config),
            new parser.ESTimeExpressionParser(config),
            new parser.ESMonthNameLittleEndianParser(config),
            new parser.ESSlashDateFormatParser(config)
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner()
        ]
    }
};

es.casual = function() {
    var option = es({
        strict: false
    });

    option.parsers.unshift(new parser.ESCasualDateParser());
    option.parsers.unshift(new parser.ESWeekdayParser());
    return option;
};


// -------------------------------------------------------------

export const fr = function fr(config) {
    return {
        parsers: [
            new parser.FRDeadlineFormatParser(config),
            new parser.FRMonthNameLittleEndianParser(config),
            new parser.FRSlashDateFormatParser(config),
            new parser.FRTimeAgoFormatParser(config),
            new parser.FRTimeExpressionParser(config)
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),
            new refiner.FRMergeDateRangeRefiner(),
            new refiner.FRMergeDateTimeRefiner()
        ]
    }
};

fr.casual = function() {
    var option = fr({
        strict: false
    });

    option.parsers.unshift(new parser.FRCasualDateParser());
    option.parsers.unshift(new parser.FRWeekdayParser());
    option.parsers.unshift(new parser.FRRelativeDateFormatParser());
    return option;
};


// -------------------------------------------------------------

export const zh = function zh(config) {
    return {
        parsers: [
            new parser.ZHHantDateParser(config),
            new parser.ZHHantWeekdayParser(config),
            new parser.ZHHantTimeExpressionParser(config),
            new parser.ZHHantCasualDateParser(config),
            new parser.ZHHantDeadlineFormatParser(config)
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner()
        ]
    }
};

zh.casual = function() {
    return zh({
        strict: false
    });
}

export const zhcn = function zhcn(config) {
    return {
        parsers: [
            new parser.ZHHansDateParser(config),
            new parser.ZHHansWeekdayParser(config),
            new parser.ZHHansTimeExpressionParser(config),
            new parser.ZHHansCasualDateParser(config),
            new parser.ZHHansDeadlineFormatParser(config)
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner()
        ]
    }
}

zhcn.casual = function() {
    return zhcn({
        strict: false
    });
}