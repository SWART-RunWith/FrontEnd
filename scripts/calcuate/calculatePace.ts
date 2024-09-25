export const calculatePace = (
  timeInSeconds: number,
  distanceInMeters: number
): string => {
  if (distanceInMeters === 0) return "0'00\"";

  const distanceInKm = distanceInMeters / 1000;
  const totalMinutes = timeInSeconds / 60;
  const pace = totalMinutes / distanceInKm;

  if (isNaN(pace) || pace === Infinity) return "0'00\"";

  let minutes = Math.floor(pace);
  let seconds = Math.round((pace - minutes) * 60);

  if (seconds === 60) {
    seconds = 0;
    minutes += 1;
  }

  return `${minutes}'${seconds < 10 ? "0" : ""}${seconds}"`;
};
