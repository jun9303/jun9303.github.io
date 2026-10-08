---
layout: splash
permalink: "/contact_us/"
title: "Contact Us"
header:
  overlay_image: /assets/images/header_contact.jpg
  overlay_filter: 0.45
  caption: "*NTU School of MAE, Singapore, 2026*"
---

<link rel="stylesheet" href="{{ '/assets/css/contact.css' | relative_url }}">

{% comment %}
  NTU Maps (MazeMap, NTU config "ntu-sg", main campus 2123). The pin is
  MazeMap POI 1003278488, a point on level 1 of Block N3.2, from Dr. Lee's
  NTU Maps share link for #01-15, Block N3.2. map_link_url is that link,
  copied as given.
  map_embed_url uses the same POI and zoom, without the share link's
  "center": MazeMap then centers the frame on the pin. With that center, the
  pin falls outside the frame at phone widths.
  MazeMap's older URL docs note that POI ids may change. If NTU Maps adds the room
  identifier, use sharepoitype=identifier&sharepoi=N3.2-01-15 in both links.
{% endcomment %}
{% capture map_embed_url %}https://use.mazemap.com/?v=1&config=ntu-sg&campusid=2123&zlevel=1&zoom=18.3&sharepoitype=poi&sharepoi=1003278488&sharemode=false&wheelzoom=false{% endcapture %}
{% capture map_link_url %}https://maps.ntu.edu.sg/?mazemap_share_url=https%3A%2F%2Fuse.mazemap.com%2F%3Futm_medium%3Dlongurl%23v%3D1%26config%3Dntu-sg%26campusid%3D2123%26zlevel%3D1%26center%3D103.682818%2C1.347648%26zoom%3D18.3%26sharepoitype%3Dpoi%26sharepoi%3D1003278488{% endcapture %}

<div class="contact">

<div class="contact-grid">

<div class="contact-col contact-col--who">

<div class="contact-block contact-pi">
  <h2 id="principal-investigator">Principal Investigator</h2>
  <img class="contact-pi__photo" src="{{ '/assets/images/bio-photo-slee-200x200.png' | relative_url }}" alt="Photo of Sangjoon Lee" width="150" height="150">
  <p class="contact-pi__name">Sangjoon "Joon" Lee, Ph.D.</p>
  <p class="contact-pi__role">Assistant Professor of Mechanical and Aerospace Engineering<br>Nanyang Technological University</p>
</div>

{% comment %}
  Phone section, hidden until the office number is known.
  To show it, put the number in place of the placeholder and delete the
  comment and endcomment tags around this block.

<div class="contact-block contact-phone">
  <h2 id="phone">Phone</h2>
  <p class="contact-line">+65 0000 0000</p>
</div>
{% endcomment %}

<div class="contact-block contact-email">
  <h2 id="email">Lab Email</h2>
  <p class="contact-line">contact at pfaero dot science</p>
  <p class="contact-note">This address receives mail only. For questions about lab positions, see <a href="#join-us">Available Positions</a>. PhD applicants apply formally through the <a href="https://www.ntu.edu.sg/education/graduate-programme/mae-phd">NTU MAE PhD programme</a>.</p>
</div>

</div>

<div class="contact-col contact-col--where">

<div class="contact-block contact-location">
  <h2 id="location">Lab Location</h2>
  <p class="contact-address">School of Mechanical and Aerospace Engineering<br>Nanyang Technological University<br>65 Nanyang Drive, Block N3.2, #01-15<br>Singapore 637460</p>
  <p class="contact-note">The pin marks the lab on level 1 of Block N3.2.</p>
</div>

<div class="contact-map">
  <iframe title="Lab location in Block N3.2 on NTU Maps" src="{{ map_embed_url | escape }}" width="100%" height="480" loading="lazy" allow="geolocation; fullscreen"></iframe>
  <p class="contact-maplink"><a href="{{ map_link_url }}">Open in NTU Maps</a></p>
</div>

</div>

</div>

<div id="available-positions"></div>

<div class="contact-positions" markdown="1">

