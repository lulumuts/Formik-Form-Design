import { Field } from 'formik'

export function RadioInput({ question, invalid, errorId, labelId }) {
  return (
    <div
      className="choices"
      role="radiogroup"
      aria-labelledby={labelId}
      aria-required="true"
      aria-invalid={invalid}
      aria-describedby={invalid ? errorId : undefined}
    >
      {question.options.map((option) => {
        const optionId = `${question.id}-${option.value}`

        return (
          <label key={option.value} className="choice" htmlFor={optionId}>
            <Field name={question.name} type="radio" value={option.value}>
              {({ field }) => <input {...field} id={optionId} type="radio" />}
            </Field>
            <span>{option.label}</span>
          </label>
        )
      })}
    </div>
  )
}
