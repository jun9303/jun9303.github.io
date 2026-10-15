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
        <p>A high-fidelity flow simulation of one wing or engine part can run for days, so a design team can test only a few ideas. We want reliable flow predictions in minutes. To get there, we build AI agents that set up, run, and check simulations while a researcher oversees the work. Their results become clean, well-organized datasets that train fast predictive models. We also publish open benchmarks, so that agents and optimizers from any group can be compared on the same design task. Faster prediction lets engineers try many more designs for the same computing cost and catch poor ones early in the design process.</p>
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
      <figure class="research-figure">
        <a class="image-popup" href="{{ '/assets/images/research/design-flow-control.jpg?v=2' | relative_url }}" title="Reinforcement learning with an airfoil shape generator: an agent turns 0-to-1 knobs that set the design variables and is rewarded for matching a target airfoil (left), and two Pareto-optimal porous lattice designs with velocity magnitude contours (right)."><img src="{{ '/assets/images/research/design-flow-control.jpg?v=2' | relative_url }}" alt="Diagram of a reinforcement-learning loop in which an agent sets the design variables of an airfoil shape generator and is rewarded for similarity to a target airfoil, next to two porous lattice cells with velocity contours." width="2399" height="1074" loading="lazy" decoding="async"></a>
        <figcaption>
          <span class="research-figure__caption">Reinforcement learning with an airfoil shape generator: an agent turns 0-to-1 knobs that set the design variables and is rewarded for matching a target airfoil (left), and two Pareto-optimal porous lattice designs with velocity magnitude contours (right).</span>
          <span class="research-figure__cite">Adapted from Lee &amp; Sheikh, J. Comput. Des. Eng. 13(1), 108-124 (2026), Fig.&nbsp;10, and Lee &amp; Vijay, CTR Annual Research Briefs, 351-361 (2025), Fig.&nbsp;5.</span>
        </figcaption>
      </figure>
      <div class="research-area__text">
        <p>Good aerodynamic designs are hard to find. Airfoils, surface textures, and porous structures can vary in countless ways, and each candidate needs a costly flow simulation. Our Design-by-Morphing (DbM) method makes new designs by blending a few existing ones, so a short list of weights can describe a wide range of geometries. Bayesian optimization then picks the most promising design to simulate next. The weights also work as simple knobs for machine learning: a reinforcement-learning agent that turns them matched target airfoils faster than agents using other common parameterizations. We apply this loop to airfoils, drag-reducing riblets and dimples, porous lattices, and morphing airfoils for flutter control. Each study looks for the best design it can find within a fixed number of simulations.</p>
        <div class="research-selected">
          <span class="research-selected__lead">Selected work:</span>
          <ul class="research-selected__list">
            <li><a href="https://doi.org/10.1093/jcde/qwad059">Sheikh et al., JCDE 2023</a></li>
            <li><a href="https://doi.org/10.1115/1.4064413">Lee et al., JMD 2024</a></li>
            <li><a href="https://web.stanford.edu/group/ctr/ResBriefs/2025/31_Lee">Lee &amp; Vijay, CTR 2025</a></li>
            <li><a href="https://doi.org/10.1093/jcde/qwaf124">Lee &amp; Sheikh, JCDE 2026</a></li>
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
      <figure class="research-figure">
        <a class="image-popup" href="{{ '/assets/images/research/vortex-instability.jpg?v=2' | relative_url }}" title="Axial vorticity of an optimally perturbed wake vortex at t = 25, 50, and 100, in linear and nonlinear evolution (left), and a counter-rotating vortex pair late in the Crow instability, at t = 60, after the two vortices have linked into rings (right)."><img src="{{ '/assets/images/research/vortex-instability.jpg?v=2' | relative_url }}" alt="Red and blue vorticity contours of a perturbed wake vortex at three times, linear and nonlinear cases, next to a 3D view of two vortex tubes broken into rings and small structures." width="2202" height="1155" loading="lazy" decoding="async"></a>
        <figcaption>
          <span class="research-figure__caption">Axial vorticity of an optimally perturbed wake vortex at t = 25, 50, and 100, in linear and nonlinear evolution (left), and a counter-rotating vortex pair late in the Crow instability, at t = 60, after the two vortices have linked into rings (right).</span>
          <span class="research-figure__cite">Adapted from Lee &amp; Marcus, J. Fluid Mech. 1014, A16 (2025), Fig.&nbsp;10, and Lee &amp; Wang, arXiv:2609.18026 (2026), Fig.&nbsp;10.</span>
        </figcaption>
      </figure>
      <div class="research-area__text">
        <p>Every aircraft trails two strong swirling vortices. They can roll a smaller aircraft that flies into them, so airports keep a safe distance between flights, and this limits runway capacity. The same vortices help form contrails. Linear theory predicts that many such vortices are stable, yet real wakes break up, and we study why. With spectral methods, perturbation theory, and simulations with ice-like particles, we look for small disturbances that grow fast. They range from waves that gather in thin layers within the swirling flow to the Crow instability, which bends the two vortices toward each other until they link into rings (figure, right). Knowledge of which disturbances end a wake vortex soonest can inform safe aircraft spacing and contrail prediction.</p>
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
      <figure class="research-figure">
        <a class="image-popup" href="{{ '/assets/images/research/cfd-computing.jpg?v=2' | relative_url }}" title="Turbulence structures over an optimized riblet surface (left) and mean streamwise velocity and temperature around a heated cylinder (top right), both from immersed-boundary LES, and a z-vorticity eigenmode of Taylor-Green vortices (bottom right)."><img src="{{ '/assets/images/research/cfd-computing.jpg?v=2' | relative_url }}" alt="Turbulent flow over riblets with green vortex isosurfaces, contour plots of velocity and temperature around a cylinder, and a vorticity eigenmode plot of Taylor-Green vortices." width="1428" height="765" loading="lazy" decoding="async"></a>
        <figcaption>
          <span class="research-figure__caption">Turbulence structures over an optimized riblet surface (left) and mean streamwise velocity and temperature around a heated cylinder (top right), both from immersed-boundary LES, and a z-vorticity eigenmode of Taylor-Green vortices (bottom right).</span>
          <span class="research-figure__cite">Adapted from Lee, Sheikh, Lim, Gu &amp; Marcus, J. Mech. Des. 146, 081701 (2024), Fig.&nbsp;12; Lee &amp; Hwang, Int. J. Heat Mass Transf. 134, 198-208 (2019), Fig.&nbsp;14; and Lee, Song &amp; Lele, CTR Annual Research Briefs, 313-323 (2025), Fig.&nbsp;4.</span>
        </figcaption>
      </figure>
      <div class="research-area__text">
        <p>Fast models and design loops are only as good as the simulations they learn from. Turbulence over riblets and rough walls, heat flowing between a fluid and a solid, and vortices that spread into open space are all hard to compute accurately at a reasonable cost. We write our own solvers for them. Our large eddy simulation code places complex and heated shapes on a simple grid through immersed boundaries. Spectral solvers handle vortices in unbounded domains, and stability tools handle flows that change in more than one direction. The codes run on CPU and GPU clusters, and we release key ones, such as MLegS, as open source, so other groups can build on the same data and tools.</p>
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
        <p>From turbine blades to fuel cells and buildings, removing heat takes pumping or fan power. Heat transfer at a surface depends on the thin layer of flow next to it, and ribs, rough 3D-printed walls, and ceiling fans all change that layer. We measure these flows with magnetic resonance and particle image velocimetry, resolve them with large eddy simulation, and feed the results into system and building energy models. The aim is cooling that removes more heat for the same power. Our current focus is the cooling passages of fuel cells for hydrogen-powered aircraft.</p>
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
