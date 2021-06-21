# Styling Just Because

Eventually Griptape will come with a UI library that will help build apps fast with reasonably not ugly styling. For now, let's just add to stylesheet files so things look good enough

Add the import lines 5-7 highlighted below.

**/src/main.js**
```javascript {5-7}
import App from './App.vue'

import { gripVueJsApp } from '@stakeordie/griptape-vue.js'

import '@/assets/styles/index.scss'

import "~/@stakeordie/griptape-vue.js/dist/style.css"

// Griptape config
const conf = {
  restUrl: 'https://api.holodeck.stakeordie.com'
}

// Grip the vue app
gripVueJsApp(conf, App, (app, pinia) => {})
```

Create two new files `/src/assets/styles/_reset.css` and `/src/assets/styles/index.scss`

Add code to each:

**_reset.css**
```css
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```
and
**test**
```scss
@import "reset";

@import url('https://fonts.googleapis.com/css2?family=Hind:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hind:wght@400;700&family=Montserrat:wght@400;700&display=swap');

html {
  --font-size: 16px;
  --gutter: 16px;

  --font-size-h1: 46px;
  --font-size-h2: 36px;
  --font-size-h3: 22px;
  --font-size-h4: 18px;
  --font-size-h5: 16px;
  --font-size-h6: 14px;

  font-family: 'Hind', sans-serif;
  font-size: var(--font-size);
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat';
  font-weight: bold;
  margin: calc(var(--gutter) * 1.2) 0;
  letter-spacing: 1px;
}

h1 { font-size: var(--font-size-h1) }
h2 { font-size: var(--font-size-h2) }
h3 { font-size: var(--font-size-h3) }
h4 { font-size: var(--font-size-h4) }
h4 { font-size: var(--font-size-h4) }
h6 { font-size: var(--font-size-h6) }

header {
  border-bottom: 1px solid black;
  padding: var(--gutter);

  display: grid;
  grid-auto-flow: column;
  grid-column-gap: var(--gutter);
  grid-auto-columns: max-content;
  align-items: center;

  .logo {
    font-family: 'Montserrat', sans-serif;
    font-size: calc(var(--font-size) * 1.2);
  }
}

main {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  margin-top: calc(var(--gutter) * 2);
}

.auctions {

  ul {
    display: grid;
    grid-template-columns: repeat(3, max-content);
    grid-column-gap: var(--gutter);

    li {
      border: 1px solid black;
      border-radius: 4px;
      padding: var(--gutter);
      margin-bottom: var(--gutter);
      width: 320px;

      div {
        margin-bottom: calc(var(--gutter) * .8);

        span {
          font-weight: bold;
        }
      }
    }
  }
}

```
