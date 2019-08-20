const inputNode = document.getElementById('input');
const queryNode = document.getElementById('query');
const outputNode = document.getElementById('output');


const update = () => {
  let isInputValid = true;
  let isOutputValid = true;
  let ast;

  try {
    ast = esprima.parse(inputNode.value, {sourceType: 'module'});
    console.log(JSON.stringify(ast, null, ' '));
  } catch (e) {
    console.log(e);

    isInputValid = false;
  }
  console.log(queryNode)
  const query = queryNode.value.replace(/\n/g, '');
  outputNode.innerHTML = '';

  let queryAst;
  let matches;
  let matchesOutput;


  try {
    queryAst = esquery.parse(query, {sourceType: 'module'});
  } catch (e) {
    isOutputValid = false;
  }

  try {
    matches = esquery.match(ast, queryAst);
  } catch (e) {
    matchesOutput = e.message;
  }


  matchesOutput = matchesOutput || JSON.stringify(matches, null, '  ');

  console.log(matchesOutput)
  outputNode.innerHTML = matchesOutput;
};

inputNode.addEventListener('change', update);
queryNode.addEventListener('change', update);
queryNode.addEventListener('keyup', update);

update();
