export function slugify(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .join("_");
}

export function unslugify(str: string): string {
  return str
    .split("_")
    .map(substr => `${substr[0].toUpperCase()}${substr.substring(1)}`)
    .join(" ");
}
