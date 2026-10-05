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

        // Si l'étape est visible et antérieure, s'assurer que son contenu est affiché
        var cmdEl = s.querySelector('.terminal-cmd');
        var outEl = s.querySelector('.terminal-out');
        if (sStep < stepNum) {
          if (cmdEl) {
            cmdEl.classList.remove('is-typing');
            cmdEl.classList.add('is-typed');
            var fullCmd = cmdEl.getAttribute('data-cmd-text') || cmdEl.textContent.trim();
            cmdEl.textContent = fullCmd;
          }
          if (outEl) {
            outEl.style.opacity = '1';
          }
        } else if (cmdEl && cmdEl.hasAttribute('data-type-effect') && sStep === stepNum && isVisible) {
          // Animation de frappe sur la nouvelle commande active
          if (!cmdEl.classList.contains('is-typed')) {
            runTypeEffect(cmdEl);
          }
        } else if (outEl && isVisible) {
          outEl.style.opacity = '1';
        }
      });
    });
  }

  function runTypeEffect(el) {
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-typed');
      return;
    }
    if (el._typeTimer) {
      clearTimeout(el._typeTimer);
      el._typeTimer = null;
    }
    var fullText = el.getAttribute('data-cmd-text');
    if (!fullText) {
      fullText = el.textContent.trim();
      el.setAttribute('data-cmd-text', fullText);
    }
    el.classList.add('is-typing');
    el.classList.remove('is-typed');
    el.textContent = '';

    // Masquer la sortie pendant que la commande est en cours de frappe
    var out = el.nextElementSibling;
    if (out && out.classList.contains('terminal-out')) {
      out.style.opacity = '0';
      out.style.transition = 'opacity 0.25s ease';
    }

    var idx = 0;
    var speed = Math.max(8, Math.min(22, Math.floor(380 / Math.max(fullText.length, 1))));

    function tick() {
      if (idx < fullText.length) {
        el.textContent = fullText.slice(0, idx + 1);
        idx++;
        el._typeTimer = setTimeout(tick, speed);
      } else {
        el._typeTimer = null;
        el.classList.remove('is-typing');
        el.classList.add('is-typed');
        if (out && out.classList.contains('terminal-out')) {
          setTimeout(function() {
            out.style.opacity = '1';
          }, 40);
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
