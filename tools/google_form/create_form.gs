/**
 * Creates the lab interest form for the Predictive Fluid and Aeroscience Lab
 * (prospective PhD students, any intake; current NTU MSc students looking for a
 * dissertation project; current NTU undergraduates for URECA or a Final Year
 * Project) and a linked response spreadsheet.
 * The form is optional and is not a formal application.
 *
 * FORM_ITEMS below lists every item of the form, top to bottom. It matches the
 * live form as exported on 2026-10-08.
 *   - createApplicationForm() builds a new form from it. Run it once at
 *     script.google.com; steps are in README.md.
 *   - updateLiveForm() applies it to the live form (FORM_ID) in place.
 *   - exportFormStructure() saves the live form as JSON, to copy edits made in
 *     the form editor back into this file.
 * The form is a single page: parts are separated by section headers, not page
 * breaks. FormApp cannot create file upload questions, so the CV and transcript
 * uploads are added by hand at the "ADD FILE UPLOADS HERE" header.
 *
 * Retention: createApplicationForm() saves the form and sheet ids in the Script
 * properties and installs a daily trigger for purgeExpiredSubmissions(). That
 * function deletes each submission (uploaded files, form response, sheet rows)
 * 12 months after it was submitted. deleteSubmissionByEmail(email) deletes one
 * applicant's submission on request.
 *
 * File names: createApplicationForm() also installs an on-submit trigger for
 * renameUploadedFiles(). After each submission (and each edit of one), it renames
 * the uploaded files to <Full_name>_cv_<n>.<ext> and <Full_name>_transcript_<n>.<ext>,
 * e.g. Sangjoon_Lee_cv_1.pdf and Sangjoon_Lee_transcript_2.png.
 * renameAllUploadedFiles() does the same for responses received earlier.
 */
var RETENTION_MONTHS = 12;
var PURGE_HANDLER = 'purgeExpiredSubmissions';
var PURGE_HOUR = 3;
var RENAME_HANDLER = 'renameUploadedFiles';

// The form title, description and confirmation message.
var FORM_TITLE = 'Lab Interest Form: Predictive Fluid and Aeroscience Lab, NTU Singapore';
var FORM_DESCRIPTION = 'Thank you for your interest in joining the Predictive Fluid and Aeroscience Lab (PFAL), School of Mechanical and Aerospace Engineering at Nanyang Technological University, Singapore.\n\n' +
  'This lab interest form helps Dr. Sangjoon Lee learn more about your background and interests, and submissions are reviewed about every two weeks. It is not a formal application: to apply for a PhD, use the NTU MAE PhD programme on the official NTU admission website.\n\n' +
  'Please have your CV (PDF), your transcripts, and a short research proposal ready before you start (1 proposal for MSc and undergraduate applicants, 2 for PhD applicants).\n\n' +
  'Questions marked with an asterisk (*) are required. You can edit your answers after you submit.';
var FORM_CONFIRMATION = 'Thank you. Dr. Lee will review your submission. ' +
  'You can edit your answers with the link on this page. ' +
  'For questions or deletion requests, email the lab (contact [at] pfaero [dot] science).';

