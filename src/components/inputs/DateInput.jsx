import { Field } from 'formik'

export function DateInput({ question, invalid, errorId }) {
  return (
    <Field
      className="text-input"
      id={question.id}
      name={question.name}
      type="date"
      required
      aria-invalid={invalid}
      aria-describedby={invalid ? errorId : undefined}
    />
  )
}
