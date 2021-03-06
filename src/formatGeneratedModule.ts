import { FormatModule } from "relay-compiler";

export const formatGeneratedModule: FormatModule = ({
  moduleName,
  documentType,
  docText,
  concreteText,
  typeText,
  hash,
  relayRuntimeModule = "relay-runtime",
  sourceHash
}) => {
  const documentTypeImport = documentType
    ? `import { ${documentType} } from "${relayRuntimeModule}";`
    : "";
  const docTextComment = docText ? "\n/*\n" + docText.trim() + "\n*/\n" : "";
  return `/* tslint:disable */

${documentTypeImport}
${typeText || ""}

${docTextComment}
const node: ${documentType || "never"} = ${concreteText};
(node as any).hash = '${sourceHash}';
export default node;
`;
};
