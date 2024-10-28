'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ITemplate } from '@/models/Template/ITemplate';

const SearchResults = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const [results, setResults] = useState<ITemplate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            if (query) {
                const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
                const data = await response.json();
                setResults(data.templates || []);
            }
            setLoading(false);
        };

        fetchResults();
    }, [query]);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Search Results for: {query}</h1>{' '}
                    <ul className="space-y-2">
                        {results.map(template => (
                            <li key={template.id}>
                                <Link
                                    href={`/template/${template.id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {template.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const SearchPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
    );
};

export default SearchPage;
