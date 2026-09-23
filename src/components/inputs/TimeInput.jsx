import { Field } from 'formik'

export function TimeInput({ question, invalid, errorId }) {
  return (
    <Field
      className="text-input"
      id={question.id}
      name={question.name}
      type="time"
      required
      aria-invalid={invalid}
      aria-describedby={invalid ? errorId : undefined}
    />
  )
}
