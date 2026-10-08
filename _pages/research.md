---
layout: splash
permalink: "/research/"
title: "Research"
header:
  overlay_image: /assets/images/header_research.jpg
  overlay_filter: 0.2
  caption: "*Hangang, Seoul, South Korea, 2012*"
---

<link rel="stylesheet" href="{{ '/assets/css/research.css' | relative_url }}">

<div class="research">
  <p class="research-intro">Our research combines high-performance computing (HPC), computational fluid dynamics (CFD), and machine intelligence. Agentic, data-driven predictive aerophysics modeling leads our work, and we pair it with discoveries in fluid physics and theory. We aim to build lean, fast predictive models that shorten lead time in aerospace design, from heat exchangers and HVAC to engines, propulsion systems, and next-generation aircraft such as eVTOL.</p>
  <nav class="research-index" aria-label="Research areas">
    <ul class="research-index__list">
      <li><a href="#predictive-aerophysics">Predictive Aerophysics with Machine Intelligence</a></li>
      <li><a href="#design-flow-control">Data-Driven Aerospace Design and Flow Control</a></li>
      <li><a href="#vortex-instability">Vortex Dynamics and Flow Instability</a></li>
      <li><a href="#cfd-computing">High-Fidelity CFD and Scalable Computing</a></li>
      <li><a href="#thermal-fluids">Thermal-Fluid Systems Across Scales</a></li>
    </ul>
  </nav>
  <section class="research-area" id="predictive-aerophysics">
    <header class="research-area__head">
      <h2 class="research-area__title">Predictive Aerophysics with Machine Intelligence</h2>
      <ul class="research-keywords" aria-label="Keywords">
        <li>agentic CFD</li>
        <li>human-on-the-loop</li>
        <li>aerophysics datasets</li>
        <li>fast predictive models</li>
        <li>reinforcement learning</li>
      </ul>
    </header>
    <div class="research-area__body">
      <figure class="research-figure">
        <a class="image-popup" href="{{ '/assets/images/research/predictive-aerophysics.jpg' | relative_url }}" title="Design loop: morphed lattices are evaluated with CFD, and Bayesian optimization picks the next design to simulate."><img src="{{ '/assets/images/research/predictive-aerophysics.jpg' | relative_url }}" alt="Flowchart of lattice design by morphing, CFD evaluation, and surrogate model inference." width="1600" height="800" loading="lazy" decoding="async"></a>
        <figcaption>
          <span class="research-figure__caption">Design loop: morphed lattices are evaluated with CFD, and Bayesian optimization picks the next design to simulate.</span>
          <span class="research-figure__cite">Adapted from Lee &amp; Vijay, CTR Annual Research Briefs, 351-361 (2025).</span>
        </figcaption>
      </figure>
      <div class="research-area__text">
        <p>Our goal is aerophysics prediction fast enough to steer aerospace design. One high-fidelity CFD run can take days, so a design study can test only a limited number of candidates. How can intelligent agents and learned models return reliable flow predictions in minutes? This is the main thrust of the lab. We build CFD agents that set up, run, and check simulations with a researcher on the loop, and we turn their results into well-structured datasets that train lean predictive models. Our riblet study showed the cost: a Bayesian loop with large eddy simulation (LES) ran 125 epochs of about 6 hours each (Lee et al., 2024). AirDbM then reduced the airfoil design space to 12 baseline airfoils, a compact space that suited reinforcement-learning airfoil generation better than conventional parameterizations (Lee &amp; Sheikh, 2026). AirDbM-Bench turns that space into a physics-in-the-loop benchmark with an airfoil design case and dataset, so agents and optimizers are tested on the same task (Lee &amp; Sheikh, under review). Our near-term objective is an agent-driven airfoil design loop on this benchmark that prepares and checks its simulations and meets its design targets with fewer full CFD runs than our current Bayesian loop.</p>
        <div class="research-selected">
          <span class="research-selected__lead">Selected work:</span>
          <ul class="research-selected__list">
            <li><a href="https://doi.org/10.1093/jcde/qwaf124">Lee &amp; Sheikh, JCDE 2026</a></li>
            <li><a href="https://doi.org/10.1115/1.4064413">Lee et al., JMD 2024</a></li>
            <li><a href="https://github.com/jun9303/AirDbM-Bench">AirDbM-Bench v1.0 (software)</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <section class="research-area" id="design-flow-control">
    <header class="research-area__head">
      <h2 class="research-area__title">Data-Driven Aerospace Design and Flow Control</h2>
      <ul class="research-keywords" aria-label="Keywords">
        <li>Design-by-Morphing</li>
        <li>Bayesian optimization</li>
        <li>multi-objective optimization</li>
        <li>riblets and dimples</li>
        <li>porous lattices</li>
        <li>aeroelastic control</li>
      </ul>
    </header>
    <div class="research-area__body">
      <figure class="research-figure research-figure--tall">
        <a class="image-popup" href="{{ '/assets/images/research/design-flow-control.jpg' | relative_url }}" title="Optimized riblet surface with turbulence structures (left), and two Pareto-optimal porous lattice designs with velocity magnitude contours (right)."><img src="{{ '/assets/images/research/design-flow-control.jpg' | relative_url }}" alt="Turbulent flow over riblets with green vortex isosurfaces, and two porous lattice cells with velocity contours." width="950" height="759" loading="lazy" decoding="async"></a>
        <figcaption>
          <span class="research-figure__caption">Optimized riblet surface with turbulence structures (left), and two Pareto-optimal porous lattice designs with velocity magnitude contours (right).</span>
          <span class="research-figure__cite">Adapted from Lee, Sheikh, Lim, Gu &amp; Marcus, J. Mech. Des. 146, 081701 (2024), Fig.&nbsp;12, and Lee &amp; Vijay, CTR Annual Research Briefs, 351-361 (2025), Fig.&nbsp;5.</span>
        </figcaption>
      </figure>
      <div class="research-area__text">
        <p>Our goal is better aerodynamic geometries and surface textures, found with as few expensive simulations as possible. The key question is how to search a large, irregular design space when each candidate needs a flow simulation. We use Design-by-Morphing (DbM), which builds new designs from weighted combinations of a few baseline geometries. Bayesian and multi-objective optimization then chooses which candidate to simulate next. DbM began with airfoils: 25 baselines reconstructed the UIUC airfoil database with more than 99.5% accuracy (Sheikh et al., 2023). AirDbM later rebuilt 99% of it with only 12 baselines and a mean absolute error below 0.005 (Lee &amp; Sheikh, 2026). The same idea then moved from 2D profiles to 3D surfaces. Coupled with LES, it found riblets that cut drag by up to 8.65% against an 8% reference (Lee et al., 2024). Coupled with direct numerical simulation (DNS) and a Gaussian-process surrogate, it found 47 Pareto-optimal porous lattices in 500 evaluations (Lee &amp; Vijay, 2025). With one design loop that now covers airfoils, riblets, and lattices, our next objective is drag-reducing dimpled surfaces and morphing airfoils for flutter control, each optimized within a fixed budget of high-fidelity runs.</p>
        <div class="research-selected">
          <span class="research-selected__lead">Selected work:</span>
          <ul class="research-selected__list">
            <li><a href="https://doi.org/10.1093/jcde/qwad059">Sheikh et al., JCDE 2023</a></li>
            <li><a href="https://doi.org/10.1115/1.4064413">Lee et al., JMD 2024</a></li>
            <li><a href="https://web.stanford.edu/group/ctr/ResBriefs/2025/31_Lee">Lee &amp; Vijay, CTR 2025</a></li>
            <li><a href="https://arxiv.org/abs/2608.12826">Lee et al., arXiv 2026 (AST, under review)</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <section class="research-area" id="vortex-instability">
    <header class="research-area__head">
      <h2 class="research-area__title">Vortex Dynamics and Flow Instability</h2>
      <ul class="research-keywords" aria-label="Keywords">
        <li>wake vortices</li>
        <li>critical layers</li>
        <li>transient growth</li>
        <li>triadic resonance</li>
        <li>contrails</li>
      </ul>
    </header>
    <div class="research-area__body">
      <figure class="research-figure research-figure--tall">
        <a class="image-popup" href="{{ '/assets/images/research/vortex-instability.jpg' | relative_url }}" title="Axial vorticity of an optimally perturbed wake vortex at t = 25, 50, and 100: linear growth (top) and nonlinear evolution (bottom)."><img src="{{ '/assets/images/research/vortex-instability.jpg' | relative_url }}" alt="Red and blue vorticity contours of a perturbed wake vortex at three times, linear and nonlinear cases." width="1542" height="1155" loading="lazy" decoding="async"></a>
        <figcaption>
          <span class="research-figure__caption">Axial vorticity of an optimally perturbed wake vortex at t = 25, 50, and 100: linear growth (top) and nonlinear evolution (bottom).</span>
          <span class="research-figure__cite">Adapted from Lee &amp; Marcus, J. Fluid Mech. 1014, A16 (2025), Fig.&nbsp;10.</span>
        </figcaption>
      </figure>
      <div class="research-area__text">
        <p>Our goal is to explain how swirling flows lose stability. We focus on aircraft wake vortices, which limit how closely aircraft can follow each other on a runway and help form contrails. Which mechanisms can destabilize a vortex that linear stability analysis predicts to be stable? We study this with spectral eigenvalue methods, perturbation theory, and particle-laden simulations. Our mapped Legendre spectral method resolved critical-layer eigenmodes in an unbounded domain and revealed a viscous critical-layer spectrum that scales as Re<sup>-1/3</sup> (Lee &amp; Marcus, 2023). These eigenmodes turned out to drive the optimal transient growth of a strong swirling q-vortex. Inertial particles at the edge of the core, a model for contrail ice crystals, can start that growth (Lee &amp; Marcus, 2025). Triadic resonance offers a second route, and the same perturbation framework gives its selection rules and the role of critical layers (Wang, Lee &amp; Marcus, accepted). Building on these mechanisms, we aim to find which perturbations, such as particle loading near the core, shorten the life of a wake vortex the most, and to extend the analysis to multidimensional flows with global stability tools.</p>
        <div class="research-selected">
          <span class="research-selected__lead">Selected work:</span>
          <ul class="research-selected__list">
            <li><a href="https://doi.org/10.1017/jfm.2023.455">Lee &amp; Marcus, JFM 2023</a></li>
            <li><a href="https://doi.org/10.1017/jfm.2025.253">Lee &amp; Marcus, JFM 2025</a></li>
            <li><a href="https://arxiv.org/abs/2402.05287">Wang, Lee &amp; Marcus, arXiv 2024 (JFM, accepted)</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <section class="research-area" id="cfd-computing">
    <header class="research-area__head">
      <h2 class="research-area__title">High-Fidelity CFD and Scalable Computing</h2>
      <ul class="research-keywords" aria-label="Keywords">
        <li>spectral methods</li>
        <li>immersed-boundary LES</li>
        <li>global stability</li>
        <li>GPU computing</li>
        <li>parallel solvers</li>
      </ul>
    </header>
    <div class="research-area__body">
      <figure class="research-figure research-figure--tall research-figure--square">
        <a class="image-popup" href="{{ '/assets/images/research/cfd-computing.jpg' | relative_url }}" title="Mean streamwise velocity and temperature around a heated cylinder from immersed-boundary LES (top), and a z-vorticity eigenmode of Taylor-Green vortices (bottom)."><img src="{{ '/assets/images/research/cfd-computing.jpg' | relative_url }}" alt="Contour plots of velocity and temperature around a cylinder, and a vorticity eigenmode plot of Taylor-Green vortices." width="972" height="968" loading="lazy" decoding="async"></a>
        <figcaption>
          <span class="research-figure__caption">Mean streamwise velocity and temperature around a heated cylinder from immersed-boundary LES (top), and a z-vorticity eigenmode of Taylor-Green vortices (bottom).</span>
          <span class="research-figure__cite">Adapted from Lee &amp; Hwang, Int. J. Heat Mass Transf. 134, 198-208 (2019), Fig.&nbsp;14, and Lee, Song &amp; Lele, CTR Annual Research Briefs, 313-323 (2025), Fig.&nbsp;4.</span>
        </figcaption>
      </figure>
      <div class="research-area__text">
        <p>Our goal is simulation that remains accurate and affordable as geometry and physics become more complex. All fast models and design loops in the lab learn from this data. How do we resolve turbulence, heat transfer, and instability in realistic configurations at a cost we can afford many times over? We develop immersed-boundary LES for complex and heated geometries, spectral solvers for unbounded vortical flows, and global stability methods for multidimensional flows, and we run them on parallel CPU and GPU systems. Our immersed-boundary method for conjugate heat transfer, with dynamic subgrid-scale models for stress and heat flux, matched experiments more closely than isothermal or constant-heat-flux walls (Lee &amp; Hwang, 2019). The same in-house solver later resolved riblets and additive-manufacturing roughness in our design and cooling studies. MLegS (v1.1.3) turns our mapped Legendre spectral method into a parallel solver for vortical flows (Lee &amp; Wang, in preparation). For flows that vary in more than one direction, the augmented state vector formulation makes the global stability eigenproblem algebraic, so the differentiation scheme can be chosen for each problem (Lee, Song &amp; Lele, 2025). Global stability analysis for multidimensional flows now also runs on GPUs (Lee &amp; Song, 2027). Our objective is one toolchain that produces consistent LES, DNS, and stability datasets on CPU and GPU clusters, ready to train the predictive models of our first research area.</p>
        <div class="research-selected">
          <span class="research-selected__lead">Selected work:</span>
          <ul class="research-selected__list">
            <li><a href="https://doi.org/10.1016/j.ijheatmasstransfer.2019.01.019">Lee &amp; Hwang, IJHMT 2019</a></li>
            <li><a href="https://arxiv.org/abs/2609.18026">Lee &amp; Wang, arXiv 2026 (MLegS)</a></li>
            <li><a href="https://web.stanford.edu/group/ctr/ResBriefs/2025/28_Lee">Lee, Song &amp; Lele, CTR 2025</a></li>
            <li><a href="https://github.com/ucbCFD/MLegS">MLegS v1.1.3 (code)</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <section class="research-area" id="thermal-fluids">
    <header class="research-area__head">
      <h2 class="research-area__title">Thermal-Fluid Systems Across Scales</h2>
      <ul class="research-keywords" aria-label="Keywords">
        <li>internal cooling</li>
        <li>additive manufacturing roughness</li>
        <li>conjugate heat transfer</li>
        <li>radiant cooling and HVAC</li>
        <li>dropwise condensation</li>
        <li>hydrogen aviation</li>
      </ul>
    </header>
    <div class="research-area__body">
      <figure class="research-figure">
        <a class="image-popup" href="{{ '/assets/images/research/thermal-fluids.jpg' | relative_url }}" title="Velocity near the ribs of a turbine cooling passage, and room air speed driven by a ceiling fan."><img src="{{ '/assets/images/research/thermal-fluids.jpg' | relative_url }}" alt="Left: velocity contours with streamlines between diagonal ribs. Right: air speed in a room section with a ceiling fan." width="1600" height="824" loading="lazy" decoding="async"></a>
        <figcaption>
          <span class="research-figure__caption">Velocity near the ribs of a turbine cooling passage, and room air speed driven by a ceiling fan.</span>
          <span class="research-figure__cite">Adapted from Baek, Lee, Hwang &amp; Park, J. Turbomach. 141, 011012 (2019); Duarte, Raftery, Lee &amp; Solmaz, J. Build. Perform. Simul., doi:10.1080/19401493.2026.2656928 (2026).</span>
        </figcaption>
      </figure>
      <div class="research-area__text">
        <p>Our goal is cooling and thermal management that remove more heat for less pumping or fan power, from turbine blades to buildings and aircraft. The key question is how surface features such as ribs, roughness, and fans change the near-wall flow that controls heat transfer. We combine flow measurements, LES that resolves the surface geometry, and system-level energy models. In the trailing-edge cooling passage of a gas turbine blade, magnetic resonance velocimetry and LES showed that ribs drive secondary flow into the sharp corner, where a channel without ribs has weak flow and poor heat transfer (Baek et al., 2019). Cooling channels are also moving to additive manufacturing, which produces rough walls. Particle image velocimetry and LES of such channels showed that printed roughness raises friction in flat channels but slightly lowers overall friction in ribbed ones (Lee et al., 2025). At room scale, the same CFD approach provided heat transfer coefficients for ceiling fans. Building energy models using them showed fans raising median cooling heat transfer by up to 47% (Duarte et al., 2026). Our current objective applies this experience to fuel-cell cooling passages for hydrogen-powered aviation: channel geometries that remove more heat for the same pumping power (Lee &amp; Alonso, 2027).</p>
        <div class="research-selected">
          <span class="research-selected__lead">Selected work:</span>
          <ul class="research-selected__list">
            <li><a href="https://doi.org/10.1115/1.4041868">Baek et al., J. Turbomach. 2019</a></li>
            <li><a href="https://doi.org/10.1063/5.0268180">Lee et al., PoF 2025</a></li>
            <li><a href="https://doi.org/10.1080/19401493.2026.2656928">Duarte et al., JBPS 2026</a></li>
            <li><a href="https://doi.org/10.1051/e3sconf/202671602027">Park et al., IAQVEC 2026</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</div>
