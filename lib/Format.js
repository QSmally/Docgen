
const Path = require("path");
const FS   = require("fs");

function FormatEntry(Ctx, Doc, Module, Method) {
    const Params = (Ctx.Params || []).map(Par => [
        Par.split(" ")[0].replace(/[\{\}]/g, ""),
        Par.split(" ")[1].replace("[", "").replace("]", "?"),
        Par.split(" ").slice(2).join(" ")
    ]);

    const Source = Path.join(Doc, Module.split("/").slice(1).join("/")) + `#L${Ctx.Line}`;
    const FormalTags = Ctx.Flags.filter(Tag => ["Setter", "Getter", "Async"].includes(Tag));

    return [
        `## [.${Ctx.Value}${Method ? `(${Params.map(Par => Par[1]).join(", ")})` : ""}](${Source})${FormalTags.length ? ` [${FormalTags.map(Tag => `**${Tag}**`).join(", ")}]` : ""}`,
        `> ${Ctx.Description}${Ctx.Flags.includes("ReadOnly") ? " [**Read Only**]" : ""}` + (Ctx.Params ? `\n> | Key | Type | Description |\n> | --- | --- | --- |\n${Params.map(Par => `> | ${Par[1]} | ${Par[0].replace(/\*/g, "Any")} | ${Par[2]} |`).join("\n")}` : ""),
        `>\n> ${Ctx.Type ? `Type **${Ctx.Type}**` : (Ctx.Returns ? `Returns **${Ctx.Returns.split(" ")[0].replace(/\*/g, "Any")}** ${Ctx.Returns.split(" ").slice(1).join(" ")}` : "Returns **{Null}**")}`
    ].join("\n");
}

module.exports = (Files, Module, Tree, Conf) => {

    const Constructor = Tree.splice(Tree.findIndex(Element => Element.Value === "constructor"), 1)[0];
    let Methods = [], Values = [];

    Tree.filter(Entry => !Entry.Flags.includes("Private"))
    .forEach(Entry => {
        if (Entry.Flags.includes("Variable")) Values.push(Entry);
        else Methods.push(Entry);
    });

    const Documentation = Path.join(Conf.Repository, Conf.Out);
    const ModuleName = Path.basename(Module, ".js");

    FS.writeFileSync(Path.join(Conf.Out, `${ModuleName}.md`), [
        `\n# ${ModuleName}${Constructor.Extends ? `\n### Extends **${Constructor.Extends}**` : ""}`,
        `* [Start](${Path.join(Documentation, "Index.md")})\n` + (Files.map(Module => `* [${Module}](${Path.join(Documentation, `${Module}.md`)})`).join("\n")),
        `${Constructor.Description}${Constructor.Code ? `\n\`\`\`js\n${Constructor.Code}\n\`\`\`` : ""}` + (Conf.Additional[ModuleName] ? `\n\n${Conf.Additional[ModuleName]}` : ""),
        (Values.length ? `\n\n# Values\n` : "") + (Values.map(Element => FormatEntry(Element, Documentation, Module, false)).join("\n\n")),
        (Methods.length ? `\n\n# Methods\n` : "") + (Methods.map(Element => FormatEntry(Element, Documentation, Module, true)).join("\n\n"))
    ].join("\n\n"), "utf-8");

}
