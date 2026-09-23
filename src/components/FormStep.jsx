import { QuestionAnswer } from './QuestionAnswer.jsx'

export function FormStep({ step }) {
  return (
    <div className="questions">
      {step.questions.map((question, index) => (
        <QuestionAnswer key={question.id} question={question} index={index} />
      ))}
    </div>
  )
}
