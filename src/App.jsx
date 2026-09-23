import { MultiStepForm } from './components/MultiStepForm.jsx'
import './App.css'

function App() {
  return (
    <main className="page">
      <header className="page-header">
        <div className="page-header-copy">
          <h1>Form</h1>
          <p className="intro">
            Ten sections. Each section has ten steps, and each step asks five questions.
          </p>
        </div>
        <div id="menu-slot" />
      </header>
      <MultiStepForm />
    </main>
  )
}

export default App
