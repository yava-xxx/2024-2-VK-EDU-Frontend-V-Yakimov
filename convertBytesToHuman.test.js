/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman('1')).toBe('Error');
  expect(convertBytesToHuman('string')).toBe('Error');
  expect(convertBytesToHuman(null)).toBe('Error');
  expect(convertBytesToHuman(undefined)).toBe('Error');
  expect(convertBytesToHuman(true)).toBe('Error');
  expect(convertBytesToHuman(false)).toBe('Error');
  expect(convertBytesToHuman({})).toBe('Error');
  expect(convertBytesToHuman([])).toBe('Error');
  expect(convertBytesToHuman(-1)).toBe('Error');
  expect(convertBytesToHuman(-1)).not.toBe("1 B")
  expect(convertBytesToHuman(-1024)).toBe('Error');
  expect(convertBytesToHuman(-1048576)).toBe('Error');
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(0)).toBe('0 B');
  expect(convertBytesToHuman(1)).toBe('1 B');
  expect(convertBytesToHuman(5)).toBe('5 B');
  expect(convertBytesToHuman(1023)).toBe('1023 B');
  expect(convertBytesToHuman(1024)).toBe('1 KB');
  expect(convertBytesToHuman(1024 * 2)).toBe('2 KB');
  expect(convertBytesToHuman(1024 * 1023)).toBe('1023 KB');
  expect(convertBytesToHuman(1048576)).toBe('1 MB');
  expect(convertBytesToHuman(1048576 * 2)).toBe('2 MB');
  expect(convertBytesToHuman(1048576 * 1023)).toBe('1023 MB');
  expect(convertBytesToHuman(1073741824)).toBe('1 GB');
  expect(convertBytesToHuman(1073741824 * 2)).toBe('2 GB');
  expect(convertBytesToHuman(1073741824 * 1023)).toBe('1023 GB');
  expect(convertBytesToHuman(1099511627776)).toBe('1 TB');
  expect(convertBytesToHuman(1099511627776 * 2)).toBe('2 TB');
  expect(convertBytesToHuman(1099511627776 * 1023)).toBe('1023 TB');
  expect(convertBytesToHuman(1024 * 1024)).toBe('1 MB');
  expect(convertBytesToHuman(1048576 * 1024)).toBe('1 GB');
  expect(convertBytesToHuman(1073741824 * 1024)).toBe('1 TB');
});

test('Возвращает корректное значение для вещественных чисел', () => {
  expect(convertBytesToHuman(500.5)).toBe('500.500 B');
  expect(convertBytesToHuman(1024.5)).toBe('1.000 KB');
  expect(convertBytesToHuman(1048576.123)).toBe('1.000 MB');
  expect(convertBytesToHuman(1073741824.987)).toBe('1.000 GB');
  expect(convertBytesToHuman(1023.999)).toBe('1023.999 B');
  expect(convertBytesToHuman(1024.000)).toBe('1 KB');
  expect(convertBytesToHuman(1024 * 1024 - 0.001)).toBe('1024.000 KB');
  expect(convertBytesToHuman(123123123)).toBe('117.419 MB');
});
