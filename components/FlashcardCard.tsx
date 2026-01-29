'use client';

import { useState } from 'react';
import { Flashcard } from '@/types/flashcard';
import { deleteFlashcard } from '@/lib/api';

interface FlashcardCardProps {
  flashcard: Flashcard;
  onEdit: (flashcard: Flashcard) => void;
  onDelete: (id: string) => void;
}

export default function FlashcardCard({ flashcard, onEdit, onDelete }: FlashcardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this flashcard?')) return;

    setIsDeleting(true);
    try {
      await deleteFlashcard(flashcard._id);
      onDelete(flashcard._id);
    } catch (error) {
      console.error('Failed to delete flashcard:', error);
      alert('Failed to delete flashcard');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative w-full h-64 transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
          }}
        >
          {/* Front */}
          <div
            className="absolute w-full h-full bg-zinc-900 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center border border-zinc-800"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <h3 className="text-lg font-semibold text-zinc-500 mb-2">Question</h3>
            <p className="text-xl text-center text-white">{flashcard.question}</p>
          </div>

          {/* Back */}
          <div
            className="absolute w-full h-full bg-gradient-to-br from-blue-900 to-slate-900 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center border border-blue-800"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Answer</h3>
            <p className="text-xl text-center text-white">{flashcard.answer}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(flashcard);
          }}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={isDeleting}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
