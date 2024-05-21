 // place logo depending on screen size
(() => {
    const logo = document.getElementById('logo'),
        mobileHolder = document.getElementById('logo-mobilescreen'),
        widescreenHolder = document.getElementById('logo-widescreen');
  
    const displayWindowSize = () => {
      let myWidth = window.innerWidth;
      if (myWidth >= 960) {
        widescreenHolder.appendChild(logo);
      } else {
        mobileHolder.appendChild(logo);
      }
    };
    window.addEventListener('resize', () => {
        displayWindowSize();
        resizeTextArea();
    });
    window.addEventListener('load', () => {
        displayWindowSize();
        resizeTextArea()
    });
  })();
 
 // Toggle theme switch

const toggleSwitch = document.querySelector('#theme-toggle-button');
const btnToggleText = document.querySelector('#toggle-announce');

//function that changes the theme, and sets a localStorage variable to track the theme between page loads
const switchToDarkTheme = () => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleSwitch.checked = true;
    btnToggleText.innerText = "switch to light theme";
}
const switchToLightTheme = () => {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
    toggleSwitch.checked = false;
    btnToggleText.innerText = "switch to dark theme";
}
function switchTheme(e) {
    if (e.target.checked) {
        switchToDarkTheme();
    } else {
        switchToLightTheme();
    }    
}

//listener for changing themes
toggleSwitch.addEventListener('change', switchTheme, false);

//pre-check if the user has set dark color scheme in computer preferences
const mediaQueryDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
if (mediaQueryDarkMode && mediaQueryDarkMode.matches) {
    switchToDarkTheme();
};
 
 // Navigation
const menuIcon = document.querySelector('#menu-icon'),
    menuMainContainer = document.querySelector('#side-nav'),
    menuUl = document.querySelector('#nav-ul'),
    btnAddNewDoc = document.getElementById('add-new-document');

// Toggle open menu
const closeMainMenu = () => {
  menuMainContainer.classList.remove('active-side-menu');
  menuIcon.ariaExpanded = "false";
  menuIcon.focus();
}

menuIcon.addEventListener('click', ()=>{
  if(menuIcon.ariaExpanded == 'false'){
    menuMainContainer.classList.add('active-side-menu');
    menuIcon.ariaExpanded = "true";
    btnAddNewDoc.focus();
  } else {
    closeMainMenu();
  }
});
 

// CRUD funtionality with Local Storage 

 // Update the preview when the "markdown-content" textarea changes.

 const markdownContent = document.getElementById('markdown-input'),
    htmlPreview = document.getElementById('html-preview'),
    labelDOcName = document.querySelector('label[for="doc-name"]'),
    docName = document.getElementById('doc-name');

const showMarkedContent = () => {

    // Convert Markdown to HTML.
    const htmlContent = marked.parse(markdownContent.value);
    // Sanitize the generated HTML and display it.
    htmlPreview.innerHTML = DOMPurify.sanitize(htmlContent,
    {USE_PROFILES: {html: true}});
}

// Resize Textarea according to fit it's content
const resizeTextArea = () => {
    markdownContent.style.height = "";
    markdownContent.style.height = markdownContent.scrollHeight + 3 + "px";
}

markdownContent.addEventListener('input', function () {
    resizeTextArea();
    showMarkedContent();
});


