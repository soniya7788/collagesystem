const SubjectShortCode = require("../models/SubjectShortCode");

async function buildSubjectShortForms(subjects = [], department, semester) {
  if (!subjects.length) return [];

  // 🔑 Load short-code document ONCE
  const doc = await SubjectShortCode.findOne({
    department,
    semester
  });

  if (!doc || !doc.subjects) return [];

  const result = [];

  for (const s of subjects) {
    if (!s?.name) continue;

    // Extract subject code from "Name (09101)"
    const match = s.name.match(/\((\d+)\)/);
    if (!match) continue;

    const subjectCode = match[1];

    // 🔑 Find subject inside subjects array
    const subjectEntry = doc.subjects.find(
      sub => sub.code === subjectCode
    );

    if (!subjectEntry) continue;

    const short = subjectEntry.short;

    // THEORY
    if (s.FA_TH) result.push(`${short}-TH-FA`);
    if (s.SA_TH) result.push(`${short}-TH-SA`);

    // PRACTICAL
    if (s.FA_PR) result.push(`${short}-PR-FA`);
    if (s.SA_PR) result.push(`${short}-PR-SA`);

    // SLA
    if (s.SLA) {
      if (s.FA_TH || s.SA_TH) result.push(`${short}-TH-SLA`);
      if (s.FA_PR || s.SA_PR) result.push(`${short}-PR-SLA`);
    }
  }

  return result;
}

module.exports = buildSubjectShortForms;
