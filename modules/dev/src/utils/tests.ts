export function expectAssert(
  data: any
): asserts data is Exclude<
  any,
  false | 0 | "" | null | undefined | typeof NaN
> {
  if (!Boolean(data)) {
    throw new Error(
      `Value provided (${
        String(data).slice(0, 60) + (String(data).length > 60 ? "..." : "")
      }) was a falsy value`
    );
  }
}

export function promiseWithTimeout<T>(
  promise: Promise<T>,
  timeout: number = 3000
) {
  return Promise.race([
    promise,
    new Promise((_resolve, reject) =>
      setTimeout(() => reject(new Error("Test timed out")), timeout)
    ),
  ]);
}
