import { useState, useEffect, useCallback } from 'react';
import apiClient from '../lib/api-client';

const usePaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/dashboard/payment-history');
      setPaymentHistory(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
      setPaymentHistory([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    paymentHistory,
    loading,
    error,
    refetch: fetchData,
  };
};

export default usePaymentHistory;
