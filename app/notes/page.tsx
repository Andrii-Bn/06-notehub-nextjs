import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesPageClient from './Notes.client';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const page = 1;
  const searchKey = '';

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, searchKey],
    queryFn: () => fetchNotes(page, searchKey),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPageClient />
    </HydrationBoundary>
  );
}
