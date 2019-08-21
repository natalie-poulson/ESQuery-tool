const inputNode = document.getElementById('input');
const queryNode = document.getElementById('query');
const outputNode = document.getElementById('output');
const numOfNodes = document.getElementById('numOfNodes');

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