// Every item of the form, top to bottom. Fields:
//   type      header (section header), text, paragraph, choice (multiple choice),
//             checkbox, or upload (file upload; added by hand, see README.md)
//   title     the exact title. updateLiveForm() finds the live item by it.
//   required  true or false (not for header and upload)
//   other     true adds an "Other" option to a choice or checkbox item
//   choices   the options of a choice or checkbox item
//   help      the help text
//   max       the maximum length of a paragraph, in characters, with its error text
//   exactly   the number of boxes a checkbox item needs, with its error text
// Apps Script cannot read validation rules, so max and exactly are kept from
// earlier versions of this file. Check them in the form editor.
var FORM_ITEMS = [
  // 1. About you
  { type: 'header', title: 'About you' },
  { type: 'choice', title: 'What are you interested in?', required: true,
    choices: ['PhD position (NTU MAE PhD programme)',
      'MSc dissertation project (current NTU MSc student)',
      'URECA project (current NTU undergraduate)',
      'Final Year Project (current NTU undergraduate)'] },
  { type: 'text', title: 'Full name', required: true,
    help: 'As in your passport, first name then last name (e.g., Sangjoon Lee).' },
  { type: 'text', title: 'Current institution and programme', required: true,
    help: 'e.g. university name, MS in Aerospace Engineering, year 2. NTU students: give your programme and year of study. If you are not enrolled, give your current role.' },
  { type: 'choice', title: 'Are you a Singapore citizen or permanent resident (PR)?', required: false, other: true,
    choices: ['Yes',
      'No'],
    help: 'Optional. This helps the lab prepare residence support in Singapore.' },

  // 2. Start date and application status
  { type: 'header', title: 'Start date and application status' },
  { type: 'text', title: 'Earliest start', required: true,
    help: 'Month and year (e.g. August 2027).\n' +
      'PhD programme: the intake, e.g. August 2027 (NTU MAE PhD intakes start in August and January).\n' +
      'MSc (thesis track): when you plan to start it, e.g. January 2027.\n' +
      'URECA: projects start in August.\n' +
      'FYP: August or January.' },
  { type: 'choice', title: 'NTU MAE PhD application status', required: true,
    choices: ['Not yet applied',
      'Applied',
      'Plan to apply before the deadline',
      'Not applicable (MSc or undergraduate research)'],
    help: 'Admission is through the NTU MAE PhD programme: https://www.ntu.edu.sg/education/graduate-programme/mae-phd' },

  // 3. Academic record
  { type: 'header', title: 'Academic record',
    help: 'Give each GPA with its scale. For a degree in progress, give the expected year.' },
  { type: 'text', title: 'Bachelor\'s degree (completed or in progress)', required: true,
    help: 'Institution, major, and years, e.g. 2019 to 2023.\n\n' +
      'For a degree in progress, give the expected graduation year, e.g. 2023 to 2027 (expected).' },
  { type: 'text', title: 'Bachelor\'s GPA (current GPA if in progress)', required: true,
    help: 'GPA / scale, e.g. 3.85 / 4.00. \n\n' +
      'For a degree in progress, give your cumulative GPA so far. For other grading systems, give your mark and the scale.' },
  { type: 'text', title: 'Master\'s degree (completed or in progress)', required: false,
    help: 'Institution, major, and years. Leave blank if none.' },
  { type: 'text', title: 'Master\'s GPA (current GPA if in progress)', required: false,
    help: 'GPA / scale, e.g. 3.85 / 4.00. Leave blank if none.' },
  { type: 'paragraph', title: 'Key courses and grades', required: true, max: 1500, error: 'Please list up to 10 courses, one short line each.',
    help: 'Up to 10 courses linked to our research areas, one per line, e.g. Computational Fluid Dynamics: A' },
  { type: 'text', title: 'English test scores', required: false,
    help: 'Test, score, and date, e.g. IELTS 7.5, May 2026. Leave blank if not applicable.' },

  // 4. Fit with the lab
  { type: 'header', title: 'Fit with the lab',
    help: 'This part asks about your past, present, and future research: what you have done, the strengths you would bring, and the research you would do in the lab. Our Research page (https://pfaero.science/research/) describes the 5 research areas, and our Publications page (https://pfaero.science/publications/) lists the lab\'s papers.' },
  { type: 'checkbox', title: 'Research areas of interest', required: true,
    choices: ['Predictive Aerophysics with Machine Intelligence',
      'Data-Driven Aerospace Design and Flow Control',
      'Vortex Dynamics and Flow Instability',
      'High-Fidelity CFD and Scalable Computing',
      'Thermal-Fluid Systems Across Scales'],
    help: 'Select all that apply.' },
  { type: 'paragraph', title: 'Past: Research experience', required: true, max: 2000, error: 'Please keep this to 2000 characters.',
    help: 'Max. 2000 characters. List your 1\u20132 main projects as numbered items, most relevant first. \n\n' +
      'Course projects, theses, internships, and industry work all count, published or not. For each project, give:\n' +
      'Topic\n' +
      'Your own contribution: what you did yourself. For team work, say which parts were yours.\n' +
      'Motivation: the question or problem\n' +
      'Method and approach\n' +
      'Outcomes\n' +
      'Skills or lessons you gained' },
  { type: 'paragraph', title: 'Present: Research strengths', required: true, max: 1000, error: 'Please keep this to 1000 characters.',
    help: 'Max. 1000 characters. List your main research strengths from the experience above.\n\n' +
      'Describe how each strength fits the lab and explain what it would add to the lab\'s work.' },
  { type: 'paragraph', title: 'Future: Brief proposal 1, building on the lab\'s work', required: true, max: 1000, error: 'Please keep this to 1000 characters.',
    help: 'Max. 1000 characters. All must answer this.\n\n' +
      'Propose a research idea that builds on the lab\'s work. It can improve or extend an existing study, but it must go beyond simple replication. Name the reference, the open question, your approach, and the expected outcome.\n\n' +
      'Note for MSc and undergraduate applicants: Frame it as a prospective dissertation, URECA, or FYP plan.' },
  { type: 'paragraph', title: 'Future: Brief proposal 2, own research agenda (PhD applicants)', required: false, max: 1000, error: 'Please keep this to 1000 characters.',
    help: 'Max. 1000 characters. PhD applicants must answer this. MSc and undergraduate applicants, leave it blank.\n\n' +
      'Under your plan to grow as an independent researcher, propose your own original research agenda, based on your strengths and your long-term vision. It should be closely related to the lab\'s research areas, but it should not be an incremental step from the lab\'s work. \n\n' +
      'Describe the fundamental question, your approach, and how the lab\'s resources and past work would help you build your own research portfolio.' },

  // 5. CV, transcripts, and referees
  { type: 'header', title: 'CV, transcripts, and referees',
    help: 'Upload your CV (academic) and transcripts. Unofficial transcripts or screenshots are fine, as long as they show what you entered in the academic record. Referees are optional: 1 or 2 people who know your research or studies.' },
  { type: 'upload', title: 'CV (PDF)' },
  { type: 'upload', title: 'Transcripts (PDF/image)' },
  { type: 'paragraph', title: 'Referee(s)', required: false,
    help: 'By default, you may submit the form without referees. \n\n' +
      'If you have secured consent to share referee details, you may provide them in the following format:   \n' +
      '(1) Dr. Jane Tan, Associate Professor, Example University, jane.tan@example.edu,\n' +
      '(2) Dr. John Doe, Senior Researcher, Aerospace Institution, j.doe@aerospace.org, ...' },

  // 6. Privacy and data retention
  { type: 'header', title: 'Privacy and data retention',
    help: 'This form is used only to review your interest in joining the lab, and your answers and files stay within the lab. They are deleted automatically 12 months after you submit the form. To have them deleted sooner, email the lab (contact [at] pfaero [dot] science), and we will delete them within 14 days of your request. Deleting them does not affect your formal NTU application.' },
  { type: 'checkbox', title: 'Declaration', required: true, exactly: 2, error: 'Please tick both boxes.',
    choices: ['I confirm that the information in this form is accurate and complete.',
      'I consent to Dr. Lee collecting and using this information to review my interest in joining the lab.'],
    help: 'Tick both boxes to submit.' }
];

