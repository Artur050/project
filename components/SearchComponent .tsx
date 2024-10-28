'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = async () => {
        if (query.trim()) {
            router.push(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="flex items-center">
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search templates..."
                className="border rounded-l-md p-2 focus:outline-none"
            />
            <button
                onClick={handleSearch}
                className="ml-2 p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition"
            >
                Search
            </button>
        </div>
    );
};

export default SearchComponent;
