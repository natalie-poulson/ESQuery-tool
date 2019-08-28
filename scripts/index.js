const inputNode = document.getElementById('input');
const queryNode = document.getElementById('query');
const outputNode = document.getElementById('output');
const numOfNodes = document.getElementById('numOfNodes');
const checkbox = document.getElementById('myCheck');
const themeWrapper = document.querySelector('.theme-switch-wrapper');
const textAreas = document.getElementsByClassName('theme-switch');
const toggleBtn = document.querySelector('.switch');
// eslint-disable-next-line max-len
const savedTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
// fix this
let light = true;

if (savedTheme) {
  if (savedTheme === 'light') {
    themeWrapper.classList.add('theme-switch-wrapper');
    for (textArea of textAreas) {
      textArea.classList.add('theme-switch');
    }
  }
}
if (savedTheme === 'dark') {
  light = false;
  themeWrapper.classList.add('theme-switch-wrapper--on');
  for (textArea of textAreas) {
    textArea.classList.add('theme-switch--on');
  }
}


toggleBtn.addEventListener('change', () => {
  console.log(light)
  themeWrapper.classList.toggle('theme-switch-wrapper--on');
  for (textArea of textAreas) {
    textArea.classList.toggle('theme-switch--on');
  }

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
    const ast = esprima.parse(inputNode.value, {sourceType: 'module'});
    const query = queryNode.value.replace(/\n/g, '');
    const queryAst = esquery.parse(query, {sourceType: 'module'});
    const matches = esquery.match(ast, queryAst);
    outputNode.innerHTML = JSON.stringify(matches, null, '  ');
    numOfNodes.textContent = 'Found ' + matches.length + ' node(s)';
  } catch (e) {
    outputNode.innerHTML = '';
    numOfNodes.textContent = e.message;
    numOfNodes.style.textAlign = 'center';
  }
};

inputNode.addEventListener('keyup', update);
queryNode.addEventListener('keyup', update);

update();
