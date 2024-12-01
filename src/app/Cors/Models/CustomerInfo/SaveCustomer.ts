
export class SaveCustomer {

    EntityID: number
    Name?: string
    Mobile?: string
    Mobile2?: string
    DeliveryName?: string
    DeliveryMobile?: string
    Address?: string
    DeliveryMethod?: number
    DeliveryFees?: number
    Doer?: number
    Notes?: string
    Action?: number
    IpAddress?: string
    constructor() {
        this.Name = null
        this.Mobile = null
        this.Mobile2 = null
        this.DeliveryName = null
        this.DeliveryMobile = null
        this.DeliveryMethod = null
        this.Address = null
        this.DeliveryFees = 2
        this.Doer = null
        this.Notes = null
        this.Action = null
        this.IpAddress = null
    }
}