import axios from "axios";

export const getPlaceData = async ({ bl_lat, bl_lng, tr_lat, tr_lng }, type) => {
  try {
    const {
      data: { data }
    } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: bl_lat || '11.4224010018765',
        tr_latitude: bl_lng || '11.73632750825867',
        bl_longitude: tr_lat || '104.7127961499213',
        tr_longitude: tr_lng || '105.0675773595426',
        limit: '30',
        currency: 'USD',
        lunit: 'km',
        lang: 'en_US'
      },
      headers: {
        'X-RapidAPI-Key': '82dc82fb5fmshdf61401971b82c1p122733jsn7cda4cea7ef5',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }

    })

    return data
  } catch (error) {
    return null
  }
}