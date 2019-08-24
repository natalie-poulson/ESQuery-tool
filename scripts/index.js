const inputNode = document.getElementById('input');
const queryNode = document.getElementById('query');
const outputNode = document.getElementById('output');
const numOfNodes = document.getElementById('numOfNodes');
// eslint-disable-next-line max-len
const toggleSwitch = document.querySelector('.theme-switch-wrapper input[type="checkbox"]');

// eslint-disable-next-line require-jsdoc
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}

toggleSwitch.addEventListener('change', switchTheme, false);

// eslint-disable-next-line max-len
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

const update = () => {
  try {
    const ast = esprima.parse(inputNode.value, {sourceType: 'module'});
    const query = queryNode.value.replace(/\n/g, '');
    const queryAst = esquery.parse(query, {sourceType: 'module'});
    const matches = esquery.match(ast, queryAst);
    outputNode.innerHTML = JSON.stringify(matches, null, '  ');
    numOfNodes.textContent = 'Found ' + matches.length + ' node(s)';
  } catch (e) {
    console.log(e);
    outputNode.innerHTML = '';
    numOfNodes.textContent = e.message;
  }
};

inputNode.addEventListener('keyup', update);
queryNode.addEventListener('keyup', update);

update();
