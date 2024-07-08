function normalizeImagePathName(imageName: string): string {
  const imageCorrectName = imageName.toLowerCase().replace(/\s+/, '-');
  return imageCorrectName;
}

export default normalizeImagePathName;
