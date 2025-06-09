export interface FilterRequestMedicine{
    usersIds: Array<number> | null
    creationDate: string | null
    nameMedicine: string | null
    code: number | null
    requestMedicineId: number | null
    numberOrder: number | null
    medicineIds: Array<number> | null
    coveragePos: boolean | null
    pagCurrent: number | null
    cantRecords: number | null
}