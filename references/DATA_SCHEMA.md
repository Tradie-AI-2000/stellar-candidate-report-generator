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

## Consultant's Report (Page 1 & 2)

- `candidate_overview`: string (Rich 5-8 sentence paragraph positioning the candidate, highlighting key qualities like leadership and overall experience)
- `work_experience_companies`: string array (List of companies the candidate has worked for)
- `project_details`: string array (Conditional: Bulleted list of specific project highlights, e.g. "Led the construction of a community clinic - Leggat Builders")
- `duties`: string array (Bulleted list of key responsibilities)

## Work History & Skills (Page 3)

- `work_history`: array of objects
  - `duration`: string (e.g. "Jul 2023 – Present")
  - `company`: string
  - `position`: string
- `qualifications`: string array
- `core_competencies`: string array (Value-added strengths)

## Experience Detail (Full Resume)

- `career_objective`: string (Third person, client-facing)
- `key_strengths`: string array (6-8 impact bullets)
- `experience_blocks`: array of objects
  - `role`: string
  - `company`: string
  - `duration`: string
  - `bullets`: string array
- `systems`: string (Comma separated list)
- `interests`: string (Comma separated list)
