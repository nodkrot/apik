import { Project, SourceFile } from "ts-simple-ast";
import apiSchema from "./src/api.json";

function main(writer: any, schema: any) {
  const models = schema.components.schemas;

  writer.writeLine(`/* Models for ${schema.info.title} ${schema.info.version} */`);

  Object.keys(models).map((name: string) => {
    if (models[name].properties) {
      const properties = prepProps(models[name]);

      writer
        .blankLine()
        .writeLine(`export class ${name} {`)
        .writeLine(`  public static className = "${name}";`).blankLine()
        .writeLine(`  public static create(obj: ${name}) {`)
        .writeLine(`    return new ${name}(`)
        .writeLine(initProps(properties, 3))
        .writeLine(`    );`)
        .writeLine(`  }`).blankLine()
        .writeLine(`  constructor(`)
        .writeLine(declProps(properties, 3))
        .writeLine(`  ) {}`)
        .writeLine(`}`);
    } else if (models[name].enum) {
      writer
        .blankLine()
        .writeLine(`enum ${name} {`)
        .writeLine(declEnums(models[name].enum, 1))
        .writeLine(`}`);
    }
  });
}

function prepProps(model: any) {
  const make = (name: string, required: boolean) => Object.assign({ name, required }, model.properties[name]);
  const has = (name: string) => Boolean(model.required) && model.required.includes(name);
  const requiredProps = Object.keys(model.properties)
    .filter((name: string) => has(name)).map((name: string) => make(name, true));
  const optionalProps = Object.keys(model.properties)
    .filter((name: string) => !has(name)).map((name: string) => make(name, false));
  return [...requiredProps, ...optionalProps];
}

function initProps(props: any[], tabs: number = 0) {
  return props.map(({ name }) =>
    `${"  ".repeat(tabs)}obj.${name},`
  ).join("\n");
}

function declProps(props: any[], tabs: number = 0) {
  return props.map((prop) =>
    `${"  ".repeat(tabs)}public ${prop.name}${prop.required ? "" : "?"}: ${getType(prop)},`
  ).join("\n");
}

function declEnums(enums: any[], tabs: number = 0) {
  return enums.map((name: string) =>
    `${"  ".repeat(tabs)}${name} = "${name}",`
  ).join("\n");
}

function getType(prop: any) {
  const getRefName = (obj: any) => Boolean(obj.$ref) ? obj.$ref.split("/").slice(-1)[0] : obj.type;

  switch (prop.type) {
    case "array":
      // handle `oneOf, anyOf, allOf` union
      return `${getRefName(prop.items)}[]`;
    case "integer":
      return "number";
    default:
      return getRefName(prop);
  }
}

const sourceFile: SourceFile = new Project().createSourceFile("./src/models.ts", (writer) => {
  main(writer, apiSchema);
}, { overwrite: true });

sourceFile.save();
