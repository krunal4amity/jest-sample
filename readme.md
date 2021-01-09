# Jest sample demo

Mock network calls in unit tests because:

- testing with network calls is slow
- network output can be unreliable
- there could be restrictions on network e.g. rate limiting
- because unit test don't have to do it.

Mock every dependency your unit test touches.

- When the execution of a method passes outside of that method, into another object, and back again, you have a dependency.
- A unit test should test a single codepath through a single method.
- When you test that code path with the actual dependency, you are not unit testing; you are integration testing. While that's good and necessary, it isn't unit testing.
