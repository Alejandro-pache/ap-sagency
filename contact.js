(() => {
  const form = document.getElementById('leadForm');
  if (!form) return;

  document.body.classList.add('js-enabled');

  const message = document.getElementById('formMsg');
  const submit = form.querySelector('button[type="submit"]');
  const config = window.AP_CONTACT_CONFIG || {};
  const rawEndpoint = typeof config.endpoint === 'string' ? config.endpoint.trim() : '';
  const timeoutMs = Number.isFinite(Number(config.timeoutMs))
    ? Math.max(5000, Math.min(30000, Number(config.timeoutMs)))
    : 15000;

  // Only allow the public Formspree form endpoint. This avoids sending lead
  // data to an accidental or untrusted URL if the config is edited incorrectly.
  let endpoint = '';
  try {
    const url = new URL(rawEndpoint);
    if (url.protocol === 'https:' && url.hostname === 'formspree.io' && /^\/f\/[A-Za-z0-9_-]+\/?$/.test(url.pathname)) {
      endpoint = url.href;
    }
  } catch {
    // An empty endpoint is an intentional, safe setup state until the owner
    // creates the form and copies its public endpoint here.
  }

  form.setAttribute('action', endpoint || '#');
  form.setAttribute('aria-busy', 'false');

  if (!form.elements._gotcha) {
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = '_gotcha';
    honeypot.className = 'form-honeypot';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';
    honeypot.setAttribute('aria-hidden', 'true');
    form.appendChild(honeypot);
  }

  // Keep the first contact step short: only name, email and privacy consent
  // are required. The remaining information improves qualification but is
  // optional, which removes avoidable conversion friction on mobile.
  ['empresa', 'telefono'].forEach(name => {
    const field = form.elements[name];
    if (!field) return;
    field.required = false;
    field.removeAttribute('required');
    const label = field.closest('label');
    if (label?.firstChild?.nodeType === Node.TEXT_NODE) {
      label.firstChild.textContent = label.firstChild.textContent.replace(/\s*\*\s*$/, '');
    }
  });

  const formIntro = form.querySelector('.form-head p');
  if (formIntro) formIntro.textContent = 'Déjanos tus datos básicos y te responderemos con el siguiente paso.';

  const setMessage = (text, state = '') => {
    if (!message) return;
    message.textContent = text;
    message.dataset.state = state;
  };

  const setPending = pending => {
    form.dataset.state = pending ? 'pending' : (form.dataset.state === 'pending' ? '' : form.dataset.state || '');
    form.setAttribute('aria-busy', String(pending));
    if (submit) {
      submit.disabled = pending;
      submit.classList.toggle('is-loading', pending);
      submit.textContent = pending ? 'Enviando solicitud…' : 'Solicitar propuesta ↗';
    }
  };

  const ensureResetButton = () => {
    let reset = form.querySelector('[data-form-reset]');
    if (reset) return reset;
    reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'btn ghost wide form-reset';
    reset.dataset.formReset = 'true';
    reset.textContent = 'Enviar otra consulta';
    submit?.insertAdjacentElement('afterend', reset);
    reset.addEventListener('click', () => {
      form.reset();
      form.dataset.state = '';
      form.setAttribute('aria-busy', 'false');
      if (submit) {
        submit.disabled = false;
        submit.classList.remove('is-loading');
        submit.textContent = 'Solicitar propuesta ↗';
      }
      reset.hidden = true;
      setMessage('');
      form.elements.nombre?.focus();
    });
    return reset;
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (form.dataset.state === 'pending' || form.dataset.state === 'success') return;
    if (!form.reportValidity()) return;

    if (!endpoint) {
      setMessage('El formulario directo está pendiente de activación. Puedes escribirnos por WhatsApp o por correo desde el bloque de contacto.', 'config');
      return;
    }

    const data = new FormData(form);
    data.set('_subject', 'Nueva solicitud de propuesta — AP’s Agency');
    data.set('_source', 'Web AP’s Agency');
    data.set('consent', 'accepted');

    // Formspree documents _gotcha as an all-plans CSS honeypot. The field is
    // kept empty for people and silently filters automated submissions.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    setPending(true);
    setMessage('Enviando tu solicitud…', 'pending');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
        signal: controller.signal
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || (result && Array.isArray(result.errors) && result.errors.length)) {
        const providerError = result?.errors?.map(error => error.message).filter(Boolean).join(' ');
        throw new Error(providerError || `HTTP ${response.status}`);
      }

      form.dataset.state = 'success';
      form.setAttribute('aria-busy', 'false');
      if (submit) {
        submit.disabled = true;
        submit.classList.remove('is-loading');
        submit.textContent = 'Solicitud recibida ✓';
      }
      ensureResetButton().hidden = false;
      setMessage('Solicitud recibida. Te contactaremos con los datos que nos has dejado.', 'success');
    } catch (error) {
      const timedOut = error?.name === 'AbortError';
      setPending(false);
      setMessage(
        timedOut
          ? 'No hemos podido confirmar el envío a tiempo. Revisa el panel antes de volver a intentarlo; tus datos siguen aquí.'
          : 'No hemos podido enviar la solicitud. Tus datos siguen aquí para que puedas reintentarlo o usar WhatsApp.',
        'error'
      );
    } finally {
      clearTimeout(timer);
      if (form.dataset.state !== 'success') form.setAttribute('aria-busy', 'false');
    }
  });
})();
