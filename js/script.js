/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
/**The students data group */
const studentList = document.querySelector(".student-list").children;

/**The number of students show on one page. */
const itemsPerPage = 10;





/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
/**
 * Displays students according to the page number.
 * @param {element} list - The list of all students.
 * @param {integer} page - The page to be displayed.
 */
function showPage(list, page){
   const start = page*itemsPerPage-itemsPerPage;
   const end = page*itemsPerPage;
   for(let i=0; i<list.length; i++){
      if (i<start || i>=end){
         list[i].style.display="none";
      }
      else{
         list[i].style.display="";
      }
   }
}




/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
/**
 * Creates pagination buttons.
 * @param {element} list - The list of all students 
 */
function appendPageLinks(list){
   const pages=Math.ceil(list.length/itemsPerPage);
   const parentPage = document.querySelector(".page");
   const div = document.createElement("div");
   div.className = "pagination";
   parentPage.appendChild(div);
   const ul = document.createElement("ul");
   div.appendChild(ul);
   for (let i=1; i<=pages; i++){
      const li = document.createElement("li");
      const a =document.createElement("a");
      if (i===1){
         a.className = "active";
      }
      a.href="#";
      a.textContent = i;
      a.addEventListener('click', (e)=>{
         if (e.target.tagName ==="A"){
            const groupA = document.querySelectorAll("li a");
            for(let ai=0; ai<groupA.length; ai++){
               groupA[ai].className="";
            }
            a.className="active";
            showPage(studentList, a.textContent);
         }
      });

      li.appendChild(a);
      ul.appendChild(li);
   }
}

/**Initialize: displays firt page when first loading */
showPage(studentList,1);

/**Generates pagination buttons */
appendPageLinks(studentList);







// Remember to delete the comments that came with this file, and replace them with your own code comments.