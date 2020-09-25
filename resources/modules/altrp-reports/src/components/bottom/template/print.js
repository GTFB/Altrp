export const print = (title) => `
<nav class="navbar fixed-top navbar-dark bg-dark" style="font-family: Arial;">
  <span class="navbar-brand mb-0 h1">${title}</span>
  <button class="btn btn-warning" type="button" onClick="window.print();">Печать</button>
</nav>
  `;
