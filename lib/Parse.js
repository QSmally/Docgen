
const FS = require("fs");

module.exports = File => {
    const Buffer = FS.readFileSync(File, "utf-8")
    .split("\n").map(Line => Line.trim());

    const Comments = [];

    while (Buffer.indexOf("/**") !== -1) {
        const sIdx = Buffer.indexOf("/**");
        const eIdx = Buffer.indexOf("*/");

        const Comment = Buffer.slice(sIdx, eIdx + 2);
        Comment.push(sIdx.toString());

        Comments.push(Comment);
        Buffer[sIdx] = Buffer[eIdx] = "Mapped";
    }

    return Comments.map(Comment => {
        return Comment
        .filter(Line => !["/**", "*/"].includes(Line))
        .map(Line => Line.replace("* ", ""));
    }).map(Tree => {

        const Line   = parseInt(Tree.pop()) + 1;
        const Value  = Tree.splice(Tree.length - 1, 1)[0].split(" ");
        const Output = {Value: Value[Value[0] === "async" ? 1 : 0], Flags: [], Line};

        let CtxTag = "Description";

        Tree.forEach(Line => {
            const Contents = Line.split(" ").slice(1).join(" ");
            const Keyword  = Line.split(" ")[0];
            switch (Keyword) {
                case "@param":
                    if (!Output.Params) Output.Params = [];
                    Output.Params.push(Contents);
                    CtxTag = "Param";
                    break;

                case "@example":
                    Output.Code = Contents;
                    break;

                case "@returns":
                    Output.Returns = Contents;
                    CtxTag = "Returns";
                    break;

                case "@extends":
                case "@typedef":
                case "@type":
                    const Type = Keyword.slice(1);
                    Output[Type[0].toUpperCase() + Type.slice(1)] = Contents;
                    if (Keyword === "@typedef") Output.Flags.push("Typedef");
                    break;

                case "@deprecated":
                case "@copyright":
                case "@readonly":
                case "@exports":
                case "@private":
                case "@author":
                case "@async":
                case "@name":
                case "@enum":
                    if ([
                        "@async", "@copyright", "@author", "@exports", "@enum"
                    ].includes(Keyword)) break;

                    Output.Flags.push({
                        "@deprecated": "Deprecated",
                        "@readonly":   "ReadOnly",
                        "@private":    "Private",
                        "@name":       "Variable"
                    }[Keyword]);

                    if (Keyword === "@name") {
                        Output.Value = Contents.split("#")[1];
                        if (["get", "set"].includes(Value[0])) {
                            Output.Action = {
                                get: "Getter",
                                set: "Setter"
                            }[Value[0]];
                            Output.Refer = Value[1];
                        }
                    }

                    break;

                default:
                    if (CtxTag === "Description" && !Output.Description) Output.Description = Line;
                    else if (CtxTag === "Param") Output.Params[Output.Params.length - 1] += ` ${Line}`;
                    else Output[CtxTag] += ` ${Line}`;
            }
        });

        if (Value[0] === "async")
        Output.Flags.push("Async");

        return Output;

    }).filter((Parsed, _i, Comments) => {
        if (Parsed.Action) {
            const RelatedComment = Comments.find(c => c.Value === Parsed.Value && !["Setter", "Getter"].includes(c.Action));
            if (!RelatedComment) return true;

            const ROIndex = RelatedComment.Flags.indexOf("ReadOnly");
            const PRIndex = RelatedComment.Flags.indexOf("Private");

            if (ROIndex !== -1 && Parsed.Action === "Setter") RelatedComment.Flags.splice(ROIndex, 1);
            if (PRIndex !== -1) RelatedComment.Flags.splice(PRIndex, 1);

            RelatedComment.Flags.push(Parsed.Action);
            RelatedComment.Refer = Parsed.Refer;
            RelatedComment.Type = Parsed.Type;

            return false;
        } else {
            return true;
        }
    });
}
