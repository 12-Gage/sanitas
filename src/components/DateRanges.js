import {
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
    format,
  } from 'date-fns'
  
  export function getWeekRange(date = new Date()) {
    return {
      start: format(startOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd'), // Monday
      end: format(endOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd'),     // Sunday
    }
  }
  
  export function getMonthRange(date = new Date()) {
    return {
      start: format(startOfMonth(date), 'yyyy-MM-dd'),
      end: format(endOfMonth(date), 'yyyy-MM-dd'),
    }
  }
  
  export function getYearRange(date = new Date()) {
    return {
      start: format(startOfYear(date), 'yyyy-MM-dd'),
      end: format(endOfYear(date), 'yyyy-MM-dd'),
    }
  }
  