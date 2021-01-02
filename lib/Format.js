
const Path = require("path");
const FS   = require("fs");

function ParseParams(Params) {
    return (Params || [])
    .map(Par => Par.split(/[\}]/))
    .map(Par => [Par[0], ...Par[1].trim().split(" ")])
    .map(Par => [
        Par[0].replace(/[\{]/g, ""),
        Par[1].replace("[", "").replace("]", "?"),
        Par.slice(2).join(" ")
    ]);
}

function FormatEntry(Ctx, Repository, Module, Method, Typedef) {
    const FormalTags = Ctx.Flags.filter(Tag => ["Setter", "Getter", "Async", "Static"].includes(Tag));
    const Source     = Repository + Module + `#L${Ctx.Line}`;
    const Params     = ParseParams(Ctx.Params);

    const Ref = Ctx.Reference;

    return [
        `## [${!Typedef ? "." : ""}${Ctx.Value || (Ctx.Typedef || "").split(" ")[1] || ""}${Method ? `(${Params.map(Par => Par[1]).join(", ")})` : ""}](${Source})${FormalTags.length ? ` [${FormalTags.map(Tag => `**${Tag}**`).join(", ")}]` : ""}`,
        `> ${Ctx.Description || ""}${Ctx.Flags.includes("ReadOnly") ? " [**Read Only**]" : ""}` + (Ctx.Params ? `\n> | Key | Type | Description |\n> | --- | --- | --- |\n${Params.map(Par => `> | ${Par[1]} | ${Par[0].replace(/\|/g, ", ").replace(/\*/g, "Any")} | ${Par[2]} |`).join("\n")}` : ""),
        `>\n> ${Ctx.Type ? `Type **${Ref ? `[${Ctx.Type}](${Ref})` : Ctx.Type}**` : (Ctx.Returns ? `Returns **${Ref ? "[" : ""}${Ctx.Returns.split(" ")[0].replace(/\*/g, "Any")}${Ref ? `](${Ref})` : ""}** ${Ctx.Returns.split(" ").slice(1).join(" ")}` : (Ctx.Typedef ? `Type **${Ctx.Typedef.split(" ")[0]}**` : "Returns **{Null}**"))}`
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

    let ConstrParams = [];

    if (Constructor !== "Type Definitions" && (Constructor.Params || []).length) {
        ConstrParams = ParseParams(Constructor.Params)
        .filter(Par => !Par[1].startsWith("_"));
    }

    const Documentation = Conf.Repository + Conf.Out;
    const ModuleName    = Path.basename(Module, ".js");
    const Ref           = Constructor.Reference;

    FS.writeFileSync(Path.join(Conf.Out, `${ModuleName}.md`), [
        // Header and index
        `\n# ${ModuleName}${Constructor.Extends ? `\n### Extends **${Ref ? "[" : ""}${Constructor.Extends}${Ref ? `](${Ref})` : ""}**` : ""}`,
        (!Conf.Overview ? ((Conf.Index ? `* [Start](${Documentation + "Index.md"})\n` : "") + (Files.map(Module => `* [${Module}](${Documentation + `${Module}.md`})`).join("\n"))) :
        (Object.keys(Conf.Overview).map(Name => Name ? (Name.startsWith("#") ? `\n**${Conf.Overview[Name]}**` : `* [${Name}](${Documentation + `${Conf.Overview[Name]}.md`})`) : "").join("\n"))),

        // Constructor information
        (Constructor !== "Type Definitions" ? `${Constructor.Description}${Constructor.Code ? `\n\`\`\`js\n${Constructor.Code}\n\`\`\`` : ""}` : "") +
        (Constructor !== "Type Definitions" && ConstrParams.length ? `\n\n| Key | Type | Description |\n| --- | --- | --- |\n${ConstrParams.map(Par => `| ${Par[1]} | ${Par[0].replace(/\|/g, ", ").replace(/\*/g, "Any")} | ${Par[2]} |`).join("\n")}` : "") +
        (Conf.Additional[ModuleName] ? `\n\n${Conf.Additional[ModuleName]}` : ""),

        // Properties
        (Values.length ? `\n\n# Values\n` : "") + (Values.map(Element => FormatEntry(Element, Conf.Repository, Module, false, false)).join("\n\n")) +
        (Methods.length ? `\n\n# Methods\n` : "") + (Methods.map(Element => FormatEntry(Element, Conf.Repository, Module, true, false)).join("\n\n")) +
        (Typedefs.length && Constructor !== "Type Definitions" ? `\n\n# Typedefs\n` : "") + (Typedefs.map(Element => FormatEntry(Element, Conf.Repository, Module, false, true)).join("\n\n")) +
        "\n"
    ].join("\n\n"), "utf-8");

}
