if (document.documentElement.lang != 'de') {
   console.log("SPRECH DEUTSCH!")
}
//Fontawesome 
const body = document.body;
body.innerHTML = '<link rel="stylesheet" href="' + chrome.runtime.getURL("style/fontawesome/css/all.css") + '"/>' + '<script src="' + chrome.runtime.getURL("style/fontawesome/js/all.js") + '"></script>' + '<script src="' + chrome.runtime.getURL("scripts/jquery.js") + '"></script>   ' + document.body.innerHTML
body.style.backgroundColor = "#121212"
//Navigationsleiste
//Ersetze Logo
const navigation = document.getElementById("pageTopNavi");
navigation.style.backgroundImage = 'url("' + chrome.runtime.getURL("Fucan.png") + '")';

//Navigationsleiste
const navigation_list = navigation.getElementsByTagName("ul")[0]
const nls = navigation_list.style
//Stylen
nls.alignContent = "center"
nls.margin = 0

nls.width = "60vw"
nls.display = "block"
nls.listStyleType = "none"

let navigation_icons = {
   "Aktuelles": '<i style="color: white;" class="fa-solid fa-newspaper"></i> Aktuelles',
   "My TUCaN": '<i style="color: white;" class="fa-solid fa-newspaper"></i> My TUCaN',
   "Hilfe": '<i style="color: white;" class="fa-solid fa-question"></i> Hilfe',
   "Help": '<i style="color: white;" class="fa-solid fa-question"></i> Help',
   "Bewerbung": '<i style="color: white;" class="fa-solid fa-file-pdf"></i> Bewerbung',
   "Application": '<i style="color: white;" class="fa-solid fa-file-pdf"></i> Application',
   "Service": '<i style="color: white;" class="fa-solid fa-cog"></i> Service',
   "Examinations": '<i style="color: white;" class="fa-solid fa-graduation-cap"></i> Examinations',
   "Prüfungen": '<i style="color: white;" class="fa-solid fa-graduation-cap"></i> Prüfungen',
   "VV": '<i style="color: white;" class="fa-solid fa-box-archive"></i> Vorlesungsverzeichnis',
   "Courses": '<i style="color: white;" class="fa-solid fa-archive"></i> Courses',
   "Stundenplan": '<i style="color: white;" class="fa-solid fa-clock"></i> Stundenplan',
   "Schedule": '<i style="color: white;" class="fa-solid fa-clock"></i> Schedule',
   "Veranstaltungen": '<i style="color: white;" class="fa-solid fa-calendar-days"></i> Veranstaltungen',
   "Course Catalogue": '<i style="color: white;" class="fa-solid fa-calendar-days"></i> Course Catalogue'
}

const language = document.getElementById("pageHeadSwitchLang").getElementsByTagName("a")[0]
language.classList = null

let list_style = "display: block;padding: 8px;background-color: #212121; border: none; color: white;"

language.style = list_style
language.style.float = "left"
language.innerHTML = '<i style="color: white;" class="fa-solid fa-flag"></i> ' + language.textContent
const lang_el = document.createElement("li")
lang_el.appendChild(language)

const logout = document.getElementById("logoutButton")
logout.classList.remove("img_arrowLogout")
logout.classList.remove("img")
logout.innerHTML = '<i style="color: white;" class="fa-solid fa-right-from-bracket"></i> Abmelden'
logout.style.backgroundImage = ""
logout.classList.remove("logout")
logout.style.border = "none"
logout.style = list_style
logout.style.float = "left"


navigation_list.appendChild(lang_el)
navigation_list.appendChild(logout)

for (item in navigation_list.getElementsByTagName("li")) {
   const li = navigation_list.getElementsByTagName("li")[item];

   if (li.className == "tree depth_1 linkItem branchLinkItem " || li.title == "Hilfe" || li.title == "Help") {
      li.style.float = "left"
      li.style.padding = 0
      li.style.marginBottom = "4px"
      const link = li.getElementsByClassName("navLink")[0]
      link.style = list_style
      if (navigation_icons[link.textContent] != null) link.innerHTML = navigation_icons[link.textContent]
      if (link.getAttribute("href") == document.location.href.replace(document.location.hostname, "").split("//")[1]) {
         link.style.color = "#b1bd00"
      }

   }
}





const header = document.getElementById("contentSpacer_IE").getElementsByTagName("h2")[1];

const tableDiv = document.getElementsByClassName("tb rw-table")[0]
const veranstaltungen = tableDiv.getElementsByTagName("table")[0]
let aktivitaeten = []
if (veranstaltungen.getElementsByTagName("tr").length > 1) {
   for (i = 1; i < veranstaltungen.getElementsByTagName("tr").length; i++) {
      let v = veranstaltungen.getElementsByTagName("tr")[i].cells[0].innerText
      let name = veranstaltungen.getElementsByTagName("tr")[i].cells[1].innerText
      let von_bis = "von " + veranstaltungen.getElementsByTagName("tr")[i].cells[2].innerText + " bis " + veranstaltungen.getElementsByTagName("tr")[i].cells[3].innerText
      aktivitaeten.push(v +";"  + name + ";" + von_bis)
   }
}

tableDiv.innerHTML =`<style>
   .elements{
      border: 2px solid #212121;
      border-radius: 5px;
      margin: 5px;
      background: #121212;
      
   }
   .elements > h3, h4, h5{
      color: white;
      font-weight: lighter;
      text-align: center;
   }
   .elements > h3{
      font-weight: bold;
   }

   .parent{
      display: grid; 
      grid-template-columns: repeat(3, 1fr);
   }
   .parent :first-child {
      text-align: center;
      grid-column: 1 / -1;
   }
   #pageContainer{
      background: #121212;
   }
   #pageHeadBottom_3{
      border-bottom: none;
   }
 
   </style><div class='parent'></div>`
const grid = document.getElementsByClassName("parent")[0];
const firstRow = document.createElement("div")
firstRow.classList = "elements"
firstRow.appendChild(header)
grid.appendChild(firstRow);  
for(i = 0; i < aktivitaeten.length; i++){
   let sp = aktivitaeten[i].split(";");
   let el = document.createElement("div")
   el.classList = "elements"
   el.innerHTML =  "<h3>" + sp[0] +"</h3><h4>" + sp[1] + "</h4><h5>" + sp[2] +"</h5>"
   grid.appendChild(el)

}
document.getElementById("pageContentTop").remove();
document.getElementById("pageHeadBottom_3").remove();