## Available Positions
{: #join-us}

We are recruiting our first members. Before you write to us, please read our [Research](/research/) and [Publications](/publications/) pages.

### PhD Positions (August 2027 Intake)

We have a couple of PhD position openings. The students who fill them will form the lab's founding group and work with Dr. Lee: set up our codes and computing workflows, and start the first projects. The positions suit people who want research experience from the ground up.

#### What You Gain

- Help develop the lab's first research topics and build its first codes.
- Train across computational aerodynamics, high-performance computing, and machine learning.
- Work closely with Dr. Lee in a founding group.

#### Who We Are Looking For

We welcome students with a specialty or passion in any of these areas:

- Computational aerodynamics and turbulence
- High-performance computing and GPU programming
- Machine learning and agentic AI for scientific predictions
- Aerospace design optimization (airfoil, H<sub>2</sub> aviation, eVTOL)
- Thermal-fluid systems (thermal management, HVAC, propulsion)

Strong mathematics, programming (Python, C++ or Fortran, CUDA), agentic AI experience in aeroscience, and curiosity about fluid physics will help, but you do not need all of them.

### How to Apply
{: #how-to-apply}

**Formal application.** Apply to the [NTU MAE PhD programme](https://www.ntu.edu.sg/education/graduate-programme/mae-phd) through the official NTU admission website. Only applicants who submit a formal application there are considered in the School's admission process. Full-time NTU PhD admissions typically include the [NTU Research Scholarship](https://www.ntu.edu.sg/admissions/graduate/financialmatters/scholarships/rss).

**Lab interest form.** It is encouraged to send this form if you want to show specific interest in joining this lab. Include your CV, academic record (GPA and key courses), research experience, the research strengths that match our areas, and brief research proposals (1 for MSc and undergraduate applicants, 2 for PhD applicants). Every submission is reviewed and further contacts might take place if we want to know something more on you. The information is kept secure and will be deleted 12 months after you submit it, or sooner if you ask us to. Sending the form neither guarantees admission nor replaces the formal admission process.

<p class="contact-form-link"><a class="btn btn--primary" href="{{ site.application_form_url | escape }}">Lab interest form</a></p>

**Please note.** Because of the number of messages, Dr. Lee may not be able to reply to emails or LinkedIn messages from prospective students who have not yet applied to the PhD programme. If you have applied, or have sent the lab interest form ahead of your formal application, Dr. Lee will review your materials carefully and get in touch if there seems to be a good fit.
{: .contact-disclaimer}

### Postdoctoral Researchers

We have no lab-funded postdoc positions now. We are glad to support strong candidates applying for fellowships such as [LKYPDF](https://www.ntu.edu.sg/research/research-careers/lee-kuan-yew-postdoctoral-fellowship-(lkypdf)), [PPF](https://www.ntu.edu.sg/research/research-careers/presidential-postdoctoral-fellowship-(ppf)), and the [NTU AI-for-X Postdoctoral Fellowship](https://www.ntu.edu.sg/research/research-careers/ntu-ai-for-x-postdoctoral-fellowship).

### NTU MSc Students

If you are a current NTU MSc student and your programme includes a dissertation, you can do your dissertation research with the lab, in CFD, high-performance computing, machine learning for fluids, or aerospace design optimization. A dissertation project can also be a first step toward a PhD in the lab. To ask about a project, send the [lab interest form]({{ site.application_form_url }}).

### NTU Undergraduates

Two NTU channels lead into the lab:

- [URECA](https://www.ntu.edu.sg/education/undergraduate-research-experience-on-campus-(ureca)/prospective-students), for full-time students in Year 2 or 3 of a four-year degree. NTU invites students at the end of July based on GPA, and projects run from August to June.
- [MAE Final Year Project](https://www.ntu.edu.sg/mae/admissions/current-students/undergraduate/final-year-project) (MA4079), for Year 4 students. Projects are agreed with the supervisor from April to August for an August start, or November to January for a January start.

Our projects can grow over several semesters: URECA, then the FYP, then graduate study in the lab. To ask about a project, send the [lab interest form]({{ site.application_form_url }}).

</div>

</div>
