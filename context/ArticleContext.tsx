import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Article } from '../types';
import { MOCK_ARTICLES, SAMPLE_PDF } from '../constants';

interface ArticleContextType {
  articles: Article[];
  addArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);

  const addArticle = (article: Article) => {
    setArticles((prev) => [article, ...prev]);
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <ArticleContext.Provider value={{ articles, addArticle, deleteArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};
