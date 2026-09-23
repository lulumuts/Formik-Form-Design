import { Field } from 'formik'

export function TextareaInput({ question, invalid, errorId }) {
  return (
    <Field
      className="text-input"
      id={question.id}
      name={question.name}
      as="textarea"
      rows="4"
      placeholder={question.placeholder}
      required
      aria-invalid={invalid}
      aria-describedby={invalid ? errorId : undefined}
    />
  )
}
