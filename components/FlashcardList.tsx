'use client';

import { Flashcard } from '@/types/flashcard';
import FlashcardCard from './FlashcardCard';

interface FlashcardListProps {
  flashcards: Flashcard[];
  onEdit: (flashcard: Flashcard) => void;
  onDelete: (id: string) => void;
}

export default function FlashcardList({ flashcards, onEdit, onDelete }: FlashcardListProps) {
  if (flashcards.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-zinc-300 mb-2">No flashcards yet</h3>
        <p className="text-zinc-500">Create your first flashcard to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {flashcards.map((flashcard) => (
        <FlashcardCard
          key={flashcard._id}
          flashcard={flashcard}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
