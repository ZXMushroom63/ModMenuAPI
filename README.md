# ModMenuAPI
### Disclaimer: this is very old and i dont update it.
An easy to use javascript api to make mod-menus for the web easily.<br>
<br>
<a href="exampleMenu.js">Psst! To see a full example, click here!</a>
<br>
<br>
How to make a menu (Assuming you ran the code in <a href="ModMenuAPI.js">ModMenuAPI.js</a>):<br>
<br>
First, create a list of tabs.<br>
<code>
var tabs = new ModMenuTabList();
</code>
<br>
<br>
To add a tab to the list  use the following code:<br>
<code>
tabs.addTab(&quot;About&quot;,\`
&lt;p&gt;Made by Me! Using ZXMushroom63&#39;s ModMenu API&lt;/p&gt;
\`);
</code>
<br>
<br>
Then create the mod menu, passing in the tabs variable from earlier.<br>
<code>
var modmenu = new ModMenu(&quot;Mod Menu&quot;, tabs);
</code>
<br>
<br>
To run it, simply use:<br>
<code>
modmenu.init()
</code>
<br>
<br>
<br>
To have multiple menus on one page you have to give each of them an id.<br>
Modify the third line of code to have an id, where the third input is the id.<br>
<code>
var modmenu = new ModMenu(&quot;Mod Menu&quot;, tabs, &quot;exampleId&quot;);
</code>
<br>
<br>
<br>
<h2>How to style the mod menu</h2><br>
First, to style the menu you have to create a new ModMenuStyle variable.<br>
<code>
var style = new ModMenuStyle()
</code>
<br>
<br>
Then, set different aspects using it's functions:<br>
<code>
style.setBackgroundColor("red");
</code><br><code>
style.setHeaderTextColor("#32a852");
</code><br><code>
style.setWidth("30%");
</code>
<br>
<br>
When you create the modmenu, give it an id and pass in the style object.<br>
<code>
var modmenu = new ModMenu("Example Mod Menu", tabs, "InsertIdHere", <u>style</u>)
</code>
<br>
<br>
Then just initialize the mod menu as normal.<br>
<code>
modmenu.init()
</code>
<br>
<br>
<br>
<h2>Known Issues</h2>
Certain sites will not allow tabs and buttons to be clicked.<br>
Sites:<br>
<ul>
  <li>github.com</li>
  <li>google.com</li>
  <li>nearly all *.google.com sites</li>
  <li>etc.</li>
</ul>
