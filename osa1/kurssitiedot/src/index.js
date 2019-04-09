import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {

    const course = props.course;
    const parts = course.parts;

    return (
        <h1>
            {props.course.name}
        </h1>
    )
}

const Part = (props) => {
    const part = props.part;
    return (
        <div>
            <p>
                {part.name} {part.exercises}
            </p>
        </div>
    )
}

const Content = (props) => {
    const course = props.course;
    return (
        <div>
            <Part part={course.parts[0]}/>
            <Part part={course.parts[1]}/>
            <Part part={course.parts[2]}/>
        </div>
    )
}

const Total = (props) => {
    const course = props.course;

    return (
        <div>
            <p>yhteensä {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} tehtävää</p>
        </div>
    )
}


const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [

            {
                name: 'Reactin perusteet',
                exercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7
            },
            {
                name: 'Komponenttien tila',
                exercises: 14
            }
        ]
    };

    return (
        <div>
            <Header course={course}/>
            <Content course={course} />
            <Total course={course} />

        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))