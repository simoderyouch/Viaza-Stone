# Viaza Stone

## Local development

```bash
npm install
npm run dev
```

Before deployment, verify the production build with `npm run lint` and `npm run build`.

## Enquiry email delivery

The contact form sends enquiries through the server-side Resend API route. Copy `.env.example` to `.env.local` and supply:

- `RESEND_API_KEY`: a server-only Resend API key.
- `CONTACT_FROM_EMAIL`: a sender on a domain verified in Resend.
- `CONTACT_TO_EMAIL`: the Viaza Stone inbox that receives enquiries.

Never prefix these variables with `NEXT_PUBLIC_` or commit `.env.local`. Until the first two values are configured, the form intentionally reports that delivery is unavailable instead of showing a false success message.

The form accepts PDF, DWG, DXF, JPG, and PNG attachments up to 8 MB. Successful submissions send the team notification and a localized customer confirmation containing a reference number.

## Client material still required

The following information must be supplied and approved by Viaza Stone before it can be published:

- Registered company name, physical address, and legal identifiers.
- Confirmed quarry ownership/sourcing wording, production capacity, lead times, packaging, minimum order, and container data.
- Laboratory-tested technical values, tolerances, certificates, and technical PDF files.
- Verified project case studies and clear permission to identify each project as Viaza-supplied.
- A downloadable catalogue file, if one should be offered.

No placeholder commercial claims should be substituted for these facts.

## Scope note

SEO implementation is intentionally outside this delivery. Sitemap, robots directives, canonical/hreflang tags, structured data, search-console setup, analytics, and keyword landing pages were not added.
