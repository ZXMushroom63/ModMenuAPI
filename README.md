# ModMenuAPI
An easy to use javascript api to make mod-menus for the web easily.<br>
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
