import { Field } from 'formik'

export function CheckboxInput({ question, invalid, errorId }) {
  return (
    <Field name={question.name} type="checkbox">
      {({ field }) => (
        <input
          className="checkbox-input"
          id={question.id}
          name={field.name}
          type="checkbox"
          checked={Boolean(field.checked)}
          onChange={field.onChange}
          onBlur={field.onBlur}
          required
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
        />
      )}
    </Field>
  )
}
