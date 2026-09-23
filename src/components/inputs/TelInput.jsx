import { Field } from 'formik'

export function TelInput({ question, invalid, errorId }) {
  return (
    <Field
      className="text-input"
      id={question.id}
      name={question.name}
      type="tel"
      inputMode="tel"
      placeholder={question.placeholder}
      required
      autoComplete="off"
      aria-invalid={invalid}
      aria-describedby={invalid ? errorId : undefined}
    />
  )
}
