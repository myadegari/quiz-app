
function Result({ userAnswers, questions, resetQuiz = () => { } }) {
  const correct = userAnswers.reduce((acc, item) => (acc + item), 0)
  const filing = ["😐", "😥", "🙂", "😍", "😎"];
  let fill;
  if (correct <= 2) {
    fill = filing[0];
  } else if (correct <= 4) {
    fill = filing[1];
  } else if (correct <= 6) {
    fill = filing[2];
  } else if (correct <= 8) {
    fill = filing[3];
  } else {
    fill = filing[4];
  }
  return (
    <div className="results">
      <h2>Results</h2>
      <p>You answers {correct} out of {questions.length} questions. {fill}</p>
      <span onClick={resetQuiz}>Click here to Retry</span>
      <ul>
        {questions.map((option, index) => {
          const q = `Q${index + 1}. ${option.question}`;
          return <li key={index} data-correct={userAnswers[index]} dangerouslySetInnerHTML={{ __html: q }}>
          </li>
        })}
      </ul>
    </div>
  )
}


export default Result