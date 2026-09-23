import { Field } from 'formik'

export function TextInput({ question, invalid, errorId }) {
  return (
    <Field
      className="text-input"
      id={question.id}
      name={question.name}
      type="text"
      placeholder={question.placeholder}
      required
      autoComplete="off"
      aria-invalid={invalid}
      aria-describedby={invalid ? errorId : undefined}
    />
  )
}
