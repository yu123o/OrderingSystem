
export class SaveOrderDetail {
    EntityID:number
    OrderMaster?: number
    SKU?: string
    ItemCaption?: string
    Unit?: number
    Qty?: number
    Price?: number
    Cost?: number
    PurchaseOrderDetail?: number
    Dispatch?: boolean
    Doer?: number
    Action?: number
    IpAddress?: string
    constructor() {
        this.OrderMaster = null
        this.SKU = null
        this.ItemCaption = null
        this.Unit = null
        this.Qty = null
        this.Price = null
        this.Cost = null
        this.PurchaseOrderDetail = null
        this.Dispatch = false
        this.Doer = null
        this.Action = null
        this.IpAddress = null
    }
}