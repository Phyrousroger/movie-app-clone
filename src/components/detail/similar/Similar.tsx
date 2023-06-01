import Carousal from '@/components/carousel/Carousal';
import useFetch from '@/hooks/useFetch';
import React from 'react'

const Similar = ({mediatype,id}:any) => {
  const {data,loading,error}=useFetch(`/${mediatype}/${id}/similar`);
  
  const title=mediatype==="tv"?"Similar TV shows":"Similar Movies";

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

export default Similar