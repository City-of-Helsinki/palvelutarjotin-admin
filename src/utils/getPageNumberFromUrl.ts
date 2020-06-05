export default function getPageNumberFromUrl(url: string): number {
  const { searchParams } = new URL(url);

  return Number(searchParams.get('page'));
}
