import { useState, useEffect } from 'react';

function Question({ questions, onAnswerClick, questionNumber, questionsLength }) {
  const [options, setOptions] = useState([])
  function shuffle(opt) {
    const array = [...opt]
    let currentIndex = array.length;
    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array
  }

  useEffect(() => {
    const prepareAnswers = () => {
      setOptions(questions.incorrect_answers);
      setOptions((prev) => ([...prev, questions.correct_answer]));
      setOptions((prev) => (shuffle(prev)))
      return null
    }
    prepareAnswers();
  }, [questions])

  return (
    <div className='questions'>
      <h2 dangerouslySetInnerHTML={{ __html: questions.question }}></h2>
      <ul className='options'>
        {options.map((option) => {
          return <li key={option}>
            <button onClick={() => onAnswerClick(option)} dangerouslySetInnerHTML={{ __html: option }}></button>
          </li>
        })}
      </ul>
      <p>{questionNumber + 1}/{questionsLength}</p>
    </div>
  )

}


export default Question
