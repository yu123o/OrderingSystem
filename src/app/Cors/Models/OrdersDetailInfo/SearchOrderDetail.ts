export class SearchOrderDetail {
    OrderMaster: number
    PageIndex?: number
    PageSize?: number
    OrderBy?: string
    OrderByDirection?: string
    ListOfStatus?: string
    MinQty?: number
    MaxQty?: number
    MinPrice?: number
    MaxPrice?: number
    MinCost?: number
    MaxCost?: number
    PurchaseOrderNo?: string
    Dispatch?: boolean
    constructor() {
        this.OrderMaster = null
        this.MinQty = null
        this.MaxQty = null
        this.MinPrice = null
        this.MaxPrice = null
        this.MinCost = null
        this.MaxCost = null
        this.PageIndex = null
        this.PageSize = null
        this.OrderBy = null
        this.OrderByDirection = null
        this.ListOfStatus = null
        this.PurchaseOrderNo = null
        this.Dispatch = true
    }
}