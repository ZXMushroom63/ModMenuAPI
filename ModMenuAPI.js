function ModMenuTabList() {
  this._tabs = {};
  this.addTab = function (name, html) {
    this._tabs[name] = html;
  };
}

function ModMenu(title, tabs, rootDivId = "menu") {
  this._dragElement = function (elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /*/ if present, the header is where you move the DIV from:/*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /*/otherwise, move the DIV from anywhere inside the DIV:/*/
      elmnt.onmousedown = dragMouseDown;
      elmnt.ontouchstart = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      /*/ get the mouse cursor position at startup:/*/
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.ontouchend = closeDragElement;
      document.ontouchcancel = closeDragElement;
      /*/ call a function whenever the cursor moves:/*/
      document.onmousemove = elementDrag;
      document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      /*/ calculate the new cursor position:/*/
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      /*/ set the element's new position:/*/
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      /*/ stop moving when mouse button is released:/*/
      document.onmouseup = null;
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
    document.getElementById(rootDivId).remove();
  };
  this.rootDiv.id = this.id;
  this.rootDiv.innerHTML = `
  <div id="${this.id}header" title="Made with ModMenuApi by Robert Pirtea.">${this.title}<a class="button-7" href="javascript:this.parentElement.parentElement.remove()">✖</a></div>${this._parseTabsBar(
    this.tabs
  )}${this._parseTabsContent(this.tabs)}
  `;
  this.init = function () {
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
    this._injectStyle(`
    #${rootDivId} {
        all:initial;
        position: fixed;
        z-index: 89999999;
        background-color: #f1f1f1;
        border: 1px solid #d3d3d3;
        width:30%;
        height:45%;
        resize:both;
        overflow-y:scroll;
    }
    #${rootDivId}header {
        padding: 10px;
        cursor: move;
        z-index: 99999999;
        background-color: #2196F3;
        color: #fff;
        text-align: center;
    }
    .tab {
        overflow: hidden;
        border: 1px solid #ccc;
        background-color: #f1f1f1;
    }
    .tab button {
        background-color: inherit;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 14px 16px;
        transition: 0.3s;
    }
    .tab button:hover {
        background-color: #ddd;
    }
    .tab button.active {
        background-color: #ccc;
    }
    .tabcontent {
        display: none;
        padding: 6px 12px;
        border: 1px solid #ccc;
        border-top: none;
    }
  `);
    document.body.appendChild(this.rootDiv);
    this._dragElement(document.getElementById(this.id));
  };
}
