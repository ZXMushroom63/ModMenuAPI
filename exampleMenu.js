var tabs = new ModMenuTabList();
var style = new ModMenuStyle();
tabs.addTab("Editor",
`
<h3>Edit the current page</h3>

<button onclick="document.body.contentEditable=true">Editing On</button>
<button onclick="document.body.contentEditable=false">Editing Off</button>
`
);
tabs.addTab("Info",
`
<h3>Info</h3>
<p>An example modmenu!</p>
`
);
style.setBackgroundColor("white");
style.setHeaderBackgroundColor("#1f0100");

/*/If we don't set the backgrounds, they will be the default./*/

var modmenu = new ModMenu("Amazing Menu By Meee!", tabs, "example_menu", style);
modmenu.init();

/*/You need to have the code below this comment to use the functions above./*/

function ModMenuTabList() {
  this._tabs = {};
  this.addTab = function (name, html) {
    this._tabs[name] = html;
  };
}
function ModMenuStyle() {
  this._style = {
    background: "#f1f1f1",
    headerBackground: "#2196F3",
    headerText: "#fff",
    tabBarBackground: "#f1f1f1",
    tabHover: "#ddd",
    tabActive: "#ccc",
    width: "30%",
    height: "45%",
  };
  this.setBackgroundColor = function (CSSColor) {
    this._style["background"] = CSSColor;
  };
  this.setHeaderBackgroundColor = function (CSSColor) {
    this._style["headerBackground"] = CSSColor;
  };
  this.setHeaderTextColor = function (CSSColor) {
    this._style["headerText"] = CSSColor;
  };
  this.setTabBarBackgroundColor = function (CSSColor) {
    this._style["tabBarBackground"] = CSSColor;
  };
  this.setTabHoverColor = function (CSSColor) {
    this._style["tabHover"] = CSSColor;
  };
  this.setTabactiveColor = function (CSSColor) {
    this._style["tabActive"] = CSSColor;
  };
  this.setWidth = function (CSSPercentage) {
    this._style["width"] = CSSPercentage;
  };
  this.setHeight = function (CSSPercentage) {
    this._style["height"] = CSSPercentage;
  };
}
function ModMenu(title, tabs, rootDivId = "menu", style = undefined) {
  if (style === undefined) {
    this.style = {
      _style: {
        background: "#f1f1f1",
        headerBackground: "#2196F3",
        headerText: "#fff",
        tabBarBackground: "#f1f1f1",
        tabHover: "#ddd",
        tabActive: "#ccc",
        width: "30%",
        height: "45%",
      },
    };
  } else {
    this.style = style;
  }
  this._dragElement = function (elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /*/ if present, the header is where you move the DIV from:/*/ document.getElementById(
        elmnt.id + "header"
      ).onmousedown = dragMouseDown;
      document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
    } else {
      /*/otherwise, move the DIV from anywhere inside the DIV:/*/ elmnt.onmousedown =
        dragMouseDown;
      elmnt.ontouchstart = dragMouseDown;
    }
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      /*/ get the mouse cursor position at startup:/*/ pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.ontouchend = closeDragElement;
      document.ontouchcancel = closeDragElement;
      /*/ call a function whenever the cursor moves:/*/ document.onmousemove =
        elementDrag;
      document.ontouchmove = elementDrag;
    }
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      /*/ calculate the new cursor position:/*/ pos1 =
        pos3 - (e.clientX || e.touches[0].clientX);
      pos2 = pos4 - (e.clientY || e.touches[0].clientY);
      pos3 = e.clientX || e.touches[0].clientX;
      pos4 = e.clientY || e.touches[0].clientY;
      /*/ set the element's new position:/*/ elmnt.style.top =
        elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }
    function closeDragElement() {
      /*/ stop moving when mouse button is released:/*/ document.onmouseup =
        null;
      document.onmousemove = null;
      document.ontouchend = null;
      document.ontouchcancel = null;
      document.ontouchmove = null;
    }
  };
  this.tabs = tabs;
  this.title = title;
  this.id = rootDivId;
  this.rootDiv = document.createElement("div");
  this._injectStyle = function (styleString) {
    const style = document.createElement("style");
    style.textContent = styleString;
    document.head.append(style);
  };
  this._parseTabsBar = function (tabs) {
    var tabNames = Object.keys(tabs._tabs);
    var html = "";
    for (let i = 0; i < tabNames.length; i++) {
      const name = tabNames[i];
      html += `<button class="tablinks" onclick="MODMENU_OpenTab(event, '${name}');">${name}</button>`;
    }
    return `<div class="tab">${html}</div>`;
  };
  this._parseTabsContent = function (tabs) {
    var tabNames = Object.keys(tabs._tabs);
    var html = "";
    for (let i = 0; i < tabNames.length; i++) {
      const name = tabNames[i];
      const content = tabs._tabs[name];
      html += `<div id="${name}" class="tabcontent">${content}</div>`;
    }
    return html;
  };
  this.closeModMenu = function () {
    document.getElementById(this.id).remove();
  };
  this.init = function () {
    this.rootDiv.id = this.id;
    this.rootDiv.innerHTML = ` <div id="${
      this.id
    }header" title="Made with ModMenuApi by Robert Pirtea.">${
      this.title
    }<a class="button-7" href="#" onclick="document.getElementById('${
      this.id
    }').remove()">✖</a></div>${this._parseTabsBar(
      this.tabs
    )}${this._parseTabsContent(this.tabs)} `;
    window.MODMENU_OpenTab = function (evt, cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    };
    this._injectStyle(
      ` #${rootDivId} { all:initial; position: fixed; z-index: 89999999; background-color: ${this.style._style.background}; border: 1px solid #d3d3d3; width:${this.style._style.width}; height:${this.style._style.height}; resize:both; overflow-y:scroll; top:0; left:0; } #${rootDivId}header { padding: 10px; cursor: move; z-index: 99999999; background-color: ${this.style._style.headerBackground}; color: ${this.style._style.headerText}; text-align: center; } .tab { overflow: hidden; border: 1px solid #ccc; background-color: ${this.style._style.tabBarBackground}; } .tab button { background-color: inherit; float: left; border: none; outline: none; cursor: pointer; padding: 14px 16px; transition: 0.3s; } .tab button:hover { background-color: ${this.style._style.tabHover}; } .tab button.active { background-color: ${this.style._style.tabActive}; } .tabcontent { display: none; padding: 6px 12px; border: 1px solid #ccc; border-top: none; } `
    );
    document.body.appendChild(this.rootDiv);
    this._dragElement(document.getElementById(this.id));
  };
}
