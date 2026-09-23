export function ResetInput({ question }) {
  return (
    <input id={question.id} className="button secondary" name={question.name} type="reset" value={question.label} />
  )
}
