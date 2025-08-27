# Email Integration Plan for RequestTechnician Form - UPDATED

## PROMPT for AI Coding Assistant:

**Task:** Integrate email sending functionality to the RequestTechnicianModal form in the langu-remontas project with MOCK implementation for development and real email service for production.

## Current Implementation Analysis

### Form Structure (RequestTechnicianModal.tsx)
- **Location**: `/components/shared/RequestTechnicianModal.tsx`
- **Current State**: Form collects data but only logs to console (lines 63-77)
- **Form Fields**: name*, phone*, city, email, message, privacy consent*
- **Multilingual**: Supports 4 locales (en, lt, pl, uk) via forms.json
- **Trigger Types**: 'technician', 'consultation', 'learnMore'
- **Data Structure**: Includes triggerType, locale, timestamp for analytics

### Current Submission Logic (Lines 47-78)
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  // Collects FormData, adds metadata
  // Currently: console.log + setTimeout simulation
  // Needs: Real API call to email endpoint
}
```

## Implementation Plan

### Phase 1: Email Service Setup (HIGH Priority)

#### 1.1 Choose Email Service Provider
**Recommended**: Resend.com for Next.js projects
- **Pros**: Simple API, good deliverability, generous free tier
- **Alternative**: SendGrid, Nodemailer with SMTP
- **Setup**: Environment variables for API keys

#### 1.2 Install Dependencies
```bash
npm install resend
npm install @types/node (if not present)
```

#### 1.3 Environment Configuration
```env
# .env.local
RESEND_API_KEY=re_xxxxxxxxxx
BUSINESS_EMAIL=info@langu-remontas.com
FROM_EMAIL=noreply@langu-remontas.com
```

### Phase 2: API Route Creation (HIGH Priority)

#### 2.1 Create Email API Endpoint
**File**: `/app/api/send-technician-request/route.ts`

**Features**:
- POST endpoint for form submissions
- Input validation with Zod schema
- Rate limiting (max 5 requests per IP per hour)
- Locale-aware email templates
- Error handling with proper HTTP status codes
- CORS configuration

**Request Schema**:
```typescript
interface TechnicianRequest {
  name: string;
  phone: string;
  city?: string;
  email?: string;
  message?: string;
  triggerType: 'technician' | 'consultation' | 'learnMore';
  locale: 'en' | 'lt' | 'pl' | 'uk';
  timestamp: string;
  privacy: boolean;
}
```

#### 2.2 Email Template System
**Structure**:
- Business notification email (to company)
- Customer confirmation email (if email provided)
- Multilingual templates for all 4 locales
- HTML + text versions for better deliverability

### Phase 3: Email Templates (MEDIUM Priority)

#### 3.1 Business Notification Email
**To**: BUSINESS_EMAIL
**Subject**: `[${locale.toUpperCase()}] New Technician Request - ${name}`

**Content**:
- Customer details (name, phone, city, email)
- Request type and trigger source
- Message content
- Timestamp and locale
- Direct contact links (tel:, mailto:)

#### 3.2 Customer Confirmation Email (if email provided)
**To**: Customer email
**Subject**: Locale-specific confirmation message

**Content**:
- Thank you message in customer's language
- Request summary
- Expected response time
- Emergency contact information
- Company branding

### Phase 4: Form Integration (HIGH Priority)

#### 4.1 Update RequestTechnicianModal.tsx
**Changes**:
- Replace console.log with actual API call
- Add proper error handling with user feedback
- Implement loading states with better UX
- Add success confirmation with next steps
- Handle network errors gracefully

#### 4.2 Enhanced User Feedback
**Success State**:
- Success message in user's locale
- Clear next steps information
- Option to close modal or submit another request

**Error States**:
- Network error handling
- Validation error display
- Retry mechanism
- Fallback contact information

### Phase 5: Security & Validation (MEDIUM Priority)

#### 5.1 Input Validation
- Server-side validation with Zod
- Phone number format validation by locale
- Email format validation
- Message length limits
- XSS prevention

#### 5.2 Rate Limiting
- IP-based rate limiting (5 requests/hour)
- Honeypot field for bot detection
- CAPTCHA integration (optional)
- Request logging for monitoring

#### 5.3 Data Protection
- No sensitive data logging
- GDPR compliance considerations
- Privacy policy integration
- Data retention policies

### Phase 6: Enhanced Features (LOW Priority)

#### 6.1 Analytics Integration
- Track conversion rates by trigger type
- Monitor form abandonment
- A/B test different form versions
- Email delivery tracking

#### 6.2 CRM Integration (Optional)
- Webhook to CRM system
- Lead scoring based on trigger type
- Automated follow-up sequences
- Customer journey tracking

## Implementation Steps

### Step 1: Environment Setup
1. Sign up for Resend.com account
2. Generate API key
3. Configure environment variables
4. Install required dependencies

### Step 2: API Route Development
1. Create `/app/api/send-technician-request/route.ts`
2. Implement request validation
3. Set up email templates
4. Add rate limiting
5. Test with Postman/curl

### Step 3: Form Integration
1. Update handleSubmit function in RequestTechnicianModal.tsx
2. Replace simulation with real API call
3. Add proper error handling
4. Implement success feedback
5. Test form submission flow

### Step 4: Email Template Creation
1. Design HTML email templates
2. Create text fallbacks
3. Implement multilingual support
4. Test email delivery
5. Verify spam score

### Step 5: Security Implementation
1. Add input validation
2. Implement rate limiting
3. Test security measures
4. Add monitoring
5. Document security practices

### Step 6: Testing & Deployment
1. Unit tests for API route
2. Integration tests for form
3. Email delivery testing
4. Load testing
5. Production deployment

## File Structure Changes

### New Files
```
app/
  api/
    send-technician-request/
      route.ts                 # Email API endpoint
