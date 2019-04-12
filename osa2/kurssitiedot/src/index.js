import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {

    return (
        <h1>
            {course.name}
        </h1>
    )
};

const Part = ({part}) => {
    console.log(part);
    return (
        <div>
            <p>
                {part.name} {part.exercises}
            </p>
        </div>
    )
};

const Total = ({course}) => {

    console.log("total");
    const exercises = () => course.parts.reduce((prev, cur ) => {
        return prev + cur.exercises;
    }, 0);

    console.log("E ", exercises());

    return (
        <div>
            <p>yhteensä {exercises()} tehtävää</p>
        </div>
    )
};

const Course = ({course}) => {

    return (
        <div>
            <Header course={course}/>
            <Content course={course} />
        </div>
    )

};

const Content = ({course}) => {

    console.log(course);
    console.log(course.parts);

    const parts = () => course.parts.map(part => {
        console.log(part);
        return (<Part key={part.id} part={part}/>)
    });

    return (
        <div>
            {parts()}
            <Total course={course} />
        </div>
    )
};

const App = ({course}) => {
    console.log(course);
    return (
        <div>
            <Course course={course}/>
        </div>
    )
};

const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
        {
            name: 'Reactin perusteet',
            exercises: 10,
            id: 1
        },
        {
            name: 'Tiedonvälitys propseilla',
            exercises: 7,
            id: 2
        },
        {
            name: 'Komponenttien tila',
            exercises: 14,
            id: 3
        },
        {
            name: 'Uusi course',
            exercises: 10,
            id: 4
        }
    ]
};

console.log(course);
ReactDOM.render(<App course={course}/>, document.getElementById('root'));
