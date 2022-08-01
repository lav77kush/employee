import { Component,OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { Employee } from 'src/app/modal/employee.model';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  tehchnoList: any;
  employeeList:any;
  title = 'app';
  registerForm: UntypedFormGroup;
  submitted = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private formBuilder: UntypedFormBuilder,
    private httpService: HttpService
  ) {
    this.employeeList=new Employee();
    this.registerForm = this.formBuilder.group({
    //  title: ['', Validators.required],
      name: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', Validators.required],
     // technologies: ['html', Validators.required],
    });
    this.tehchnoList = [
      { name: 'Html', code: 'NY' },
      { name: 'CSS', code: 'RM' },
      { name: 'Java Script', code: 'LDN' },
      { name: 'Type Script', code: 'IST' },
      { name: 'Mongo DB', code: 'PRS' },
    ];
  }


  ngOnInit() {
    this.primengConfig.ripple = true;
    this.getEmployeeList();
 
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    this.createEmployee(this.registerForm.value)
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }


  getEmployeeList(){
    this.httpService.list().subscribe((response)=>{
      this.employeeList = response;
    },(error=>{

    }));
  }

  createEmployee(data:any){
      data["id"]= new Date().getTime() 
    this.httpService.create(data).subscribe((response)=>{
      alert("data saved !");
      this.onReset();
      this.getEmployeeList();
    },(error=>{
      alert("data not saved !")
    }));
  }

  editTodo(editData: any){
    this.httpService.update(editData.id,editData).subscribe((response)=>{
      this.getEmployeeList();
    },(error=>{

    }));
  }

  deleteTodo(id: any){
    this.httpService.delete(id).subscribe((response)=>{
      this.getEmployeeList();
    },(error=>{
    }));
  }
}