// FormApp cannot create file upload questions. createApplicationForm() puts this
// header where the upload items go; you replace it with the 2 upload questions.
var UPLOAD_MARKER = 'ADD FILE UPLOADS HERE: CV and transcripts';
var UPLOAD_MARKER_HELP = 'Form owner: insert 2 File upload questions at this spot, then delete this header. ' +
  '(1) CV (PDF): required, allow only PDF, max 1 file, max file size 10 MB. ' +
  '(2) Transcripts (PDF/image): required, allow only PDF and images, max 5 files, max file size 10 MB.';

// The FormApp item type and the accessor for each type in FORM_ITEMS.
var ITEM_TYPES = {
  header: { type: 'SECTION_HEADER', as: 'asSectionHeaderItem' },
  text: { type: 'TEXT', as: 'asTextItem' },
  paragraph: { type: 'PARAGRAPH_TEXT', as: 'asParagraphTextItem' },
  choice: { type: 'MULTIPLE_CHOICE', as: 'asMultipleChoiceItem' },
  checkbox: { type: 'CHECKBOX', as: 'asCheckboxItem' },
  upload: { type: 'FILE_UPLOAD', as: null }
};

function createApplicationForm() {
  var form = FormApp.create(FORM_TITLE);
  form.setDescription(FORM_DESCRIPTION)
    .setConfirmationMessage(FORM_CONFIRMATION)
    // The file upload question needs Google sign-in anyway, so collect the
    // account email and allow 1 response per account, editable after submit.
    .setCollectEmail(true)
    .setLimitOneResponsePerUser(true)
    .setAllowResponseEdits(true)
    .setShowLinkToRespondAgain(false)
    .setPublishingSummary(false)
    .setShuffleQuestions(false)
    .setProgressBar(false); // single page, so no progress bar

  // The form collects the respondent's Google account email (setCollectEmail
  // above), so there is no separate Email question.
  var markerAdded = false;
  FORM_ITEMS.forEach(function (spec) {
    if (spec.type !== 'upload') {
      addItem_(form, spec);
    } else if (!markerAdded) {
      form.addSectionHeaderItem().setTitle(UPLOAD_MARKER).setHelpText(UPLOAD_MARKER_HELP);
      markerAdded = true;
    }
  });

  // Response spreadsheet in the owner's My Drive.
  var sheet = SpreadsheetApp.create('Lab Interest Form responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  // Retention: save the ids for the deletion functions and start the daily trigger.
  // A later run overwrites these ids, so the trigger covers the newest form only.
  PropertiesService.getScriptProperties().setProperties({ FORM_ID: form.getId(), SHEET_ID: sheet.getId() });
  installPurgeTrigger();
  installRenameTrigger(form);

  var publishedUrl = form.getPublishedUrl();
  var shortUrl;
  try {
    shortUrl = form.shortenFormUrl(publishedUrl);
  } catch (e) {
    shortUrl = 'not available (' + e.message + '). Use Send > link > Shorten URL in the editor.';
  }
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Published URL: ' + publishedUrl);
  Logger.log('Short URL: ' + shortUrl);
  Logger.log('Responses sheet: ' + sheet.getUrl());
  Logger.log('Daily trigger: ' + PURGE_HANDLER + ' runs every day at about ' + PURGE_HOUR + ':00 (' +
    Session.getScriptTimeZone() + ') and deletes submissions older than ' + RETENTION_MONTHS + ' months from this form only.');
  Logger.log('On-submit trigger: ' + RENAME_HANDLER + ' renames uploaded files to <Full_name>_cv_<n> and <Full_name>_transcript_<n>.');
  Logger.log('Next: add the CV and transcript File upload questions at "' + UPLOAD_MARKER + '", then delete that header. See README.md.');
  return form;
}

/**
 * Applies this file to the live form (FORM_ID) in place, so the link, the
 * responses and the upload questions stay:
 *   - sets the form title, description and confirmation message
 *   - for each item of FORM_ITEMS, found by its exact title: sets the help text,
 *     the required flag, the options and the length or box limit
 *   - adds the items of FORM_ITEMS that the form lacks (except the upload
 *     questions, which you add by hand)
 *   - puts the items in the order of FORM_ITEMS
 * It does not delete items. An item that is not in FORM_ITEMS is left as it is and
 * stays right after the item above it. It makes no changes and stops with an error if an
 * item has a different type than in FORM_ITEMS, or if the form has items that are
 * not in FORM_ITEMS while it lacks items of FORM_ITEMS (for example after a
 * question was renamed in the editor, which would otherwise be added a second
 * time). Before it changes anything, it saves the form as it was to a JSON file in
 * your Drive. Safe to run more than once.
 */
function updateLiveForm() {
  var form = openLiveForm_('updateLiveForm');
  var find = finder_(form);
  var listed = {};
  FORM_ITEMS.forEach(function (spec) { listed[spec.title] = spec; });

  var extra = [];
  var wrongType = [];
  form.getItems().forEach(function (item) {
    var title = item.getTitle();
    if (!listed.hasOwnProperty(title)) {
      extra.push(title || '(untitled ' + item.getType() + ')');
    } else if (String(item.getType()) !== ITEM_TYPES[listed[title].type].type) {
      wrongType.push(title + ' (' + item.getType() + ' in the form, ' + listed[title].type + ' in FORM_ITEMS)');
    }
  });
  var toAdd = FORM_ITEMS.filter(function (spec) { return spec.type !== 'upload' && !find(spec.title); });
  var noUpload = FORM_ITEMS.filter(function (spec) { return spec.type === 'upload' && !find(spec.title); });
  if (wrongType.length) {
    throw new Error('updateLiveForm made no changes. These items have another type in the form: ' + wrongType.join(', ') +
      '. Change their type in FORM_ITEMS, or in the form editor, and run again.');
  }
  if (extra.length && toAdd.length) {
    throw new Error('updateLiveForm made no changes. The form has items that are not in FORM_ITEMS (' + extra.join(', ') +
      ') and lacks items of FORM_ITEMS (' + toAdd.map(function (spec) { return spec.title; }).join(', ') +
      '). If you renamed a question in the editor, use the same title in FORM_ITEMS, then run again.');
  }

  saveFormStructure_(form, 'before update');
  form.setTitle(FORM_TITLE).setDescription(FORM_DESCRIPTION).setConfirmationMessage(FORM_CONFIRMATION);
  var added = [];
  FORM_ITEMS.forEach(function (spec) {
    if (spec.type === 'upload') return;
    var item = find(spec.title);
    if (item) {
      applyItem_(item, spec);
    } else {
      addItem_(form, spec);
      added.push(spec.title);
    }
  });
  var order = reorderItems_(form);

  Logger.log('updateLiveForm: updated the title, the description, the confirmation message and ' +
    (FORM_ITEMS.length - noUpload.length) + ' items.');
  if (added.length) Logger.log('Added: ' + added.join(', ') + '.');
  if (extra.length) Logger.log('Left as they are (not in FORM_ITEMS): ' + extra.join(', ') + '.');
  if (noUpload.length) {
    Logger.log('Upload questions not found, add them by hand (README.md, step 2): ' +
      noUpload.map(function (spec) { return spec.title; }).join(', ') + '.');
  }
  Logger.log('Order: ' + order.join(' | '));
  Logger.log('Edit URL: ' + form.getEditUrl());
  return { added: added, extra: extra, order: order };
}

// Adds 1 item of FORM_ITEMS at the end of the form.
function addItem_(form, spec) {
  var adders = { header: 'addSectionHeaderItem', text: 'addTextItem', paragraph: 'addParagraphTextItem',
    choice: 'addMultipleChoiceItem', checkbox: 'addCheckboxItem' };
  if (!adders[spec.type]) throw new Error('addItem_: cannot create a ' + spec.type + ' item (' + spec.title + ').');
  var item = form[adders[spec.type]]().setTitle(spec.title);
  applyItem_(item, spec);
  return item;
}

// Sets the help text, the required flag, the options and the limits of 1 item.
// item can be a generic Item (from getItems) or a typed item (from add...Item).
function applyItem_(item, spec) {
  var as = ITEM_TYPES[spec.type].as;
  var typed = typeof item[as] === 'function' ? item[as]() : item;
  typed.setHelpText(spec.help || '');
  if (spec.type === 'header') return;
  typed.setRequired(!!spec.required);
  if (spec.choices) typed.setChoiceValues(spec.choices);
  if (spec.type === 'choice' || spec.type === 'checkbox') typed.showOtherOption(!!spec.other);
  if (spec.max) typed.setValidation(lengthCheck_(spec.max, spec.error));
  if (spec.exactly) {
    try {
      typed.setValidation(FormApp.createCheckboxValidation()
        .requireSelectExactly(spec.exactly)
        .setHelpText(spec.error)
        .build());
    } catch (e) {
      Logger.log('Could not set "select exactly ' + spec.exactly + '" on "' + spec.title + '" (' + e.message +
        '). Set it in the form editor: Response validation > Select exactly.');
    }
  }
}

// Moves the items into the order of FORM_ITEMS. An item that is not in FORM_ITEMS
// stays right after the listed item above it, or at the top if there is none.
// Returns the item titles in their new order.
function reorderItems_(form) {
  var items = form.getItems();
  var listed = {};
  FORM_ITEMS.forEach(function (spec) { listed[spec.title] = []; });
  var top = [];
  var after = {};
  var anchor = null;
  items.forEach(function (item) {
    var title = item.getTitle();
    if (listed.hasOwnProperty(title)) {
      listed[title].push(item);
      anchor = item;
    } else if (!anchor) {
      top.push(item);
    } else {
      if (!after.hasOwnProperty(anchor.getId())) after[anchor.getId()] = [];
      after[anchor.getId()].push(item);
    }
  });
  var order = top.slice();
  FORM_ITEMS.forEach(function (spec) {
    listed[spec.title].forEach(function (item) {
      order.push(item);
      order = order.concat(after[item.getId()] || []);
    });
  });
  // Each item in turn goes to its final position k. The items before it are
  // already in place, so it always moves up from a later position.
  order.forEach(function (item, k) {
    var from = item.getIndex();
    if (from !== k) form.moveItem(from, k);
  });
  return order.map(function (item) { return item.getTitle() || '(untitled ' + item.getType() + ')'; });
}

// Opens the form saved as FORM_ID in the Script properties.
function openLiveForm_(caller) {
  var formId = PropertiesService.getScriptProperties().getProperty('FORM_ID');
  if (!formId) {
    throw new Error(caller + ': no FORM_ID in the Script properties. Add it under Project Settings > ' +
      'Script properties (the id is the long part of the form edit URL, between /d/ and /edit).');
  }
  return FormApp.openById(formId);
}

// Returns a function that finds the first item of the form with a given title.
function finder_(form) {
  return function (title) {
    var items = form.getItems();
    for (var i = 0; i < items.length; i++) {
      if (items[i].getTitle() === title) return items[i];
    }
    return null;
  };
}

function lengthCheck_(max, error) {
  return FormApp.createParagraphTextValidation()
    .requireTextLengthLessThanOrEqualTo(max)
    .setHelpText(error)
    .build();
}

/**
 * Saves the structure of the live form (FORM_ID) to a JSON file in your Drive
 * and writes it to the Execution log: the title, description, confirmation
 * message, settings, and every item with its type, title, help text, required
 * flag and options. It does not read responses or change the form. Run it to copy
 * edits made in the form editor back into this file.
 */
function exportFormStructure() {
  return saveFormStructure_(openLiveForm_('exportFormStructure'), 'export');
}

// Writes the structure of the form to "Lab interest form structure (<label>,
// <time>).json" in My Drive and to the log. Returns the file URL.
function saveFormStructure_(form, label) {
  var json = JSON.stringify(formStructure_(form), null, 2);
  var name = 'Lab interest form structure (' + label + ', ' + formatTime_(new Date()).replace(/:/g, '-') + ').json';
  var file = DriveApp.createFile(name, json, 'application/json');
  Logger.log('Form structure (' + label + ') saved to My Drive as "' + name + '": ' + file.getUrl());
  Logger.log(json);
  return file.getUrl();
}

// The structure of the form as a plain object. Apps Script cannot read
// validation rules or the settings of file upload questions.
function formStructure_(form) {
  function read(getter) {
    try { return getter(); } catch (e) { return 'unavailable'; }
  }
  var typed = { TEXT: 'asTextItem', PARAGRAPH_TEXT: 'asParagraphTextItem', MULTIPLE_CHOICE: 'asMultipleChoiceItem',
    CHECKBOX: 'asCheckboxItem', LIST: 'asListItem', SCALE: 'asScaleItem', GRID: 'asGridItem',
    CHECKBOX_GRID: 'asCheckboxGridItem', DATE: 'asDateItem', TIME: 'asTimeItem', DATETIME: 'asDateTimeItem',
    DURATION: 'asDurationItem' };
  var items = form.getItems().map(function (item) {
    var type = String(item.getType());
    var entry = { index: item.getIndex(), type: type, title: item.getTitle(), help: item.getHelpText() };
    var q = typed[type] ? item[typed[type]]() : null;
    if (q && typeof q.isRequired === 'function') entry.required = q.isRequired();
    if (q && typeof q.getChoices === 'function') {
      entry.choices = q.getChoices().map(function (choice) { return choice.getValue(); });
    }
    if (q && typeof q.hasOtherOption === 'function') entry.otherOption = q.hasOtherOption();
    if (q && typeof q.getRows === 'function') { entry.rows = q.getRows(); entry.columns = q.getColumns(); }
    return entry;
  });
  return {
    exported: formatTime_(new Date()),
    formId: form.getId(),
    title: form.getTitle(),
    description: form.getDescription(),
    confirmationMessage: form.getConfirmationMessage(),
    settings: {
      collectsEmail: read(function () { return form.collectsEmail(); }),
      limitOneResponsePerUser: read(function () { return form.hasLimitOneResponsePerUser(); }),
      canEditResponse: read(function () { return form.canEditResponse(); }),
      respondAgainLink: read(function () { return form.hasRespondAgainLink(); }),
      publishingSummary: read(function () { return form.isPublishingSummary(); }),
      progressBar: read(function () { return form.hasProgressBar(); }),
      acceptingResponses: read(function () { return form.isAcceptingResponses(); })
    },
    notes: 'Apps Script cannot read validation rules (length limits, email checks, "tick both boxes"), ' +
      'the settings of file upload questions, or whether they are required. Check those in the form editor.',
    items: items
  };
}

/**
 * Replaces any earlier trigger for purgeExpiredSubmissions with 1 daily trigger.
 * createApplicationForm() calls this. Run it again only if the trigger was deleted.
 */
function installPurgeTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (trigger.getHandlerFunction() === PURGE_HANDLER) ScriptApp.deleteTrigger(trigger);
  });
  ScriptApp.newTrigger(PURGE_HANDLER).timeBased().everyDays(1).atHour(PURGE_HOUR).create();
}

