#!/usr/bin/env node

/*
    Generates documentations
*/

const Path = require("path");
const FS   = require("fs");
let Files = [];

console.log(process.argv);
if (!process.argv[2]) throw "Missing config file";
const Conf = JSON.parse(FS.readFileSync(process.argv[2], "utf-8"));

function ThroughDirectory(Directory) {
    FS.readdirSync(Directory).forEach(File => {
        const Absolute = Path.join(Directory, File);
        if (FS.statSync(Absolute).isDirectory()) return ThroughDirectory(Absolute);
        else return Files.push(Absolute);
    });
}

ThroughDirectory(Conf.Source);

const FileNames = Files.map(File => Path.basename(File, ".js"));
let Keys = typeof Conf.Keys === "boolean" ? FileNames :
Conf.Keys.filter(Key => FileNames.includes(Key));

if (Conf.Keys === false) Keys = Keys.sort();

if (typeof Conf.Keys === "string")
Keys = require(Path.join("../../", Conf.Keys)) // This is not reliable, but it works
.filter(Key => FileNames.includes(Key))

Keys
.map(Module => Files[FileNames.indexOf(Module)])
.forEach((Context, _i, Files) => {
    const Parsed = require("./Parse")(Context);
    if (Parsed.length) require("./Format")(Files.map(File => Path.basename(File, ".js")), Context, Parsed, Conf);
});
