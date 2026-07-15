# temporal-test-clock

A Typescript library that provides a drop-in replacement for Temporal.Now,
enabling you to avoid directly referencing it, so that your now-referencing code can become testable.


## Install

```bash
npm install @widdindustries/temporal-test-clock
```

## Usage

### Production/non-test code

```ts


function doSomethingReferencingNow(clock: typeof Temporal.Now) {
    // The following line could have been `Temporal.Now.plainDateISO()` but 
    // that would make testing difficult
  return clock.plainDateISO();
}

// ... at the point of (system) initiation
const clock = Temporal.Now;

// ... anywhere in the code that needs 'now' is passed a reference to the `clock`

 doSomethingReferencingNow(clock);
 ```

### Test Code

 ```ts

 import { Clock, fixed_UTC } from '@widdindustries/temporal-test-clock';

const aFixedClock = fixed_UTC(
  Temporal.Instant.from('2020-01-02T03:04:05.123456789Z')
);
const resultWithFixedClock = doSomethingReferencingNow(aFixedClock);


let changingTime = Temporal.Instant.from('2020-01-02T03:04:05.123456789Z')

const doesAnythingYouWantClock = new Clock(
  () => changingTime,
  () => Temporal.Now.timeZoneId()
);
const initialResult = doSomethingReferencingNow(doesAnythingYouWantClock);
//... simulate passing of time for example
const duration = Temporal.Duration.from("PT1S");
changingTime = changingTime.add(duration);

const subsequentResult = doSomethingReferencingNow(doesAnythingYouWantClock);


```