/**
 * Replaces any earlier on-submit trigger for renameUploadedFiles with 1 trigger
 * on this form. createApplicationForm() calls it with the new form. Run it from
 * the editor (no argument) only if the trigger was deleted; it then uses FORM_ID
 * from the Script properties.
 */
function installRenameTrigger(form) {
  if (!form) {
    var formId = PropertiesService.getScriptProperties().getProperty('FORM_ID');
    if (!formId) throw new Error('installRenameTrigger: no FORM_ID in the Script properties. Run createApplicationForm() first.');
    form = FormApp.openById(formId);
  }
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (trigger.getHandlerFunction() === RENAME_HANDLER) ScriptApp.deleteTrigger(trigger);
  });
  ScriptApp.newTrigger(RENAME_HANDLER).forForm(form).onFormSubmit().create();
}

/**
 * Runs from the on-submit trigger after every submission and every edit of a
 * submission. Renames the files uploaded with that response:
 *   CV upload          -> <Full_name>_cv_1.pdf
 *   Transcripts upload -> <Full_name>_transcript_1.pdf, <Full_name>_transcript_2.png, ...
 * The name comes from the "Full name" answer (spaces become underscores), and
 * each file keeps its own extension.
 */
function renameUploadedFiles(e) {
  if (!e || !e.response) {
    throw new Error('renameUploadedFiles runs from the form submit trigger. ' +
      'To rename the files of earlier responses, run renameAllUploadedFiles.');
  }
  var count = renameFilesOfResponse_(e.response);
  Logger.log('renameUploadedFiles: files renamed: ' + count + '.');
  return count;
}

