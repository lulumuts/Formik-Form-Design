import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Form, Formik, getIn } from 'formik'
import {
  SECTION_COUNT,
  STEPS_PER_SECTION,
  findFirstInvalid,
  formSections,
  initialValues,
  questionCount,
  questionsWithErrors,
  touchQuestions,
  validateAnswers,
} from '../form/schema.js'
import { FormSection } from './FormSection.jsx'
import { SectionList } from './SectionList.jsx'

const totalSteps = SECTION_COUNT * STEPS_PER_SECTION

export function MultiStepForm() {
  const [sectionIndex, setSectionIndex] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState(0)
  const [stepIndexes, setStepIndexes] = useState(() => formSections.map(() => 0))
  const [submitted, setSubmitted] = useState(false)
  const [stepInvalid, setStepInvalid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(true)
  const [menuSlot, setMenuSlot] = useState(null)
  const headingRef = useRef(null)
  const movedRef = useRef(false)
  const lockRef = useRef(false)

  const stepIndex = stepIndexes[sectionIndex]
  const section = formSections[sectionIndex]

  function goTo(nextSection, nextStep) {
    setExpandedIndex(nextSection)
    if (nextSection === sectionIndex && nextStep === stepIndex) return

    movedRef.current = true
    setStepInvalid(false)
    setSectionIndex(nextSection)
    setStepIndexes((current) => {
      const next = [...current]
      next[nextSection] = nextStep
      return next
    })
  }

  function toggleSection(index) {
    if (expandedIndex === index) {
      setExpandedIndex(null)
      return
    }

    goTo(index, stepIndexes[index])
  }

  useEffect(() => {
    setMenuSlot(document.getElementById('menu-slot'))
  }, [])

  useEffect(() => {
    if (!movedRef.current) return
    headingRef.current?.focus()
    movedRef.current = false
  }, [sectionIndex, stepIndex])

  function startOver(resetForm) {
    resetForm()
    setSubmitted(false)
    setStepInvalid(false)
    movedRef.current = false
    setSectionIndex(0)
    setExpandedIndex(0)
    setStepIndexes(formSections.map(() => 0))
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validateAnswers}
      onSubmit={(_values, helpers) => {
        setSubmitted(true)
        helpers.setSubmitting(false)
      }}
    >
      {({ errors, touched, isSubmitting, resetForm, setTouched, submitForm, validateForm }) => {
        const currentStep = section.steps[stepIndex]
        const showStepError =
          stepInvalid && currentStep.questions.some((question) => getIn(errors, question.name))

        async function handleSubmit(event) {
          event.preventDefault()

          if (lockRef.current) return
          lockRef.current = true

          try {
            const nextErrors = await validateForm()
            const invalid = questionsWithErrors(nextErrors)

            if (invalid.length > 0) {
              const first = findFirstInvalid(nextErrors)
              setTouched(touchQuestions(touched, invalid), false)
              if (first) goTo(first.sectionIndex, first.stepIndex)
              setStepInvalid(true)
              return
            }

            await submitForm()
          } finally {
            lockRef.current = false
          }
        }

        if (submitted) {
          return (
            <SubmissionReceipt
              onEdit={() => setSubmitted(false)}
              onStartOver={() => startOver(resetForm)}
            />
          )
        }

        return (
          <Form className="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            {menuSlot
              ? createPortal(
                  <div className={menuOpen ? 'menu-layer is-open' : 'menu-layer'}>
                    <button
                      type="button"
                      className="menu-toggle"
                      aria-expanded={menuOpen}
                      aria-controls="section-menu"
                      aria-label={menuOpen ? 'Hide menu' : 'Show menu'}
                      onClick={() => setMenuOpen((open) => !open)}
                    >
                      <span className="menu-toggle-icon" aria-hidden="true" />
                    </button>
                    <div className="side-menu" hidden={!menuOpen}>
                      <SectionList
                        sections={formSections}
                        activeIndex={sectionIndex}
                        activeStep={stepIndex}
                        expandedIndex={expandedIndex}
                        onToggle={toggleSection}
                        onSelectStep={goTo}
                      />
                    </div>
                  </div>,
                  menuSlot,
                )
              : null}
            <div className="wizard">
              <div className="wizard-main">
                <FormSection
                  section={section}
                  sectionIndex={sectionIndex}
                  stepIndex={stepIndex}
                  headingRef={headingRef}
                />
                {showStepError ? (
                  <p className="error" role="alert">
                    Answer the highlighted questions before continuing.
                  </p>
                ) : null}
                <div className="actions">
                  <button type="submit" className="button" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting…' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

function SubmissionReceipt({ onEdit, onStartOver }) {
  return (
    <section className="receipt" aria-labelledby="receipt-title">
      <p className="eyebrow">Submitted</p>
      <h2 id="receipt-title">Your answers are in.</h2>
      <p>
        {SECTION_COUNT} sections, {totalSteps} steps, and {questionCount} answers are stored in this
        session.
      </p>
      <ul className="receipt-list">
        {formSections.map((item) => (
          <li key={item.id}>
            {item.title}: {STEPS_PER_SECTION} steps, {STEPS_PER_SECTION * QUESTIONS_PER_STEP} answers
          </li>
        ))}
      </ul>
      <div className="actions">
        <button type="button" className="button secondary" onClick={onEdit}>
          Edit answers
        </button>
        <button type="button" className="button" onClick={onStartOver}>
          Start over
        </button>
      </div>
    </section>
  )
}
