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
            math : student_class.value,
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
                        <button class="btn btn-info btn-sm">View</button>
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



}