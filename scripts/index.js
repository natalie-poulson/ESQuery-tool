const inputNode = document.getElementById('input');
const queryNode = document.getElementById('query');
const outputNode = document.getElementById('output');


const update = () => {
  try {
    const ast = esprima.parse(inputNode.value, {sourceType: 'module'});
    const query = queryNode.value.replace(/\n/g, '');
    const queryAst = esquery.parse(query, {sourceType: 'module'});
    const matches = esquery.match(ast, queryAst);

    outputNode.innerHTML = JSON.stringify(matches, null, '  ');

    const h4 = document.createElement('h4');
    h4.textContent = 'Found ' + matches.length + ' node(s)';
    outputNode.prepend(h4);
  } catch (e) {
    console.log(e);
    outputNode.innerHTML = '<b>'+ e.name +'</b>' + '\n' + e.message;
  }
};

inputNode.addEventListener('keyup', update);
queryNode.addEventListener('keyup', update);

update();
