import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { LayoutComponent } from './common/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageCountryComponent } from './components/adminsetting/manage-country/manage-country.component';
import { ManageStateComponent } from './components/adminsetting/manage-state/manage-state.component';
import { ManageCityComponent } from './components/adminsetting/manage-city/manage-city.component';
import { ManageSectorComponent } from './components/adminsetting/manage-sector/manage-sector.component';
import { ManageSchemeComponent } from './components/adminsetting/manage-scheme/manage-scheme.component';
import { ManageJobroleComponent } from './components/adminsetting/manage-jobrole/manage-jobrole.component';
import { ManageNosDetailsComponent } from './components/adminsetting/manage-nos-details/manage-nos-details.component';
import { ManageNosElementsComponent } from './components/adminsetting/manage-nos-elements/manage-nos-elements.component';
import { ManagePcDetailsComponent } from './components/adminsetting/manage-pc-details/manage-pc-details.component';
import { ManageTpComponent } from './components/adminsetting/manage-tp/manage-tp.component';
import { ManageAssessorComponent } from './components/adminsetting/manage-assessor/manage-assessor.component';
import { ManageUsersComponent } from './components/adminsetting/manage-users/manage-users.component';
import { CreateBatchComponent } from './components/batchmanage/create-batch/create-batch.component';
import { CandidateComponent } from './components/batchmanage/candidate/candidate.component';
import { CandidateLoginComponent } from './Auth/candidate-login/candidate-login.component';
import { QuestionComponent } from './components/adminsetting/question/question.component';
import { CreateEvidanceComponent } from './components/adminsetting/create-evidance/create-evidance.component';
import { CandlayoutComponent } from './common/candidate/candlayout/candlayout.component';
import { CandidatePanelComponent } from './components/candidate/candidate-panel/candidate-panel.component';
import { StdLogoutComponent } from './components/candidate/std-logout/std-logout.component';
import { CaptureDetailsComponent } from './components/candidate/capture-details/capture-details.component';
import { AssignTestComponent } from './components/batchmanage/assign-test/assign-test.component';
import { AssessorLoginComponent } from './Auth/assessor-login/assessor-login.component';
import { AsrLayoutComponent } from './common/assessor/asr-layout/asr-layout.component';
import { AssessorpanelComponent } from './components/assessor/assessorpanel/assessorpanel.component';
import { ManageQuesSetComponent } from './components/adminsetting/manage-ques-set/manage-ques-set.component';
import { BeforetestComponent } from './components/candidate/beforetest/beforetest.component';
import { TestpageComponent } from './components/candidate/testpage/testpage.component';
import { TestsummaryComponent } from './components/candidate/testsummary/testsummary.component';
import { QuestIntroComponent } from './components/adminsetting/quest-intro/quest-intro.component';
import { LogoutaccesorComponent } from './components/assessor/logoutaccesor/logoutaccesor.component';
import { StudentListExamComponent } from './components/assessor/student-list-exam/student-list-exam.component';
import { VivaQuestionComponent } from './components/assessor/viva-question/viva-question.component';
import { WebcamComponent } from 'ngx-webcam';
import { QuestionBulkComponent } from './components/adminsetting/question-bulk/question-bulk.component';
import { StudentWiseComponent } from './components/adminsetting/student-wise/student-wise.component';
import { LogoutAdminComponent } from './components/adminsetting/logout-admin/logout-admin.component';
import { StudentBulkAddComponent } from './components/adminsetting/student-bulk-add/student-bulk-add.component';
import { NosWiseReportComponent } from './components/adminsetting/nos-wise-report/nos-wise-report.component';
import { GetimgevidanceComponent } from './components/adminsetting/getimgevidance/getimgevidance.component';
import { NosreportOnlyComponent } from './components/adminsetting/nosreport-only/nosreport-only.component';

export const routes: Routes = [
  {
    path:'',redirectTo:'studentLogin',pathMatch:"full"
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'studentLogin',component:CandidateLoginComponent
  },

  {
    path:'',component:CandlayoutComponent,
    children:[
      {
        path:'candidatepanel',component:CandidatePanelComponent
      },
      {
        path:'slogout',component:StdLogoutComponent
      },
      {
        path:'capuredetails',component:CaptureDetailsComponent
      },
      {
        path:'pretest',component:BeforetestComponent
      },
      {
        path:'teststart',component:TestpageComponent
      },
      {
        path:'finished',component:TestsummaryComponent
      }

    ]
  },
  {
    path:'assessorlogin',component:AssessorLoginComponent
  },
  {
    path:'',component:AsrLayoutComponent,
    children:[
      {
        path:'assessorPanel',component:AssessorpanelComponent
      },
      {
        path:'asrlogout',component:LogoutaccesorComponent
      }
      ,{
        path:'stdexamlist/:id',component:StudentListExamComponent
      },
      {
        path:'takeviva/:sid',component:VivaQuestionComponent
      },
      {
        path:'webcam',component:WebcamComponent
      }
    ]
  },
  {
    path:'',component:LayoutComponent,
    children:[
      {
        path:'dashboard',component:DashboardComponent
      },
      {
        path:'country',component:ManageCountryComponent
      },
      {
        path:'state',component:ManageStateComponent
      }
      ,
      {
        path:'city',component:ManageCityComponent
      }
      ,
      {
        path:'sector',component:ManageSectorComponent
      }
      ,
      {
        path:'scheme',component:ManageSchemeComponent
      }
      ,
      {
        path:'jobrole',component:ManageJobroleComponent
      }
      ,
      {
        path:'nosdetails',component:ManageNosDetailsComponent
      }
      ,
      {
        path:'noselements',component:ManageNosElementsComponent
      }
      ,
      {
        path:'pcdetails',component:ManagePcDetailsComponent
      }
      ,
      {
        path:'quesset',component:ManageQuesSetComponent
      }
      ,
      {
        path:'managetp',component:ManageTpComponent
      },
      {
        path:'manageassessor',component:ManageAssessorComponent
      },
      {
        path:'manageuser',component:ManageUsersComponent
      },
      {
        path:'createbatch',component:CreateBatchComponent
      }
      ,
      {
        path:'candidate',component:CandidateComponent
      },
      {
        path:'addquestion',component:QuestionComponent
      },
      {
        path:'createEvidance',component:CreateEvidanceComponent
      },
      {
        path:'assigntest/:id',component:AssignTestComponent
      },
      {
        path:'assigntest',component:AssignTestComponent
      },
      {
        path:'questintro/:id',component:QuestIntroComponent
      },
      {
        path:'bulkquestionUpload',component:QuestionBulkComponent
      },
      {
        path:'bulkStudentUpload',component:StudentBulkAddComponent
      },
      {
        path:'studentwiseReport',component:StudentWiseComponent
      },
      {
        path:'noswisereport/:sid/:bid',component:NosWiseReportComponent
      }
      ,{
        path:'adminlogout',component:LogoutAdminComponent
      },
      {
        path:'getevidance/:sid/:bid',component:GetimgevidanceComponent
      }
      ,{
        path:'nosreportdata/:sid/:bid',component:NosreportOnlyComponent
      }
    ]
  }
];