// Full screen preview
document.getElementById('preview-full-screen').addEventListener('click', () => {
    const markdownSection = document.getElementById('markdown-section'),
        previewSection = document.getElementById('preview-section'),
        btnFullScreen = document.querySelector('#preview-full-screen');

    if(previewSection.classList.contains('full-screen')){
        previewSection.classList.remove('full-screen');
        markdownSection.classList.remove('hide');
        btnFullScreen.innerHTML = '<svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M7.784.003c4.782-.144 7.597 4.31 8.109 5.198a.8.8 0 0 1 0 .8c-.688 1.2-3.255 5.086-7.677 5.198h-.2c-4.71 0-7.405-4.326-7.909-5.198a.8.8 0 0 1 0-.8C.803 4.001 3.362.115 7.784.003Zm.38 1.6h-.3c-3.199.08-5.286 2.71-6.086 3.998C2.482 6.73 4.73 9.68 8.176 9.6c3.199-.08 5.262-2.711 6.086-3.999-.712-1.127-2.967-4.086-6.398-3.998ZM8 2.803A2.799 2.799 0 1 1 8 8.4a2.799 2.799 0 0 1 0-5.598Zm0 1.599A1.2 1.2 0 1 0 8 6.8a1.2 1.2 0 0 0 0-2.4Z"/></svg>'
    }
    else {
        previewSection.classList.add('full-screen');
        markdownSection.classList.add('hide');
        btnFullScreen.innerHTML = '<svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M1.38.027a.795.795 0 0 1 .769.206L14.815 12.9a.792.792 0 0 1 0 1.124.792.792 0 0 1-1.124 0L9.234 9.567a2.77 2.77 0 0 1-3.753-3.753L1.024 1.357a.795.795 0 0 1 .357-1.33Zm.998 3.832 1.156 1.116a10.846 10.846 0 0 0-1.773 2.153c.696 1.117 2.929 4.038 6.333 3.959a6.127 6.127 0 0 0 1.346-.198l1.25 1.25a7.505 7.505 0 0 1-2.556.53h-.198c-4.663 0-7.331-4.282-7.83-5.145a.792.792 0 0 1 0-.792A12.58 12.58 0 0 1 2.378 3.86Zm5.328-2.272c4.726-.143 7.52 4.267 8.028 5.145.15.24.163.542.031.792a12.58 12.58 0 0 1-2.304 2.874l-1.195-1.116a10.846 10.846 0 0 0 1.813-2.154c-.705-1.116-2.937-4.045-6.333-3.958a6.127 6.127 0 0 0-1.346.198L5.149 2.117a7.505 7.505 0 0 1 2.557-.53Zm-.974 5.486v.055c0 .656.532 1.188 1.188 1.188l.047-.008-1.235-1.235Z"/></svg>'
        
    }
})

let allUserDocs = [];
let currentIndex = 0;

// Add welcome document

const addWelcomeDoc = (data) => {
    // welcome document entry
    const userMarkdown = {
        date : data[0].createdAt,
        docName : data[0].name,
        content : data[0].content
    };
    allUserDocs.push(userMarkdown);
    localStorage.setItem('allUserDocs', JSON.stringify(allUserDocs));
}

const populateExistingDocs = (data) => {
    if(localStorage.getItem('allUserDocs') !== null && localStorage.getItem('allUserDocs') !== '[]'){
        allUserDocs = JSON.parse(localStorage.getItem('allUserDocs'));
        menuUl.innerHTML = "";
        allUserDocs.forEach((document, i) => {
            menuUl.innerHTML +=`
            <li><a href="#" class="created-doc" id="doc-${i}" onclick="loadDocument(${i}); preventDefault();">
              <span class="date-doc-created">${document.date}</span>              
              <span id="input-name-${i}" class="name-doc-created">${document.docName}</span>
            </a></li>
            `;
            });
            docName.value = allUserDocs[currentIndex].docName;
            markdownContent.value = allUserDocs[currentIndex].content;

    } else if(localStorage.getItem('allUserDocs') === '[]') {
        menuUl.innerHTML ="";
        docName.value = "";
        labelDOcName.classList.add('hide');
        markdownContent.value = "";
    } else {
        addWelcomeDoc(data);
        menuUl.innerHTML =`
            <li><a href="#doc-name" class="created-doc" id="doc-0" onclick="loadDocument(0); preventDefault();">
              <span class="date-doc-created">${allUserDocs[0].date}</span>              
              <span id="input-name-0" class="name-doc-created">${allUserDocs[0].docName}</span>
            </a></li>
            `;
        docName.value = allUserDocs[0].docName;
        markdownContent.value = allUserDocs[0].content;
    }
    resizeTextArea();
    showMarkedContent();
}

