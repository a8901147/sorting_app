export function timeDelay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export async function sleep(ms) {
  return await timeDelay(ms);
}
