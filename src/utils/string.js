export function capitalize(string) {
  if (string.length === 0) {
    return string; // Handles empty strings
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}