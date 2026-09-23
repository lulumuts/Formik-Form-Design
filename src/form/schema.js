import { getIn, setIn } from 'formik'
import formContent from './form.json' with { type: 'json' }

const INPUT_TYPES = [
  'text',
  'password',
  'search',
  'tel',
  'url',
  'email',
  'number',
  'range',
  'color',
  'date',
  'month',
  'week',
  'time',
  'datetime-local',
  'file',
  'hidden',
  'checkbox',
  'radio',
  'button',
  'submit',
  'reset',
  'image',
  'textarea',
  'select',
]

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function uniqueSlug(title, used) {
  const base = slugify(title) || 'item'
  let slug = base
  let count = 2

  while (used.has(slug)) {
    slug = `${base}-${count}`
    count += 1
  }

  used.add(slug)
  return slug
}

function buildForm(content) {
  const usedSectionIds = new Set()

  const sections = content.sections.map((section, sectionIndex) => {
    const sectionId = uniqueSlug(section.title, usedSectionIds)
    const usedStepIds = new Set()

    const steps = section.steps.map((step, stepIndex) => {
      const stepId = uniqueSlug(step.title, usedStepIds)
      const questions = step.questions.map((question, questionIndex) => ({
        id: `${sectionId}-${stepId}-q${questionIndex + 1}`,
        name: `${sectionId}.${stepId}.q${questionIndex + 1}`,
        type: question.type,
        label: question.label,
        placeholder: question.placeholder ?? '',
        options: question.options,
        sectionIndex,
        stepIndex,
      }))

      return { id: stepId, title: step.title, questions }
    })

    return {
      id: sectionId,
      title: section.title,
      summary: section.summary,
      steps,
    }
  })

  let initialValues = {}

  for (const section of sections) {
    for (const step of section.steps) {
      for (const question of step.questions) {
        initialValues = setIn(initialValues, question.name, initialValue(question.type))
      }
    }
  }

  return { sections, initialValues }
}

function assertForm(sections) {
  const names = new Set()

  if (sections.length !== 10) {
    throw new Error(`form.json should contain 10 sections, found ${sections.length}.`)
  }

  for (const section of sections) {
    if (section.steps.length !== 10) {
      throw new Error(`${section.title} in form.json should contain 10 steps.`)
    }

    for (const step of section.steps) {
      if (step.questions.length !== 5) {
        throw new Error(`${section.title} / ${step.title} in form.json should contain 5 questions.`)
      }

      for (const question of step.questions) {
        if (!question.label?.trim()) {
          throw new Error(`${section.title} / ${step.title} has a question without a label.`)
        }

        if (names.has(question.name)) {
          throw new Error(`Duplicate question name ${question.name}.`)
        }

        names.add(question.name)

        if (!INPUT_TYPES.includes(question.type)) {
          throw new Error(`Unknown input type "${question.type}" in form.json.`)
        }

        if ((question.type === 'select' || question.type === 'radio') && !question.options?.length) {
          throw new Error(`${question.label} needs an options list in form.json.`)
        }
      }
    }
  }
}

const built = buildForm(formContent)
assertForm(built.sections)

export const formSections = built.sections
export const initialValues = built.initialValues
export const SECTION_COUNT = formSections.length
export const STEPS_PER_SECTION = formSections[0].steps.length
export const QUESTIONS_PER_STEP = formSections[0].steps[0].questions.length
export const questionCount = SECTION_COUNT * STEPS_PER_SECTION * QUESTIONS_PER_STEP

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

function initialValue(type) {
  if (type === 'checkbox') return false
  if (type === 'range') return 50
  if (type === 'color') return '#000000'
  return ''
}

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function hasNumber(value) {
  if (value === '' || value === null || value === undefined) return false
  if (typeof value === 'string' && value.trim() === '') return false
  return Number.isFinite(Number(value))
}

function isHttpUrl(value) {
  try {
    const url = new URL(value.trim())
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function validateQuestion(question, value) {
  switch (question.type) {
    case 'email':
      if (!hasText(value)) return 'Email is required'
      if (!EMAIL_PATTERN.test(value.trim())) return 'Enter a valid email address'
      return undefined
    case 'url':
      if (!hasText(value)) return 'A URL is required'
      if (!isHttpUrl(value)) return 'Enter a valid URL'
      return undefined
    case 'tel':
      if (!hasText(value)) return 'A phone number is required'
      if (!/^[0-9+().\-\s]{7,}$/.test(value.trim())) return 'Enter a valid phone number'
      return undefined
    case 'number':
      return hasNumber(value) ? undefined : 'A number is required'
    case 'range':
      return hasNumber(value) ? undefined : 'Choose a value on the scale'
    case 'color':
      return typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value) ? undefined : 'Choose a color'
    case 'checkbox':
      return value === true ? undefined : 'Confirm this to continue'
    case 'select':
    case 'radio':
      return hasText(value) ? undefined : 'Choose an option'
    case 'date':
      return hasText(value) ? undefined : 'Choose a date'
    case 'time':
      return hasText(value) ? undefined : 'Choose a time'
    case 'datetime-local':
      return hasText(value) ? undefined : 'Choose a date and time'
    case 'month':
      return hasText(value) ? undefined : 'Choose a month'
    case 'week':
      return hasText(value) ? undefined : 'Choose a week'
    case 'file':
      return hasText(value) ? undefined : 'Choose a file'
    case 'password':
      return hasText(value) ? undefined : 'A password is required'
    default:
      return hasText(value) ? undefined : 'This answer is required'
  }
}

export function validateAnswers(values) {
  let errors = {}

  for (const section of formSections) {
    for (const step of section.steps) {
      for (const question of step.questions) {
        const message = validateQuestion(question, getIn(values, question.name))
        if (message) errors = setIn(errors, question.name, message)
      }
    }
  }

  return errors
}

export function questionsWithErrors(errors) {
  const matches = []

  for (const section of formSections) {
    for (const step of section.steps) {
      for (const question of step.questions) {
        if (getIn(errors, question.name)) matches.push(question)
      }
    }
  }

  return matches
}

export function findFirstInvalid(errors) {
  const match = questionsWithErrors(errors)[0]
  if (!match) return null
  return { sectionIndex: match.sectionIndex, stepIndex: match.stepIndex }
}

export function touchQuestions(touched, questions) {
  return questions.reduce((next, question) => setIn(next, question.name, true), touched)
}