async function fetchData(){
    try{
        const response = await fetch(`/data.json?v=1711534682`)

        if(!response.ok){
            throw new Error("Could not fetch resource")
        }

        const data = await response.json();

        // ==== if json data ok: populate data
        populateExistingDocs(data);

        // ====== end of populate data

    }
    catch(error){
        console.log(error);
    }
}

fetchData();


// Get the current date
const getDate = () => {
    
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let createDate = new Date();
    return `${createDate.getDate()} ${month[createDate.getMonth()]} ${createDate.getFullYear()}`;
}

// Add new document
btnAddNewDoc.addEventListener('click', () => {
    markdownContent.value = '';
    htmlPreview.innerHTML = '';

    let dateCreated = getDate();

    // new entry
    const userMarkdown = {
        date : dateCreated,
        docName : "untitled-1.md",
        content : ""
    };

    if(labelDOcName.classList.contains('hide')){
        labelDOcName.classList.remove('hide'); 
    } 
    
    // Check if some Data already exists
    if(localStorage.getItem('allUserDocs') === null ) { 
        // push first item 
        allUserDocs.push(userMarkdown);
        localStorage.setItem('allUserDocs', JSON.stringify(allUserDocs));
        populateExistingDocs();
    } else {
        // get data from storage and then push new entry
        allUserDocs = JSON.parse(localStorage.getItem('allUserDocs'));
        userMarkdown.docName = `untitled-${allUserDocs.length + 1}.md`;
        allUserDocs.push(userMarkdown);
        localStorage.setItem('allUserDocs', JSON.stringify(allUserDocs));
        currentIndex = allUserDocs.length - 1; 
        populateExistingDocs();
    }
    docName.focus();
})


// Save changes
document.getElementById('save-changes').addEventListener('click', ()=> {
    if(localStorage.getItem('allUserDocs') === null || localStorage.getItem('allUserDocs') === '[]') { 
        alert('Please create your first document to save')
    } else {
        // get data from storage and then push new entry
        allUserDocs = JSON.parse(localStorage.getItem('allUserDocs'));
        allUserDocs[currentIndex].content = markdownContent.value;
        localStorage.setItem('allUserDocs', JSON.stringify(allUserDocs));
    }
})

// Change document name
docName.addEventListener('change', ()=> {
    allUserDocs = JSON.parse(localStorage.getItem('allUserDocs'));
    allUserDocs[currentIndex].docName = docName.value;
    localStorage.setItem('allUserDocs', JSON.stringify(allUserDocs));
    populateExistingDocs();
})

const loadDocument = (docIndex) => {
    currentIndex = docIndex;
    allUserDocs = JSON.parse(localStorage.getItem('allUserDocs'));
    //console.log(allUserDocs[docIndex].content);
    markdownContent.value = allUserDocs[docIndex].content;
    docName.value = allUserDocs[currentIndex].docName;
    showMarkedContent();
    docName.focus();
}

// Delete Document
const deleteDocument = () => {
    allUserDocs = JSON.parse(localStorage.getItem('allUserDocs'));
    allUserDocs.splice(currentIndex, 1);
    localStorage.setItem('allUserDocs', JSON.stringify(allUserDocs));
    currentIndex = 0;
}

// open "Delete alert" dialog
const deleteAlert = document.getElementById('alert-delete'),
    deleteTitle = document.getElementById('alert-delete-title');

document.getElementById('delete-icon').addEventListener('click', () => {
    if(allUserDocs.length !== 0){
        deleteAlert.showModal();
        deleteTitle.focus(); // focus screen reader on the first title of the dialog
    }
})

// Delete & close dialog
document.getElementById('confirm-delete-btn').addEventListener('click', ()=>{
    deleteDocument();
    populateExistingDocs();
    deleteAlert.close();
})

// Cancel
document.getElementById('close-alert-delete').addEventListener('click', ()=>{
    deleteAlert.close();
})