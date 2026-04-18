export const formatFileSize = (bytes) => {
  if (bytes === 0 || !bytes) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let index = 0;

  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }

  return `${size.toFixed(1)} ${units[index]}`;
};

export const calculateUsageRatio = (total, available) => {
  if (!total || total <= 0) return 0;
  const used = total - available;
  return (used / total) * 100;
};