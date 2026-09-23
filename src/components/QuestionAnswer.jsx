import { ErrorMessage, useField } from 'formik'
import { ButtonInput } from './inputs/ButtonInput.jsx'
import { CheckboxInput } from './inputs/CheckboxInput.jsx'
import { ColorInput } from './inputs/ColorInput.jsx'
import { DateInput } from './inputs/DateInput.jsx'
import { DateTimeLocalInput } from './inputs/DateTimeLocalInput.jsx'
import { EmailInput } from './inputs/EmailInput.jsx'
import { FileInput } from './inputs/FileInput.jsx'
import { HiddenInput } from './inputs/HiddenInput.jsx'
import { ImageInput } from './inputs/ImageInput.jsx'
import { MonthInput } from './inputs/MonthInput.jsx'
import { NumberInput } from './inputs/NumberInput.jsx'
import { PasswordInput } from './inputs/PasswordInput.jsx'
import { RadioInput } from './inputs/RadioInput.jsx'
import { RangeInput } from './inputs/RangeInput.jsx'
import { ResetInput } from './inputs/ResetInput.jsx'
import { SearchInput } from './inputs/SearchInput.jsx'
import { SelectInput } from './inputs/SelectInput.jsx'
import { SubmitInput } from './inputs/SubmitInput.jsx'
import { TelInput } from './inputs/TelInput.jsx'
import { TextareaInput } from './inputs/TextareaInput.jsx'
import { TextInput } from './inputs/TextInput.jsx'
import { TimeInput } from './inputs/TimeInput.jsx'
import { UrlInput } from './inputs/UrlInput.jsx'
import { WeekInput } from './inputs/WeekInput.jsx'

const answerComponents = {
  text: TextInput,
  password: PasswordInput,
  search: SearchInput,
  tel: TelInput,
  url: UrlInput,
  email: EmailInput,
  number: NumberInput,
  range: RangeInput,
  color: ColorInput,
  date: DateInput,
  month: MonthInput,
  week: WeekInput,
  time: TimeInput,
  'datetime-local': DateTimeLocalInput,
  file: FileInput,
  hidden: HiddenInput,
  checkbox: CheckboxInput,
  radio: RadioInput,
  button: ButtonInput,
  submit: SubmitInput,
  reset: ResetInput,
  image: ImageInput,
  textarea: TextareaInput,
  select: SelectInput,
}

export function QuestionAnswer({ question, index }) {
  const [, meta] = useField(question.name)
  const invalid = Boolean(meta.touched && meta.error)
  const errorId = `${question.id}-error`
  const labelId = `${question.id}-label`
  const Answer = answerComponents[question.type]
  const prompt = (
    <>
      <span className="question-index" aria-hidden="true">
        {index + 1}
      </span>
      {question.label}
    </>
  )

  if (question.type === 'hidden') {
    return <Answer question={question} />
  }

  return (
    <div className="question">
      {question.type === 'checkbox' ? (
        <label className="choice">
          <Answer question={question} invalid={invalid} errorId={errorId} />
          <span className="question-label">{prompt}</span>
        </label>
      ) : question.type === 'radio' ? (
        <>
          <p id={labelId} className="question-label">
            {prompt}
          </p>
          <Answer question={question} invalid={invalid} errorId={errorId} labelId={labelId} />
        </>
      ) : (
        <>
          <label className="question-label" htmlFor={question.id}>
            {prompt}
          </label>
          <Answer question={question} invalid={invalid} errorId={errorId} />
        </>
      )}
      <ErrorMessage name={question.name} id={errorId} component="p" className="error" />
    </div>
  )
}
