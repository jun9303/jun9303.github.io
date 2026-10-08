# Lab interest form (Google Forms)

`create_form.gs` is a Google Apps Script. It creates the lab interest form for prospective PhD students (any intake), current NTU MSc students looking for a dissertation project, and current NTU undergraduates (URECA or Final Year Project), as a single page, plus a response spreadsheet linked to it. It adds every question except the 2 file uploads (CV and transcripts), because Apps Script cannot create file upload questions. You add those by hand in step 2. It also starts a daily job that deletes each submission 12 months after it was submitted (step 5).

The form is optional and is not a formal application. Applicants apply formally through the NTU MAE PhD programme on the official NTU admission website.

**Check with NTU first.** Before you share the form, ask NTU's Data Protection Officer (dpo@ntu.edu.sg) to confirm that Google Forms may be used for CVs and grades, that the 12-month period fits NTU policy, and which Google account (personal or NTU) should own the form. If NTU sets a different period, change `RETENTION_MONTHS` in the script, the "12 months" text in the "Privacy and data retention" item of `FORM_ITEMS`, and the Contact Us page.

## 1. Run the script

1. Sign in to the Google account that should own the form and receive the CVs.
2. Open <https://script.google.com> and click **New project**.
3. Delete the sample code in `Code.gs`. Paste the full contents of `create_form.gs` and save.
4. In the function menu at the top, select `createApplicationForm`. Click **Run**.
5. Authorize the script when prompted. It asks for access to your forms, your spreadsheets, and your Google Drive files (to delete uploaded CVs), and for permission to run when you are not using it (for the daily deletion trigger). If you see "Google hasn't verified this app", click **Advanced**, then the "Go to ... (unsafe)" link to continue with your own project.
6. Open the **Execution log**. It lists the edit URL, the published URL, a short URL, the responses spreadsheet, and the time of the daily deletion trigger. Open the edit URL.

The form and the spreadsheet are saved in My Drive. Keep the form there: forms in a shared drive cannot have file upload questions. Each run makes a new form and a new spreadsheet, so delete any extra copies. Each run also moves the deletion trigger to its new form, so the trigger covers the newest form only.

## 2. Add the CV and transcript upload questions

1. Scroll to the "CV, transcripts, and referees" part. Click the header **ADD FILE UPLOADS HERE: CV and transcripts**, then click **Add question** (the plus icon) in the side toolbar.
2. Set the question type to **File upload**. Google shows a notice about sign-in and Drive storage. Click **Continue**.
3. First question: title `CV (PDF)`. Turn on **Allow only specific file types** and tick **PDF**. Set **Maximum number of files** to 1 and **Maximum file size** to 10 MB. Turn on **Required**.
4. Second question: title `Transcripts (PDF/image)`. Allow only **PDF** and **Image**. Set **Maximum number of files** to 5 and **Maximum file size** to 10 MB. Turn on **Required**.
5. Drag both questions so they sit right under the "CV, transcripts, and referees" header, above "Referee(s)". Then delete the marker header.

Notes on file upload questions:

- All respondents must sign in to a Google account. Applicants without one need to create one.
- Uploaded files go to a folder in the form owner's Google Drive and use the owner's storage.
- The form must not live in a shared drive.

## 3. Check the settings

Open the **Settings** tab and check:

- **Collect email addresses** is on (not "Do not collect").
- **Limit to 1 response** is on.
- **Allow response editing** is on.
- **Show progress bar** is off (the form is 1 page), and the confirmation message matches the script.

If the editor shows a **Publish** button, click it once the upload question is in place. An unpublished form does not accept responses.

Submit 1 test response. Check the spreadsheet columns, the uploaded CV in Drive, and the confirmation message. Then delete the test response with `deleteSubmissionByEmail` and your own email address (step 6). It deletes the response, its row in the spreadsheet, and the test CV. (Deleting a response in the **Responses** tab does not delete its row in the spreadsheet.)

Because of **Limit to 1 response**, your test uses your account's 1 response. To test again, use a second Google account. If you created the form with a Google Workspace account (for example a university account), check that responses are not restricted to users in that organization, and test once with a Google account from outside it.

## 4. Put the link on the website

1. In the editor, click **Send**, open the link tab, tick **Shorten URL**, and copy the link (`https://forms.gle/...`). The short URL in the execution log points to the same form.
2. In `_config.yml`, set `application_form_url` to that link. It is currently set to `"https://forms.gle/Eqsk2sHk4GurckxP8"`. If you make a new form, replace it.
3. Rebuild the site: push to `master` (GitHub Actions builds and deploys it), or run `bundle exec jekyll build` locally. All links to the form on the site use this value, including the "Lab interest form (optional)" button in the Available positions section of the Contact Us page (`/contact_us/#join-us`).

## 5. Automatic deletion after 12 months

