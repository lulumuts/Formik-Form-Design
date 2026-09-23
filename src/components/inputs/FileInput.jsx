import { useField } from 'formik'

export function FileInput({ question, invalid, errorId }) {
  const [field, , helpers] = useField(question.name)

  return (
    <div className="file-field">
      <input
        className="text-input"
        id={question.id}
        name={field.name}
        type="file"
        required
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        onBlur={field.onBlur}
        onChange={(event) => {
          const file = event.currentTarget.files?.[0]
          helpers.setValue(file ? file.name : '')
        }}
      />
      {field.value ? <p className="file-name">Selected: {field.value}</p> : null}
    </div>
  )
}
