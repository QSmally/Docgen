
# Documentation Generator

This module creates in-depth Markdown documentation based on your JSDoc comments.

### Example Config
```jsonc
{
    "Source": "./lib/",            // Where the docgen has to look to generate files.
    "Keys":   "./Main.js",         // An object with, as keys, the file names of the files to generate docs for.
    "Out":    "./Documentations/", // Output directory of the Markdown files.

    // Additional text per file, to include deprecations or how-to's.
    "Additional": {
        "Cube":   "To create your own, please create another class which extends this one.",
        "MyCube": "Once you initialise MyCube, you cannot change the name."
    },

    // Repository URL (with blob/{branch}) to link.
    "Repository": "https://github.com/QSmally/Docgen/blob/master"
}
```
