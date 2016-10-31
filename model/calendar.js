/**
 * Created by forsa on 2016-10-27.
 */
const moment = require("moment");

const NO_REPEAT = 0;
const DAILY_REPEAT = 1;
const WEEKLY_REPEAT = 2;
const BIWEEKLY_REPEAT = 3;
const MONTH_REPEAT = 4;
const NEVER_END = 0;
const END_ON_COUNT = 1;
const END_AT_TIME = 2;

exports.getDescription = function (schedule) {
    var start_at = moment.unix(schedule.start_at);

    var d = start_at.format("YYYY-MM-DD起,");
    var a = [], b = ['日', '一', '二', '三', '四', '五', '六'];
    var i;
    switch (schedule.has_repeat) {
        case NO_REPEAT:
            d = start_at.format("YYYY-MM-DD H:mm:ss");
            break;
        case DAILY_REPEAT:
            d += '每天' + start_at.format("H:mm:ss");
            break;
        case WEEKLY_REPEAT:
            for (i = 1; i < 7; i++) {
                if (0x40 >> i & schedule.weekly) {
                    a.push(b[i]);
                }
            }
            if (0x40 & schedule.weekly) {
                a.push(b[0]);
            }
            d += '每周星期' + a.join('，') + start_at.format("H:mm:ss");
            break;
        case BIWEEKLY_REPEAT:
            for (i = 1; i < 7; i++) {
                if (0x40 >> i & schedule.weekly) {
                    a.push(b[i]);
                }
            }
            if (0x40 & schedule.weekly) {
                a.push(b[0]);
            }
            d += '每两周的星期' + a.join('，') + start_at.format("H:mm:ss");
            break;
        case MONTH_REPEAT:
            d += '每月' + start_at.format("D日 H:mm:ss");
            break;
    }
    if (schedule.has_repeat && schedule.has_end) {
        switch (schedule.has_end) {
            case END_ON_COUNT:
                d += "(共" + schedule.end_on + "次)";
                break;
            case END_AT_TIME:
                d += '(至' + moment.unix(schedule.end_at).format("YYYY-MM-DD H:mm:ss") + '止)';
                break;
        }
    }
    return d;
};

