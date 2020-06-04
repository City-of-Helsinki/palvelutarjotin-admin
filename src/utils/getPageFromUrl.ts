export default function getPageFromUrl(url: string) {
  const searchParams = new URLSearchParams(url);
  return Number(searchParams.get('page'));
}
