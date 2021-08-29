var coursesApi = "http://localhost:3000/courses";

function start() {
    getCourese(renderCourses)
    // set up form
    hendleCreateForm()

}
//  khởi động ứng dụng lại
start();

//   functions
function getCourese(callback){
    fetch(coursesApi)
    .then( function(response){
        return response.json();
            // console.log(response.json())
        })
    .then(callback)
    .catch(function(){
        console.log('lỗi')
    })

}

function createCourse(data,callback){
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(coursesApi,options)
    .then(function(response){
        response.json();
    })
    .then(callback)
    
}
function handleDeleteCourse(id){
    var options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    };
    fetch(coursesApi +'/'+ id, options)
    .then(function(response){
        response.json();
    })
    .then(function(){
        var courseItem = document.querySelector('.course-item-' +id)
        if(courseItem){
            courseItem.remove();
        }
    })
}

function renderCourses(courses) {
    var  listCoursesBlock= document.querySelector("#list-course");
    // console.log(listCoursesBlock)
    var htmls = courses.map(function(course) {
       return `
       <li class="course-item-${course.id}">
            <h2 class="course-name-${course.id}">${course.name}</h2>
           <p class ="course-description-${course.id}">${course.description}</p>
            <div class="button"><button onclick="handleDeleteCourse(${course.id})">Xóa</button>
            <button onclick="handleUpateCourse(${course.id})">Sửa</button></div>

       </li>`;
   });
    listCoursesBlock.innerHTML = htmls.join('');
};
function hendleCreateForm(){
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var formData = {
            name : name,
            description : description
        }

        createCourse(formData,function(){
            getCourese(renderCourses)
        })
    }
}

function upateCourse(id,data,callback){
    var options = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(coursesApi +'/'+ id, options)
    .then(function(response){
        response.json();
    })
    .then(callback)
}

function handleUpateCourse(id){  
    var name =  document.querySelector('input[name="name"]');
    var description = document.querySelector('input[name="description"]');
    var getName = document.querySelector('.course-name-' +id).innerText;
    var getDescription = document.querySelector('.course-description-'+id).innerText;
    name.value = getName;
    description.value=getDescription
    if(!document.querySelector('#update')){
        document.querySelector('#create').id = "update";
    }
    document.querySelector('#update').innerText = "update";
    var updateCourse = document.querySelector('#update');
    updateCourse.onclick = function(){
       var fomeData = {
           name : name.value,
           description: description.value
       }
       if (name.value != "" && description.value != ""){
        upateCourse(id,fomeData,function(){
            getCourses(renderCourses);
        })
    }else {
        alert("Hãy nhập đầy đủ thông tin");
    }
}       
}