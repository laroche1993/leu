import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { COLORS } from '../theme'

export type SocialProps = {
    color?: string,
    icon: string|any,
}
export default function Social({color = COLORS.black, icon}: SocialProps) {
  return <Image resizeMode='contain' style={{width: 40, height:40, marginLeft: 12}} source={icon} />
   
  
}

const styles = StyleSheet.create({})