The form and the website tell applicants that each submission is deleted 12 months after it is submitted. `createApplicationForm` sets this up in 2 ways:

- It saves the form id and the spreadsheet id as `FORM_ID` and `SHEET_ID` under **Project Settings** (gear icon) > **Script properties**.
- It installs 1 time-driven trigger that runs `purgeExpiredSubmissions` every day at about 3:00 in the project's time zone (**Project Settings** > **Time zone**). It removes any older trigger for that function first. The trigger is listed on the **Triggers** page (clock icon).

Each run of `purgeExpiredSubmissions` sets a cutoff 12 calendar months before the run time. For each response submitted before the cutoff, it deletes the uploaded files, then the response. It then deletes the rows in the response spreadsheet with a Timestamp before the cutoff. It logs the counts. To see them, open **Executions** and click a run. You can also run the function from the editor at any time.

If a file, response, or row cannot be deleted, the run still finishes the other deletions. It then ends with an error that lists what failed, so the run shows as **Failed** under **Executions**.

If the trigger is missing from the **Triggers** page, select `installPurgeTrigger` and click **Run**. Do not run `createApplicationForm` again for this, because it makes a new form.

### Delete CVs permanently (recommended)

Without this setting, the script moves uploaded CVs to the Drive trash, and Drive deletes them forever after 30 days. To delete them at once, add the advanced Drive service:

1. In the script editor, click **+** next to **Services**.
2. Choose **Drive API** and click **Add**.

The script finds the service on its next run and then deletes files permanently. Add it before the form goes live, so that no CV stays in the trash after the 12 months.

### Monthly check

The trigger does the deleting. Once a month, also check by hand:

- The response spreadsheet has no Timestamp older than 12 months.
- The Drive folder with the uploaded CVs has no file older than 12 months. Without the Drive API service, check the Drive trash too.
- **Executions** shows no failed runs of `purgeExpiredSubmissions`.

