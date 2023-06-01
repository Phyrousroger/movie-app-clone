import Carousal from '@/components/carousel/Carousal';
import useFetch from '@/hooks/useFetch';
import React from 'react'

const Recommendtation = ({mediatype,id}:any) => {
    const {data,loading,error}=useFetch(`/${mediatype}/${id}/recommendations`);
  
    const title=mediatype==="tv"?"Recommand TV shows":"Recommand Movies";
  
    console.log(data);
    return (
      <Carousal
        title={title}
        data={data?.results}
        loading={loading}
        endpoint={mediatype}
      />
  
      )
}

export default Recommendtation