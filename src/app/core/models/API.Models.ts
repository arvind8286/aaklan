export interface APIResponse{
  message: string,
    status:string,
    code:string,
    data:any

}
export class country
{

            country_id:string;
            country_name: string;
            country_code: string;
             iso2:string;
            accept_zero:string;
             mobile_no_length: string;
            dial: string;
            // is_high_risk:string;
             status: string;
             is_this_country_zone: string;
            dial_code_and_iso!:string;
            country_name_and_currency_symbol: string;
            // is_sanctioned_country: string;
            constructor()
            {
            this.country_id="";
            this.country_name= "";
            this.country_code= "";
            this.iso2="";
            this.accept_zero="";
             this.mobile_no_length= "";
            this.dial= "";
            // is_high_risk="";
            this.status= "";
             this.is_this_country_zone= "";
            // dial_code_and_iso= "";
            this.country_name_and_currency_symbol= "";
            // is_sanctioned_country= "";
            }
}
export class Loginmodel
{
  username:string;
  password:string;
  constructor()
  {
    this.username="";
    this.password="";
  }

}
export class state
{
            country_id: string;
            state_id: string;
            state_name: string;
            state_code: string;
            status: string;
            country_name:string;
            constructor()
            {
              this.country_id="";
              this.state_id="";
              this.state_name="";
              this.state_code="";
              this.status="";
              this.country_name="";
            }
}

export class city
{
  country_id: string;
  country_name: string;
  state_id: string;
  state_name: string;
  city_id: string;
  city_name: string;
  status: string;
  constructor()
  {
  this.country_id="";
  this.country_name="";
  this.state_id="";
  this.state_name="";
  this.city_id="";
  this.city_name="";
  this.status="";
  }

}
export class sector
{
            id!:string;
            assessment_mode!:string;
            sector_name!:string;
            contact_person!:string;
            email!:string;
            mobile_code!:string;
            mobile!:string;
            status!:string;
            created_at!:string;
            ip!:string;
            details!:string;
            index_id!:string

}
export class scheme
{
            id!:string;
            assessment_mode!:string;
            sector_id!:string;
            sector_name!:string;
            scheme_name!:string;
            qualifying_percentage!:string;
            // scheme_pricing!:string;
            scheme_details!:string;
            status!:string;
            created_at!:string;
            ip!:string;
}
export class jobrole
{
            id!:string;
            assessment_mode!:string;
            sector_id!:string;
            sector_name!:string;
            job_role_name!:string;
            job_role_short_name!:string;
            job_type!:string;
            qpc_code!:string;
            passing_percentage!:string;
            nsqf_level!:string;
            total_marks!:string;
            total_easy_questions_count!:string;
            total_medium_questions_count!:string;
            total_difficult_questions_count!:string;
            total_questions!:string;
            total_viva_questions!:string;
            core_nos_weightage!:string;
            non_core_nos_weightage!:string;
            status!:string;
            created_at!:string;
            ip!:string
            version!:string;
            index_id!:string;
}
export class nosdetails
{
            id!:string;
            assessment_mode!:string;
            sector_name!:string;
            sector_id!:string;
            job_role!:string;
            job_role_id!:string;
            nos_code!:string;
            nos_description!: string;
            nos_type!:string;
            total_theory!:string;
            total_viva!:string;
            added_date!:string;
            status!:string;
            index_id!:string;
            total_practical!:string;
}
export class noselement
{
            id!:string;
            assessment_mode!:string;
            sector_name!:string;
            sector_id!:string;
            job_role!:string;
            job_role_id!:string;
            nos_code!:string;
            nos_id!: string;

            nos_element_name!:string;
            added_date!:string;
            status!:string;
            index_id!:string;

}

export class pcdetails
{
            id!:string;
            assessment_mode!:string;
            sector_name!:string;
            sector_id!:string;
            job_role!:string;
            job_role_id!:string;
            nos_code!:string;
            nos_id!: string;
            nos_name!:string;
            nos_element_id!:string;
            nos_element_name!:string;
            pc_name!: string;
            pc_description!: string;
            total_theory!: string;
            total_viva!: string;
            total_theory_questions!: string;
            total_viva_questions!: string;
            added_date!:string;
            status!:string;
            index_id!:string;
            total_practical!:number;
}

