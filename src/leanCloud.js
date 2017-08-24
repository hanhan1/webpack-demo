import AV from 'leancloud-storage'
var APP_ID = 'V6pPTg64lUc5ylqgv329lR4E-gzGzoHsz'
var APP_KEY = '8OPVfG5xnXz5D9QXSjUSEfnQ'
AV.init({
  appId:APP_ID,
  appKey:APP_KEY
})
export default AV

export function signUp(username,password,successFn,errorFn){
  var user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.signUp().then(function (loginedUser){
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null,user)
  },function(error){
    errorFn.call(null,error)
  })
  return undefined
}

function getUserFromAVUser(AVUser){
  return{
    id:AVUser.id,
    ...AVUser.attributes
  }
  
}