/* Neurolog — nav and waitlist form */

(function () {
  'use strict';

  var WAITLIST_ENDPOINT =
    'https://script.google.com/macros/s/AKfycbyO3mH7UJep3t6mjUDk4katPtxSs61r3gtTsoOOkSbrUFx1Hm-JHIMvttgNu5FZzJGq/exec';

  document.addEventListener('DOMContentLoaded', function () {
    setupDropdown();
    setupMobileMenu();
    setupWaitlistForm();
  });

  function setupDropdown() {
    var toggle = document.querySelector('[data-dropdown-toggle]');
    var menu = document.querySelector('[data-dropdown-menu]');
    if (!toggle || !menu) return;

    var close = function () {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.hidden;
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', function (e) {
      if (!menu.hidden && !e.target.closest('.nav__group')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) {
        close();
        toggle.focus();
      }
    });
  }

  function setupMobileMenu() {
    var btn = document.querySelector('[data-menu-toggle]');
    var panel = document.querySelector('[data-mobile-nav]');
    if (!btn || !panel) return;

    btn.addEventListener('click', function () {
      var open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  function confirmationFor(roles) {
    var patient = roles.indexOf('Patient') !== -1;
    var demo =
      roles.indexOf('Clinician') !== -1 || roles.indexOf('Researcher') !== -1;

    if (patient && demo) {
      return 'Thanks for your enquiry. We will be in touch once our mobile app is ' +
        'available for pilot testing, and to organise a demo.';
    }
    if (patient) {
      return 'Thanks for your enquiry. We will be in touch once our mobile app is ' +
        'available for pilot testing.';
    }
    if (demo) {
      return 'Thanks for your enquiry. We will be in touch to organise a demo.';
    }
    return 'Thanks for your enquiry. We will be in touch.';
  }

  function setupWaitlistForm() {
    var form = document.querySelector('[data-waitlist-form]');
    if (!form) return;

    var button = form.querySelector('button[type="submit"]');
    var confirmation = form.querySelector('[data-waitlist-confirmation]');
    var label = button ? button.textContent : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = new FormData(form);
      var roles = data.getAll('role');
      data.delete('role');
      data.set('role', roles.join(', '));
      var message = confirmationFor(roles);

      if (button) {
        button.disabled = true;
        button.textContent = 'Submitting…';
      }

      fetch(form.dataset.endpoint || WAITLIST_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(data)
      })
        .catch(function () {
          /* no-cors gives us an opaque response, so treat any outcome as sent */
        })
        .then(function () {
          form.reset();
          if (confirmation) {
            confirmation.textContent = message;
            confirmation.hidden = false;
          }
          if (button) {
            button.disabled = false;
            button.textContent = label;
          }
        });
    });
  }
})();
