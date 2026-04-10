const fields = {
  name: {
    el: document.getElementById('name'),
    dot: document.getElementById('pd1'),
    validate(v) {
      if (!v) return 'Full name cannot be empty.';
      if (v.trim().length < 2) return 'Name must be at least 2 characters.';
      if (!/^[a-zA-Z\s'-]+$/.test(v)) return 'Name should only contain letters.';
      return '';
    }
  },
  mail: {
    el: document.getElementById('mail'),
    dot: document.getElementById('pd2'),
    validate(v) {
      if (!v) return 'Email address is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        return 'That doesn\'t look like a valid email.';
      }
      const username = v.split('@')[0];
      if (/^\d+$/.test(username)) {
        return 'Email cannot be only numbers.';
      }
      if (username.length < 3) {
        return 'Email username must be at least 3 characters.';
      }
      if (!/[a-zA-Z]/.test(username)) {
        return 'Email must include at least one letter.';
      }
      return '';
    }
  },
  pass: {
    el: document.getElementById('pass'),
    dot: document.getElementById('pd3'),
    validate(v) {
      if (!v) return 'Please create a password.';
      if (v.length < 6) return 'Password needs at least 6 characters.';
      return '';
    }
  }
};

function setState(key, error) {
  const { el, dot } = fields[key];
  const errEl = document.getElementById('e-' + key);
  const icon = document.getElementById('si-' + key);
  if (error) {
    el.className = 'state-invalid';
    errEl.textContent = error; errEl.className = 'err on';
    icon.textContent = '✕'; icon.className = 'status-icon visible bad';
    dot.className = 'progress-dot';
  } else if (el.value) {
    el.className = 'state-valid';
    errEl.textContent = ''; errEl.className = 'err';
    icon.textContent = '✓'; icon.className = 'status-icon visible ok';
    dot.className = 'progress-dot filled';
  }
}

Object.keys(fields).forEach(key => {
  fields[key].el.addEventListener('input', () => setState(key, fields[key].validate(fields[key].el.value)));
  fields[key].el.addEventListener('blur', () => setState(key, fields[key].validate(fields[key].el.value)));
});

// Toggle password visibility
document.getElementById('togglePw').addEventListener('click', function () {
  const p = document.getElementById('pass');
  const isText = p.type === 'text';
  p.type = isText ? 'password' : 'text';
  this.textContent = isText ? 'Show' : 'Hide';
});

document.getElementById('simpleForm').addEventListener('submit', function (e) {
  e.preventDefault();
  let ok = true;
  Object.keys(fields).forEach(key => {
    const err = fields[key].validate(fields[key].el.value);
    setState(key, err);
    if (err) ok = false;
  });
  if (ok) {
    document.getElementById('successMsg').classList.add('show');
    this.reset();
    Object.keys(fields).forEach(key => {
      fields[key].el.className = '';
      document.getElementById('si-' + key).className = 'status-icon';
      fields[key].dot.className = 'progress-dot';
    });
  }
});