import { Field } from 'formik'

export function HiddenInput({ question }) {
  return <Field id={question.id} name={question.name} type="hidden" />
}
