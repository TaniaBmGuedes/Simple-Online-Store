export function urlBuilder(params: Record<string, string>,searchParams: URLSearchParams) {
  const newParams = new URLSearchParams(searchParams);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
  });
  return `/?${newParams.toString()}`;
}
