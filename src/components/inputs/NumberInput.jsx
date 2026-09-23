import { Field } from 'formik'

export function NumberInput({ question, invalid, errorId }) {
  return (
    <Field
      className="text-input"
      id={question.id}
      name={question.name}
      type="number"
      inputMode="decimal"
      step="any"
      placeholder={question.placeholder}
      required
      aria-invalid={invalid}
      aria-describedby={invalid ? errorId : undefined}
    />
  )
}
