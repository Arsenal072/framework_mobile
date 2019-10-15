export function autoResponse(navItem, inputText){
    let obj = {}
    // 头部导航，无输入
    if(navItem.type=='智能导诊'){
        if(inputText==''){
            obj.text = 'Hi！我是小U，可以给您提供智能导诊服务,您可以参考以下方式向我提问哦~'
            // obj.linkList = ['虹视','视物变形','闪光幻觉','眼睑红肿']
        }
    } else if(navItem.type=='智能问病'){
        if(inputText==''){
            obj.text = 'Hi！我是小U，可以给您提供智能问病服务哦，您是否查找以下疾病'
            // obj.linkList = ['角膜炎','发烧']
        }
    } else if(navItem.type=='药物查询'){
        if(inputText==''){
            obj.text = 'Hi！我是小U，可以给您提供药物查询服务哦，你是否在查找以下药物'
            // obj.linkList = ['达菲','999感冒灵']
        }
    } else if(navItem.type=='意见反馈'){
        if(inputText==''){
            obj.text = '请选择需要反馈的途径~'
            obj.linkList = [
                {
                    name: '留言反馈',
                    path: ''
                },{
                    name: '人工反馈',
                    path: '/feedback'
                }
        ]}
    }else{
        // 输入
        if(inputText.indexOf('虹视')>-1){
            obj.text = '是否还有其他症状？'
        }else if(inputText.indexOf('眼睛')>-1){
            obj.diseaseList = ['青光眼','結膜炎','角膜炎'],
            obj.departmentList = ['眼科門診']
        }else if(inputText.indexOf('角膜炎')>-1){
            obj.diseaseInfo = {
                title: '角膜炎',
                detail: ' 角膜炎是一种严重的眼科疾病，是导致失明的主要原因之一。角膜炎的病因有多种，外伤、其它眼部或全身感染性疾病都可能导致角膜感染，而引起角膜感染的病原体可以是细菌、霉菌或病毒，个别病例是由过敏反应所引起，所以一......',
                cause: '引起角膜炎的常见原因是细菌、病毒和真菌。其次为外伤、自身免疫病和营养障碍等。'
            }
            obj.diseaseList = ['青光眼','結膜炎','角膜炎'],
            obj.departmentList = ['眼科門診']
        }else if(inputText.indexOf('感冒')>-1){
            obj.text = 'sorry, 您的描述可能不够准确，找不到您想要的信息！'
        }else if(inputText.indexOf('达菲')>-1){
            obj.text = '您可能想要了解以下信息'
            obj.linkList = ['肠胃炎','胃病']
        }else if(inputText.indexOf('999感冒灵')>-1){
            obj.text = '您可能想要了解以下信息'
            obj.linkList = ['肠胃炎','胃病']
        }else{
            obj.text = 'sorry, 您的描述可能不够准确，找不到您想要的信息！'
        }
    }
    return obj
}
export function getTip(id){
    let tip = ''
    if(id==0){
        tip = ',您可以参考以下方式向我提问哦~'
    }else if(id==1){
        tip = '，您是否查找以下疾病'
    }else if(id==2){
        tip = '，你是否在查找以下药物'
    }
    return tip
}