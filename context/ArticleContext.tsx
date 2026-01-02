import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Article } from '../types';


interface ArticleContextType {
  articles: Article[];
  addArticle: (article: Article) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  const addArticle = (article: Article) => {
    setArticles((prev) => [article, ...prev]);
  };

  const updateArticle = (updatedArticle: Article) => {
    setArticles((prev) => 
      prev.map((a) => (a.id === updatedArticle.id ? updatedArticle : a))
    );
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <ArticleContext.Provider value={{ articles, addArticle, updateArticle, deleteArticle }}>
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