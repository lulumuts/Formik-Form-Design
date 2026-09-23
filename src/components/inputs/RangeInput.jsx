import { Field, useField } from 'formik'

export function RangeInput({ question, invalid, errorId }) {
  const [field] = useField(question.name)

  return (
    <div className="range-field">
      <Field
        className="text-input range-input"
        id={question.id}
        name={question.name}
        type="range"
        min="0"
        max="100"
        step="1"
        required
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
      />
      <span className="range-value">{field.value}</span>
    </div>
  )
}
