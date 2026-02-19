class ApiErrorHandling extends Error{
constructor(statuscode,message="Something Went Wrong",errors=[]){
super(message)
this.statuscode=statuscode,
this.errors=this.errors,
this.data=null,
this.success=false
}
}
export default ApiErrorHandling