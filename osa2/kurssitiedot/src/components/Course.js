import React from "react";

const Header = ({text}) => {

    return (
        <h1>
            {text}
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
            <Header text={course.name}/>
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

export {
    Header,
    Course
};