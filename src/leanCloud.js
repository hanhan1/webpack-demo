import AV from 'leancloud-storage'
var APP_ID = 'V6pPTg64lUc5ylqgv329lR4E-gzGzoHsz'
var APP_KEY = '8OPVfG5xnXz5D9QXSjUSEfnQ'
AV.init({
  appId:APP_ID,
  appKey:APP_KEY
})
export default AV

export const TodoModel = {
  getByUser(user, successFn, errorFn){
    // 文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
    let query = new AV.Query('Todo')
    query.equalTo('deleted', false);
    query.find().then((response) => {
      let array = response.map((t) => {
        return {id: t.id, ...t.attributes}
      })
      successFn.call(null, array)
    }, (error) => {
      errorFn && errorFn.call(null, error)
    })
  },
   create({status,title,deleted},successFn,errorFn){
    let Todo = AV.Object.extend('Todo')
    let todo = new Todo()
    todo.set('title',title)
    todo.set('status',status)
    todo.set('deleted',deleted)
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false)
    acl.setWriteAccess(AV.User.current(),true)
    acl.setReadAccess(AV.User.current(),true)
    todo.setACL(acl);
    todo.save().then(function(response){
      successFn.call(null,response.id)
    },function(error){
      errorFn&&errorFn.call(null,error)
    });
  },
  update({id,title,status,deleted},successFn,errorFn){
    let todo = AV.Object.createWithoutData('Todo',id)
    title !== undefined && todo.set('title',title)
    status !== undefined && todo.set('status',status)
    deleted !== undefined && todo.set('deleted',deleted)
    todo.save().then((response) =>{
      successFn && successFn.call(null)
    },(error)=>errorFn && errorFn.call(null,error))
  },
  destory(todoId,successFn,errorFn){
   TodoModel.update({id:todoId,deleted:true},successFn,errorFn) 
  }
}

export function loadList(userID,successFn,errorFn){
  var className = 'todo_'+userID
  var list  = []
  AV.Query.doCloudQuery(`select * from ${className}`)
  .then(function(res){
    for(let i=0;i<res.results.length;i++){
      let obj = {
        id:res.results[i].id,
        ...res.results[i].attributes
      }
      list.unshift(obj)
    }
    successFn.call(null,list)
  },function(error){
    if(error.code === 101){
      console.log('没有这个用户列表')
      errorFn.call()
    }
  });
}

export function updateListTable(user,itemId,key,value){
  var className = 'todo_'+user.id
  var item =AV.Object.createWithoutData(className,itemId)
  item.set(key,value)
  item.save()
}

export function saveListTable(item,user,successFn,errorFn){
  var TodoList = AV.Object.extend("todo_"+user.id)
  var todoList = new TodoList()
  todoList.set('username',user.username)
  todoList.set('title',item.title)
  todoList.set('status',item.status)
  todoList.set('deleted',item.deleted)
  todoList.set('group',item.group)
  todoList.save().then(function(todo){
    successFn.call(null,todo.id)
  },function(error){
    errorFn.call(null)
    alert(error)
  })
}
export function signUp(email,username,password,successFn,errorFn){
  var user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.setEmail(email)
  user.signUp().then(function (loginedUser){
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null,user)
  },function(error){
    errorFn.call(null,error)
  })
  return undefined
}

export function signIn(username,password,successFn,errorFn){
  AV.User.logIn(username,password).then(function(loginedUser){
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null,user)
  },function(error){
    errorFn.call(null,error)
  })
  return undefined
}

export function sendPasswordResetEmail(email,successFn,errorFn){
  AV.User.requestPasswordReset(email).then(function(success){
    successFn.call()
  },function(error){
    errorFn.call(null,error)
  })
}

export function signOut(){
  AV.User.logOut()
  return undefined
}
export function getCurrentUser(){
  let user = AV.User.current()
  if(user){
    return getUserFromAVUser(user)
  }else{
    return null
  }
}


function getUserFromAVUser(AVUser){
  return{
    id:AVUser.id,
    ...AVUser.attributes
  }
}