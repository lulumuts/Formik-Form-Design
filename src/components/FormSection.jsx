import { QUESTIONS_PER_STEP, SECTION_COUNT } from '../form/schema.js'
import { FormStep } from './FormStep.jsx'

export function FormSection({ section, sectionIndex, stepIndex, headingRef }) {
  const step = section.steps[stepIndex]
  const stepCount = section.steps.length

  return (
    <section className="form-section" aria-labelledby="active-section-title">
      <div className="form-fixed">
        <header className="section-header">
          <div className="section-title-row">
            <h2 id="active-section-title">{section.title}</h2>
            <p className="section-position">
              Section {sectionIndex + 1}/{SECTION_COUNT}
            </p>
          </div>
          <p className="section-summary">{section.summary}</p>
        </header>
        <div className="progress-block">
          <div
            className="progress"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={stepCount}
            aria-valuenow={stepIndex + 1}
            aria-valuetext={`Step ${stepIndex + 1} of ${stepCount}`}
          >
            {section.steps.map((item, index) => (
              <span
                key={item.id}
                className={index <= stepIndex ? 'progress-segment is-complete' : 'progress-segment'}
              />
            ))}
          </div>
          <p className="progress-label">
            Step {stepIndex + 1} of {stepCount}
          </p>
        </div>
        <div className="step-heading">
          <h3 tabIndex={-1} ref={headingRef}>
            {step.title}
          </h3>
          <p className="step-note">
            {QUESTIONS_PER_STEP} questions about {step.title.toLowerCase()}.
          </p>
        </div>
      </div>
      <FormStep step={step} />
    </section>
  )
}
