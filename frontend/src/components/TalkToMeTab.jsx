import { useState } from 'react'

function TalkToMeTab() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // TODO: Replace with actual API call to FastAPI backend to submit contact form
    console.log('Form submitted (placeholder):', formData)
    setFormData({ name: '', email: '', phone: '' })
    setErrors({})
  }

  const inputClass =
    'w-full rounded-lg border border-third/40 bg-first px-3 py-2 text-sm text-fourth outline-none transition-colors duration-200 focus:border-third'

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col gap-4 p-4">
      <div>
        <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-fourth">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={inputClass}
          placeholder="Your name"
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-fourth">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-phone" className="mb-1 block text-sm font-medium text-fourth">
          Phone Number
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className={inputClass}
          placeholder="+1 (555) 000-0000"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
      </div>

      <button
        type="submit"
        className="mt-auto rounded-lg bg-fourth px-4 py-2 text-sm font-medium text-first transition-opacity duration-200 hover:opacity-90"
      >
        Submit
      </button>
    </form>
  )
}

export default TalkToMeTab
