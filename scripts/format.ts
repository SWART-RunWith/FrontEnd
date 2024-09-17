export const formatDistance = (meters: number) => {
  const km = Math.floor(meters / 1000);
  const m = Math.floor((meters % 1000) / 10);
  return `${km.toString().padStart(2, "0")}.${m.toString().padStart(2, "0")}`;
};

export const formatTime = (secs: number) => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = secs % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
