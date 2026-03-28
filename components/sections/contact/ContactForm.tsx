'use client'

import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'

interface FormData {
  name: string
  email: string
  phone: string
  type: string
  date: string
  message: string
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  type: '',
  date: '',
  message: '',
}

const inquiryTypes = [
  'Wedding Photography',
  'Wedding Videography',
  'Album Production',
  'Studio Rental',
  'Commercial Film',
  'General Inquiry',
]

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    gsap.fromTo(
      formRef.current?.querySelectorAll('.form-row') ?? [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.9, ease: 'expo.out', delay: 0.4 }
    )
  }, [])

  const validate = (): boolean => {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!form.email.trim()) e.email = 'Please enter your email address'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address'
    if (!form.type) e.type = 'Please select an inquiry type'
    if (!form.message.trim()) e.message = 'Please enter your message'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    // Simulate async submit — replace with actual API call
    await new Promise(r => setTimeout(r, 1800))
    setStatus('success')
  }

  const field = (key: keyof FormData, label: string, node: React.ReactNode) => (
    <div className="form-row opacity-0">
      <label className="block font-poppins text-[10px] tracking-[0.3em] text-white/35 uppercase mb-3">
        {label}
        {['name', 'email', 'type', 'message'].includes(key) && (
          <span className="text-white/20 ml-2">*</span>
        )}
      </label>
      {node}
      <AnimatePresence>
        {errors[key] && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-red-400/70 font-poppins"
          >
            {errors[key]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )

  const inputCls = (key: keyof FormData) =>
    `w-full bg-transparent border-b py-3 text-white placeholder-white/15 text-sm outline-none transition-colors duration-300 focus:border-white/40 font-light ${
      errors[key] ? 'border-red-400/40' : 'border-white/10'
    }`

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center px-8 md:px-16 py-32 border-r border-white/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-md"
        >
          {/* Success icon */}
          <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-poppins font-extralight text-white text-3xl mb-4">Message Sent!</h2>
          <p className="text-white/40 text-sm leading-relaxed mb-12">
            Thank you for reaching out.<br />
            We will get back to you within 2 business days.
          </p>
          <button
            onClick={() => { setForm(initialForm); setStatus('idle'); setErrors({}) }}
            className="font-poppins text-xs tracking-widest text-white/30 border border-white/10 px-8 py-3 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="px-8 md:px-16 py-24 border-r border-white/5 space-y-10"
      noValidate
    >
      {/* Name + Email row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {field('name', 'Full Name',
          <input
            type="text"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Your Full Name"
            className={inputCls('name')}
          />
        )}
        {field('email', 'Email Address',
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="hello@example.com"
            className={inputCls('email')}
          />
        )}
      </div>

      {/* Phone + Date row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {field('phone', 'Phone Number (Optional)',
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="090-0000-0000"
            className={inputCls('phone')}
          />
        )}
        {field('date', 'Event Date (Optional)',
          <input
            type="date"
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            className={`${inputCls('date')} [color-scheme:dark]`}
          />
        )}
      </div>

      {/* Type */}
      {field('type', 'Inquiry Type',
        <div className="flex flex-wrap gap-2 pt-2">
          {inquiryTypes.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setForm(f => ({ ...f, type: t }))}
              className={`font-poppins text-[10px] tracking-widest px-4 py-2 border transition-all duration-300 ${
                form.type === t
                  ? 'border-white/40 text-white bg-white/5'
                  : 'border-white/10 text-white/30 hover:border-white/20 hover:text-white/50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Message */}
      {field('message', 'Your Message',
        <textarea
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Tell us about your project or inquiry..."
          rows={6}
          className={`${inputCls('message')} resize-none border border-white/10 p-4 mt-1`}
        />
      )}

      {/* Submit */}
      <div className="form-row opacity-0 pt-4">
        <motion.button
          type="submit"
          disabled={status === 'submitting'}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="relative w-full md:w-auto inline-flex items-center justify-center gap-4 font-poppins text-xs tracking-[0.3em] uppercase px-16 py-5 border border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-500 disabled:opacity-40"
        >
          {status === 'submitting' ? (
            <>
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M1 0V6C1 7 1.1 8.5 3.5 8.5H11.5" stroke="currentColor"/>
                <path d="M8 4L12.5 8.5L8 13" stroke="currentColor"/>
              </svg>
            </>
          )}
        </motion.button>
        <p className="mt-4 font-poppins text-[10px] tracking-widest text-white/15">
          Your information is protected under our Privacy Policy.
        </p>
      </div>
    </form>
  )
}
