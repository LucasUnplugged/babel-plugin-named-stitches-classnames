// Adapted from https://github.com/afzalsayed96/babel-plugin-transform-stitches-display-name
import { declare } from "@babel/helper-plugin-utils";
import path from "path";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  function addIdArgument(id, node, isExportDefault = false) {
    node.arguments.push(t.stringLiteral(id));
    return node;
  }

  const isStyledFn = callee => callee.name === "styled";

  function isStyled(node) {
    if (!node || !t.isCallExpression(node)) return false;

    // not styled member object
    if (!isStyledFn(node.callee)) return false;
    
    // no call arguments
    const args = node.arguments;
    const last = args.length - 1;
    const hasName = args[last]?.type === 'StringLiteral';
    if (args.length < 2 || hasName) return false;

    return true;
  }

  return {
    name: "named-stitches-classnames",

    visitor: {
      ExportDefaultDeclaration(nodePath, state) {
        const { node } = nodePath
        if (isStyled(node.declaration)) {
          const filename = state.filename || "unknown";

          let displayName = path.basename(filename, path.extname(filename));

          // ./{module name}/index.js
          if (displayName === "index") {
            displayName = path.basename(path.dirname(filename));
          }

          nodePath.replaceWith(t.exportDefaultDeclaration(addIdArgument(displayName, node.declaration, true)));
        }
      },

      CallExpression(path) {
        const { node } = path;
        if (!isStyled(node)) return;
        
        let id;

        // crawl up the ancestry looking for possible candidates for displayName inference
        path.find(function (path) {
          if (path.isCallExpression()) {
            if (path.node.callee.name === 'object', path.node.callee.property?.name === 'assign') {
              if (path.node.arguments.some(node => node.type === 'ObjectExpression' && node.properties.some((prop) => prop.key.name === 'displayName'))) {
                // displayName already assigned
                return true
              }
            }
          } else if (path.isAssignmentExpression()) {
            id = path.node.left;
          } else if (path.isObjectProperty()) {
            id = path.node.key;
          } else if (path.isVariableDeclarator()) {
            id = path.node.id;
          } else if (path.isStatement()) {
            // we've hit a statement, we should stop crawling up
            return true;
          }

          // we've got an id! no need to continue
          if (id) return true;
        });

        // ensure that we have an identifier we can inherit from
        if (!id) return;

        // foo.bar -> bar
        if (t.isMemberExpression(id)) {
          id = id.property;
        }

        // identifiers are the only thing we can reliably get a name from
        if (t.isIdentifier(id)) {
          path.replaceWith(addIdArgument(id.name, node));
        }
      },
    },
  };
});
