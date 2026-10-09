import { MultiStepForm } from './components/MultiStepForm.jsx'
import { formDetails } from './form/schema.js'
import './App.css'

function App() {
  return (
    <main className="page">
      <div id="menu-slot" />
      <div className="form-container">
        <header className="page-header">
          <div className="page-header-copy">
            <h1>Form</h1>
            <p className="intro">
              Ten sections. Each section has ten steps, and each step asks five questions.
            </p>
            {formDetails ? <p className="intro-details">{formDetails}</p> : null}
          </div>
        </header>
        <MultiStepForm />
      </div>
    </main>
  )
}

export default App
