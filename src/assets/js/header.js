const slimInstance = mdb.Sidenav.getInstance(document.getElementById('sidenav-4'));

slimInstance.show();

document.getElementById('slim-toggler').addEventListener('click', () => {
  slimInstance.toggleSlim();
})