#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

/**
 * stellar-candidate-report-generator/scripts/build_report.cjs
 * 
 * Refactored: Updated to support new schema with expanded Candidate Overview,
 * Work Experience list, and conditional Project Scope.
 */

async function main() {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.error("Usage: node build_report.cjs <data.json> <output.pdf>");
        process.exit(1);
    }

    const dataPath = path.resolve(args[0]);
    const outputPath = path.resolve(args[1]);
    const templatePath = path.join(__dirname, '../assets/stellar_template.html');
    const consultantPath = path.join(__dirname, '../references/consultant_details.json');
    const logoPath = path.join(__dirname, '../assets/stellar_white_logo.png');

    try {
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        const consultant = JSON.parse(fs.readFileSync(consultantPath, 'utf8'));
        let template = fs.readFileSync(templatePath, 'utf8');

        const logoBase64 = fs.readFileSync(logoPath).toString('base64');
        const logoDataUri = `data:image/png;base64,${logoBase64}`;

        const toLi = (arr) => (arr || []).map(item => `<li>${item}</li>`).join('\n');
        const reportDate = new Date().toLocaleDateString('en-NZ', { 
            weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' 
        });

        const projectDetailsList = toLi(data.project_details);

        const replacements = {
            '{{candidate_name}}': data.candidate_name,
            '{{target_role}}': data.target_role,
            '{{consultant_name}}': consultant.name,
            '{{consultant_title}}': consultant.title,
            '{{consultant_phone}}': consultant.phone,
            '{{consultant_email}}': consultant.email,
            '{{report_date}}': reportDate,
            '{{current_location}}': data.current_location,
            '{{availability}}': data.availability,
            '{{charge_rate}}': data.charge_rate,
            '{{own_transport}}': data.own_transport,
            '{{english_level}}': data.english_level,
            '{{approved_work_regions}}': data.approved_work_regions,
            '{{candidate_overview}}': data.candidate_overview,
            '{{work_experience_companies_list}}': toLi(data.work_experience_companies),
            '{{project_details_list}}': projectDetailsList,
            '{{duties_list}}': toLi(data.duties),
            '{{qualifications_list}}': toLi(data.qualifications),
            '{{competencies_list}}': toLi(data.core_competencies),
            '{{work_history_rows}}': (data.work_history || []).map(job => 
                `<tr><td>${job.duration}</td><td>${job.company}</td><td>${job.position}</td></tr>`
            ).join('\n'),
            '{{career_objective}}': data.career_objective,
            '{{strengths_list}}': toLi(data.key_strengths),
            '{{systems}}': data.systems,
            '{{interests}}': data.interests,
            '{{experience_blocks_html}}': (data.experience_blocks || []).map(block => `
                <div class="exp-block">
                    <div style="font-weight: bold; font-size: 13px;">${block.role} &nbsp;|&nbsp; <span style="color: #005dab;">${block.company}</span></div>
                    <div style="font-size: 11px; color: #a7a9ab; font-style: italic; margin-bottom: 5px;">${block.duration}</div>
                    <ul>${toLi(block.bullets)}</ul>
                </div>
            `).join('\n')
        };

        // Handle the conditional project_details_list block
        if (!data.project_details || data.project_details.length === 0) {
            // Remove the block if empty
            template = template.replace(/\{\{#if project_details_list\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        } else {
            // Remove the markers but keep the content
            template = template.replace(/\{\{#if project_details_list\}\}/g, '');
            template = template.replace(/\{\{\/if\}\}/g, '');
        }

        for (const [key, value] of Object.entries(replacements)) {
            template = template.split(key).join(value || '');
        }

        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setContent(template, { waitUntil: 'networkidle0' });
        
        // Refined Header Template (Matches 20mm margin)
        const headerTemplate = `
            <div style="width: 100%; font-family: Helvetica, Arial, sans-serif; -webkit-print-color-adjust: exact;">
                <div style="background-color: #002340; height: 18mm; width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0 18mm; box-sizing: border-box;">
                    <img src="${logoDataUri}" style="height: 9mm;">
                    <span style="color: white; font-size: 8pt; font-weight: bold;">CONFIDENTIAL CANDIDATE REPORT</span>
                </div>
                <div style="background-color: #005dab; height: 2mm; width: 100%;"></div>
            </div>
        `;

        const footerTemplate = `
            <div style="width: 100%; font-family: Helvetica, Arial, sans-serif; font-size: 7pt; padding: 0 18mm; box-sizing: border-box; -webkit-print-color-adjust: exact;">
                <div style="border-top: 1px solid #a7a9ab; padding-top: 2mm; display: flex; justify-content: space-between; color: #002340;">
                    <span>${data.candidate_name} | ${data.target_role}</span>
                    <span style="flex-grow: 1; text-align: center;">Stellar Recruitment NZ</span>
                    <span>Page <span class="pageNumber"></span></span>
                </div>
            </div>
        `;

        await page.pdf({
            path: outputPath,
            format: 'A4',
            displayHeaderFooter: true,
            headerTemplate: headerTemplate,
            footerTemplate: footerTemplate,
            margin: { top: '20mm', bottom: '20mm', left: '0', right: '0' },
            printBackground: true
        });

        await browser.close();
        console.log(`Success: Refactored PDF generated at ${outputPath}`);
    } catch (err) {
        console.error(`Failure: ${err.message}`);
        process.exit(1);
    }
}

main();
