export type TimeObject = { hours: number; minutes: number };

export function formatTime({ hours, minutes }: TimeObject): string {
  const hour = hours.toString().padStart(2, '0');
  const minute = minutes.toString().padStart(2, '0');
  return `${hour}:${minute}`;
}

export function getTimes(interval = 15): string[] {
  const times = [];

  for (let h = 0; h < 24; h += 1) {
    for (let m = 0; m < 60; m += interval) {
      times.push(formatTime({ hours: h, minutes: m }));
    }
  }

  return times;
}

export function getTimeObjects(interval = 15): TimeObject[] {
  const times: TimeObject[] = [];

  for (let h = 0; h < 24; h += 1) {
    for (let m = 0; m < 60; m += interval) {
      times.push({ hours: h, minutes: m });
    }
  }

  return times;
}
