const parseError = (error: string) => {
  const errorMessage = JSON.parse(error);
  return errorMessage.error;
};

export { parseError };
