'use client';

import { useState, useEffect } from 'react';
import { Flashcard, CreateFlashcardDto, UpdateFlashcardDto } from '@/types/flashcard';
import { createFlashcard, updateFlashcard } from '@/lib/api';

interface FlashcardFormProps {
  flashcard?: Flashcard;
  onClose: () => void;
  onSave: () => void;
}

export default function FlashcardForm({ flashcard, onClose, onSave }: FlashcardFormProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (flashcard) {
      setQuestion(flashcard.question);
      setAnswer(flashcard.answer);
    }
  }, [flashcard]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      alert('Please fill in both question and answer');
      return;
    }

    setIsSubmitting(true);

    try {
      if (flashcard) {
        const data: UpdateFlashcardDto = { question, answer };
        await updateFlashcard(flashcard._id, data);
      } else {
        const data: CreateFlashcardDto = { question, answer };
        await createFlashcard(data);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save flashcard:', error);
      alert('Failed to save flashcard');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-2xl shadow-xl w-full max-w-md p-6 border border-zinc-800">
        <h2 className="text-2xl font-bold text-white mb-6">
          {flashcard ? 'Edit Flashcard' : 'Create New Flashcard'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-zinc-300 mb-2">
              Question
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none text-white placeholder-zinc-500"
              rows={3}
              placeholder="Enter your question..."
              required
            />
          </div>

          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-zinc-300 mb-2">
              Answer
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none text-white placeholder-zinc-500"
              rows={3}
              placeholder="Enter the answer..."
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-zinc-700 text-zinc-300 rounded-lg hover:bg-zinc-800 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : flashcard ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
