export class SearchCustomer {
    EntityID : number
    Name: string
    Mobile?: string
    DeliveryName?: string
    DeliveryMobile?: string
    Address?: string
    DeliveryMethod?: number
    DeliveryFees?: number
    PageIndex?: number
    PageSize?: number
    OrderBy?: string
    OrderByDirection?: string
    ListOfStatus?: string
    MinDeliveryFees?: number
    MaxDeliveryFees?: number
    constructor() {
        this.EntityID = null
        this.Name = null
        this.Mobile = null
        this.DeliveryName = null
        this.DeliveryMobile = null
        this.Address = null
        this.DeliveryMethod = null
        this.DeliveryFees = null
        this.PageIndex = null
        this.PageSize = null
        this.OrderBy = null
        this.OrderByDirection = null
        this.ListOfStatus = null
        this.MinDeliveryFees = null
        this.MaxDeliveryFees = null

    }
}