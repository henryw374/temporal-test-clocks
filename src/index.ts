import { Temporal } from 'proposal-temporal';
// is there a way to check test clocks conform to actual clock? runtime type check?

type NowInterface = typeof Temporal.Now;

class Clock implements NowInterface {
  getInstant;
  getTimeZoneId;

  constructor(getInstant: () => Temporal.Instant, getTimeZoneId: () => string) {
    this.getInstant = getInstant;
    this.getTimeZoneId = getTimeZoneId;
  }

  get [Symbol.toStringTag]() {
    return 'Temporal.Now' as any;
  }

  instant(): Temporal.Instant {
    return this.getInstant();
  }

  zonedDateTimeISO(tzLike?: Temporal.TimeZoneLike): Temporal.ZonedDateTime {
    return new Temporal.ZonedDateTime(
      this.getInstant().epochNanoseconds,
      tzLike || this.getTimeZoneId()
    );
  }

  plainDateTimeISO(tzLike?: Temporal.TimeZoneLike): Temporal.PlainDateTime {
    return new Temporal.ZonedDateTime(
      this.getInstant().epochNanoseconds,
      tzLike || this.getTimeZoneId()
    ).toPlainDateTime();
  }

  plainDateISO(tzLike?: Temporal.TimeZoneLike): Temporal.PlainDate {
    return new Temporal.ZonedDateTime(
      this.getInstant().epochNanoseconds,
      tzLike || this.getTimeZoneId()
    ).toPlainDate();
  }

  plainTimeISO(tzLike?: Temporal.TimeZoneLike): Temporal.PlainTime {
    return new Temporal.ZonedDateTime(
      this.getInstant().epochNanoseconds,
      tzLike || this.getTimeZoneId()
    ).toPlainTime();
  }

  timeZoneId(): string {
    return this.getTimeZoneId();
  }
}

export const myPackage = (taco = ''): string => `${taco} from my package`;

export function fixed_UTC(instant: Temporal.Instant): Clock {
  return new Clock(
    () => instant,
    () => 'UTC'
  );
}
