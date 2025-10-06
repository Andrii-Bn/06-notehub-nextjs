import axios from 'axios';
import type { CreateNoteRequest, Note } from '../types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalCount: number;
}

export const fetchNotes = async (
  page: number = 1,
  searchKey: string = '',
): Promise<NotesResponse> => {
  const res = await axios.get<NotesResponse>(
    `/notes?search=${encodeURIComponent(
      searchKey,
    )}&page=${page}&perPage=12&sortBy=created`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  );
  return res.data;
};

export const createNote = async (data: CreateNoteRequest) => {
  const res = await axios.post<Note>('/notes', data, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const res = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return res.data;
};
