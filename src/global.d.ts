declare module "*.css" {
  const classNameHashMap: { [key: string]: string };
  export default classNameHashMap;
}

interface Window {
  loadedChunks: ([string[], { [key: string]: () => void }])[];
  ga: (arg1: string, arg2: string, arg3?: string) => void;
}
