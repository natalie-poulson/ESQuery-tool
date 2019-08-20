const inputNode = document.getElementById('input');
const queryNode = document.getElementById('query');
const outputNode = document.getElementById('output');


const update = () => {
  try {
    const ast = esprima.parse(inputNode.value, {sourceType: 'module'});
    const query = queryNode.value.replace(/\n/g, '');
    const queryAst = esquery.parse(query, {sourceType: 'module'});
    const matches = esquery.match(ast, queryAst);
    const numMatches = matches.length;
    const h4 = document.createElement('h4');
    h4.textContent = 'Found ' + numMatches + ' node(s)';
    outputNode.innerHTML = JSON.stringify(matches, null, '  ');
    outputNode.prepend(h4);
  } catch (e) {
    outputNode.innerHTML = e.message;
  }
};

inputNode.addEventListener('keyup', update);
queryNode.addEventListener('keyup', update);

update();
