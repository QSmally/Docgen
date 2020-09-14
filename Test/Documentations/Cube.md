
# Cube

* [Cube](https://github.com/QSmally/Docgen/blob/master/Test/Documentations/Cube.md)
* [CustomCube](https://github.com/QSmally/Docgen/blob/master/Test/Documentations/CustomCube.md)
* [MyCube](https://github.com/QSmally/Docgen/blob/master/Test/Documentations/MyCube.md)
* [Types](https://github.com/QSmally/Docgen/blob/master/Test/Documentations/Types.md)

A basic Cube measure.
```js
const Cube = new Cube(5, 3);
```

| Key | Type | Description |
| --- | --- | --- |
| x | Number | Length of this Cube. |
| z | Number | Width of this Cube. |

To create your own, please create another class which extends this one.



# Values
## [.Length](https://github.com/QSmally/Docgen/blob/master/Test/lib/Cube.js#L14)
> The length of this Cube. [**Read Only**]
>
> Type **{Number}**

## [.Width](https://github.com/QSmally/Docgen/blob/master/Test/lib/Cube.js#L22)
> The width of this Cube. [**Read Only**]
>
> Type **{Number}**

# Methods
## [.Square()](https://github.com/QSmally/Docgen/blob/master/Test/lib/Cube.js#L32) [**Async**]
> Calculates the surface of this Cube.
>
> Returns **{Number}** Area of the Cube.

## [.Info(n)](https://github.com/QSmally/Docgen/blob/master/Test/lib/Cube.js#L41)
> Returns an object with info.
> | Key | Type | Description |
> | --- | --- | --- |
> | n | Object<String, Number> | Foo |
>
> Returns **{Object<n,** l, w>}
