import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from '../assets'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MenuContainer from '../components/MenuContainer'
import { FontAwesome } from '@expo/vector-icons'
import ItemCardContainer from '../components/ItemCardContainer'
import { getPlaceData } from '../api'

const Discover = () => {
  const navigation = useNavigation()

  const [type, setType] = useState('restaurants')
  const [isLoading, setIsLoading] = useState(false)
  const [mainData, setMainData] = useState([])
  const [formInput, setFormInput] = useState({
    bl_lat: '',
    bl_lng: '',
    tr_lat: '',
    tr_lng: '',
  })


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  })

  useEffect(() => {
    setIsLoading(true)
    getPlaceData(formInput, type).then((data) => {
      setMainData(data)
      setIsLoading(false)
    })
  }, [formInput, type])
  return (
    <SafeAreaView className='flex-1 bg-white relative'>
      <View className='flex-row items-center justify-between px-8'>
        <View>
          <Text className='text-[40px] text-[#0B646B]'>Discover</Text>
          <Text className='text-[36px] text-[#527283]'>the beauty today</Text>
        </View>
        <View className='w-12 h-12 bg-gray-400 rounded-md items-center justify-center'>
          <Image
            source={Avatar}
            className='w-full h-full object-cover'
          />
        </View>
      </View>

      <View className='flex-row items-center bg-white rounded-xl py-1 px-4 shadow-lg mt-4 mx-4'>
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: 'geometry' }}
          placeholder='Search'
          fetchDetails={true}
          onPress={(data, details = null) => {
            // console.log(data, details)
            setFormInput({
              bl_lat: details?.geometry?.viewport?.southwest?.lat,
              bl_lng: details?.geometry?.viewport?.southwest?.lng,
              tr_lat: details?.geometry?.viewport?.northeast?.lat,
              tr_lng: details?.geometry?.viewport?.northeast?.lng,
            })
          }}
          query={{
            key: 'AIzaSyBVR6OkfLXHW82kWhxyeqOFnuyWlNzHwLM',
            language: 'en',
          }}
        />
      </View>

      {/* Menu Container */}


      {/* Menu Container */}

      <ScrollView>
        <View className='flex-row items-center justify-center px-8 mt-8'>
          <MenuContainer
            key={'hotel'}
            title='Hotels'
            imageSrc={Hotels}
            type={type}
            setType={setType}
          />
          <MenuContainer
            key={'attractions'}
            title='Attractions'
            imageSrc={Attractions}
            type={type}
            setType={setType}
          />
          <MenuContainer
            key={'restaurants'}
            title='Restaurants'
            imageSrc={Restaurants}
            type={type}
            setType={setType}
          />
        </View>
        {isLoading ?
          <View className='flex-1 items-center justify-center'>
            <ActivityIndicator size="large" color="#2C7379" />
          </View>
          :
          <View>
            <View className='flex-row items-center justify-between px-4 mt-8'>
              <Text className='text-[#2C7379] text-[28px] font-bold'>Top Tips</Text>
              <TouchableOpacity className='flex-row items-center justify-center space-x-2'>
                <Text className='text-[#A0C4C7] text-[20px] font-bold '>Explore</Text>
                <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7" />
              </TouchableOpacity>
            </View>

            <View className='px-4 mt-8 flex-row items-center justify-evenly flex-wrap'>
              {mainData?.length > 0 ? <>
                {mainData.map((data, index) => (
                  <ItemCardContainer
                    key={index}
                    imageSrc={
                      data?.photo?.images?.medium?.url ?
                        data?.photo?.images?.medium?.url
                        :
                        'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png'
                    }
                    title={data?.name}
                    location={data?.location_string}
                    data={data}
                  />
                ))}
              </> : <>
                <View className='w-full h-full items-center space-y-8 justify-center'>
                  <Image source={NotFound} className='w-32 h-32 object-cover' />
                  <Text className='text-2xl text-[#428288] font-semibold'>
                    Opps...No Data Found
                  </Text>
                </View>
              </>}
            </View>
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Discover