import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center text-center py-24 bg-gray-50">
      <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
      <h1 className="text-6xl font-extrabold text-gray-800">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-700">Page Not Found</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-md">
        Sorry, the page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link 
        href="/" 
        className="mt-8 bg-blue-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-900 transition-colors"
      >
        Go Back to Homepage
      </Link>
    </main>
  );
}