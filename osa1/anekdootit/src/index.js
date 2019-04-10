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
    const [points, setPoints] = useState(Array.from(Array(anecdotes.length), () => 0));

    const randomAnecdote = () => () => {
        let newValue = Math.floor((Math.random() * anecdotes.length));
        while (selected === newValue) {
            newValue = Math.floor((Math.random() * anecdotes.length));
        }
        setSelected(newValue);
    };

    const addVote = () => () => {
        console.log(points);
        const copy = { ...points }
        copy[selected] += 1;
        setPoints(copy);
    };

    console.log(points);

    return (
        <div>
            <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
            <div>
                <Button handler={addVote()} text="vote"/>
                <Button handler={randomAnecdote()} text="next anecdote"/>
            </div>
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