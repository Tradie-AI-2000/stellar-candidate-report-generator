---
name: stellar-candidate-report-generator
description: Generate branded Stellar Recruitment candidate reports as high-fidelity HTML/PDF. Use when Joe Ward (Wardo) is preparing candidate submissions. Converts CVs, DOCX, or text into the locked Stellar gold-standard format.
---

# Stellar Candidate Report Generator

Produces a polished, on-brand Stellar Recruitment candidate report from raw candidate input. The output matches the locked gold-standard format used by Joe Ward (Wardo) at Stellar Recruitment Auckland.

## When to Trigger

- User uploads a CV (PDF, DOCX, TXT, MD) and asks for a Stellar report.
- User pastes raw CV text and asks to format it.
- User says "build a candidate report for [name]", "format this for Stellar", or "send to client".
- User mentions a specific role they're submitting the candidate for.

## Core Workflow

### Step 1 — Parse the Source
Use the `document-parser` skill to extract text from any uploaded files (CVs, portfolios).

### Step 2 — Confirm Missing Fields
The gold standard requires these fields. Use `ask_user` to confirm any missing data:
- `target_role` (e.g., "Site Foreman")
- `current_location` (e.g., "Auckland")
- `availability` (e.g., "Immediate")
- `charge_rate` (e.g., "$60.00 per hour + GST")
- `english_level` (e.g., "5 / 5 (Native)")

### Step 3 — Map to Schema
Construct a JSON object matching [references/DATA_SCHEMA.md](references/DATA_SCHEMA.md).

**Editorial Rules:**
- **Tidy the prose**: Fix grammar and tense. The goal is client-ready.
- **Project Status**: Write a fresh 4–6 sentence paragraph positioning the candidate for the target role.
- **Career Objective**: Rewrite in the third person.
- **Experience blocks**: Limit to 5–10 high-impact bullets per role.

### Step 4 — Build the Report
Run the generator script:
`node <path-to-skill>/scripts/build_report.cjs candidate_data.json report.pdf`

### Step 5 — Final Review
The output is high-fidelity HTML. Provide the file path to Joe. Mention any editorial liberties taken (e.g., "Wrote project status paragraph from scratch").

## Locked Elements — DO NOT CHANGE
- **Consultant Details**: Joe Ward (Title, Phone, Email) is hard-coded in [references/consultant_details.json](references/consultant_details.json).
- **No Position Description**: This section is intentionally omitted.
- **Branding**: Navy `#002340`, Bright Blue `#005dab`, Silver `#a7a9ab`.