/** Renames the uploaded files of every response already in the form. */
function renameAllUploadedFiles() {
  var formId = PropertiesService.getScriptProperties().getProperty('FORM_ID');
  if (!formId) throw new Error('renameAllUploadedFiles: no FORM_ID in the Script properties. Run createApplicationForm() first.');
  var count = 0;
  FormApp.openById(formId).getResponses().forEach(function (response) {
    count += renameFilesOfResponse_(response);
  });
  Logger.log('renameAllUploadedFiles: files renamed: ' + count + '.');
  return count;
}

// Renames the uploaded files of 1 response. Returns the number of files renamed.
// A file that cannot be renamed is logged and skipped, so the others still get renamed.
function renameFilesOfResponse_(response) {
  var itemResponses = response.getItemResponses();
  var fullName = '';
  itemResponses.forEach(function (itemResponse) {
    if (itemResponse.getItem().getTitle() === 'Full name') fullName = String(itemResponse.getResponse() || '');
  });
  var base = fileSafeName_(fullName) ||
    fileSafeName_(String(response.getRespondentEmail() || '').split('@')[0]) || 'applicant';
  var count = 0;
  itemResponses.forEach(function (itemResponse) {
    var item = itemResponse.getItem();
    if (item.getType() !== FormApp.ItemType.FILE_UPLOAD) return;
    var kind = uploadKind_(item.getTitle());
    var answer = itemResponse.getResponse();
    var ids = (Array.isArray(answer) ? answer : [answer]).filter(function (id) { return !!id; });
    ids.forEach(function (id, k) {
      try {
        var file = DriveApp.getFileById(id);
        var target = base + '_' + kind + '_' + (k + 1) + fileExtension_(file);
        if (file.getName() !== target) {
          file.setName(target);
          count++;
        }
      } catch (err) {
        Logger.log('Could not rename file ' + id + ': ' + err.message);
      }
    });
  });
  return count;
}

