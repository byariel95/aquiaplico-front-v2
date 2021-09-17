import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';
import { ContractType } from 'src/app/core/models/contract-types';
import { Industry } from 'src/app/core/models/industry.model';
import { JobPosition } from 'src/app/core/models/job-position.model';
import { ContractTypesService } from 'src/app/core/services/contact-types.service';
import { IndustryService } from 'src/app/core/services/industry.service';
import { JobPositionService } from 'src/app/core/services/job-positions.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SkillsService } from 'src/app/core/services/skills.service';
import { SkillModel } from 'src/app/core/models/skill.model';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { Currency } from 'src/app/core/models/currency.model';
import {
  jobDetailsModel,
  jobModel,
  locationModel,
  SalaryModel,
} from 'src/app/core/models/post-job.model';
import { JobService } from 'src/app/core/services/job.service';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import { DeleteJobModalComponent } from '../../components/delete-job-modal/delete-job-modal.component';


@Component({
  selector: 'app-post-jobs',
  templateUrl: './post-jobs.component.html',
  styleUrls: ['./post-jobs.component.scss'],
})
export class PostJobsComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '175px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    defaultParagraphSeparator: '',
    defaultFontName: 'Mulish',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'heading',
        'fontName',
        'textColor',
        'fontSize',
        'backgroundColor',
        'customClasses',
        'insertImage',
        'insertVideo',
        'toggleEditorMode',
        'insertHorizontalRule',
        'link',
        'unlink',
        'removeFormat',
      ],
    ],
  };

    notification = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  

  createJobsForm!: FormGroup;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredSkills!: Observable<SkillModel[]>;
  skills: string[] = [];
  allSkills: SkillModel[] = [];
  ranges: string[] = [
    'Por mes',
    'Por año',
    'Por semana',
    'Por día',
    'Por hora',
  ];
  types: string[] = ['En Rango', 'Cantidad fija', 'Aproximado'];
  currencies: Currency[] = [];
  // End Variables of CHips

  industries!: Industry[];
  jobsPositions!: JobPosition[];
  contractTypes!: ContractType[];
  @ViewChild('Abilities') Abilities!: ElementRef<HTMLInputElement>;

  // Principal Models
  salary!: SalaryModel;
  jobDetails!: jobDetailsModel;
  location!: locationModel;
  job!: jobModel;

  constructor(
    private skillsService: SkillsService,
    private industryService: IndustryService,
    private jobPositionService: JobPositionService,
    private readonly contactTypesService: ContractTypesService,
    private readonly currencyService: CurrencyService,
    private jobService: JobService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createJobsForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      remote: new FormControl(false),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      requirements: new FormControl('', [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      benefits: new FormControl('', [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      abilities: new FormControl(null),
      hiring: new FormControl(''),
      recurrent: new FormControl(false),
      minSalary: new FormControl('', [Validators.required]),
      maxSalary: new FormControl('', [Validators.required]),
      industries: new FormControl(null, [Validators.required]),
      jobPosition: new FormControl(null, [Validators.required]),
      contractTypes: new FormControl(null, [Validators.required]),
      ranges: new FormControl(null, [Validators.required]),
      currencies: new FormControl(null, [Validators.required]),
      types: new FormControl(null, [Validators.required]),
    });
    this.loadIndustries();
    this.loadJobPositions();
    this.loadContracTypes();
    this.loadSkills();
    this.loadFilterSkills();
    this.loadCurrencies();
  }

  get mainTitle() {
    return this.createJobsForm.get('title');
  }

  get allIndustries() {
    return this.createJobsForm.get('industriess');
  }

  loadCurrencies(): void {
    this.currencyService.getCurrencies().subscribe((res) => {
      this.currencies = res;
    });
  }

  loadIndustries(): void {
    this.industryService.getIndustries().subscribe((res) => {
      this.industries = res;
    });
  }

  loadJobPositions(): void {
    this.jobPositionService.getJobPosition().subscribe((res) => {
      this.jobsPositions = res;
    });
  }

  loadContracTypes(): void {
    this.contactTypesService.getContractTypes().subscribe((res) => {
      this.contractTypes = res;
    });
  }

  loadSkills(): void {
    this.skillsService.getSkills().subscribe((skills) => {
      this.allSkills = skills;
    });
  }

  loadFilterSkills(): void {
    this.filteredSkills =
      this.createJobsForm.controls.abilities.valueChanges.pipe(
        startWith(''),
        map((skill) => this._filterAbilities(skill))
      );
  }

  // Functions of Chips
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.skills.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.createJobsForm.controls.abilities.setValue(null);
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.Abilities.nativeElement.value = '';
    this.createJobsForm.controls.abilities.setValue(null);
  }

  private _filterAbilities(value: string): SkillModel[] {
    if (value) {
      const filterValue = value.toLowerCase();

      return this.allSkills.filter((skill) =>
        skill.name.toLowerCase().includes(filterValue)
      );
    } else {
      return [];
    }
  }

  savePostJob(save: boolean): void {
    if (save === true && !this.createJobsForm.valid) {
      return;
    }
   

    this.salary = {
      currency: this.createJobsForm.value.currencies,
      maxSalary: this.createJobsForm.value.maxSalary,
      minSalary: this.createJobsForm.value.minSalary,
      periot: this.createJobsForm.value.ranges,
      type: this.createJobsForm.value.types,
    };

    this.jobDetails = {
      salary: this.salary,
      hiringType: this.createJobsForm.value.contractTypes,
      requirements: this.createJobsForm.value.requirements,
      skills: this.skills,
      vacancies: this.createJobsForm.value.hiring,
    };

    this.location = {
      address: this.createJobsForm.value.location,
    };

    this.job = {
      benefits: this.createJobsForm.value.benefits,
      companyId: '60f84244512b1c1c08ec195e',
      departament: this.createJobsForm.value.jobPosition,
      description: this.createJobsForm.value.description,
      industry: this.createJobsForm.value.industries,
      jobDetails: this.jobDetails,
      location: this.location,
      recurrent: this.createJobsForm.value.recurrent,
      remotly: this.createJobsForm.value.remote,
      status: save,
      title: this.createJobsForm.value.title,
    };

    console.log(this.job);


    if (save) {
      // service to save and continue
      this.jobService.createPostJob(this.job).subscribe((res) => {
        this.notification.fire({
          icon: 'success',
          title: 'job was created successfully'
        });
      })

    } else {
      // service save as a markdown
    }
  }
  openDeleteJob() {
    this.dialog.open( DeleteJobModalComponent);
  }
}
