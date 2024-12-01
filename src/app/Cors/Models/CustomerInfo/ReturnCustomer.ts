export class ReturnCustomer {
    TotalRows?: number
    No?: number
    EntityID: number
    Name?: string
    Mobile?: string
    Mobile2?: string
    DeliveryName?: string
    DeliveryMobile?: string
    Address: string
    Notes: string
    DeliveryMethod?: number
    DeliveryFees?: number
    Status?: number
    StatusText?: string
    constructor() {
        this.TotalRows = null
        this.No = null
        this.EntityID = null
        this.Name = null
        this.Mobile = null
        this.Mobile2 = null
        this.DeliveryName = null
        this.DeliveryMobile = null
        this.Address = null
        this.DeliveryMethod = null
        this.DeliveryFees = 2
        this.Status = null
        this.StatusText = null
        this.Notes = null
    }
}