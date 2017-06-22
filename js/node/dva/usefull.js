 import $ from "jquery";
 
 refreshData=({url})=>{
    //alert("fetchData:"+url);
    //let fulr=url+"&page="+this.state.pagination.current+"&limit="+this.state.pagination.limit;
     
    this.setState({loading:true});
    $.get('/api/users',  (result)=> {
      this.setState({
        data: result,
        loading:false,
        //pagination:Object.assign({},this.state.pagination,{current:this.state.pagination.current+1}),
      });
    });
    
  }