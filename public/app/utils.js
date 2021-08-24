const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const nodes = document.querySelectorAll(element);

    nodes.forEach(node => {
        node.classList.add(`${prefix}animated`, animationName);
    })

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      nodes.forEach(node => {
          node.classList.remove(`${prefix}animated`, animationName);
      })
      resolve('Animation ended');
    }
    nodes.forEach(node => {
        node.addEventListener('animationend', handleAnimationEnd, {once: true});
    })
});