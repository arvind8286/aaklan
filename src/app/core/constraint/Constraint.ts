export const constraint={
  API_END_POINT:{
    //all COMMON api end point
    LOGIN:"login",

    LIST:"list",
    ADD:"add",
    DETAILS:"details",
    UPDATE:"update",
    DELETE:"delete",
    ACTIVATE:"activate",
    DEACTIVATE:"deactivate",

    //all  api end point end
    //COUNTRY API END POINT STARTS
    ALL_COUNTRY:"country/",
    COUNTRY_LIST:"list",
    COUNTRY_ADD:"add",
    COUNTRY_UPDATE:"update",
    COUNTRY_ACTIVATE:"activate",
    COUNTRY_DEACTIVATE:"deactivate",
    COUNTRY_DELETE:"delete/",
    //COUNTRY API END POINT END
    //ALL CITIES API_END START
    ALL_CITY:"city/",
    CITY_LIST:"list",
    CITY_ADD:"add",
    CITY_DETAILS:"details/",
    CITY_UPDATE:"update",
    CITY_ACTIVATE:"activate",
    CITY_DEACTIVATE:"deactivate",
    CITY_DELETE:"delete",

    //ALL CITIES APIEND END

    //ALL STATE API END START
    All_STATE:"state/",
    STATE_LIST:"list",
    STATE_ADD:"add",
    STATE_DETAILS:"details/",
    STATE_UPDATE:"update",
    STATE_ACTIVATE:"activate",
    STATE_DEACTIVATE:"deactivate",
    STATE_DELETE:"delete",


    //ALL Admin API END START
    STUDENT:"student/",
    BATCH:"batch/",
    SECTORS:"sectors/",
    NOS:"nos/",
    NOS_ELEMENTS:"nos-element/",
    SCHEME:"scheme/",
    USERS:"users/",
    TRAINING_PARTNER:"training-partner/",
    CREATE_EVIDANCE:"create-evidence/",
    ASSIGN_EVIDANCE:"assign-evidence/",
    ASSESSOR:"assessor/",
    PC_DETAILS:"pcdetails/",
    QUESTION_SET:"question-set/",
    JOB_ROLE:"job-role/",
    QUESTION:"question/",
    ASSIGNTEST:"assign/test",
    ASSIGNTEST_LIST:"list/assign/test",
    ADD_INSTRUCTION:"add/instruction",
    LIST_INSTRUCTION:"get/instruction",
    //bulk upload
    BULK_QUESTION_ADD:"bulk/upload/questions",
    BULK_STUDENT_ADD:"bulk/upload/students",
    //Evidance
    GETGEOLOCATION:"get/student/location",
    GETIMAGES:"bulk/upload/students",



      //student portal api end point

    //upload image
    ADD_IMG:"add-image",
    //QUESTION
    QUESTIONLIST:"questions-list",
    QUESTION_SOLVE:"questions/solve",
    EXAM_FINISH:"exam/finished",
  INSTSTUD:"student/instructions",
  EXAM:"student/add/exam-images",
  EXAM_LOCATION:"student/location",
  GETEVIDANCE_IMG:"",


  //Assessor portal api ens point
  ASSOR_LOGIN:"assessor/login",
  ASSOR_EXAM_LIST:"assessor/exam/list",
  EXAM_STD_LIST:"assessor/student/list",
  STD_ATTENDANCE:"assessor/student/attendance",
  VIVA_QUESTION_LIST:"assessor/viva/question/list",
  VIVA_QUESTION_SOLVE:"assessor/viva/question/solve",
  VIVA_QUESTION_FINISH:"assessor/exam/finished",

  //Report analysis
  STUDENT_YEAR_WISE:"student-count/yearly/report",
  BATCH_YEAR_WISE:"batch-count/yearly/report",
  DASHBOARD_STATUS:"dashboard/count",

  //Report/Result
  STUDENT_WISE_RESULT:"student-wise/report",
  NOS_WISE_STUDENT_REPORT:"student/report",
  NOSREPORT:"nos/report",
  CAPTURE_IMG:"admin/evidence",



  },
VALIDATION_MESSAGE:{
  REQUIRED:"This is required"
}
}
