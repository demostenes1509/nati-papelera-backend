export function msleep(n: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, n);
  });
}

export function sleep(n: number) {
  return msleep(n * 1000);
}
