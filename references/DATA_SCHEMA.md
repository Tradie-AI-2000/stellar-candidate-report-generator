# Stellar Candidate Report Data Schema

Use this schema when mapping extracted CV text to the report generator.

## Core Fields

- `candidate_name`: string (e.g. "CHARLIE BECKHAM")
- `target_role`: string (e.g. "Licensed Building Practitioner / Lead Carpenter")
- `current_location`: string (e.g. "Whangarei, Northland, NZ")
- `availability`: string (e.g. "Immediate")
- `charge_rate`: string (e.g. "$60.00 per hour + GST")
- `own_transport`: string ("Yes" / "No")
- `english_level`: string (e.g. "5 / 5 (Native)")
- `approved_work_regions`: string (e.g. "N/A — NZ Citizen / Resident")

## Candidate Overview

- `experience_summary`: string (High-level summary, e.g. "35+ years across residential...")
- `countries_worked`: string (e.g. "New Zealand")
- `project_scope`: string array (Bulleted list of high-level projects/companies)
- `duties`: string array (Bulleted list of key responsibilities)
- `project_status`: string (4-6 sentences positioning the candidate)

## Work History & Skills

- `work_history`: array of objects
  - `duration`: string (e.g. "Jul 2023 – Present")
  - `company`: string
  - `position`: string
- `qualifications`: string array
- `core_competencies`: string array (Value-added strengths)
- `career_objective`: string (Third person, client-facing)
- `key_strengths`: string array (6-8 impact bullets)

## Experience Detail (Full Resume)

- `experience_blocks`: array of objects
  - `role`: string
  - `company`: string
  - `duration`: string
  - `bullets`: string array
- `systems`: string (Comma separated list)
- `interests`: string (Comma separated list)
