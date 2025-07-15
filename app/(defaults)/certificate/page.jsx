'use client';

import { useState } from 'react';

export default function Certificate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const URI = process.env.NEXT_PUBLIC_URL || 'http://localhost/codingwise-lms/public/';

  const handleGenerateCertificates = async (event) => {
    event.preventDefault();
    const fileInput = event.target.querySelector('input[type="file"]');
    const file = fileInput?.files?.[0];

    if (!file) {
      setError('Please select a CSV file');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('csvFile', file);

      const response = await fetch(`${URI}courses/bulk`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate certificates');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = response.headers.get('Content-Disposition')?.split('filename=')[1]?.replace(/"/g, '') || 'certificates.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating certificates:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-white to-gray-50">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 md:p-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-5xl">🎓</span>
          Certificate Generator
        </h1>

        <form onSubmit={handleGenerateCertificates} className="space-y-6">
          <div className="border-dashed border-2 border-gray-300 rounded-xl p-6 bg-gray-50 hover:border-blue-500 transition">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Upload CSV <span className="text-gray-400">(studentName, courseName)</span>
            </label>
            <input
              type="file"
              accept=".csv"
              className="w-full rounded-md bg-white border border-gray-300 p-3 text-sm text-gray-800 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-blue-700 file:bg-blue-100 hover:file:bg-blue-200 file:rounded-md cursor-pointer"
              disabled={isLoading}
            />
          </div>

          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Generate Certificates'}
          </button>

          <div className="mt-4 text-center text-sm text-gray-500">
            Need help formatting CSV?{' '}
            <button
              type="button"
              onClick={() => {
                const blob = new Blob([`studentName,courseName\nJohn Doe,React Basics`], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'sample.csv';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="inline-block text-blue-600 hover:underline"
            >
              Download sample
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