export class queset
{
            id!:string;
            assessment_mode!:string;
            sector_id!:string;
            sector_name!:string;
            job_role_id!:string;
            job_role_name!:string;
            assessment_type!:string;
            valid_till!:string;
            ip!:string;
            added_date!:string;
            status!:string;
            created_at!:string;
            paper_set_name!:string;
            assessor_id!:string;
            index_id!:string;

}
export class managetp
{
  id!: string;
  country_name!: string;
  country_id!: string;
  state_name!: string;
  state_id!: string;
  city_name!:string;
  city_id!:string;
  training_partner_name!: string;
  training_partner_address!: string;
  pincode!: string;
  contact_person!: string;
  contact_number!: string;
  status!: string;
  created_at!:string;
  updated_at!: string;
  ip!: string;
  index_id!:string;
}
export class manageassessor
{
  id!:string;
  assessment_mode!:string;
  sector_id!:string;
  sector_name!:string;
  job_role_name!:string;
  job_role_id!:string;
  first_name!:string;
  middle_name!:string;
  last_name!:string;
  address!:string;
  contact_no!:string;
  email!:string;
  payout_amount!:string;
  sip_user_id!:string;
  sip_user_password!:string;
  technical_support:any;
  status!:string;
  created_at!:string;
  updated_at!:string;
  login_username!:string;
  login_password!:string;
  mobile_code!:string;
  index_id!:string;
}
export class manageuser
{
  first_name!:string;
  middle_name!:string;
  last_name!:string;
  email!:string;
  mobile_number!:string;
  company_name!:string;
  is_first_user!:string;
  sector_id!:string;
  sector_name!:string;
  password!:string;
  c_password!:string;
  role!:string;
  status!:string;
  created_at!:string;
  update_at!:string;
  index_id!:string;
}
export class students
{
    id!:string;
    batch_name!:string;
    batch_id!:string;
    name!:string;
    middle_name!:string;
    surname!:string;
    father_name!:string;
    enrollment_number!:string;
    email!:string;
    mobile_code!:string;
    mobile_no!:string;
    adhar_card!:string;
    pan_card!:string;
    gender!:string;
    username!:string;
    password!:string;
    status!:string;
}
export class batch
{
            id!:string;
            sector_id!:string;
            job_role_id!:string;
            scheme_id!:string;
            training_partner_id!:string;
            assessor_id!:string;
            batch_name!:string;
            assessment_mode!:string;
            sector_name!:string;
            job_role_name!:string;
            scheme_name!:string;
            assessment_type!:string;
            batch_no!:string;
            batch_type!:string;
            assessment_date!:string;
            assessment_start_time!:string;
            assessment_end_time!:string;
            assessment_duration!:string;
            training_partner_name!:string;
            assessor_name!:string;
            assessor_email!:string;
            assessor_mobile!:string;
            no_of_candidate!:string;
            practical_shown!:string;
            added_date!:string;
            ip!:string;
            index_id!:string;
}
export class question
{
            id!:string;
            domain_name!:string;
            sector_id!:string;
            job_role_id!:string;
            theory_or_viva!:string;
            paper_set_id!:string;
            paper_set_name!:string;
            nos_id!:string;
            nos_code!:string;
            nos_element_id!:string;
            nos_element_name!:string;
            pc_details_id!:any;
            question!:string;
            option_a!:string;
            option_b!:string;
            option_c!:string;
            option_d!:string;
            option_e!:string;
            option_f!:string;
            answer!:string;
            question_type!:string;
            total_marks!:string;
            difficulty_level!:string;
            added_date!:string;
            updated_at!:string;
            ip!:string;
            status!:string;
            index_id!:string;
            sector_name!:string;
            job_role_name!:string;
            _true!:string;
            _false!:string;

}
export class creteevidance
{
  id!:string;
  parent_category!:string;
  evidence_name!:string;
  evidence_description!:string;
  batch_type!:string;
  min_images!:string;
  max_images!:string;
  min_videos!:string;
  max_videos!:string;
  video_duration!:string;
  status!:string;
  created_at!:string;
  ip!:string;
}

