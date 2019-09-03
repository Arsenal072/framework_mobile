export function autoResponse(navItem, inputText){
    let obj = {}
    // 头部导航，无输入
    if(navItem.type=='智能导诊'){
        if(inputText==''){
            obj.text = 'Hi！我是小U，可以给您提供智能导诊服务哦~'
            obj.linkList = ['感冒','发烧']
        }
    } else if(navItem.type=='智能问病'){
        if(inputText==''){
            obj.text = 'Hi！我是小U，可以给您提供智能问病服务哦~'
            obj.linkList = ['感冒','发烧']
        }
    } else if(navItem.type=='药物查询'){
        if(inputText==''){
            obj.text = 'Hi！我是小U，可以给您提供药物查询服务哦~'
            obj.linkList = ['达菲','999感冒灵']
        }
    } else if(navItem.type=='意见反馈'){
        if(inputText==''){
            obj.text = '请选择需要反馈的途径~'
            obj.linkList = ['人工反馈','留言反馈']
        }
    }else{
        // 输入
        if(inputText.indexOf('头疼')>-1){
            obj.text = '您可能想要了解以下信息'
            obj.linkList = ['感冒','发烧']
        }else if(inputText.indexOf('肚子疼')>-1||inputText.indexOf('胃疼')>-1){
            obj.text = '您可能想要了解以下信息'
            obj.linkList = ['肠胃炎','胃病']
        }else if(inputText.indexOf('发烧')>-1){
            obj.text = 'sorry, 您的描述可能不够准确，找不到您想要的信息！'
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