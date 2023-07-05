import { useState, useEffect, useCallback } from 'react';
import Downshift from 'downshift';
import { useRouter } from 'next/router';

interface SearchResult {
  header: string;
  id: string;
  level: number;
  content: string;
  path: string;
  query: string;
}

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  const memoizedSearch = useCallback(async (value: string) => {
    try {
      const response = await fetch(`/api/search?q=${value}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  }, []);

  useEffect(() => {
    if (inputValue.trim()) {
      memoizedSearch(inputValue);
    } else {
      setResults([]);
    }
  }, [inputValue, memoizedSearch]);

  return (
    <Downshift
      inputValue={inputValue}
      onChange={(selectedItem: SearchResult | null) => {
        if (selectedItem) {
          router.push(selectedItem.path + "#" + selectedItem.id);
        }
      }}
      itemToString={item => (item ? item.header : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        highlightedIndex,
        isOpen,
        selectedItem,
      }) => (
        <div>
          <input {...getInputProps({ onChange: e => setInputValue(e.target.value) })} />
          <ul {...getMenuProps()}>
            {isOpen &&
              results.map((item, index) => (
                <li
                  key={item.id}
                  {...getItemProps({ item, index })}
                  style={{
                    backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                    fontWeight: selectedItem === item ? 'bold' : 'normal',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <strong>{item.header}</strong>
                  <em>{item.query}</em>
                </li>
              ))}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

export default Search;
