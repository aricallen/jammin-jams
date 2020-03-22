export const ImageSizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  RAW: 'raw',
};

/**
 * single place that knows about how uploads are linked
 */
const getUploadSrc = (upload, size = 'small') => {
  return `/assets/uploads/${size}/${upload.filename}`;
};

export const getMediumUploadSrc = (upload) => {
  return getUploadSrc(upload, ImageSizes.MEDIUM);
};

export const getSmallUploadSrc = (upload) => {
  return getUploadSrc(upload, ImageSizes.SMALL);
};

export const getLargeUploadSrc = (upload) => {
  return getUploadSrc(upload, ImageSizes.LARGE);
};

export const getRawUploadSrc = (upload) => {
  return getUploadSrc(upload, ImageSizes.RAW);
};

export const parseExtension = (filename = '') => {
  if (filename.includes('.')) {
    return filename.split('.').pop();
  }
  return null;
};

export const removeExtension = (filename) => {
  const extension = parseExtension(filename);
  if (!extension) {
    return filename;
  }
  return filename.replace(`.${extension}`, '');
};

export const withCleanFilename = (values = {}) => {
  return {
    ...values,
    filename: removeExtension(values?.filename),
  };
};
