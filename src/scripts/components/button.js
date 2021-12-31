const button = (() => {
  const buttonElement = document.querySelector('.js-button');

  buttonElement.addEventListener('click', () => {
    window.open('https://github.com/thiagosalome/webpack-boilerplate-vanilla-js');
  });
})();

export default button;
