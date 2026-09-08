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

  function setupWaitlistForm() {
    var form = document.querySelector('[data-waitlist-form]');
    if (!form) return;

    var button = form.querySelector('button[type="submit"]');
    var confirmation = form.querySelector('[data-waitlist-confirmation]');
    var label = button ? button.textContent : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      if (button && button.disabled) return;
      if (confirmation) confirmation.hidden = true;

      var data = new FormData(form);
      var roles = data.getAll('role');
      data.delete('role');
      data.set('role', roles.join(', '));

      if (button) {
        button.disabled = true;
        button.textContent = 'Submitting…';
      }

      fetch(form.dataset.endpoint || WAITLIST_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(data)
      })
        .then(function () {
          if (confirmation) {
            // A completed request indicates sending; do not claim confirmed backend receipt.
            confirmation.textContent = 'Your enquiry has been sent. We will be in touch about the pilot.';
            confirmation.removeAttribute('data-error');
            confirmation.hidden = false;
          }
        })
        .catch(function () {
          if (confirmation) {
            confirmation.textContent = 'We could not send your enquiry. Check your connection and try again, ' +
              'or email contact@neurologapp.com. Your details are still in the form.';
            confirmation.setAttribute('data-error', 'true');
            confirmation.hidden = false;
          }
        })
        .finally(function () {
          if (button) {
            button.disabled = false;
            button.textContent = label;
          }
        });
    });
  }
})();
