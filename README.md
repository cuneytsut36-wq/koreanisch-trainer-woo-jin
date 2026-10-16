# LinguaWorld / Woo Jin — multilingual learning app

Interactive Korean, German and English learning with romanized Korean support, vocabulary, stories, quizzes, offline progress and optional AI chat.

## Privacy-first configuration (V58)
- **Off by default:** loading photos and CloudFront animations, YouTube embeds, MyMemory translation requests, hosted AI chat and browser network speech recognition.
- Users can turn services on individually via the **Datenschutz** control; revoking access reloads the app. A local-data deletion action is available.
- Uses a local pastel SVG fallback and CSS-driven Woo Jin idle animation until externally hosted videos are allowed.
- No external Google Fonts import; local fallback fonts are used.
- Legal pages: `datenschutz.html`, `impressum.html` (both **drafts** until operator identity and deployment details are verified).
- PWA cache bumped to V58. Original learning functionality and language choices remain present.

## Deployment requirements / compliance checklist
See [LEGAL_REVIEW_REQUIRED.md](LEGAL_REVIEW_REQUIRED.md) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). **This app has not received full legal clearance.** The operator must supply real name, accessible mailing address and contact email if the provider-identification duty applies, confirm the actual hosting/AI subprocessors, retention terms, third-country transfers, and rightsholder permissions.
Never place API keys in frontend JavaScript, GitHub commits, .env files in a public repo, or browser-local code. Protect any hosted `/api/chat` service with server-side rate limiting, environment secrets, input limits and abuse controls.

A source-code syntax audit is not a substitute for a full live browser or legal audit.
