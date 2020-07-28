
const Path = require("path");
const FS   = require("fs");

function FormatEntry(Ctx, Conf, Module, Method) {
    const Params = (Ctx.Params || []).map(Par => [
        Par.split(" ")[0].replace(/[\{\}]/g, ""),
        Par.split(" ")[1].replace("[", "").replace("]", "?"),
        Par.split(" ").slice(2).join(" ")
    ]);

    const Source = Path.join(Conf.Repository, Module) + `#L${Ctx.Line}`;
    const FormalTags = Ctx.Flags.filter(Tag => ["Setter", "Getter", "Async"].includes(Tag));

    return [
        `## [.${Ctx.Value || (Ctx.Typedef || "").split(" ")[1] || ""}${Method ? `(${Params.map(Par => Par[1]).join(", ")})` : ""}](${Source})${FormalTags.length ? ` [${FormalTags.map(Tag => `**${Tag}**`).join(", ")}]` : ""}`,
        `> ${Ctx.Description || ""}${Ctx.Flags.includes("ReadOnly") ? " [**Read Only**]" : ""}` + (Ctx.Params ? `\n> | Key | Type | Description |\n> | --- | --- | --- |\n${Params.map(Par => `> | ${Par[1]} | ${Par[0].replace(/\*/g, "Any")} | ${Par[2]} |`).join("\n")}` : ""),
        `>\n> ${Ctx.Type ? `Type **${Ctx.Type}**` : (Ctx.Returns ? `Returns **${Ctx.Returns.split(" ")[0].replace(/\*/g, "Any")}** ${Ctx.Returns.split(" ").slice(1).join(" ")}` : (Ctx.Typedef ? `Type **${Ctx.Typedef.split(" ")[0]}**` : "Returns **{Null}**"))}`
    ].join("\n");
}

module.exports = (Files, Module, Tree, Conf) => {

    const Constructor = Tree.findIndex(Element => Element.Value === "constructor") !== -1 ?
    Tree.splice(Tree.findIndex(Element => Element.Value === "constructor"), 1)[0] : "Type Definitions";
    let Methods = [], Values = [], Typedefs = [];

    Tree.filter(Entry => !Entry.Flags.includes("Private"))
    .forEach(Entry => {
        switch (true) {
            case Constructor === "Type Definitions":
            case Entry.Flags.includes("Typedef"):
                Typedefs.push(Entry);
                break;

            case Entry.Flags.includes("Variable"):
                Values.push(Entry);
                break;

            default:
                Methods.push(Entry);
        }
    });

    const Documentation = Path.join(Conf.Repository, Conf.Out);
    const ModuleName = Path.basename(Module, ".js");

    FS.writeFileSync(Path.join(Conf.Out, `${ModuleName}.md`), [
        // Header and index
        `\n# ${ModuleName}${Constructor.Extends ? `\n### Extends **${Constructor.Extends}**` : ""}`,
        `* [Start](${Path.join(Documentation, "Index.md")})\n` + (Files.map(Module => `* [${Module}](${Path.join(Documentation, `${Module}.md`)})`).join("\n")),

        // Constructor information
        (Constructor !== "Type Definitions" ? `${Constructor.Description}${Constructor.Code ? `\n\`\`\`js\n${Constructor.Code}\n\`\`\`` : ""}` + (Conf.Additional[ModuleName] ? `\n\n${Conf.Additional[ModuleName]}` : "") : ""),

        // Properties
        (Values.length ? `\n\n# Values\n` : "") + (Values.map(Element => FormatEntry(Element, Conf, Module, false)).join("\n\n")) +
        (Methods.length ? `\n\n# Methods\n` : "") + (Methods.map(Element => FormatEntry(Element, Conf, Module, true)).join("\n\n")) +
        (Typedefs.length && Constructor !== "Type Definitions" ? `\n\n# Typedefs\n` : "") + (Typedefs.map(Element => FormatEntry(Element, Conf, Module, false)).join("\n\n")) +
        "\n"
    ].join("\n\n"), "utf-8");

}
