
export class AccountInfo {
    Account : Account
    JWT : string
    
    constructor() {
        this.Account = new Account()
        this.JWT = ''
      
    }
}

class Account {
    Name : string
    EntityID : number
    Status : number
    Remarks : string
    Category : string
    LoggedBefore : boolean
    EmailAddress : string
    PhoneNumber : string
    Notes : string

    constructor() {
        this.Name = ''
        this.EntityID = 0
        this.Status = 0
        this.Remarks = ''
        this.Category = ''
        this.LoggedBefore = false
        this.EmailAddress = ''
        this.PhoneNumber = ''
        this.Notes = ''

    }
}