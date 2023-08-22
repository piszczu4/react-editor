export const initialContent = `
<h1 style="margin-left: 0px!important;">Test</h1><h2 style="margin-left: 0px!important;">Basic text formatting</h2><ol data-style-type="decimal" style="list-style-type: decimal"><li><p style="margin-left: 0px!important;"><strong>Bold</strong></p></li><li><p style="margin-left: 0px!important;"><em>Italic</em></p></li><li><p style="margin-left: 0px!important;"><s>Strikethrough</s></p></li><li><p style="margin-left: 0px!important;">Sub <sub>script</sub></p></li><li><p style="margin-left: 0px!important;">Super <sup>script</sup></p></li><li><p style="margin-left: 0px!important;"><span style="color: rgb(45, 194, 107)">Text </span><span style="color: rgb(230, 126, 35)">Color</span></p></li><li><p style="margin-left: 0px!important;"><mark data-color="rgb(185, 106, 217)" style="background-color: rgb(185, 106, 217); color: inherit">Background</mark> <mark data-color="rgb(53, 152, 219)" style="background-color: rgb(53, 152, 219); color: inherit">Color</mark></p></li><li><p style="margin-left: 0px!important;">F<span style="font-size: 16px" data-font-size="16">O</span><span style="font-size: 17px" data-font-size="17">N</span><span style="font-size: 18px" data-font-size="18">T </span><span style="font-size: 19px" data-font-size="19">SI</span><span style="font-size: 20px" data-font-size="20">Z</span><span style="font-size: 21px" data-font-size="21">E</span></p></li><li><p style="margin-left: 0px!important;"><span style="font-family: Impact">Font </span><span style="font-family: Courier New">Family</span></p></li><li><p style="margin-left: 0px!important;"><span style="font-family: monospace"><kbd>Keyboard</kbd></span></p></li></ol><hr><h2 style="margin-left: 0px!important;">Link</h2><p style="margin-left: 0px!important;"><a target="_blank" rel="noopener noreferrer nofollow" class="mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link mw-link" href="https://prosemirror.net/" data-text="link">link</a></p><hr><h2 style="margin-left: 0px!important;">Code</h2><p style="margin-left: 0px!important;"><code>Inline</code> or</p><pre><code>Code Block</code></pre><hr><h1 style="margin-left: 0px!important;">Heading 1</h1><h2 style="margin-left: 0px!important;">Heading 2</h2><h3 style="margin-left: 0px!important;">Heading 3</h3><h4 style="margin-left: 0px!important;">Heading 4</h4><h5 style="margin-left: 0px!important;">Heading 5</h5><h6 style="margin-left: 0px!important;">Heading 6</h6><hr><h2 style="margin-left: 0px!important;">Text Align</h2><p style="margin-left: 0px!important;">LEFT</p><p style="margin-left: 0px!important;; text-align: center">CENTER</p><p style="margin-left: 0px!important;; text-align: right">RIGHT</p><hr><h2 style="margin-left: 0px!important;">Indent</h2><p style="margin-left: 24px!important;"><span style="color: rgb(0, 0, 0); font-family: Open Sans, Arial, sans-serif">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed ullamcorper nulla. Quisque nec condimentum orci, et hendrerit justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam eu sem velit. Mauris vitae velit lacus. Morbi pharetra dapibus turpis. Donec dignissim, arcu at auctor finibus, nisi augue rhoncus erat, et feugiat sem est id metus.</span></p><hr><h2 style="margin-left: 0px!important;">Bullet List</h2><ul data-style-type="disc" style="list-style-type: disc"><li><p style="margin-left: 0px!important;">One</p></li><li><p style="margin-left: 0px!important;">Two</p></li></ul><p style="margin-left: 0px!important;"></p><ul data-style-type="circle" style="list-style-type: circle"><li><p style="margin-left: 0px!important;">Three</p></li><li><p style="margin-left: 0px!important;">Four</p></li></ul><hr><h2 style="margin-left: 0px!important;">Ordered List</h2><ol data-style-type="decimal" style="list-style-type: decimal"><li><p style="margin-left: 0px!important;">One</p></li><li><p style="margin-left: 0px!important;">Two</p></li></ol><p style="margin-left: 0px!important;"></p><ol data-style-type="lower-greek" style="list-style-type: lower-greek"><li><p style="margin-left: 0px!important;">One</p></li><li><p style="margin-left: 0px!important;">Two</p></li></ol><hr><h2 style="margin-left: 0px!important;">Task List</h2><ul data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p style="margin-left: 0px!important;">One</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p style="margin-left: 0px!important;">Two</p></div></li></ul><hr><h2 style="margin-left: 0px!important;">Blockquote</h2><blockquote><p style="margin-left: 0px!important;">This is a quote...</p></blockquote><hr><h2 style="margin-left: 0px!important;">Spoiler</h2><spoiler class="spoiler" data-spoiler="Reveal spoiler"><p style="margin-left: 0px!important;">This is spoiler...</p></spoiler><hr><h2 style="margin-left: 0px!important;">Details</h2><details class="mw-editor-details"><summary class="mw-editor-details__summary">Summary</summary><div data-type="detailsContent"><p style="margin-left: 0px!important;">Some text...</p></div></details><hr><h2 style="margin-left: 0px!important;">Math Inline</h2><p style="margin-left: 0px!important;">This is a fraction <math-inline class="math-node">\\frac{3}{4}</math-inline></p><hr><h2 style="margin-left: 0px!important;">Math Display</h2><math-display class="math-node">a^2+b^2=c^2</math-display><hr><h2 style="margin-left: 0px!important;">Panel</h2><div data-panel-type="info"><div data-panel-content="true"><p style="margin-left: 0px!important;">Info</p></div></div><div data-panel-type="note"><div data-panel-content="true"><p style="margin-left: 0px!important;">Note</p></div></div><div data-panel-type="success"><div data-panel-content="true"><p style="margin-left: 0px!important;">Success</p></div></div><div data-panel-type="warning"><div data-panel-content="true"><p style="margin-left: 0px!important;">Warning</p></div></div><div data-panel-type="error"><div data-panel-content="true"><p style="margin-left: 0px!important;">Danger</p></div></div><hr><h2 style="margin-left: 0px!important;">Math Block</h2><div class="mw-math-panel" data-math-panel-type="definition"><div class="mw-math-panel--name"><p style="margin-left: 0px!important;">Definition</p></div><div class="mw-math-panel--body"><p style="margin-left: 0px!important;">...</p></div></div><div class="mw-math-panel" data-math-panel-type="theorem"><div class="mw-math-panel--name"><p style="margin-left: 0px!important;">Theorem</p></div><div class="mw-math-panel--body"><p style="margin-left: 0px!important;">...</p></div></div><div class="mw-math-panel" data-math-panel-type="example"><div class="mw-math-panel--name"><p style="margin-left: 0px!important;">Example</p></div><div class="mw-math-panel--body"><p style="margin-left: 0px!important;">...</p></div></div><div class="mw-math-panel" data-math-panel-type="remark"><div class="mw-math-panel--name"><p style="margin-left: 0px!important;">Remark</p></div><div class="mw-math-panel--body"><p style="margin-left: 0px!important;">...</p></div></div><hr><h2 style="margin-left: 0px!important;">Image</h2><figure data-type="image" width="75%" height="auto" data-align="center" data-caption="true"><img src="https://nypost.com/wp-content/uploads/sites/2/2021/05/hedgehog.jpg" width="100%" height="429.8925"><figcaption data-caption="true"><p style="margin-left: 0px!important;"><strong>Fig 1</strong>. Hedgehodge</p></figcaption></figure><hr><h2 style="margin-left: 0px!important;">Video</h2><figure data-type="iframe" width="75%" height="100%" data-align="center" data-caption="false"><iframe src="//player.vimeo.com/video/347119375" width="100%" height="100%"></iframe></figure><hr><h2 style="margin-left: 0px!important;">Table</h2><figure height="auto" data-align="center" data-caption="false"><table><tbody><tr><td colspan="1" rowspan="1" colwidth="96" style="background-color: rgb(241, 196, 15)" data-background-color="rgb(241, 196, 15)"><p style="margin-left: 0px!important;"></p></td><td colspan="1" rowspan="1" style="background-color: rgb(241, 196, 15)" data-background-color="rgb(241, 196, 15)"><p style="margin-left: 0px!important;"></p></td><td colspan="1" rowspan="1" colwidth="25" style="background-color: rgb(241, 196, 15)" data-background-color="rgb(241, 196, 15)"><p style="margin-left: 0px!important;"></p></td><td colspan="1" rowspan="1" style="background-color: rgb(241, 196, 15)" data-background-color="rgb(241, 196, 15)"><p style="margin-left: 0px!important;"></p></td></tr><tr><td colspan="1" rowspan="1" colwidth="96" style="border-bottom: solid rgb(185, 106, 217) 3px" data-border-bottom="solid rgb(185, 106, 217) 3px"><p style="margin-left: 0px!important;"></p></td><td colspan="1" rowspan="1" style="border-bottom: solid rgb(185, 106, 217) 3px" data-border-bottom="solid rgb(185, 106, 217) 3px"><p style="margin-left: 0px!important;"></p></td><td colspan="1" rowspan="1" colwidth="25" style="border-bottom: solid rgb(185, 106, 217) 3px" data-border-bottom="solid rgb(185, 106, 217) 3px"><p style="margin-left: 0px!important;"></p></td><td colspan="1" rowspan="1" style="border-bottom: solid rgb(185, 106, 217) 3px" data-border-bottom="solid rgb(185, 106, 217) 3px"><p style="margin-left: 0px!important;"></p></td></tr><tr><td colspan="1" rowspan="1" colwidth="96" style="border-bottom: dashed rgb(53, 152, 219) 5px" data-border-bottom="dashed rgb(53, 152, 219) 5px"><p style="margin-left: 0px!important;"></p></td><td colspan="1" rowspan="1" style="border-bottom: dashed rgb(53, 152, 219) 5px" data-border-bottom="dashed rgb(53, 152, 219) 5px"><p style="margin-left: 0px!important;"></p></td><td colspan="2" rowspan="2" colwidth="25" style="border-bottom: solid black 5px" data-border-bottom="solid black 5px"><p style="margin-left: 0px!important;">Merged</p></td></tr><tr><td colspan="1" rowspan="1" colwidth="96" style="border-bottom: solid black 5px; border-top: dashed rgb(185, 106, 217) 1px" data-border-bottom="solid black 5px" data-border-top="dashed rgb(185, 106, 217) 1px"><p style="margin-left: 0px!important;"></p></td><td colspan="1" rowspan="1" style="border-bottom: solid black 5px; border-top: dashed rgb(185, 106, 217) 1px" data-border-bottom="solid black 5px" data-border-top="dashed rgb(185, 106, 217) 1px"><p style="margin-left: 0px!important;"></p></td></tr></tbody></table><figcaption data-caption="true"><p style="margin-left: 0px!important;">Table 1</p></figcaption></figure><hr><h2 style="margin-left: 0px!important;">Mention</h2><p style="margin-left: 0px!important;"><span data-type="mention" data-id="Jarosław Piszczek">@Jarosław Piszczek</span></p><hr><h2 style="margin-left: 0px!important;">Emoji</h2><p style="margin-left: 0px!important;"><span data-name="zap" data-type="emoji">⚡</span> <span data-name="laughing" data-type="emoji">😆</span> <span data-name="+1" data-type="emoji">👍</span></p><hr><p style="margin-left: 0px!important;"></p>
`;