'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/categories').then(r => r.json()),
      fetch('/api/products?limit=100').then(r => r.json()),
    ])
      .then(([catResult, prodResult]) => {
        if (catResult.success) setCategories(catResult.data);
        if (prodResult.success) setProducts(prodResult.data);
      })
      .catch(err => {
        console.error('AppData fetch error:', err);
        setError('Failed to load data');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppDataContext.Provider value={{ categories, products, loading, error }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}
