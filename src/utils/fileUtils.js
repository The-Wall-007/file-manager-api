// Later you can move reusable logic here like:
export const fileExists = (filePath) => {
  return fs.existsSync(filePath);
};
