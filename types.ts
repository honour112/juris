export type Language = 'en' | 'fr';

export interface Article {
  id: string;
  title: { en: string; fr: string };
  excerpt: { en: string; fr: string };
  category: string;
  date: string;
  edition: string; // e.g. "Vol. 12 - Jan 2024"
  imageUrl: string;
  readTime: string;
  pdfUrl?: string;
  status: 'published' | 'pending' | 'rejected';
  author: string;
  pdf_path?: string;
}

export interface LawyerProfile {
  name: string;
  title: { en: string; fr: string };
  yearsExperience: number;
  bio: { en: string; fr: string };
  specialties: Array<{
    icon: string;
    title: { en: string; fr: string };
    description: { en: string; fr: string };
  }>;
  achievements: Array<{ en: string; fr: string }>;
}

export interface Translation {
  [key: string]: {
    en: string;
    fr: string;
  };
}