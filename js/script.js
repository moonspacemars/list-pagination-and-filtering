/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/**The students data group */
const studentList = document.querySelector(".student-list").children;

/**The number of students show on one page. */
const itemsPerPage = 10;

/**
 * Displays students according to the page number.
 * @param {element} list - The list of students.
 * @param {integer} page - The page to be displayed.
 */
function showPage(list, page) {
   const start = page * itemsPerPage - itemsPerPage;
   const end = page * itemsPerPage;
   for (let i = 0; i < list.length; i++) {
      if (i < start || i >= end) {
         list[i].style.display = "none";
      }
      else {
         list[i].style.display = "";
      }
   }
}

/**
 * Displays students that match with search input. 
 * @param {element} list -  The list of students.
 */
function showSearchItem(list) {
   for (let i = 0; i < list.length; i++) {
      if (list[i].classList.contains("match")) {
         list[i].style.display = "";
      }
      else {
         list[i].style.display = "none";
      }
   }
}

/**
 * Creates pagination buttons.
 * @param {element} list - The list of students. 
 */
function appendPageLinks(list) {
   const pages = Math.ceil(list.length / itemsPerPage);
   const parentPage = document.querySelector(".page");
   const div = document.createElement("div");
   div.className = "pagination";
   parentPage.appendChild(div);
   const ul = document.createElement("ul");
   div.appendChild(ul);
   for (let i = 1; i <= pages; i++) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      if (i === 1) {
         a.className = "active";
      }
      a.href = "#";
      a.textContent = i;

      /**page button listner*/
      a.addEventListener('click', (e) => {
         if (e.target.tagName === "A") {
            const groupA = document.querySelectorAll("li a");
            for (let ai = 0; ai < groupA.length; ai++) {
               groupA[ai].className = "";
            }
            a.className = "active";
            showPage(list, a.textContent);
         }
      });
      li.appendChild(a);
      ul.appendChild(li);
   }
}

/**Creates search input and button. */
function createSearchBar() {
   const parentElement = document.querySelector(".page-header.cf");
   const div = document.createElement("div");
   div.className = "student-search";
   const input = document.createElement("input");
   input.id = "search-input";
   input.placeholder = "Search for students...";
   const button = document.createElement("button");
   button.textContent = "Search";
   button.id = "submit";
   div.appendChild(input);
   div.appendChild(button);
   parentElement.appendChild(div);
}

/**
 * Searchs the names group that match with search input.
 * @param {element} searchInput - The input element.
 * @param {element} names - The group of students.
 */
function searchTool(searchInput, names) {
   if (searchInput.value.length !== 0) {
      for (let i = 0; i < names.length; i++) {
         names[i].classList.remove("match");
         const name = names[i].querySelector("h3").textContent;
         if (name.indexOf(searchInput.value.toLowerCase()) > -1) {
            names[i].classList.add("match");
         }
      }
   }
}

/**Initialize: displays firt page when first loading */
showPage(studentList, 1);

/**Generates pagination buttons */
appendPageLinks(studentList);

/**Creates search input and button */
createSearchBar();

/**Search button element*/
const search = document.querySelector("#search-input");

/**Search input element */
const submit = document.querySelector("#submit");

/**Maintain html node when searching*/
function searchExecute() {
   searchTool(search, studentList);
   showSearchItem(studentList);
   const searchMatchGroup = document.querySelectorAll(".match");
   const parentPage = document.querySelector(".page");
   const pageElement = document.querySelector(".pagination");
   parentPage.removeChild(pageElement);
   const noResultTag = document.querySelector("h1");
   if (noResultTag) {
      parentPage.removeChild(noResultTag);
   }
   appendPageLinks(searchMatchGroup);
   showPage(searchMatchGroup, 1);
   if (searchMatchGroup.length === 0) {
      const h1 = document.createElement("h1");
      h1.textContent = "No results.";
      parentPage.appendChild(h1);
   }

}

/**Search button listner */
submit.addEventListener('click', () => {
   searchExecute();
});

/**Search input listner */
search.addEventListener('keyup', () => {
   searchExecute();
});