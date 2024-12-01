
export class SaveOrderMaster {

    EntityID: number
    Status: number
    Remarks: string


    Notes: string
    Customer?: number
    OrderDate?: Date
    OrderTotal?: number
    DueDate?: Date
    ShipToAddress?: string
    ShipMethod?: number
    ShipFees?: number
    ShipReference?: string
    ReceivedAmount?: number
    AqusdByDlvry?: Date
    ConcernedWithReceiving?: string
    ConcernedWithReceivingPhone?: string
    ListPrinted?: boolean
    Doer?: number
    Action?: number
    IpAddress?: string
    constructor() {
        this.Status = null
        this.Customer = null
        this.OrderDate = new Date()
        this.OrderTotal = null
        this.DueDate = new Date()
        this.ShipToAddress = null
        this.ShipMethod = null
        this.ShipFees = null
        this.ShipReference = null
        this.ReceivedAmount = null
        this.AqusdByDlvry = new Date()
        this.ConcernedWithReceiving = null
        this.ConcernedWithReceivingPhone = null
        this.ListPrinted = false
        this.Doer = null
        this.Action = null
        this.IpAddress = null
        this.Notes = null
    }
}