const inputNode = document.getElementById('input');
const queryNode = document.getElementById('query');
const outputNode = document.getElementById('output');
const numOfNodes = document.getElementById('numOfNodes');
const themeWrapper = document.querySelector('.theme-switch-wrapper');
const textAreas = document.getElementsByClassName('theme-switch');
const toggleBtn = document.querySelector('.switch');
const asideNode = document.querySelector('aside');
const githubIcon = document.querySelector('.invert');
const savedTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
let light = true;

if (savedTheme) {
  if (savedTheme === 'light') {
    themeWrapper.classList.add('theme-switch-wrapper');
    for (textArea of textAreas) {
      textArea.classList.add('theme-switch');
    }
    githubIcon.classList.add('invert');
  }
}

if (savedTheme === 'dark') {
  light = false;
  themeWrapper.classList.add('theme-switch-wrapper--on');
  for (textArea of textAreas) {
    textArea.classList.add('theme-switch--on');
  }
  githubIcon.classList.add('invert--on');
}

toggleBtn.addEventListener('change', () => {
  themeWrapper.classList.toggle('theme-switch-wrapper--on');
  for (textArea of textAreas) {
    textArea.classList.toggle('theme-switch--on');
  }
  githubIcon.classList.toggle('invert--on');
  if (light) {
    localStorage.setItem('theme', 'dark');
    light = false;
  } else {
    localStorage.setItem('theme', 'light');
    light = true;
  }
});

const update = () => {
  try {
    asideNode.classList.remove('error');
    const ast = esprima.parse(inputNode.value, {sourceType: 'module'});
    const query = queryNode.value.replace(/\n/g, '');
    const queryAst = esquery.parse(query, {sourceType: 'module'});
    const matches = esquery.match(ast, queryAst);
    outputNode.innerHTML = JSON.stringify(matches, null, '  ');
    if (matches.length === 1) {
      numOfNodes.textContent = 'Found ' + matches.length + ' node';
    } else {
      numOfNodes.textContent = 'Found ' + matches.length + ' nodes';
    }
  } catch (e) {
    outputNode.innerHTML = '';

    if (e.lineNumber){
      numOfNodes.innerHTML = `
      <h3>There\'s an error in the code.</h3> 
      ${e.message}`;
    } else {
      numOfNodes.innerHTML = `
      <h3>There\'s an error in the ESQuery.</h3> 
      ${e.message}`;     
    }
    numOfNodes.style.textAlign = 'center';
    asideNode.classList.add('error');
  }
};

inputNode.addEventListener('keyup', update);
queryNode.addEventListener('keyup', update);

update();
