var test = require('tape')
var BisectingNumberSystem = require('../index')

test('basic', function (t) {
  var nums = new BisectingNumberSystem('ABCDEFGHIJKLMNOPQRSTUVWXYZ')

  t.equal('A', nums.fromInteger(0))
  t.equal('R', nums.fromInteger(17))
  t.equal('S', nums.inc(nums.fromInteger(17)))
  t.equal('-R', nums.fromInteger(-17))

  t.equal('BBBC', nums.inc('BBBB'))
  t.equal('-B', nums.dec('A'))
  t.equal('BAAA', nums.inc('AZZZ'))
  t.equal('BAAAA', nums.inc('ZZZZ'))
  t.equal('ZZZY', nums.dec('ZZZZ'))

  t.equal('FWE.A', nums.branch('FWE'))
  t.equal('FWE.B', nums.inc(nums.branch('FWE')))
  t.equal('FWA.-B', nums.dec(nums.branch('FWA')))

  t.equal('FWE.', nums.prefix(nums.inc(nums.branch('FWE'))))
  t.equal('-B', nums.suffix(nums.dec(nums.branch('FWA'))))

  t.deepEqual(['FEW', 'WF', 'QI', 'P'], nums.segments('FEW.WF.QI.P'))
  t.deepEqual(['FWA', '-B'], nums.segments(nums.dec(nums.branch('FWA'))))

  t.equal(1, nums.compare('GO', 'GC'))
  t.equal(1, nums.compare('AB.FWEU', 'AB'))
  t.equal(-1, nums.compare('AB', 'AB.-A'))
  t.equal(0, nums.compare('AB.FWEU', 'AB.FWEU'))

  t.end()
})

test('tiny alphabet', function (t) {
  var nums = new BisectingNumberSystem('01')

  t.equal('0', nums.fromInteger(0))
  t.equal('10001', nums.fromInteger(17))
  t.equal('10010', nums.inc(nums.fromInteger(17)))
  t.equal('-10001', nums.fromInteger(-17))

  t.equal('10000', nums.inc('1111'))
  t.equal('-1', nums.dec('0'))
  t.equal('0', nums.dec('1'))

  t.equal('100.0', nums.branch('100'))
  t.equal('100.1', nums.inc(nums.branch('100')))
  t.equal('100.-1', nums.dec(nums.branch('100')))

  t.equal('11.', nums.prefix(nums.inc(nums.branch('11'))))
  t.equal('-1', nums.suffix(nums.dec(nums.branch('11'))))

  t.equal(1, nums.compare('100', '11'))
  t.equal(-1, nums.compare('11', '100'))
  t.equal(0, nums.compare('11', '11'))

  t.end()
})
