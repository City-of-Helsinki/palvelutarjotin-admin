import { URL } from 'url';

export default function getPageFromUrl(url: string) {
  const { searchParams } = new URL(url);

  return Number(searchParams.get('page'));
}
