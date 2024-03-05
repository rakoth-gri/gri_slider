### GRI-slider is an image carousel, easy to integrate into your Javascript project

#### 0. The following technologies were used in the development

    1. scss / css - to create base styles;
    2. vanilla js - to create logic and render the carousel
    3. TS - for type checking;

#### 1. Three simple steps to connect a carousel to your project

1. Create an HTML-markup in your index.html file with with pre-prepared classes:

```html
<section class="gri-slider">
  <!-- click for previous slide -->
  <div class="gri-slider__prev">
    <span class="material-symbols-outlined gri-slider__prev_el" id="prev">
      arrow_left_alt
    </span>
  </div>
  <!-- container for dynamic rendering of functional slider core -->
  <div class="gri-slider__body">
    <!-- RENDER -->
  </div>
  <!-- click for the next slide -->
  <div class="gri-slider__next">
    <span class="material-symbols-outlined gri-slider__next_el" id="next">
      arrow_right_alt
    </span>
  </div>
</section>
```

2. Add a pre-prepared css-file in the head element of your markup:

```html
<head>
  <!-- other meta content -->
  <!-- specify the root to gri-slider folder in your project -->
  <link rel="stylesheet" href="./gri-slider/index.min.css" />
</head>
```

3. Import a AutoSlider class into your main.js file, as shown below:

- connection js-file to html:

```html
<head>
  <!-- specify the root to your main js-file in your project: -->
  <script src="./index.js" defer type="module"></script>
</head>
```

- inside your main js-file:

```javascript
// specify the root to 'gri-slider' folder in your project:
import AutoSlider from "./gri-slider/index.js";

// invoke the AutoSlider class with options:

new AutoSlider({
  list: MY_SLIDE_LIST, // required
  options: { fontFamily: "Montserrat", color: "orangered" }, // optional
  isAutoSlider: true, // optional
  panel: ["renderDots"], // optional
  imgInSlideCount: 1, // optional
});
```

- the most simple way to start using Slider:

```javascript
// specify the root to 'gri-slider' folder in your project:
import AutoSlider from "./gri-slider/index.js";

new AutoSlider({ list: MY_SLIDE_LIST });
```

#### 2. Let's talk about the options we can pass into **_AutoSlider_** class

#### 'list' - the only required property for creating a dynamic carousel. This is an Array of objects kind of:

```javascript
const MY_SLIDE_LIST = [
  {
    // required prop
    slideImg: "https://remote-site.com/picture1.jpg",
    // optional prop
    comment: "comment for picture1",
    // optional prop
    controlImg: "./src/my-icons/icon.svg",
  },
  {
    slideImg: "https://remote-site.com/picture2.jpg",
  },
  {
    slideImg: "https://remote-site.com/picture3.jpg",
    comment: "comment for picture3",
  },
];
```

As we can see above, each item of **MY_SLIDE_LIST** potentially has three properties:

- **slideImg** defines the path to the picture of carousel (**required**)
- **comment** defines the comment to a specific picture (**optional**)
- **controlImg** defines the type of icon for slider control buttons stylizing (**optional**). **It's enought to define 'controlImg' prop only in the first item of MY_SLIDE_LIST**

Types of values that can be assigned to each of the props:

- **slideImg** --> string
- **comment** --> string | null | undefined
- **controlImg** --> string | null | undefined

#### 'options' - the optional property for customizing styles of main container (.gri-slider). This is a javascript CSSStyleDeclaration object kind of:

```javascript
{
    fontFamily: "Montserrat", // inherited CSS-prop
    color: "orangered", // inherited-CSS prop
    width: '700px',
    textAlign: 'center' // inherited-CSS prop
}
```

This property adds an inline-styles to main slider container. Attention: **if the transferred CSS property is inherited, it will be inherited by all descendants inside main slider container!!** <br>
By default: {}

#### 'isAutoSlider' - the optional boolean property activating the automatic change of images in the carousel:

```javascript
new AutoSlider({
  list: MY_SLIDE_LIST, // required
  isAutoSlider: true, // optional
});
```

By default: false

#### 'imgInSlideCount' - the optional number property which determines the number of images within a single slide:

```javascript
new AutoSlider({
  list: MY_SLIDE_LIST, // required
  imgInSlideCount: 2, // optional
});
```

By default: 1

#### 'panel' - the optional property which connects the slider control panel.

The property is a single-length string Array. there must be only two type of values in the Array: **'renderDots' | 'renderControls'**. Each value will determine the appearance of the control panel.

```javascript
new AutoSlider({
  list: MY_SLIDE_LIST, // required
  panel: ["renderDots"], // optional
});
```

Attention, if your choice is **'renderControls'** - you can also specify the icon for the control item: simply indicate the **icon url** for **controlImg** field in the first item of **'list'** Array:

```javascript
const MY_SLIDE_LIST = [
  // first item of 'list' Array!
  {
    // required prop
    slideImg: "https://remote-site.com/picture1.jpg",   
    // optional prop
    controlImg: "./src/my-icons/icon.svg",
  },
];
```

By default, the panel is not connected
