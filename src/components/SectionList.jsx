export function SectionList({ sections, activeIndex, activeStep, expandedIndex, onToggle, onSelectStep }) {
  return (
    <nav className="section-menu" id="section-menu" aria-label="Sections">
      {sections.map((section, index) => {
        const expanded = index === expandedIndex
        const headerId = `${section.id}-header`
        const panelId = `${section.id}-steps`

        return (
          <div key={section.id} className={expanded ? 'section-item is-open' : 'section-item'}>
            <button
              type="button"
              id={headerId}
              className={index === activeIndex ? 'section-tab is-active' : 'section-tab'}
              aria-expanded={expanded}
              aria-controls={panelId}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => onToggle(index)}
            >
              <span className="section-index">{index + 1}</span>
              <span className="section-name">{section.title}</span>
              <span className="section-chevron" aria-hidden="true" />
            </button>
            <div id={panelId} role="region" aria-labelledby={headerId} hidden={!expanded}>
              <div className="section-panel">
                <p className="section-summary">{section.summary}</p>
                <ol className="step-menu">
                  {section.steps.map((step, stepIndex) => {
                    const selected = index === activeIndex && stepIndex === activeStep

                    return (
                      <li key={step.id}>
                        <button
                          type="button"
                          className={selected ? 'step-link is-active' : 'step-link'}
                          aria-current={selected ? 'step' : undefined}
                          onClick={() => onSelectStep(index, stepIndex)}
                        >
                          <span className="step-link-index">{stepIndex + 1}</span>
                          <span>{step.title}</span>
                        </button>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </div>
          </div>
        )
      })}
    </nav>
  )
}
