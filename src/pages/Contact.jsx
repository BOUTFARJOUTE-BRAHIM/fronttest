import { useState } from 'react'
import { api } from '../services/api'
import './Contact.css'

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState(null) // 'sending', 'success', 'error'
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      await api.sendContact(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Une erreur est survenue')
    }
  }

  const subjects = [
    'Question sur un livre',
    'Suggestion de livre',
    'Problème technique',
    'Partenariat',
    'Autre'
  ]

  return (
    <div className="page contact-page" id="contact-page">
      <div className="container">
        <div className="contact-header fade-in">
          <h1 className="section-title">Contactez-nous</h1>
          <p className="section-subtitle">
            Une question, une suggestion ? N'hésitez pas à nous écrire !
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Info Cards */}
          <div className="contact-info fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="info-card glass-card">
              <span className="info-icon">📧</span>
              <h3>Email</h3>
              <p>contact@bibliotheque-it.fr</p>
            </div>
            <div className="info-card glass-card">
              <span className="info-icon">📞</span>
              <h3>Téléphone</h3>
              <p>+33 1 23 45 67 89</p>
            </div>
            <div className="info-card glass-card">
              <span className="info-icon">📍</span>
              <h3>Adresse</h3>
              <p>123 Rue de l'Innovation<br />75001 Paris, France</p>
            </div>
            <div className="info-card glass-card">
              <span className="info-icon">🕐</span>
              <h3>Horaires</h3>
              <p>Lun - Ven : 9h - 18h<br />Sam : 10h - 16h</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper glass-card fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="form-title">Envoyez-nous un message</h2>

            {status === 'success' ? (
              <div className="form-success" id="contact-success">
                <span className="success-icon">✅</span>
                <h3>Message envoyé !</h3>
                <p>Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
                <button
                  className="btn-primary"
                  onClick={() => setStatus(null)}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Nom complet</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">Sujet</label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez un sujet</option>
                    {subjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Votre message..."
                    rows={6}
                    required
                  />
                </div>

                {status === 'error' && (
                  <div className="form-error" id="contact-error">
                    ❌ {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary submit-btn"
                  disabled={status === 'sending'}
                  id="contact-submit"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }}></span>
                      Envoi en cours...
                    </>
                  ) : (
                    '📧 Envoyer le message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
