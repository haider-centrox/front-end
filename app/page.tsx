'use client';

import { useState, useEffect } from 'react';
import { Flashcard } from '@/types/flashcard';
import { fetchFlashcards } from '@/lib/api';
import FlashcardList from '@/components/FlashcardList';
import FlashcardForm from '@/components/FlashcardForm';

export default function Home() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFlashcard, setEditingFlashcard] = useState<Flashcard | undefined>();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadFlashcards();
  }, []);

  const loadFlashcards = async () => {
    setIsLoading(true);
    try {
      const data = await fetchFlashcards();
      setFlashcards(data);
    } catch (error) {
      console.error('Failed to load flashcards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingFlashcard(undefined);
    setShowForm(true);
  };

  const handleEdit = (flashcard: Flashcard) => {
    setEditingFlashcard(flashcard);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingFlashcard(undefined);
    loadFlashcards();
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingFlashcard(undefined);
  };

  const handleDelete = (id: string) => {
    setFlashcards((prev) => prev.filter((f) => f._id !== id));
  };

  const filteredFlashcards = flashcards.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-slate-900">
      {/* Header */}
      <header className="bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Flashcard App</h1>
              <p className="text-zinc-400 mt-1">Create, study, and master your flashcards</p>
            </div>
            <button
              onClick={handleCreate}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Flashcard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search flashcards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent text-white placeholder-zinc-500 shadow-sm"
          />
        </div>

        {/* Stats */}
        {!isLoading && flashcards.length > 0 && (
          <div className="mb-8 flex gap-4">
            <div className="px-5 py-3 bg-zinc-900 rounded-xl shadow-sm border border-zinc-800">
              <span className="text-sm text-zinc-400">Total Cards</span>
              <span className="ml-3 text-xl font-bold text-white">{flashcards.length}</span>
            </div>
            {searchQuery && (
              <div className="px-5 py-3 bg-zinc-900 rounded-xl shadow-sm border border-zinc-800">
                <span className="text-sm text-zinc-400">Filtered</span>
                <span className="ml-3 text-xl font-bold text-blue-400">{filteredFlashcards.length}</span>
              </div>
            )}
          </div>
        )}

        {/* Flashcard List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <FlashcardList
            flashcards={filteredFlashcards}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      {/* Form Modal */}
      {showForm && (
        <FlashcardForm
          flashcard={editingFlashcard}
          onClose={handleCloseForm}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
