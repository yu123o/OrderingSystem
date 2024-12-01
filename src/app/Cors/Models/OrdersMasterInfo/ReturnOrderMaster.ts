export class ReturnOrderMaster {
    TotalRows?: number
    No?: number
    EntityID: number
    Customer?: number
    Name?: string
    OrderDate?: Date
    OrderTotal?: number
    DueDate?: Date
    ShipToAddress?: string
    ShipMethod?: number
    ShipMethodText?: string
    ShipFees?: number
    ShipReference?: string
    ReceivedAmount?: number
    AqusdByDlvry?: Date
    ConcernedWithReceiving?: string
    ConcernedWithReceivingPhone?: string
    ListPrinted?: boolean
    Notes?: string
    Remarks?: string
    Status?: number
    StatusText?: string
    ItemsCount?: number
    Mobile?: string
    OrderNumber?:string
    CustomerName:string
    constructor() {
        this.TotalRows = null
        this.No = null
        this.EntityID = null
        this.Customer = null
        this.Name = null
        this.OrderDate = new Date()
        this.OrderTotal = null
        this.DueDate = new Date()
        this.ShipToAddress = null
        this.ShipMethod = null
        this.ShipMethodText = null
        this.ShipFees = null
        this.ShipReference = null
        this.ReceivedAmount = null
        this.AqusdByDlvry = new Date()
        this.ConcernedWithReceiving = null
        this.ConcernedWithReceivingPhone = null
        this.ListPrinted = false
        this.Notes = null
        this.Remarks = null
        this.Status = null
        this.StatusText = null
        this.ItemsCount = null
        this.Mobile = null
        this.CustomerName = null
    }
}