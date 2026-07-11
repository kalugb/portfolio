import { useState } from 'react'
import axios from 'axios'

function TalkToMeTab() {
  const [formData, setFormData] = useState({ name: '', email: '', phone_num: '' })
  const [errors, setErrors] = useState({})
  const [postSentMessage, setPostSentMessage] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const sendMessageAgain = () => {
    setFormData({ name: '', email: '', phone_num: '' })
    setPostSentMessage(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone_num.trim()) newErrors.phone_num = 'Phone number is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      const res = await axios.post('/api/talk_to_me', formData)
      console.log('Form submitted successfully:', res.data.reply)
      
      setPostSentMessage(true)
    } catch (err) {
      console.error('Form submission failed:', err)

      if (err.response) { 
        console.error('Server responded with:', err.response.status)
        console.error("Response data:", err.response.data)
      }
    }
  }

  const inputClass =
    'w-full rounded-lg border border-third/40 bg-first px-3 py-2 text-sm text-fourth outline-none transition-colors duration-200 focus:border-third'

  return (
    <>
      { !postSentMessage ? (
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
              name="phone_num"
              type="tel"
              value={formData.phone_num}
              onChange={handleChange}
              className={inputClass}
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone_num && <p className="mt-1 text-xs text-red-600">{errors.phone_num}</p>}
          </div>

          <button
            type="submit"
            className="mt-auto rounded-lg bg-fourth px-4 py-2 text-sm font-medium text-first transition-opacity duration-200 hover:opacity-90"
          >
            Submit
          </button>
        </form>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-4 text-center">
            <h2 className="text-lg font-semibold text-fourth">Thank you!</h2>
            <p className="text-sm text-fourth">Your information has been submitted successfully.</p>

            <div>
              <button className="mt-auto rounded-lg bg-fourth px-4 py-2 text-sm font-medium text-first transition-opacity duration-200 hover:opacity-90" 
                onClick={sendMessageAgain}>
                Send Contact Informatio Again
              </button>
            </div>
          </div>
        )}
    </>
  )
}

export default TalkToMeTab
