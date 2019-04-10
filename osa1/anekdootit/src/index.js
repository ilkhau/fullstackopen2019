import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({handler, text}) => {
    return (
        <button onClick={handler}>
            {text}
        </button>

    )
};

const Anecdote = ({anecdote, votes}) => {
    return (
        <div>
            <p>{anecdote}</p>
            <p>has {votes} votes</p>
        </div>
    )
};

const App = ({anecdotes}) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(Array.from(Array(anecdotes.length), () => 0));

    const randomAnecdote = () => () => {
        let newValue = Math.floor((Math.random() * anecdotes.length));
        while (selected === newValue) {
            newValue = Math.floor((Math.random() * anecdotes.length));
        }
        setSelected(newValue);
    };

    const addVote = () => () => {
        const copy = {...votes}
        copy[selected] += 1;
        setVotes(copy);
    };

    const mostVotes = () => {
        let maxIndex = 0;
        for (let i = 1; i < anecdotes.length; i++) {
            if (votes[i] > votes[maxIndex]) {
                maxIndex = i;
            }
        }

        return maxIndex;
    };

    return (
        <div>
            <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
            <div>
                <Button handler={addVote()} text="vote"/>
                <Button handler={randomAnecdote()} text="next anecdote"/>
            </div>
            <Anecdote anecdote={anecdotes[mostVotes()]} votes={votes[mostVotes()]}/>
        </div>
    )
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
);