export class stdlogin
{
  username!:string;
  password!:string;


}
export class uploadfiles
{
  images!:string;
  fieldname!:string;
  base64!:string;

}
export class assigntest
{
    question_set_id!:string;
    batch_id!:string;
    start_date!:string;
    end_date!:string;
    test_duration!:string; //in minutes
    candidate_give!:string ; //0/1
    assessment_mode!:string;
    assessment_type!:string;
    start_time!:string;
    end_time!:string;
    mandatory_answer!:string;
    assessor_id!:string;
}
export class questionlist
{
  id!:string;
  question!:string;
  option_a!:string;
  option_b!:string;
  option_c!:string;
  option_d!:string;
  question_set_id!:string;
  answer!:string;
  duration!:number;
  question_type!:string;
}
export class instructions
{
        assessment_type!:string;
        test_duration!:string;
        start_time!:string;
        end_time!:string;
        paper_set_name!:string;
        finished_exam!:boolean;
        instructions!:string;
}
export class questionsolve
{
    question_id!:string;
    answer!:string;
    question_set_id!:string;
}

export class AssorLogin
{
  username!:string;
  password!:string;
}
export class examlist_assesor
{
  id!:string;
  question_set_id!:string;
  question_set_details!:string;
  batch_id!:string;
  start_date!:string;
  end_date!:string;
  test_duration!:string;
  assessor_id!:string;
  assessor_details!:string;
  first_name!:string;
  middle_name!:string;
  last_name!:string;
  email!:string;
  contact_number!:string;
  sip_user_id!:string;
  login_username!:string;
  login_password!:string;
  assessment_mode!:string;
  paper_set_name!:string;
  assessment_type!:string;
}
export class examstdlist
{
            id!:string;
            batch_id!:string;
            batch_name!:string;
            name!:string;
            middle_name!:string;
            father_name!:string;
            enrollment_number!:string;
            email!:string;
            mobile_code!:string;
            mobile_no!:string;
            surname!:string;
            adhar_card!:string;
            pan_card!:string;
            gender!:string;
            username!:string;
            password!:string;
            status!:string;
            present!:string;
}
export class Vivaquestion
{
            id!:string;
            question_set_id!:string;
            domain_name!:string;
            question!:string;
            total_marks!:string;
            difficulty_level!:string;
            option1!:string;
            option2!:string;
            option3!:string;
            option4!:string;
            answer!:string;
            index_id!:string;
}
export class bulkquestion
{
  files!:any;
  paper_set_id!:string;
  sector_id!:string;
  job_role_id!:string;
  nos_element_id!:string;

}
export class statusbar
{
        questions!:number;
        students!:number;
        finishedExams!:number;
        sectors!:number;
        trainingPartners!:number;
        assessors!:number;
        batchCount!:number;
}
export class bulkstudent
{
  batch_id!:string;
  files!:any;
}
export class studentreport
{
            student_id!:string;
            batch_id!:string;
            batch_name!:string;
            name!:string;
            middle_name!:string;
            surname!:string;
            enrollment_number!:string;
            theory!:string;
            no_of_questions!:string;
            total_marks!:string;
            marks_obtain!:string;
            viva!:string;
            practical!:string;
}
export class studentnoswiseRPT
{
                question_no!:string;
                question!:string;
                assessment_type!:string;
                question_type!:string;
                option1!:string;
                option2!:string;
                option3!:string;
                option4!:string;
                option5!:string;
                option6!:string;
                answer!:string;
                student_answer!:string;
                total_marks!:string;
                marks_obtain!:string;
                difficulty_level!:string;
}
export class assigntestmodel
{
            id!:string;
            question_set_id!:string;
            question_set_details!:string;
            assessment_mode!:string;
            paper_set_name!:string;
            assessment_type!:string;
            batch_id!:string;
            start_date!:string;
            end_date!:string;
            test_duration!:string;
            assessor_id!:string;
            assessor_details!:string;
            first_name!:string;
            middle_name!:string;
            last_name!:string;
            email!:string;
            contact_number!:string;
            sip_user_id!:string;
            login_username!:string;
            login_password!:string;


}
export class getimgcapture
{
  uploadPhotos!:any;
  capture_image!:any;
  uploaded_image!:any;
}
export class nosreport
{
            nos_code!:string;
            index_id!:string;
            nos_description!:string;
            total_theory!:string;
            total_viva!:string;
            total_practical!:string;
            total_theory_marks_obtain!:string;
            total_viva_marks_obtain!:string;
            total_practical_marks_obtain!:string;

}
export class GetlocationModel
{
  latitude!:string;
  longitude!:string;
  iframe!:string;
}
