# Stellar Candidate Report Generator

A high-fidelity report generation tool designed for **Stellar Recruitment NZ**. This tool converts raw candidate data (CVs, resumes, and interview notes) into a polished, on-brand PDF report that follows the "gold-standard" format established for Joe Ward (Wardo).

## Features

- **Branded Output**: Automatically applies Stellar's official color palette (Navy, Bright Blue, Silver) and logos.
- **High-Fidelity PDF**: Uses Puppeteer to render pixel-perfect reports from HTML templates.
- **Structured Data Mapping**: Validates input against a strict [Data Schema](references/DATA_SCHEMA.md) to ensure consistency.
- **Editorial Intelligence**: Guided workflow for rewriting career objectives and project status paragraphs to be client-ready.

## Project Structure

```text
stellar-candidate-report-generator/
├── assets/
│   ├── stellar_template.html     # HTML/CSS source for the report
│   └── stellar_white_logo.png     # Official Stellar branding
├── references/
│   ├── consultant_details.json    # Hard-coded consultant info (Joe Ward)
│   └── DATA_SCHEMA.md            # JSON schema for candidate input
├── scripts/
│   ├── build_report.cjs          # Core generation script (Node.js/Puppeteer)
│   └── package.json              # Script dependencies
└── SKILL.md                      # Gemini CLI skill definition
```

## Installation

This generator requires **Node.js** and **Puppeteer**.

1. Navigate to the scripts directory:
   ```bash
   cd scripts
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### 1. Prepare Data
Create a `candidate_data.json` file following the format in `references/DATA_SCHEMA.md`.

### 2. Generate Report
Run the build script providing your data file and the desired output path:

```bash
node scripts/build_report.cjs candidate_data.json output_report.pdf
```

## Core Workflow (Gemini CLI)

When used as a skill in Gemini CLI:
1. **Source Parsing**: Uses the `document-parser` skill to extract text from CVs (PDF/DOCX).
2. **Missing Field Check**: Interactively asks for missing fields (e.g., Charge Rate, Availability).
3. **Drafting**: Gemini drafts the positioning paragraphs (Project Status) based on the candidate's experience.
4. **Build**: Executes the generation script to produce the final PDF.

## Branding Guidelines
- **Navy**: `#002340` (Primary)
- **Bright Blue**: `#005dab` (Accents/Headers)
- **Silver**: `#a7a9ab` (Borders/Footers)

---
*Maintained for Joe Ward (Stellar Recruitment Auckland).*
