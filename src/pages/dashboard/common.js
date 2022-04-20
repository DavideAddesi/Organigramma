export const customEndpoint = () =>{
    const customEndpoint=localStorage.getItem('endpoint')
    console.log(customEndpoint)
    if(customEndpoint && customEndpoint != ""){
      return customEndpoint
    } else return null  
}