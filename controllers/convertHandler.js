'use strict';

function ConvertHandler() {
  const unitsAcceptedLower = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
  const spelled = {
    gal: 'gallons',
    L: 'liters',
    mi: 'miles',
    km: 'kilometers',
    lbs: 'pounds',
    kg: 'kilograms',
  };

  const getFirstLetterIndex = (str) => str.search(/[a-zA-Z]/);

  const isValidNumeric = (s) => {
    // Permite enteros, decimales y .x; acepta signo opcional
    return /^-?\d+(\.\d+)?$|^-?\.\d+$/.test(s);
  };

  this.getNum = function(input) {
    if (typeof input !== 'string') return 'invalid number';
    const trimmed = input.trim();
    const idx = getFirstLetterIndex(trimmed);
    const numStr = idx === -1 ? trimmed : trimmed.slice(0, idx).trim();

    if (numStr === '') return 1;

    const slashCount = (numStr.match(/\//g) || []).length;
    if (slashCount > 1) return 'invalid number';

    if (slashCount === 1) {
      const [n, d] = numStr.split('/');
      if (n === '' || d === '') return 'invalid number';
      if (!isValidNumeric(n) || !isValidNumeric(d)) return 'invalid number';
      const numerator = parseFloat(n);
      const denominator = parseFloat(d);
      if (denominator === 0) return 'invalid number'; // evitar división por 0
      return numerator / denominator;
    } else {
      if (!isValidNumeric(numStr)) return 'invalid number';
      return parseFloat(numStr);
    }
  };

  this.getUnit = function(input) {
    if (typeof input !== 'string') return 'invalid unit';
    const trimmed = input.trim();
    const idx = getFirstLetterIndex(trimmed);
    if (idx === -1) return 'invalid unit';
    const unitStr = trimmed.slice(idx).trim();
    if (unitStr === '') return 'invalid unit';
    const lower = unitStr.toLowerCase();

    if (!unitsAcceptedLower.includes(lower)) return 'invalid unit';
    return lower === 'l' ? 'L' : lower;
  };

  this.getReturnUnit = function(initUnit) {
    const map = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs',
    };
    return map[initUnit];
  };

  this.spellOutUnit = function(unit) {
    return spelled[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case 'gal': return initNum * galToL;
      case 'L':   return initNum / galToL;
      case 'lbs': return initNum * lbsToKg;
      case 'kg':  return initNum / lbsToKg;
      case 'mi':  return initNum * miToKm;
      case 'km':  return initNum / miToKm;
      default:    return NaN;
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // Asegura 5 decimales en returnNum en cadena, pero en JSON lo pasamos como número
    const rn = Number.parseFloat(Number(returnNum).toFixed(5));
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${rn} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
