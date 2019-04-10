import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Header = ({caption}) => {
    return (
        <div>
            <h1>
                {caption}
            </h1>
        </div>
    )
};

const Statistic = ({text, result}) => {
    return (
        <div>
            <p>
                {text} {result}
            </p>
        </div>
    )
};

const Statistics = ({good, neutral, bad}) => {

    const txtGood = "hyvä";
    const txtNeutral = "neutraali";
    const txtBad = "huono";
    const txtAvg = "keskiarvo";
    const txtPos = "positiivisia";

    const count = good + bad + neutral;

    const average = () => (good - bad) / count;

    const positivePercentage = () =>
        (100 * (good / count)).toString().concat(" %");

    if (!count) {
        return (
            <div>
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    }

    return (
        <div>
            <Statistic text={txtGood} result={good}/>
            <Statistic text={txtNeutral} result={neutral}/>
            <Statistic text={txtBad} result={bad}/>
            <Statistic text={txtAvg} result={average()}/>
            <Statistic text={txtPos} result={positivePercentage()}/>
        </div>
    )
};

const Button = ({handler, text}) => {

    return (
        <button onClick={handler}>
            {text}
        </button>
    )
};


const App = () => {

    const txtGood = "hyvä";
    const txtNeutral = "neutraali";
    const txtBad = "huono"

    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const positiveFeedback = () => () => setGood(good + 1);
    const neutralFeedback = () => () => setNeutral(neutral + 1);
    const badFeedback = () => () => setBad(bad + 1);

    return (
        <div>
            <Header caption="Anna palautetta"/>
            <Button handler={positiveFeedback()} text={txtGood}/>
            <Button handler={neutralFeedback()} text={txtNeutral}/>
            <Button handler={badFeedback()} text={txtBad}/>
            <Header caption="Statistiikka"/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
};

ReactDOM.render(<App/>,
    document.getElementById('root')
);