
import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, Image } from 'react-native';

export default function App(){
  const [status, setStatus] = useState('Pronto');
  return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#0B1B3B' }}>
      <View style={{ padding:16 }}>
        <Image source={require('../assets/logo-dark.png')} style={{ width:220, height:40, resizeMode:'contain' }} />
        <Text style={{ color:'white', marginTop:16 }}>RMS CargoTrack Pro</Text>
        <Text style={{ color:'#0FA3B1' }}>Rastreamento em tempo real</Text>
        <Button title="Simular Check-in" onPress={()=> setStatus('Check-in efetuado')} />
        <Text style={{ color:'#FFC857', marginTop:16 }}>Status: {status}</Text>
      </View>
    </SafeAreaView>
  );
}
