import { Field } from 'formik'

export function SelectInput({ question, invalid, errorId }) {
  return (
    <Field
      className="text-input"
      id={question.id}
      name={question.name}
      as="select"
      required
      aria-invalid={invalid}
      aria-describedby={invalid ? errorId : undefined}
    >
      <option value="">{question.placeholder}</option>
      {question.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Field>
  )
}
