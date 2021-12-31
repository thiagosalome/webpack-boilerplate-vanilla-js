const button = (() => {
  const buttonElement = document.querySelector('.js-button');

  buttonElement.addEventListener('click', () => {
    alert('Hello World');
  });
})();

export default button;
