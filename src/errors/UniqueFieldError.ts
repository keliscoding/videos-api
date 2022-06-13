class UniqueFieldError extends Error {
  constructor(fieldName: string) {
    super(`Field ${fieldName} must be unique`);
    this.name = 'UniqueFieldError';
  }
}

export { UniqueFieldError };
