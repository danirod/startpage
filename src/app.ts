document.addEventListener('keypress', function(e: KeyboardEvent) {
  // Don't capture focus if it's on the input already.
  let whatIsFocused = document.activeElement.tagName.toLowerCase();
  if (whatIsFocused == 'textarea' || whatIsFocused == 'input') {
    return false;
  }

  // Only prevent default on selected events to avoid hijacks.
  switch (e.key) {
    case '/':
      document.getElementsByName('q')[0].focus();
      e.preventDefault();
      break;
  }
  console.log(e.key);
});