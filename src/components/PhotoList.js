import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';

const PhotoList = ({albumId}) => {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      try{
        const {data} = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${albumId}&user_id=137290658%40N08&format=json&nojsoncallback=1`);
        setPhotos(data.photoset.photo);  
      }catch(err){
        console.log(err);
      }
    }

    fetchData();
  }, []);


 //.then(response => this.setState({ photos: response.data.photoset.photo }));
  
  if (!photos) { 
    return (
      <View style={{ flex: 1 }}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  }

  return (
      <View style={{ flex: 1 }}>
          <FlatList
            data={photos}
            renderItem={({item}) => <PhotoDetail key={item.title} title={item.title} imageUrl={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`} />
            }
            keyExtractor={(item) => item.id}
          />
      </View>
  ); 
}

export default PhotoList;
