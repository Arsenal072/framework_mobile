import axios from 'axios';
const http = 'http://192.168.1.46:8080'
// 用户询问类型
export function queryType(params){
    return axios.get(http + '/userQuestion?describe=' + params.inputContent)
}
// 部位
export function queryCheckBodyList(params){
    return axios.get(http + '/queryCheckBodyList?pageNo='+ params.pageNum + '&pageSize=' + params.pageSize)
}
// 症状列表
export function querySymptomList(params){
    return axios.get(http + '/querySymptomList?pageNo='+ params.pageNum + '&pageSize=' + params.pageSize + '&age=' + params.age + '&sex=' + params.gender + '&huManBodyId=' + params.bodyId)
}
// 伴随症状
export function queryQuestionOptionList(params){
    return axios.get(http + '/queryQuestionOptionList?pageNo='+ params.pageNum + '&pageSize=' + params.pageSize + '&sex=' + params.gender + '&id=' + params.symptomId)
}
// 查询疾病列表
export function queryDisease(params){
    return axios.get(http + '/queryDisease?age='+ params.age + '&sex=' + params.gender + '&symptomIdList=' + params.symptomId + '&questionOptionIdList=' + params.optionId)
}
// 疾病详情
export function queryDiseaseDetail(params){
    return axios.get(http + '/queryDiseaseDetail?id=' + params.diseaseId)
}
//查询药
export function queryMedicineList(params){
    return axios.get(http + '/userQuestion?describe=' + params.medicine)
}
// 药详情
export function queryMedicineDetail(params){
    return axios.get(http + '/queryDrugDetail?id=' + params.medicineId)
}