export const z = {
  object: (_shape: any) => ({ parse: (v: any) => v }),
  string: () => ({}),
  number: () => ({}),
  enum: (_vals: any) => ({}),
  array: (_schema: any) => ({ parse: (v: any) => v })
};
