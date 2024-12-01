export class SearchOrderMaster {
    EntityID: number
    PageIndex?: number
    PageSize?: number
    OrderBy?: string
    OrderByDirection?: string
    ListOfStatus?: string
    MinOrderDate: Date
    MaxOrderDate: Date
    MinOrderTotal?: number
    MaxOrderTotal?: number
    MinDueDate: Date
    MaxDueDate: Date
    MinReceivedAmount?: number
    MaxReceivedAmount?: number
    MinAqusdByDlvry: Date
    MaxAqusdByDlvry: Date
    Name?: string
    Mobile?: string
    Status?: string
    constructor() {
        this.EntityID = null
        this.MinOrderDate = null
        this.MaxOrderDate = null
        this.MinOrderTotal = null
        this.MaxOrderTotal = null
        this.MinDueDate = null
        this.MaxDueDate = null
        this.MinReceivedAmount = null
        this.PageIndex = null
        this.PageSize = null
        this.OrderBy = null
        this.OrderByDirection = null
        this.ListOfStatus = null
        this.MaxReceivedAmount = null
        this.MinAqusdByDlvry = null
        this.MaxAqusdByDlvry = null
    }
}