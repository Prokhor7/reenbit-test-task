const URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const KEY = 'GNAX8PRC9DPTV7F98LCY6W5BM';

const API = {
    FORECAST: URL + `[city]/[date1]/[date2]?unitGroup=metric&include=days&key=${KEY}&contentType=json`,
    TODAY: URL + `[city]/today?unitGroup=metric&include=days&key=${KEY}&contentType=json`
} as const;

export { API }