interface ManagerContact {
    "phone": string,
    "mobile_phone": string,
    "email": string,
}
export interface User {
    "eduform": string,
    "level":  string,
    "group":  string,
    "eduBranch": null | string,
    "direction":  string,
    "studentId":  string,
    "agreementnum":  string,
    "lastName":  string,
    "firstName":  string,
    "secondName":  string,
    "birthday":  string,
    "customerStatus":  string,
    "idbitrixdeal":  string,
    "subdivision":  string,
    "sersemester":  string,
    "year":  string,
    "mode":  string,
    "type":  string,
    "eduform_up":  string,
    "project":  string,
    "email":  string,
    "manager":  string,
    "manager_contacts": ManagerContact,
    "personal_manager":  string,
    "personal_manager_contacts": ManagerContact[]
}

export interface JsonUser {
    result: User[]
}
