'use client';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import css from './NotesPage.module.css';
import { useState } from 'react';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Pagination from '@/components/Pagination/Pagination';
import { useDebouncedCallback } from 'use-debounce';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

export default function NotesPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', page, searchKey],
    queryFn: () => fetchNotes(page, searchKey),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleNoteCreated = () => {
    queryClient.invalidateQueries({ queryKey: ['notes'] });
    closeModal();
  };

  const updateSearchKey = useDebouncedCallback((searchWord: string) => {
    setSearchKey(searchWord);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={updateSearchKey} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            updatePage={setPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isError && (
        <ErrorMessage errorText="There was an error, please try again..." />
      )}
      {isLoading && <Loader />}
      {isSuccess && <NoteList notes={data?.notes ?? []} />}
      {isSuccess && data?.notes.length === 0 && (
        <ErrorMessage errorText="You don’t have matching notes" />
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} onSubmit={handleNoteCreated} />
        </Modal>
      )}
    </div>
  );
}
