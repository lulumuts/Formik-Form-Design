import { Field } from 'formik'

export function PasswordInput({ question, invalid, errorId }) {
  return (
    <Field
      className="text-input"
      id={question.id}
      name={question.name}
      type="password"
      placeholder={question.placeholder}
      required
      autoComplete="new-password"
      aria-invalid={invalid}
      aria-describedby={invalid ? errorId : undefined}
    />
  )
}
