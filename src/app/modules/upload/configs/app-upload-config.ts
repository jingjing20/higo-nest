export default () => {
  const dest = process.env.UPLOAD_DEST;

  return {
    upload: {
      dest,
    },
  };
};
