const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  test('convertHandler should correctly read a whole number input', function() {
    assert.strictEqual(convertHandler.getNum('32L'), 32);
  });

  test('convertHandler should correctly read a decimal number input', function() {
    assert.strictEqual(convertHandler.getNum('3.2mi'), 3.2);
  });

  test('convertHandler should correctly read a fractional input', function() {
    assert.strictEqual(convertHandler.getNum('1/2km'), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function() {
    assert.strictEqual(convertHandler.getNum('3.2/2kg'), 1.6);
  });

  test('convertHandler should correctly return an error on a double-fraction', function() {
    assert.strictEqual(convertHandler.getNum('3/2/3mi'), 'invalid number');
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    assert.strictEqual(convertHandler.getNum('kg'), 1);
    assert.strictEqual(convertHandler.getNum('L'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function() {
    assert.strictEqual(convertHandler.getUnit('32L'), 'L');
    assert.strictEqual(convertHandler.getUnit('32l'), 'L');
    assert.strictEqual(convertHandler.getUnit('32gal'), 'gal');
    assert.strictEqual(convertHandler.getUnit('32GAL'), 'gal');
    assert.strictEqual(convertHandler.getUnit('32mi'), 'mi');
    assert.strictEqual(convertHandler.getUnit('32KM'), 'km');
    assert.strictEqual(convertHandler.getUnit('32lbs'), 'lbs');
    assert.strictEqual(convertHandler.getUnit('32KG'), 'kg');
  });

  test('convertHandler should correctly return an error for an invalid input unit', function() {
    assert.strictEqual(convertHandler.getUnit('32g'), 'invalid unit');
    assert.strictEqual(convertHandler.getUnit('32literz'), 'invalid unit');
  });

  test('convertHandler should return the correct return unit for each valid input unit', function() {
    assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
    assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
    assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
    assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters');
    assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
    assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  test('convertHandler should correctly convert gal to L', function() {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
  });

  test('convertHandler should correctly convert L to gal', function() {
    assert.approximately(convertHandler.convert(1, 'L'), 0.264172, 0.00001);
  });

  test('convertHandler should correctly convert mi to km', function() {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
  });

  test('convertHandler should correctly convert km to mi', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 0.621371, 0.0001);
  });

  test('convertHandler should correctly convert lbs to kg', function() {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.00001);
  });

  test('convertHandler should correctly convert kg to lbs', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.0001);
  });

});