lib/
  email/
    templates.ts              # Email template functions
    validation.ts             # Input validation schemas
    rate-limiter.ts          # Rate limiting logic
```

### Modified Files
```
components/shared/RequestTechnicianModal.tsx  # Form submission logic
content/shared/forms.json                    # Add success/error messages
.env.local                                   # Email service configuration
```

## Success Criteria

### Technical Requirements
- [ ] API endpoint returns proper HTTP status codes
- [ ] Form validation works client and server-side
- [ ] Email delivery success rate > 95%
- [ ] Response time < 2 seconds
- [ ] Rate limiting prevents abuse
- [ ] Error handling provides clear user feedback

### Business Requirements
- [ ] Business receives all form submissions via email
- [ ] Customers receive confirmation when email provided
- [ ] All 4 locales supported properly
- [ ] Emergency requests prioritized
- [ ] Analytics track conversion funnel
- [ ] GDPR compliance maintained

### User Experience Requirements
- [ ] Form submission feels instant (< 1 second feedback)
- [ ] Clear success/error messages in user's language
- [ ] No form data loss on errors
- [ ] Accessible error states
- [ ] Mobile-friendly email templates
- [ ] Professional email branding

## Risk Mitigation

### Email Delivery Issues
- **Risk**: Emails ending up in spam
- **Mitigation**: SPF/DKIM setup, reputation monitoring, text versions

### Rate Limiting False Positives
- **Risk**: Legitimate users blocked
- **Mitigation**: IP whitelist for office, graceful degradation

### API Downtime
- **Risk**: Form submissions lost
- **Mitigation**: Retry logic, fallback contact methods, queue system

### Data Privacy
- **Risk**: GDPR violations
- **Mitigation**: Minimal data collection, clear consent, retention policies

## Monitoring & Maintenance

### Key Metrics
- Email delivery rate
- Form submission success rate
- Response time percentiles
- Error rate by type
- Conversion rate by trigger type

### Alerts
- Email delivery failures
- API error rate > 5%
- Rate limit triggers
- Unusual traffic patterns

### Regular Tasks
- Monthly email deliverability review
- Quarterly security audit
- Template performance analysis
- User feedback collection

## Estimated Timeline
- **Phase 1-2**: 2-3 days (Setup + API)
- **Phase 3**: 1-2 days (Templates)
- **Phase 4**: 1-2 days (Integration)
- **Phase 5**: 2-3 days (Security)
- **Phase 6**: 1-2 days (Testing)
- **Total**: 7-12 days

## Next Steps
1. Choose email service provider and set up account
2. Create API route with basic functionality
3. Test email delivery in development
4. Integrate with form component
5. Add security measures and testing
6. Deploy to production with monitoring

---

**Priority Order**: Email service setup → API route → Form integration → Security → Testing → Enhanced features

**Critical Success Factor**: Maintain existing form UX while adding reliable email delivery without introducing new failure points.
