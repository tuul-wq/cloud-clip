export function fileSize (size) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let count = 0;
  while (size >= 1024) {
    size = (size / 1024).toFixed(2);
    count++;
  }
  return `${size} ${units[count]}`;
}

