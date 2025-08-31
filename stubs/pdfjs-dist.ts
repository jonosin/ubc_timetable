export async function getDocument(_: any) {
  return {
    numPages: 0,
    getPage: async (_page: number) => ({
      getTextContent: async () => ({ items: [] })
    })
  } as any;
}
