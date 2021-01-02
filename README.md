
# Documentation Generator

This module creates in-depth Markdown documentation based on JSDoc comments.

[Here's an example of how the documentations look like!](https://github.com/QSmally/Docgen/blob/master/Test/Documentations/Cube.md)

### How To Use

To generate documentations for your module, customise the [configuration](#example-config) and enter the following command in your **Node scripts** or manually:
```bash
gendocs [Path to configuration file]
```

### Example Config
```jsonc
{
    "Source": "lib/",            // Where the docgen has to look to generate files.
    "Out":    "Documentations/", // Output directory of the Markdown files.
    "Index":  true,              // Whether or not to include a custom 'Index.md' in the documentations.

    // Additional text per file, to include deprecations or how-to's.
    "Additional": {
        "Cube":   "To create your own, please create another class which extends this one.",
        "MyCube": "Once you initialise MyCube, you cannot change the name."
    },

    // Repository URL (with blob/{branch}) to link.
    "Repository": "https://github.com/QSmally/Docgen/blob/master/",

    // File names to make docs for. Types:
    // Array - An array of file paths to 'whitelist' for making docs (this is also going to be the sort order),
    // Boolean true - To indicate all files - but sort order is based on the directory tree,
    // Boolean false - To generate docs for all files, sorted by their ASCII character order.
    // String - Path to the JS file with an object, and as keys, the keys to use.
    "Keys": ["lib/Cube", "lib/Extensions/MyCube", "lib/Extensions/CustomCube"],

    // If you have a seperate file with type definitions, and you're using the Key Path or
    // the array of files option, you can add the files to add to type definitions here. If you want
    // all files to be added to generate docs from, apply either 'true' or 'false' to the Keys value.
    "Typedefs": ["lib/Types/MyTypes"],

    // The order in which the documentation index will be set. `Index` will get ignored.
    // Create an entry with a leading `#` (but still unique) as key for it to count as a title
    // for the next doc files. This can also be a `false` boolean to use the Keys sort order.
    "Overview": {
        "Cube": "Cube",
        "#Ext": "Ext. of Cube",
        "MyCube": "MyCube",
        "My Custom One": "CustomCube"
    }
}
```
