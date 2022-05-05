export default function count(length) {
  return Array.from({ length }, (_, i) => {
    return {
      value: i
    };
  });
}
