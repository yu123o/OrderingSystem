export class ReturnOrderDetail {
    
    TotalRows?: number
    No?: number
    EntityID?: number
    OrderMaster?: number
    SKU?: string
    ItemCaption?: string
    Unit?: number
    ArabicName?: string
    Qty?: number
    Price?: number
    Cost?: number
    PurchaseOrderDetail?: string
    Dispatch?: boolean
    Notes?: string
    Remarks?: string
    Status?: number
    StatusText?: string
    OrderNo?:number
    CustomerNo?:number
    Name?:string
    OrderDate?:Date
 

    constructor() {
        this.TotalRows = null
        this.No = null
        this.EntityID = null
        this.TotalRows = null
        this.No = null
        this.EntityID = null
        this.OrderMaster = null
        this.SKU = null
        this.ItemCaption = null
        this.Unit = null
        this.ArabicName = null
        this.Qty = null
        this.Price = null
        this.Cost = null
        this.PurchaseOrderDetail = null
        this.Dispatch = false
        this.Notes = null
        this.Remarks = null
        this.Status = null
        this.Notes = null
        this.Remarks = null
        this.Status = null
        this.StatusText = null
        this.OrderNo=null
        this.CustomerNo=null
        this.Name=null
        this.OrderDate= new Date()
    }
}