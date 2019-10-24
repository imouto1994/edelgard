declare module "*.png" {
  const url: string;
  export default url;
}

declare module "*.css" {
  const classNameHashMap: { [key: string]: string };
  export default classNameHashMap;
}
