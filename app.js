// Get Elements

const student_form = document.getElementById('naimul');
const data_list = document.getElementById('data_list');

student_form.addEventListener('submit', function(e){
    e.preventDefault();

    let name = student_form.querySelector("input[placeholder='Student Name']");
    let roll = student_form.querySelector("input[placeholder='Roll Number']");
    let student_class = student_form.querySelector("input[placeholder='Class']");
    let photo = student_form.querySelector("input[placeholder='Photo']");
    let gender = student_form.querySelector("input[type='radio']:checked");
    let bangla = student_form.querySelector("input[placeholder='Bangla']");
    let english = student_form.querySelector("input[placeholder='English']");
    let math = student_form.querySelector("input[placeholder='Math']");
    let sci = student_form.querySelector("input[placeholder='Sceience']");
    let ss = student_form.querySelector("input[placeholder='Social Sceience']");
    let ral = student_form.querySelector("input[placeholder='Religion']");

    if(name.value == "" || roll.value == "" || student_form.value == ""){
        alert('All Fields are Required');
    }else{

        let storate_data = [];
        if( dataGet('result_apps') ){
            storate_data = dataGet('result_apps');
        };

        storate_data.push({
            name : name.value,
            roll : roll.value,
            className : student_class.value,
            gender : gender.value,
            photo : photo.value,
            ban : bangla.value,
            eng : english.value,
            math : math.value,
            sci : sci.value,
            ss : ss.value,
            ral : ral.value
        });

        dataSend('result_apps', storate_data);

        student_form.querySelector("input[placeholder='Student Name']").value = '';
        student_form.querySelector("input[placeholder='Roll Number']").value = '';
        student_form.querySelector("input[placeholder='Class']").value = '';
        student_form.querySelector("input[placeholder='Photo']").value = '';
        student_form.querySelector("input[type='radio']:checked").removeAttribute('');
        student_form.querySelector("input[placeholder='Bangla']").value = '';
        student_form.querySelector("input[placeholder='English']").value = '';
        student_form.querySelector("input[placeholder='Math']").value = '';
        student_form.querySelector("input[placeholder='Sceience']").value = '';
        student_form.querySelector("input[placeholder='Social Sceience']").value = '';
        student_form.querySelector("input[placeholder='Religion']").value = '';

        allStudentData();
    };

});

    allStudentData();
    function allStudentData(){
        let all_data = dataGet('result_apps');
        let data = '';

        all_data.map((student, index) => {
            data += ` 
                <tr>
                    <td>${ index + 1 }</td>
                    <td>${ student.name }</td>
                    <td>${ student.roll }</td>
                    <td>${ student.className }</td>
                    <td>${ student.gender }</td>
                    <td> A+ </td>
                    <td> 4.5 </td>
                    <td><img style="width: 50px;height: 40px;object-fit: cover;" src="${ student.photo }" alt=""></td>
                    <td>
                        <button class="btn btn-info btn-sm" onclick="getSingleResult(${index})" data-bs-toggle="modal" data-bs-target="#student-single-modal">View</button>
                        <button onclick="deleteStudent(${ index })" class="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            `;
        });

        data_list.innerHTML = data;

    };

    
    // Delete Student Data
    function deleteStudent(id){

        let conf = confirm('Are you Sure?')

        if(conf){
            let storate_data = dataGet('result_apps');
            storate_data.splice(id, 1);
            dataSend('result_apps', storate_data);
            allStudentData();
        }else{
            return false;
        }
    };

    

// SUBJECT BOX===
const subject_box = document.getElementById('subj_box');
let s_box = document.querySelector('.science_box');
let a_box = document.querySelector('.arts_box');
let c_box = document.querySelector('.comm_box');


subject_box.addEventListener('change', function(){

        if(subject_box.value == 'Science'){
            s_box.style.display = 'flex';
        }else{
            s_box.style.display = 'none';
        }

        if(subject_box.value == 'Arts'){
            a_box.style.display = 'flex';
        }else{
            a_box.style.display = 'none';
        }

        if(subject_box.value == 'Commerce'){
            c_box.style.display = 'flex';
        }else{
            c_box.style.display = 'none';
        }
});


// Single data
const student_result_data = document.querySelector('.student-result-data');




function getSingleResult(index){
    let result = new Result;
    let storate_data = dataGet('result_apps');
    student_result_data.innerHTML = `

                                    <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-md-5">
                                            <img src="${storate_data[index].photo}" alt="" class="img-thumbnail w-100">
                                            <h5 class="m-0 py-1 text-light text-center">Name: ${storate_data[index].name}</h5>
                                        </div>
                                        <div class="col-md-7">
                                            <table class="table table-striped table-hover table-dark table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Subject</th>
                                                        <th>Mark</th>
                                                        <th>GPA</th>
                                                        <th>Grade</th>
                                                        <th>CGPA</th>
                                                        <th>Result</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Bangla</td>
                                                        <td>${storate_data[index].ban}</td>
                                                        <td>${result.result(storate_data[index].ban).gpacal}</td>
                                                        <td>${result.result(storate_data[index].ban).greadcal}</td>
                                                        <td rowspan="6" style="text-align: center; line-height: 290px;">

                                                            ${result.finalCgpa( storate_data[index].ban, storate_data[index].eng, storate_data[index].math, storate_data[index].sci, storate_data[index].ss, storate_data[index].ral ).rescgpa}

                                                        </td>
                                                        <td rowspan="6" style="text-align: center; line-height: 290px;">
                                                        
                                                            ${result.finalCgpa( storate_data[index].ban, storate_data[index].eng, storate_data[index].math, storate_data[index].sci, storate_data[index].ss, storate_data[index].ral ).resgread}

                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>English</td>
                                                        <td>${storate_data[index].eng}</td>
                                                        <td>${result.result(storate_data[index].eng).gpacal}</td>
                                                        <td>${result.result(storate_data[index].eng).greadcal}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Math</td>
                                                        <td>${storate_data[index].math}</td>
                                                        <td>${result.result(storate_data[index].math).gpacal}</td>
                                                        <td>${result.result(storate_data[index].math).greadcal}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Science</td>
                                                        <td>${storate_data[index].sci}</td>
                                                        <td>${result.result(storate_data[index].sci).gpacal}</td>
                                                        <td>${result.result(storate_data[index].sci).greadcal}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Social Science</td>
                                                        <td>${storate_data[index].ss}</td>
                                                        <td>${result.result(storate_data[index].ss).gpacal}</td>
                                                        <td>${result.result(storate_data[index].ss).greadcal}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Religion</td>
                                                        <td>${storate_data[index].ral}</td>
                                                        <td>${result.result(storate_data[index].ral).gpacal}</td>
                                                        <td>${result.result(storate_data[index].ral).greadcal}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
    
    `
};