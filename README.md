
# Documentation Generator

This module creates in-depth Markdown documentation based on your JSDoc comments.

### How To Use

To generate documentations for your module, customise the [configuration](#example-config) and enter the following command in your Node script:
```bash
gendocs [Path to configuration file]
```

### Example Config
```jsonc
{
    "Source": "./lib/",            // Where the docgen has to look to generate files.
    "Out":    "./Documentations/", // Output directory of the Markdown files.

    // Additional text per file, to include deprecations or how-to's.
    "Additional": {
        "Cube":   "To create your own, please create another class which extends this one.",
        "MyCube": "Once you initialise MyCube, you cannot change the name."
    },

    // Repository URL (with blob/{branch}) to link.
    "Repository": "https://github.com/QSmally/Docgen/blob/master",

    // File names to make docs for.
    // An array of keys to 'whitelist' for making docs (this is also going to be the sort order),
    // just a value 'true' to indicate all files - but sort order is based on the directory tree,
    // or 'false' to generate docs for all files, sorted by their ASCII character order.
    "Keys": ["Cube", "MyCube", "CustomCube"]
}
```
