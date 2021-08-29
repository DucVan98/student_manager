var studentApi = "http://localhost:3000/student";
function start(){
    getStudent(function(students){
        console.log(students)

    })
}
start()

function getStudent(callback){
    fetch(studentApi)
        .then(function(render){
            // console.log(render);
           return render.json();
        })
        .then(callback)
        .catch(function(){
            console.log('lỗi')
        })
}