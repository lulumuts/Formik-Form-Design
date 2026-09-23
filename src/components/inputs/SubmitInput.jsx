export function SubmitInput({ question }) {
  return <input id={question.id} className="button" name={question.name} type="submit" value={question.label} />
}
