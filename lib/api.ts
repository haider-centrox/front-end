import { Flashcard, CreateFlashcardDto, UpdateFlashcardDto } from '@/types/flashcard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchFlashcards(): Promise<Flashcard[]> {
  const response = await fetch(`${API_URL}/flashcard`);
  if (!response.ok) {
    throw new Error('Failed to fetch flashcards');
  }
  return response.json();
}

export async function fetchFlashcard(id: string): Promise<Flashcard> {
  const response = await fetch(`${API_URL}/flashcard/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch flashcard');
  }
  return response.json();
}

export async function createFlashcard(data: CreateFlashcardDto): Promise<Flashcard> {
  const response = await fetch(`${API_URL}/flashcard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create flashcard');
  }
  return response.json();
}

export async function updateFlashcard(id: string, data: UpdateFlashcardDto): Promise<Flashcard> {
  const response = await fetch(`${API_URL}/flashcard/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update flashcard');
  }
  return response.json();
}

export async function deleteFlashcard(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/flashcard/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete flashcard');
  }
}