exports.getPeriodPlans = function (schedule, upperLim, lowerLim) {
    //所有时间戳范围均为左闭右开区间。
    upperLim = moment(upperLim);
    lowerLim = moment(lowerLim);
    var startAt = moment.unix(schedule.start_at);
    var endAt = moment(startAt).add(schedule.duration, 's');
    var lastEnd = moment.unix(schedule.end_at);
    var re = [];
    var m, n;
    var c, i, count;
    switch (schedule.has_repeat) {
        case NO_REPEAT:
            if (startAt < lowerLim && endAt > upperLim) {
                re.push([startAt, endAt]);
            }
            return re;
            break;
        case DAILY_REPEAT:
            if (endAt <= upperLim) {
                m = moment(startAt).add(parseInt((upperLim - endAt) / 24 / 3600 / 1000), 'd');//名义最近结束
                n = moment(m).subtract(schedule.duration, 's');
            } else if (startAt < lowerLim && endAt > upperLim) {
                n = startAt;
                m = moment(n).add(schedule.duration, 's');
            } else {
                return re;
            }
            if (schedule.has_end == END_ON_COUNT) {
                if (!schedule.end_on) {
                    throw new Error("Null Value");
                }
                lastEnd = moment(endAt).add(schedule.end_on - 1, 'd');
            }
            while (n <= lowerLim) {
                if (schedule.has_end != NEVER_END && m > lastEnd) {
                    break;
                }
                if (n > upperLim) {
                    re.push([moment(n), moment(m)]);
                }
                n.add(1, "d");
                m.add(1, "d");
            }
            return re;
            break;
        case WEEKLY_REPEAT:
            if (!schedule.weekly) {
                throw new Error("Error Value");
            }
            if (endAt <= upperLim) {
                m = moment(endAt).add(parseInt((upperLim - endAt) / 7 / 24 / 3600 / 1000), 'w');//名义最近结束
                n = moment(m).subtract(schedule.duration, 's');
            } else if (startAt < lowerLim && endAt > upperLim) {
                n = startAt;
                m = moment(n).add(schedule.duration, 's');
            } else {
                return re;
            }
            if (schedule.has_end == END_ON_COUNT) {
                if (!schedule.end_on) {
                    throw new Error("Null Value");
                }
                c = 0;
                for (i = 0; i < 7; i++) {
                    if (schedule.weekly & (0x40 >> i)) {
                        c++;//每周次数
                    }
                }
                if (endAt <= upperLim) {
                    count = schedule.end_on - parseInt((upperLim - endAt) / 7 / 24 / 3600 / 1000) * c;
                } else {
                    count = schedule.end_on;
                }
            }
            while (n <= lowerLim) {
                if (schedule.has_end == END_AT_TIME && m > lastEnd) {
                    break;
                }
                if (0x40 >> n.day() & schedule.weekly) {
                    if (schedule.has_end == END_ON_COUNT) {
                        if (count <= 0) {
                            break;
                        } else {
                            count--;
                        }
                    }
                    if (n >= upperLim) {
                        re.push([moment(n), moment(m)]);
                    }
                }
                n.add(1, "d");
                m.add(1, "d");
            }
            return re;
            break;
        case BIWEEKLY_REPEAT:
            if (!schedule.biweekly) {
                throw new Error("Error Value");
            }
            if (endAt <= upperLim) {
                m = moment(endAt).add(parseInt((upperLim - endAt) / 14 / 24 / 3600 / 1000) * 2, 'w');//名义最近结束
                n = moment(m).subtract(schedule.duration, 's');
            }
            else if (startAt < lowerLim && endAt > upperLim) {
                n = moment(startAt);
                m = moment(n).add(schedule.duration, 's');
            }
            else {
                return re;
            }
            if (schedule.has_end == END_ON_COUNT) {
                if (!schedule.end_on) {
                    throw new Error("Null Value");
                }
                c = 0;
                for (i = 0; i < 7; i++) {
                    if (schedule.biweekly & (0x40 >> i)) {
                        c++;//每周次数
                    }
                }
                if (endAt <= upperLim) {
                    count = schedule.end_on - parseInt((upperLim - endAt) / 14 / 24 / 3600 / 1000) * 2 * c;
                } else {
                    count = schedule.end_on;
                }
            }
            while (n <= lowerLim) {
                if (schedule.has_end == END_AT_TIME && m > lastEnd) {
                    break;
                }
                if ((n.isoWeek() % 2 == startAt.isoWeek() % 2)
                    && 0x40 >> n.day() & schedule.biweekly
                ) {
                    if (schedule.has_end == END_ON_COUNT) {
                        if (count <= 0) {
                            break;
                        } else {
                            count--;
                        }
                    }
                    if (n >= upperLim) {
                        re.push([moment(n), moment(m)]);
                    }
                }
                n.add(1, "d");
                m.add(1, "d");
            }
            return re;
            break;
        case MONTH_REPEAT:
            if (startAt >= lowerLim) {
                return re;
            }
            if (schedule.has_end == END_ON_COUNT) {
                count = schedule.end_on;
            }
            for (i = 0; ; i++) {
                n = moment(startAt).add(i, "M");
                // if (n.date() != startAt.date()) {  //moment已实现
                //     n.subtract(1, "M").date(n.date());
                // }
                m = moment(n).add(schedule.duration, 's');
                if (n > lowerLim) {
                    break;
                }
                if (schedule.has_end == END_AT_TIME && m > lastEnd) {
                    break;
                }
                if (schedule.has_end == END_ON_COUNT) {
                    if (count <= 0) {
                        break;
                    } else {
                        count--;
                    }
                }
                if (n >= upperLim) {
                    re.push([moment(n), moment(m)]);
                }
            }
            break;
        default:
            throw new Error("Error Value");
    }
    return re;
};