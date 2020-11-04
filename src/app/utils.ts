export function getTime(): string {
  const now = new Date();
  return (
    now.getHours() +
    ':' +
    now.getMinutes() +
    ':' +
    (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()) +
    '.' +
    (now.getMilliseconds() < 10
      ? '00' + now.getMilliseconds()
      : now.getMilliseconds() < 100
      ? '0' + now.getMilliseconds()
      : now.getMilliseconds())
  );
}