After you delete data, Google takes about 2 months to remove it from its servers, and encrypted backups can keep it for up to 6 months (Google, "How Google retains data": <https://policies.google.com/technologies/retention>).

## 6. Delete a submission on request

The form tells applicants that the lab deletes a submission within 14 days of an email request to the lab (contact@pfaero.science). The PDPA does not require deletion on request. This is the lab's own commitment, so finish each request within 14 days.

1. Open the script project. At the end of `Code.gs`, add this function with the applicant's email address:

   ```js
   function deleteRequest() {
     deleteSubmissionByEmail('applicant@example.com');
   }
   ```

   The **Run** button cannot pass an argument, so the address goes in this small wrapper.
2. Save. Select `deleteRequest` in the function menu and click **Run**.
3. Read the **Execution log**. It gives the number of responses, files, and rows deleted. The function matches the Google account email that the form collected, ignoring case. If it deleted 0 responses, find the applicant in the spreadsheet by name. Then delete the response (**Responses** tab), the row, and the CV by hand.
4. Without the Drive API service, the CV is now in the Drive trash. Open the trash, select the file, and click **Delete forever**, so that the deletion is complete within 14 days.
5. Delete the `deleteRequest` function and save, so that the address does not stay in the code.
6. Reply to the applicant to confirm the deletion.

## 7. File names of uploaded CVs and transcripts

`createApplicationForm` also installs an on-submit trigger for `renameUploadedFiles`. Right after each submission, and again after each edit of a submission, it renames that applicant's uploaded files in Drive:

- Curriculum Vitae upload: `Sangjoon_Lee_cv_1.pdf`
- Transcripts upload: `Sangjoon_Lee_transcript_1.pdf`, `Sangjoon_Lee_transcript_2.png`, and so on

The name comes from the "Full name" answer, with spaces turned into underscores and characters that are not allowed in file names removed. Each file keeps its own extension. Google Forms still stores the files in its own upload folders (one folder per upload question).

- To rename the files of responses that came in before the trigger existed, select `renameAllUploadedFiles` and click **Run**.
- If the trigger is missing from the **Triggers** page (clock icon), select `installRenameTrigger` and click **Run**.
- If an applicant replaces a file when editing, the new file gets the name; the replaced file keeps its old name and is not linked to the response any more. The monthly check (step 5) covers such files.

## 8. Update the live form instead of making a new one

`FORM_ITEMS` at the top of `create_form.gs` lists every item of the form, top to bottom, with its type, title, help text, required flag, options, and limits. `createApplicationForm` builds a new form from it. `updateLiveForm` applies it to the form saved as `FORM_ID` in place, so the link, the responses, and the hand-added upload questions stay. It:

- sets the form title, the description, and the confirmation message
- finds each item of `FORM_ITEMS` by its exact title and sets its help text, required flag, options, and length or box limit
- adds the items of `FORM_ITEMS` that the form lacks, except the upload questions (add those by hand, step 2)
- puts the items in the order of `FORM_ITEMS`

It does not delete items. An item that is not in `FORM_ITEMS` is left as it is and stays right after the item above it. Before it changes anything, it saves the form as it was to a JSON file in My Drive.

It stops with an error, before making any change, in 2 cases:

- an item has a different type in the form than in `FORM_ITEMS`
- the form has items that are not in `FORM_ITEMS` and also lacks items of `FORM_ITEMS`. This usually means a question was renamed in the editor; without the stop it would be added a second time. Use the same title in `FORM_ITEMS` and run it again.

Steps:

1. Check that **Project Settings** > **Script properties** > `FORM_ID` is the id of the live form (the long part of its edit URL, between `/d/` and `/edit`). If you made more than 1 form, set it to the live one.
2. If you edited the form in the editor since the last sync, run `exportFormStructure` (step 10) and copy your edits into `FORM_ITEMS` first. Otherwise `updateLiveForm` replaces them with the texts in the file.
3. Paste the new `create_form.gs` into the same project and save.
4. Select `updateLiveForm` and click **Run**. The Execution log lists what it added, the items it left as they are, and the new order.

Apps Script cannot read validation rules, so the limits in `FORM_ITEMS` (`max`, `exactly`) are not checked against the live form. If you change a limit in the editor, change it in `FORM_ITEMS` too.

## 9. Remove sheet rows of deleted responses

Deleting a response in the form's **Responses** tab does not remove its row from the response spreadsheet. To clean up:

1. Paste the latest `create_form.gs` into the project and save (the functions below are in it).
2. Select `previewOrphanRows` and click **Run**. The Execution log lists the rows that no longer match any form response, for example `"Form Responses 1": 2 row(s) (row 3, 5)`. It deletes nothing.
3. Check those rows in the sheet. If they are right, select `removeOrphanRows` and click **Run**.

Rows are matched to responses by Timestamp (to the second) and the Email Address column. Only the tab linked to the form ("Form Responses 1") is changed; other tabs are left alone. For a single row you can also right-click its row number in the sheet and choose **Delete row**. Do not delete the header row or add columns to the linked tab.

To delete one applicant completely (response, sheet row, and uploaded files), use `deleteSubmissionByEmail` (step 6) instead.

## 10. Export the live form

`exportFormStructure` saves the structure of the live form (`FORM_ID`) to My Drive as `Lab interest form structure (export, <date> <time>).json` and also writes it to the Execution log. It lists the title, the description, the confirmation message, the settings, and each question with its type, title, help text, required flag and options. It does not read responses or change the form.

1. Paste the latest `create_form.gs` into the project and save.
2. Select `exportFormStructure` and click **Run**.
3. Open the file from the link in the Execution log, or find it in My Drive, and download it.

Use it to copy edits made in the form editor back into `FORM_ITEMS` in `create_form.gs`. Apps Script cannot read validation rules (length limits, email checks, the "tick both boxes" rule) or the settings of the file upload questions, so check those in the editor.

## Questions in the form

Required questions are marked (R). The form is 1 page with 6 parts, each starting with a section header. The form also collects the Google account email of each respondent.

1. **About you**: What are you interested in? (R; PhD position, MSc dissertation project, URECA project, or Final Year Project), Full name (R), Current institution and programme (R), Singapore citizen or PR (optional; Yes, No, or Other).
2. **Start date and application status**: Earliest start (R, month and year), NTU MAE PhD application status (R; includes "Not applicable (MSc or undergraduate research)").
3. **Academic record**: Bachelor's degree (completed or in progress) (R), Bachelor's GPA (current GPA if in progress) (R), Master's degree (completed or in progress), Master's GPA (current GPA if in progress), Key courses and grades (R, up to 10 courses, max 1500 characters), English test scores.
4. **Fit with the lab**: Research areas of interest (R, checkboxes for the 5 areas on the Research page); Past: Research experience (R, max 2000 characters, 1 numbered item per project); Present: Research strengths (R, max 1000 characters); Future: Brief proposal 1, building on the lab's work (R, max 1000 characters, all applicants); Future: Brief proposal 2, own research agenda (PhD applicants) (max 1000 characters). Proposal 2 is optional in the form because a single-page form cannot require it for PhD applicants only; its help text tells PhD applicants to answer it.
5. **CV, transcripts, and referees**: CV (PDF) upload (R) and Transcripts (PDF/image) upload (R), both added by hand in step 2; Referee(s) (optional, 1 paragraph, one referee per line in the format given in the help text).
6. **Privacy and data retention**: the privacy text, then Declaration (R, both boxes must be ticked).

The 5 research areas are: Predictive Aerophysics with Machine Intelligence; Data-Driven Aerospace Design and Flow Control; Vortex Dynamics and Flow Instability; High-Fidelity CFD and Scalable Computing; Thermal-Fluid Systems Across Scales. If you rename an area on the website, change it in the form too.
