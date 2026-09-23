import { Field } from 'formik'

export function ColorInput({ question, invalid, errorId }) {
  return (
    <Field
      className="text-input color-input"
      id={question.id}
      name={question.name}
      type="color"
      required
      aria-invalid={invalid}
      aria-describedby={invalid ? errorId : undefined}
    />
  )
}
