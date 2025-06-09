import { DataAddRequestMedicine } from "./data-add-request-medicine"
import { Medicine } from "./medicine"
import { UserResponse } from "./user"

export interface ResponseRequestMedicine {
    requestMedicineId: number
    user: UserResponse 
    medicine: Medicine
    dataAddRequestMedicine: DataAddRequestMedicine | null
    amount: number
}