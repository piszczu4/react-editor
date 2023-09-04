export const initialContent = `

`;
/* 

<h1 style="margin-left: 0px!important;">Test</h1><h2 style="margin-left: 0px!important;">Basic text formatting</h2><ol data-style-type="decimal" style="list-style-type: decimal"><li><p style="margin-left: 0px!important;"><strong>Bold</strong></p></li><li><p style="margin-left: 0px!important;"><u>Underline</u></p></li><li><p style="margin-left: 0px!important;"><em>Italic</em></p></li><li><p style="margin-left: 0px!important;"><span style="text-decoration: line-through">Strikethrough</span></p></li><li><p style="margin-left: 0px!important;">Sub<sub>script</sub></p></li><li><p style="margin-left: 0px!important;">Super<sup>script</sup></p></li><li><p style="margin-left: 0px!important;"><span style="color: rgb(45, 194, 107)">Text </span><span style="color: rgb(230, 126, 35)">Color</span></p></li><li><p style="margin-left: 0px!important;"><span style="background-color: rgb(241, 196, 15)">Background</span> <span style="background-color: rgb(236, 202, 250)">Color</span></p></li><li><p style="margin-left: 0px!important;">F<span style="font-size: 16px" data-font-size="16">O</span><span style="font-size: 17px" data-font-size="17">N</span><span style="font-size: 18px" data-font-size="18">T </span><span style="font-size: 19px" data-font-size="19">SI</span><span style="font-size: 20px" data-font-size="20">Z</span><span style="font-size: 21px" data-font-size="21">E</span></p></li><li><p style="margin-left: 0px!important;"><span style="font-family: Impact">Font </span><span style="font-family: Courier New">Family</span></p></li><li><p style="margin-left: 0px!important;"><span style="font-family: monospace"><kbd>Keyboard</kbd></span></p></li></ol><hr><h2 style="margin-left: 0px!important;">Link</h2><p style="margin-left: 0px!important;"><a target="_blank" rel="noopener noreferrer nofollow" class="mw-link" href="https://prosemirror.net/" data-text="link">link</a></p><hr><h2 style="margin-left: 0px!important;">Code</h2><p style="margin-left: 0px!important;"><code>Inline</code> or</p><pre><code>Code Block</code></pre><hr><h1 style="margin-left: 0px!important;">Heading 1</h1><h2 style="margin-left: 0px!important;">Heading 2</h2><h3 style="margin-left: 0px!important;">Heading 3</h3><h4 style="margin-left: 0px!important;">Heading 4</h4><h5 style="margin-left: 0px!important;">Heading 5</h5><h6 style="margin-left: 0px!important;">Heading 6</h6><hr><h2 style="margin-left: 0px!important;">Text Align</h2><p style="margin-left: 0px!important;">LEFT</p><p style="margin-left: 0px!important;; text-align: center">CENTER</p><p style="margin-left: 0px!important;; text-align: right">RIGHT</p><hr><h2 style="margin-left: 0px!important;">Indent</h2><p style="margin-left: 24px!important;"><span style="color: rgb(0, 0, 0); font-family: Open Sans, Arial, sans-serif">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed ullamcorper nulla. Quisque nec condimentum orci, et hendrerit justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam eu sem velit. Mauris vitae velit lacus. Morbi pharetra dapibus turpis. Donec dignissim, arcu at auctor finibus, nisi augue rhoncus erat, et feugiat sem est id metus.</span></p><hr><h2 style="margin-left: 0px!important;">Bullet List</h2><ul data-style-type="disc" style="list-style-type: disc"><li><p style="margin-left: 0px!important;">One</p></li><li><p style="margin-left: 0px!important;">Two</p><ul data-style-type="circle" style="list-style-type: circle"><li><p style="margin-left: 0px!important;">Nested</p></li><li><p style="margin-left: 0px!important;">Nested</p><ul data-style-type="square" style="list-style-type: square"><li><p style="margin-left: 0px!important;">Nested x2</p></li></ul></li></ul></li></ul><hr><h2 style="margin-left: 0px!important;">Ordered List</h2><ol data-style-type="decimal" style="list-style-type: decimal"><li><p style="margin-left: 0px!important;">One</p></li><li><p style="margin-left: 0px!important;">Two</p></li></ol><p style="margin-left: 0px!important;"></p><ol data-style-type="lower-greek" style="list-style-type: lower-greek"><li><p style="margin-left: 0px!important;">One</p></li><li><p style="margin-left: 0px!important;">Two</p></li></ol><hr><h2 style="margin-left: 0px!important;">Task List</h2><ul data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p style="margin-left: 0px!important;">One</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p style="margin-left: 0px!important;">Two</p></div></li></ul><hr><h2 style="margin-left: 0px!important;">Blockquote</h2><blockquote><p style="margin-left: 0px!important;">This is a quote...</p></blockquote><hr><h2 style="margin-left: 0px!important;">Spoiler</h2><spoiler class="spoiler" data-spoiler="reveal-spoiler"><div><p style="margin-left: 0px!important;">This is spoiler...</p></div></spoiler><hr><h2 style="margin-left: 0px!important;">Details</h2><details class="mw-editor-details"><summary class="mw-editor-details__summary">Summary</summary><div data-type="detailsContent"><p style="margin-left: 0px!important;">Some text...</p></div></details><hr><h2 style="margin-left: 0px!important;">Math Inline</h2><p style="margin-left: 0px!important;">This is a frac <math-inline class="math-node"><span class="math-src">\\frac{1}{2}</span><span class="math-render"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><annotation encoding="application/x-tex">\frac{1}{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1.1901em; vertical-align: -0.345em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.8451em;"><span class="" style="top: -2.655em;"><span class="pstrut" style="height: 3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span><span class="" style="top: -3.23em;"><span class="pstrut" style="height: 3em;"></span><span class="frac-line" style="border-bottom-width: 0.04em;"></span></span><span class="" style="top: -3.394em;"><span class="pstrut" style="height: 3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height: 0.345em;"><span class=""></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></math-inline>.</p><hr><h2 style="margin-left: 0px!important;">Math Display</h2><math-display class="math-node"><span class="math-src">a^2+b^2=c^2</span><span class="math-render"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2</mn></msup><mo>=</mo><msup><mi>c</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">a^2+b^2=c^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.9474em; vertical-align: -0.0833em;"></span><span class="mord"><span class="mord mathnormal">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.8641em;"><span class="" style="top: -3.113em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right: 0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right: 0.2222em;"></span></span><span class="base"><span class="strut" style="height: 0.8641em;"></span><span class="mord"><span class="mord mathnormal">b</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.8641em;"><span class="" style="top: -3.113em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 0.8641em;"></span><span class="mord"><span class="mord mathnormal">c</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.8641em;"><span class="" style="top: -3.113em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span></span></math-display><hr><h2 style="margin-left: 0px!important;">Panel</h2><div classname="mw-panel" data-panel-type="info"><div data-panel-content="true" classname="mw-panel--content" style=""><p style="margin-left: 0px!important;">Info</p></div></div><div classname="mw-panel" data-panel-type="note"><div data-panel-content="true" classname="mw-panel--content" style=""><p style="margin-left: 0px!important;">Note</p></div></div><div classname="mw-panel" data-panel-type="success"><div data-panel-content="true" classname="mw-panel--content" style=""><p style="margin-left: 0px!important;">Success</p></div></div><div classname="mw-panel" data-panel-type="warning"><div data-panel-content="true" classname="mw-panel--content" style=""><p style="margin-left: 0px!important;">Warning</p></div></div><div classname="mw-panel" data-panel-type="error"><div data-panel-content="true" classname="mw-panel--content" style=""><p style="margin-left: 0px!important;">Danger</p></div></div><hr><h2 style="margin-left: 0px!important;">Math Block</h2><div class="mw-math-panel" data-math-panel-type="definition"><div class="mw-math-panel--name"><p style="margin-left: 0px!important;">Definition</p></div><div class="mw-math-panel--body"><p style="margin-left: 0px!important;"></p></div></div><div class="mw-math-panel" data-math-panel-type="theorem"><div class="mw-math-panel--name"><p style="margin-left: 0px!important;">Theorem</p></div><div class="mw-math-panel--body"><p style="margin-left: 0px!important;"></p></div></div><div class="mw-math-panel" data-math-panel-type="example"><div class="mw-math-panel--name"><p style="margin-left: 0px!important;">Example</p></div><div class="mw-math-panel--body"><p style="margin-left: 0px!important;"></p></div></div><div class="mw-math-panel" data-math-panel-type="remark"><div class="mw-math-panel--name"><p style="margin-left: 0px!important;">Remark</p></div><div class="mw-math-panel--body"><p style="margin-left: 0px!important;"></p></div></div><hr><h2 style="margin-left: 0px!important;">Mention</h2><p style="margin-left: 0px!important;"><span data-type="mention" data-id="Jarosław Piszczek">@Jarosław Piszczek</span></p><hr><h2 style="margin-left: 0px!important;">Emoji</h2><p style="margin-left: 0px!important;"><span data-name="zap" data-type="emoji">⚡</span> <span data-name="laughing" data-type="emoji">😆</span> <span data-name="+1" data-type="emoji">👍</span></p><hr><p style="margin-left: 0px!important;"></p>

*/