// "cv" for the CV upload, "transcript" for the transcripts upload, else the title.
function uploadKind_(title) {
  var t = String(title || '').toLowerCase();
  if (t.indexOf('transcript') >= 0) return 'transcript';
  if (t.indexOf('curriculum') >= 0 || /\bcv\b/.test(t)) return 'cv';
  return fileSafeName_(t) || 'file';
}

// Keeps letters (any script), digits, dots and hyphens; spaces become underscores.
function fileSafeName_(text) {
  return String(text || '')
    .replace(/[\\/:*?"<>|\u0000-\u001f]/g, ' ')
    .trim()
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^[_.]+|[_.]+$/g, '')
    .slice(0, 60);
}

// The extension of the uploaded file, e.g. ".pdf"; from the MIME type if the name has none.
function fileExtension_(file) {
  var match = /\.([A-Za-z0-9]{1,5})$/.exec(file.getName());
  if (match) return '.' + match[1].toLowerCase();
  var byType = { 'application/pdf': '.pdf', 'image/jpeg': '.jpg', 'image/png': '.png',
    'image/heic': '.heic', 'image/heif': '.heif', 'image/gif': '.gif', 'image/webp': '.webp', 'image/tiff': '.tif' };
  return byType[file.getMimeType()] || '';
}

/**
 * Deletes every submission made more than RETENTION_MONTHS calendar months ago:
 * its uploaded files, its form response, and its rows in the response sheet.
 * The daily trigger runs this. You can also run it from the editor.
 */
function purgeExpiredSubmissions() {
  var cutoff = monthsBefore_(new Date(), RETENTION_MONTHS);
  var limit = cutoff.getTime();
  return deleteSubmissions_('purgeExpiredSubmissions (cutoff ' + formatTime_(cutoff) + ')',
    function (response) {
      return response.getTimestamp().getTime() < limit;
    },
    function (row, header) {
      var col = header.indexOf('timestamp');
      var value = row[col < 0 ? 0 : col];
      return isDate_(value) && value.getTime() < limit;
    });
}

/**
 * Deletes all submissions from one applicant, for a deletion request. It matches
 * the Google account email that the form collects (and an "Email" question
 * answer, if one exists), ignoring case and spaces. The Run button cannot pass an argument, so
 * call it from a small wrapper function (see README.md).
 */
function deleteSubmissionByEmail(email) {
  if (typeof email !== 'string' || !email.trim()) {
    throw new Error('Usage: deleteSubmissionByEmail(\'name@example.com\'). See README.md.');
  }
  var target = email.trim().toLowerCase();
  function same(value) {
    return String(value || '').trim().toLowerCase() === target;
  }
  return deleteSubmissions_('deleteSubmissionByEmail',
    function (response) {
      if (same(response.getRespondentEmail())) return true;
      return response.getItemResponses().some(function (itemResponse) {
        return itemResponse.getItem().getTitle() === 'Email' && same(itemResponse.getResponse());
      });
    },
    function (row, header) {
      return header.some(function (name, col) {
        return (name === 'email address' || name === 'email') && same(row[col]);
      });
    });
}

/**
 * Lists the rows of the response sheet that no longer match a form response
 * (for example after you deleted responses in the form's Responses tab, which
 * Google Forms does not remove from the sheet). Deletes nothing. Run this first.
 */
function previewOrphanRows() {
  return orphanRows_(false);
}

/**
 * Deletes the rows of the response sheet that no longer match a form response.
 * Rows are matched by Timestamp (to the second, 1 second either way) and by the
 * "Email Address" column. Only the tab linked to the form is changed; other tabs
 * are left as they are.
 */
function removeOrphanRows() {
  return orphanRows_(true);
}

function orphanRows_(apply) {
  var label = apply ? 'removeOrphanRows' : 'previewOrphanRows';
  var props = PropertiesService.getScriptProperties();
  var formId = props.getProperty('FORM_ID');
  if (!formId) throw new Error(label + ': no FORM_ID in the Script properties.');
  var form = FormApp.openById(formId);
  var sheetId = props.getProperty('SHEET_ID');
  if (!sheetId) sheetId = form.getDestinationId();

  // Keys of the responses that still exist: second of the timestamp + email.
  var keys = {};
  form.getResponses().forEach(function (response) {
    keys[responseKey_(Math.floor(response.getTimestamp().getTime() / 1000), response.getRespondentEmail())] = true;
  });

  var total = 0;
  var report = [];
  SpreadsheetApp.openById(sheetId).getSheets().forEach(function (sheet) {
    if (!sheet.getFormUrl()) return; // only the tab that the form writes to
    var values = sheet.getDataRange().getValues();
    if (values.length < 2) return;
    var header = values[0].map(function (name) { return String(name).trim().toLowerCase(); });
    var timeCol = header.indexOf('timestamp');
    var emailCol = header.indexOf('email address');
    if (timeCol < 0) return;
    var orphans = [];
    for (var r = values.length - 1; r >= 1; r--) {
      var stamp = values[r][timeCol];
      if (!isDate_(stamp)) continue; // empty row
      var second = Math.floor(stamp.getTime() / 1000);
      var email = emailCol < 0 ? '' : values[r][emailCol];
      var found = [second - 1, second, second + 1].some(function (s) {
        return keys[responseKey_(s, email)] || (emailCol < 0 && keys[responseKey_(s, '')]);
      });
      if (!found) orphans.push(r + 1);
    }
    var shown = orphans.slice().reverse();
    report.push('"' + sheet.getName() + '": ' + orphans.length + ' row(s)' + (orphans.length ? ' (row ' + shown.join(', ') + ')' : ''));
    if (apply && orphans.length) {
      // Sheets cannot delete all unfrozen rows, so add 1 empty row first if needed.
      if (sheet.getMaxRows() - orphans.length <= sheet.getFrozenRows()) {
        sheet.insertRowsAfter(sheet.getMaxRows(), 1);
      }
      orphans.forEach(function (row) { sheet.deleteRow(row); }); // bottom-up, so row numbers above stay valid
    }
    total += orphans.length;
  });

  Logger.log(label + ': ' + (apply ? 'deleted ' : 'would delete ') + total + ' row(s) that no longer match a form response. ' +
    (report.length ? report.join('; ') + '.' : 'No tab linked to the form was found.'));
  return total;
}

function responseKey_(second, email) {
  return second + '|' + String(email || '').trim().toLowerCase();
}

// Shared by both deletion functions. matchResponse(response) picks form responses.
// matchRow(row, header) picks sheet rows; header is the list of lower-case column names.
// File or row errors do not stop the run. They are listed in 1 error at the end,
// so a trigger run with errors shows as Failed under Executions.
function deleteSubmissions_(label, matchResponse, matchRow) {
  var props = PropertiesService.getScriptProperties();
  var formId = props.getProperty('FORM_ID');
  if (!formId) {
    throw new Error(label + ': no FORM_ID in the Script properties. Run createApplicationForm(), ' +
      'or add FORM_ID and SHEET_ID under Project Settings > Script properties.');
  }
  var form = FormApp.openById(formId);
  var sheetId = props.getProperty('SHEET_ID');
  if (!sheetId) {
    try {
      sheetId = form.getDestinationId();
    } catch (e) {
      sheetId = null;
    }
  }
  // The Drive API advanced service deletes files at once. DriveApp can only trash them.
  var permanent = typeof Drive !== 'undefined' && !!Drive.Files && typeof Drive.Files.remove === 'function';
  var count = { responses: 0, files: 0, rows: 0 };
  var errors = [];

  form.getResponses().forEach(function (response) {
    if (!matchResponse(response)) return;
    uploadedFileIds_(response).forEach(function (id) {
      try {
        if (permanent) {
          Drive.Files.remove(id);
        } else {
          DriveApp.getFileById(id).setTrashed(true);
        }
        count.files++;
      } catch (e) {
        errors.push('file ' + id + ': ' + e.message);
      }
    });
    try {
      form.deleteResponse(response.getId());
      count.responses++;
    } catch (e) {
      errors.push('response ' + response.getId() + ': ' + e.message);
    }
  });

  if (!sheetId) {
    errors.push('no response sheet id. Add SHEET_ID under Project Settings > Script properties.');
  } else {
    try {
      SpreadsheetApp.openById(sheetId).getSheets().forEach(function (sheet) {
        count.rows += deleteRows_(sheet, matchRow);
      });
    } catch (e) {
      errors.push('sheet ' + sheetId + ': ' + e.message);
    }
  }

  Logger.log(label + ': responses deleted: ' + count.responses + ', uploaded files ' +
    (permanent ? 'deleted permanently' : 'moved to the Drive trash') + ': ' + count.files +
    ', sheet rows deleted: ' + count.rows + ', errors: ' + errors.length + '.');
  if (!permanent && count.files) {
    Logger.log('Drive deletes files in the trash after 30 days. To delete them at once, add the Drive API service (see README.md).');
  }
  if (errors.length) {
    throw new Error(label + ': errors: ' + errors.length + '. ' + errors.join(' | '));
  }
  return count;
}

// Drive file ids of all file upload answers in a response.
function uploadedFileIds_(response) {
  var ids = [];
  response.getItemResponses().forEach(function (itemResponse) {
    if (itemResponse.getItem().getType() !== FormApp.ItemType.FILE_UPLOAD) return;
    var answer = itemResponse.getResponse();
    ids = ids.concat(Array.isArray(answer) ? answer : [answer]);
  });
  return ids.filter(function (id) { return !!id; });
}

// Deletes the matching rows of 1 response sheet, from the bottom up so that the
// row numbers above stay valid. Tabs that are not linked to the form and have no
// Timestamp column are skipped. Returns the number of rows deleted.
function deleteRows_(sheet, matchRow) {
  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return 0;
  var header = values[0].map(function (name) { return String(name).trim().toLowerCase(); });
  if (!sheet.getFormUrl() && header.indexOf('timestamp') < 0) return 0;
  var rows = [];
  for (var r = values.length - 1; r >= 1; r--) {
    if (matchRow(values[r], header)) rows.push(r + 1);
  }
  if (!rows.length) return 0;
  // Sheets cannot delete all unfrozen rows, so add 1 empty row first if needed.
  if (sheet.getMaxRows() - rows.length <= sheet.getFrozenRows()) {
    sheet.insertRowsAfter(sheet.getMaxRows(), 1);
  }
  rows.forEach(function (row) { sheet.deleteRow(row); });
  return rows.length;
}

// The same clock time a number of calendar months earlier. A day that the target
// month does not have becomes its last day (29 Feb 2028 gives 28 Feb 2027).
function monthsBefore_(date, months) {
  var d = new Date(date.getTime());
  var day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() - months);
  var lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, lastDay));
  return d;
}

function isDate_(value) {
  return !!value && typeof value.getTime === 'function' && !isNaN(value.getTime());
}

function formatTime_(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm');
}
