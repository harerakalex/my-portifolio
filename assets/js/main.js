const myFunction = () => {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  }


  const handleDispaySection = (section) => {
    const mainWrapper = select('#main');
    resetSections(mainWrapper, section);
    mainWrapper.appendChild(section);
    mainWrapper.lastChild.style.display = 'block';
    animator();
  }

  const resetSections = (parent, sectionToDisplay) => {
    const elements = Array.from(parent.children);
    if (!elements.length) return;

    elements.forEach(element => {
      if (element !== sectionToDisplay) {
        element.style.display = 'none';
      }
    });
  }

  /**
  * Handle rendering the first section
  */
  window.addEventListener('load', () => {
    let sectionToDisplay;

    if (window.location.hash) {
      if (select(window.location.hash)) {
        sectionToDisplay = select(window.location.hash);
        handleDispaySection(sectionToDisplay);
        navbarlinksActive(sectionToDisplay);
        return
      }
    }
    sectionToDisplay = select('#hero');
    handleDispaySection(sectionToDisplay);
    navbarlinksActive(sectionToDisplay);
  });

  /**
  * Scrool with ofset on links with a class name .scrollto
  */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      // e.preventDefault();

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active');
        let navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      handleDispaySection(select(this.hash));
      navbarlinksActive(select(this.hash));
    }
  }, true);

  /**
  * Navbar links active state
  */
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = (sectionToDisplay) => {
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (section === sectionToDisplay) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  }

  /**
  * Hero type effect
  */
  const typed = select('.typed');
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
  * Animation on change active navbar
  */
  const animator = () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  /**
  * Skills animation
  */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    });
  }

  /**
  * Mobile nav toggle
  */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

}

myFunction();
