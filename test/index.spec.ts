import assert from 'assert';
import { fixed_UTC, Clock } from '../src';

describe('fixed_UTC', () => {
  it('invokes all public Temporal.Now methods', () => {
    const instant = Temporal.Instant.from('2020-01-02T03:04:05.123456789Z');
    const clock = fixed_UTC(instant);

    assert.strictEqual(clock.instant().toString(), instant.toString());
    assert.strictEqual(
      clock.zonedDateTimeISO().toString(),
      '2020-01-02T03:04:05.123456789+00:00[UTC]'
    );
    assert.strictEqual(
      clock.plainDateTimeISO().toString(),
      '2020-01-02T03:04:05.123456789'
    );
    assert.strictEqual(clock.plainDateISO().toString(), '2020-01-02');
    assert.strictEqual(clock.plainTimeISO().toString(), '03:04:05.123456789');
    assert.strictEqual(clock.timeZoneId(), 'UTC');
  });
});

describe('doSomethingReferencingNow', () => {
  it('invokes a function that references "now"  - and show it can use a Clock or Temporal.Now', () => {
    const clock = new Clock(
      () => Temporal.Now.instant(),
      () => Temporal.Now.timeZoneId()
    );

    const resultWithNow = doSomethingReferencingNow(Temporal.Now);
    const resultWithClock = doSomethingReferencingNow(clock);

    assert.strictEqual(resultWithNow.toString(), resultWithClock.toString());
  });
});

/**
 * this is an example of some non-test/production code that avoids directly referenceing Temporal.Now, and instead takes a clock as an argument.
 *
 * This allows the code to be tested with a Clock that can be controlled in tests.
 */
function doSomethingReferencingNow(clock: typeof Temporal.Now) {
  return clock.plainDateISO();
}
