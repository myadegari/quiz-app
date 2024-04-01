import { useState, useEffect } from "react"
import { Comment } from "react-loader-spinner"
import Question from "./components/Question";
import Result from "./components/Result"

import './App.css'

function App() {
  const [questions, setQuestions] = useState({})
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);


  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple")
      .then((response) => response.json())
      .then((result) => {
        setQuestions(result);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));


  }, [])


  const handelNextQuestion = (option) => {
    const correct = option == questions.results[currentQuestion].correct_answer ? 1 : 0;
    setCurrentQuestion(currentQuestion + 1);
    setUserAnswers([...userAnswers, correct])
  }

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
  }
  return (
    <div className='app'>
      <h1>Entertainment: Film Quiz🎬</h1>
      {loading && <>
        <Comment
          visible={true}
          height="80"
          width="80"
          ariaLabel="comment-loading"
          wrapperStyle={{}}
          wrapperClass="comment-wrapper"
          color="#fff"
          backgroundColor="#F4442E"
        />
      </>}
      {!loading && <>
        {/* Questions Components */}
        {currentQuestion < 10 &&
          <Question questions={questions.results[currentQuestion]} onAnswerClick={handelNextQuestion} questionNumber={currentQuestion} questionsLength={10} />
        }
        {/* Result Component */}
        {currentQuestion == 10 && <Result
          userAnswers={userAnswers}
          questions={questions.results}
          resetQuiz={resetQuiz}
        />}
      </>}

    </div>
  )
}

export default App


