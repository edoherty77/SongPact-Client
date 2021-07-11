import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import AppText from './AppText'
import colors from '../config/colors'

const PactButton = ({ type, title, name, status, onPress }) => {
  return (
    <TouchableOpacity style={styles.pactButton} onPress={onPress}>
      <View style={[styles.status, { backgroundColor: status }]}></View>
      <View>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.text}>
          Created By: <AppText style={styles.name}>{name}</AppText>
        </AppText>
        <AppText fontSize={13}>Type: {type}</AppText>
      </View>
      <View style={styles.right}>
        <AppText style={styles.updated}>Last updated: 05/02/2021</AppText>
      </View>
    </TouchableOpacity>
  )
}

export default PactButton

const styles = StyleSheet.create({
  pactButton: {
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
  },
  status: {
    top: 5,
    height: 10,
    width: 10,
    borderRadius: 20,
    marginRight: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  right: {
    display: 'flex',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  updated: {
    color: 'rgba(34, 34, 34, 0.8)',
    fontSize: 12,
  },
})
