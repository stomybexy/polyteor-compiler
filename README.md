# Polyteor-compiler

A set of build plugins for polymer build inside meteor. It handles files with extensions pt.html, vul.html, pt.js and pt.json. Files must be placed under client folder.

``` pt.html``` files are custom polymer elements. ``` vul.html ``` files are polymer elements that will be vulcaninzed when VULCANIZE environment variable is set. ``` pt.js``` files are external ``` javascript ``` files for custom elements. ```pt.json ``` files specify elements to copy to public. More on that later.

* When VULCANIZE environment variable is not set,```pt.html```, ```pt.js``` and ```vul.html``` files are served as static files as if they were in ``` public``` folder except that babel is used to transpile ```es2015``` code inside elements and ```pt.js``` files. 
* When VULCANIZE environment variable is set, ```pt.html``` files are skipped. They are supposed to be integrated in the vulcanization process. Each folder containing a ```vul.html``` file is copied into ```.polyteor``` folder in the project root. Paths are preserved. For example, for ```client/elements/elements.vul.html``` file, the folder ```client/elements``` is copied into ```.polyteor/elements``` recursively. Custom elements that are vulcanized in the process have to be placed inside the same folder as ```elements.vul.html``` or in a subfolder to get copied into the ```.polyteor``` folder so that relative paths are preserved. If some bower_components are used, relatives paths to these dependencies have to be considered as if elements where in ```.polyteor``` folder. It is recommended to place bower_components inside ```.polyteor``` folder and use a package like [jonatan:static-folder](https://atmospherejs.com/jonatan/static-folder) to serve them. 
``` pt.json ``` files are used to describe elements to copy into public folder because they are not vulcanized. It has the following structure: 
```js
  {
  "copy": [
    {
      "src": "bower_components/webcomponentsjs/webcomponents-lite.min.js",
      "dest": "bower_components/webcomponentsjs/webcomponents-lite.min.js"
    },
    {
      "src": "bower_components/platinum-sw/bootstrap",
      "dest": "elements/bootstrap"
    }
  ]
}

```
```src``` is relative to ```.polyteor``` folder and ```dest``` to ```public``` folder.
