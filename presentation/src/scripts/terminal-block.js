/* ==========================================================================
   TERMINAL BLOCK ENGINE (Runtime pour démos et commandes)
   Gère les étapes [data-step], l'effet de frappe optionnel et le surlignage.
   ========================================================================== */

(function initTerminalBlocks() {
  function updateSlideTerminals(slide, activeStep) {
    if (!slide) return;
    var terminals = slide.querySelectorAll('.terminal-block');
    if (!terminals.length) return;

    var stepNum = parseInt(activeStep, 10);
    if (isNaN(stepNum)) {
      stepNum = (activeStep === 'all') ? 999 : 1;
    }

    terminals.forEach(function(term) {
      var steps = term.querySelectorAll('.terminal-step');
      steps.forEach(function(s) {
        var sStep = parseInt(s.getAttribute('data-step'), 10);
        if (isNaN(sStep)) sStep = 1;

        var isVisible = sStep <= stepNum;
        s.classList.toggle('is-visible', isVisible);
        s.setAttribute('aria-hidden', isVisible ? 'false' : 'true');

        // Animation de frappe optionnelle uniquement sur la nouvelle commande active
        var cmdEl = s.querySelector('.terminal-cmd');
        if (cmdEl && cmdEl.hasAttribute('data-type-effect') && sStep === stepNum && isVisible) {
          if (!cmdEl.classList.contains('is-typed')) {
            runTypeEffect(cmdEl);
          }
        }
      });
    });
  }

  function runTypeEffect(el) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-typed');
      return;
    }
    var fullText = el.getAttribute('data-cmd-text') || el.textContent;
    el.setAttribute('data-cmd-text', fullText);
    el.classList.add('is-typing');
    el.textContent = '';

    var idx = 0;
    var speed = Math.max(15, Math.min(45, Math.floor(700 / Math.max(fullText.length, 1))));

    function tick() {
      if (idx < fullText.length) {
        el.textContent += fullText.charAt(idx);
        idx++;
        setTimeout(tick, speed);
      } else {
        el.classList.remove('is-typing');
        el.classList.add('is-typed');
        var out = el.nextElementSibling;
        if (out && out.classList.contains('terminal-out')) {
          out.style.opacity = '1';
        }
      }
    }
    tick();
  }

  // Écouter les changements d'étape du deck engine
  document.addEventListener('DOMContentLoaded', function() {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(m) {
        if (m.type === 'attributes' && m.attributeName === 'data-active-step') {
          var slide = m.target;
          var step = slide.getAttribute('data-active-step') || '1';
          updateSlideTerminals(slide, step);
        }
      });
    });

    document.querySelectorAll('.slide').forEach(function(slide) {
      observer.observe(slide, { attributes: true, attributeFilter: ['data-active-step'] });
      var initStep = slide.getAttribute('data-active-step') || '1';
      updateSlideTerminals(slide, initStep);
    });
  });

  window.updateSlideTerminals = updateSlideTerminals;
})();
