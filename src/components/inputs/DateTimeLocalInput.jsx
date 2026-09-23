import { Field } from 'formik'

export function DateTimeLocalInput({ question, invalid, errorId }) {
  return (
    <Field
      className="text-input"
      id={question.id}
      name={question.name}
      type="datetime-local"
      required
      aria-invalid={invalid}
      aria-describedby={invalid ? errorId : undefined}
    />
  )
}
