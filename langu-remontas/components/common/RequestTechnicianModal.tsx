'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Checkbox } from '@/components/ui/Checkbox'
import { Label } from '@/components/ui/Label'
import { type Locale } from '@/lib/i18n'
import { loadFormTranslations } from '@/content/lib/content-resolver'

interface RequestTechnicianModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  triggerType: 'technician' | 'consultation' | 'learnMore' | null;
  prefillMessage?: string;
}

// Helper function to get privacy policy URL by locale
const getPrivacyPolicyUrl = (locale: Locale): string => {
  const urls: Record<Locale, string> = {
    en: 'privacy-policy',
    lt: 'privatumo-politika', 
    pl: 'polityka-prywatnosci',
    uk: 'polityka-konfidentsiynosti'
  }
  return urls[locale] || urls.en
}

export function RequestTechnicianModal({ isOpen, onClose, locale, triggerType, prefillMessage }: RequestTechnicianModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [translations, setTranslations] = useState<any>(null)

  useEffect(() => {
    loadFormTranslations(locale).then(formTranslations => {
      setTranslations(formTranslations.requestTechnician)
    })
  }, [locale])

  if (!translations) {
    return null // Loading state
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const data = Object.fromEntries(formData.entries())
      
      // Add trigger type and locale for analytics
      const submissionData = {
        ...data,
        triggerType,
        locale,
        timestamp: new Date().toISOString()
      }
      
      console.log('Form submitted:', submissionData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Request submitted successfully! Our technician will contact you soon.')
      onClose()
      // Reset form
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error('Form submission error:', error)
      alert('There was an error submitting your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translations.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{translations.nameLabel} *</Label>
            <Input id="name" name="name" placeholder={translations.namePlaceholder} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">{translations.phoneLabel} *</Label>
            <Input id="phone" name="phone" type="tel" placeholder={translations.phonePlaceholder} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city">{translations.cityLabel}</Label>
            <Input id="city" name="city" placeholder={translations.cityPlaceholder} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{translations.emailLabel}</Label>
            <Input id="email" name="email" type="email" placeholder={translations.emailPlaceholder} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">{translations.messageLabel}</Label>
            <Textarea 
              id="message" 
              name="message" 
              placeholder={translations.messagePlaceholder}
              defaultValue={prefillMessage || ''}
            />
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="privacy" name="privacy" required className="mt-0.5" />
            <label
              htmlFor="privacy"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {translations.privacyPolicyText}{' '}
              <Link 
                href={`/${locale}/${getPrivacyPolicyUrl(locale)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:no-underline"
              >
                {translations.privacyPolicyLink}
              </Link>
            </label>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : translations.submitButton}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
