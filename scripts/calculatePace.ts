export const calculatePace = (
  timeInSeconds: number,
  distanceInMeters: number
): string => {
  if (distanceInMeters === 0) return "0'00\"";

  const distanceInKm = distanceInMeters / 1000;
  const totalMinutes = timeInSeconds / 60;
  const pace = totalMinutes / distanceInKm;

  const minutes = Math.floor(pace);
  const seconds = Math.round((pace - minutes) * 60);

  return `${minutes}'${seconds < 10 ? "0" : ""}${seconds}"`;
};
