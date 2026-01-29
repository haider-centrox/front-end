export interface Flashcard {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFlashcardDto {
  question: string;
  answer: string;
}

export interface UpdateFlashcardDto {
  question?: string;
  answer?: string;
}
