type NowInterface = typeof Temporal.Now;

/**
 * a drop-in replacement for Temporal.Now that can be used for testing purposes.
 *
 * a fixed clock can be created with the `fixed_UTC`, or a custom clock can be created with the `Clock` constructor,
 * which could do anything you want, including manipulating the time or zone as a test progresses.
 * .
 */
export class Clock implements NowInterface {
  getInstant;
  getTimeZoneId;

  constructor(getInstant: () => Temporal.Instant, getTimeZoneId: () => string) {
    this.getInstant = getInstant;
    this.getTimeZoneId = getTimeZoneId;
  }

  get [Symbol.toStringTag]() {
    return 'Clock' as any;
  }

  instant(): Temporal.Instant {
    return this.getInstant();
  }

  zonedDateTimeISO(tzLike?: Temporal.TimeZoneLike): Temporal.ZonedDateTime {
    return new Temporal.ZonedDateTime(
      this.getInstant().epochNanoseconds,
      tzLike?.toString() || this.getTimeZoneId()
    );
  }

  plainDateTimeISO(tzLike?: Temporal.TimeZoneLike): Temporal.PlainDateTime {
    return new Temporal.ZonedDateTime(
      this.getInstant().epochNanoseconds,
      tzLike?.toString() || this.getTimeZoneId()
    ).toPlainDateTime();
  }

  plainDateISO(tzLike?: Temporal.TimeZoneLike): Temporal.PlainDate {
    return new Temporal.ZonedDateTime(
      this.getInstant().epochNanoseconds,
      tzLike?.toString() || this.getTimeZoneId()
    ).toPlainDate();
  }

  plainTimeISO(tzLike?: Temporal.TimeZoneLike): Temporal.PlainTime {
    return new Temporal.ZonedDateTime(
      this.getInstant().epochNanoseconds,
      tzLike?.toString() || this.getTimeZoneId()
    ).toPlainTime();
  }

  timeZoneId(): string {
    return this.getTimeZoneId();
  }
}

export function fixed_UTC(instant: Temporal.Instant): Clock {
  return new Clock(
    () => instant,
    () => 'UTC'
  );
}
