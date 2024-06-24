import React, { useState, useEffect } from 'react';
import './App.css';
//import { v4 as uuidv4 } from 'uuid';
import {  FaTrash ,FaSmile} from 'react-icons/fa';


// Interface for a Joke object
interface Joke {
  id: number;
  joke: string;
  rate: number;
}

// Initial set of jokes
const initialJokes: Joke[] = [
  {
    id: 1,
    joke: 'What do you call a very small valentine? A valen-tiny!',
    rate: 3
  },
  {
    id: 2,
    joke: 'What did the dog say when he rubbed his tail on the sandpaper? Rough, rough!',
    rate: 2
  },
  {
    id: 3,
    joke: 'A termite walks into the bar and says, "Where is the bar tender?"',
    rate: 1
  },
  {
    id: 4,
    joke: 'Why did the scarecrow win an award? Because he was outstanding in his field!',
    rate: 0
  },
  {
    id: 5,
    joke: 'Why was the math book sad? Because it had too many problems.',
    rate: 0
  }
];

// Main App component
function App() {
  // State to manage jokes, initialized with localStorage if available
  const [jokes, setJokes] = useState<Joke[]>(() => {
    const savedJokes = localStorage.getItem('jokes');
    return savedJokes ? JSON.parse(savedJokes) : initialJokes;
  });

  // Save jokes to localStorage whenever jokes state changes
  useEffect(() => {
    localStorage.setItem('jokes', JSON.stringify(jokes));
  }, [jokes]);

  // Function to add a new joke
  const addJoke = (jokeText: string) => {
    const newJoke: Joke = { id: jokes.length + 1, joke: jokeText, rate: 0 };
    setJokes([...jokes, newJoke]);
  };

  // Function to update the rate of a joke
  const updateRate = (id: number, rate: number) => {
    setJokes(jokes.map(joke => 
      joke.id === id ? { ...joke, rate } : joke
    ));
  };

  // Function to delete a joke
  const deleteJoke = (id: number) => {
    setJokes(jokes.filter(joke => joke.id !== id));
  };

  // Handle form submission to add a new joke
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget[0] as HTMLInputElement;
    const joke = input.value;
    if (joke) {
      addJoke(joke);
      input.value = ''; // Clear the input field
    }
  };

  return (
    <div className='container'>
      <h2 className='Title'>Jokes for you 🐰</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder='Add a joke' />
        <button type='submit'>Add Joke</button>
      </form>
      <div className="jokes">
        {jokes && jokes.sort((a, b) => b.rate - a.rate).map((joke) => (
          <div key={joke.id} className='joke'>
            <div className='joke-text'>{joke.joke}</div>
            <div className='text'>{joke.rate}</div>
            <div className="joke-buttons">
              <button onClick={() => updateRate(joke.id, joke.rate + 1)}><FaSmile/></button>
              <button onClick={() => updateRate(joke.id, joke.rate - 1)}>🤐</button>
              <button onClick={() => deleteJoke(joke.id)}><FaTrash/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;