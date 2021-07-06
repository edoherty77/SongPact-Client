import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

// CONFIG
import colors from '../../config/colors'

//COMPONENTTS
import Screen from '../../components/Screen'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import ButtonIcon from '../../components/ButtonIcon'
import ConfirmModal from '../../components/ConfirmModal'
import AppButton from '../../components/AppButton'
import { RadioButton } from 'react-native-paper'
import Separator from '../../components/Separator'

// FORM
import { Formik, FieldArray } from 'formik'
import { SubmitButton } from '../../components/forms'
import * as Yup from 'yup'

// STORE
import store from '../../stores/CreatePactStore'
import currentUser from '../../stores/UserStore'

// const validationSchema = Yup.object().shape({
//   recordTitle: Yup.string().required().label('Record Title'),
//   role: Yup.string().required().label('role'),

// })

export default function ChooseProducer({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false)
  const [data, setData] = useState(null)
  const [value, setValue] = React.useState('')
  console.log('CURRENT NIG', currentUser)
  function setStoreData() {
    setData(store.users)
  }

  useEffect(() => {
    setStoreData()
  }, [])

  function nextScreen(values) {
    console.log(values)
    store.setProducer(values)
    navigation.navigate('ProducerInfo')
  }

  function trash() {
    setModalVisible(true)
  }

  function trashDeny() {
    setModalVisible(false)
  }

  function trashConfirm() {
    setModalVisible(false)
    store.resetPact()
    navigation.navigate('New')
  }
  return (
    <Screen>
      <Header
        title="Create a new pact"
        subTitle="Gratuity Info"
        icon="arrow-back"
        back={() => navigation.navigate('Collabs')}
      />
      <Separator />
      <Formik
        enableReinitialize
        initialValues={{ producer: '' }}
        onSubmit={(values) => nextScreen(values)}
        // validationSchema={validationSchema}
      >
        {({ setFieldValue }) => (
          <View style={styles.mainView}>
            <View style={styles.formView}>
              <FieldArray name="producer">
                {({}) => (
                  <RadioButton.Group
                    name="producer"
                    onValueChange={(value) => {
                      setFieldValue('producer', value), setValue(value)
                    }}
                    value={value}
                  >
                    <FlatList
                      style={styles.addedCollabsList}
                      data={data}
                      contentContainerStyle={{
                        display: 'flex',
                        // alignItems: 'center',
                        justifyContent: 'space-evenly',
                        // marginTop: 50,
                        width: '100%',
                        // backgroundColor: 'red',
                        flex: 1,
                      }}
                      keyExtractor={(data) => data._id}
                      renderItem={({ item, index }) => (
                        <View style={styles.checkView}>
                          <RadioButton.Item
                            label={
                              item._id === currentUser._id ? 'Me' : item.name
                            }
                            labelStyle={{ fontSize: 20, padding: 10 }}
                            uncheckedColor="red"
                            color="brown"
                            name="producer"
                            value={`${item._id}`}
                          />
                        </View>
                      )}
                    />
                  </RadioButton.Group>
                )}
              </FieldArray>
            </View>
            <View style={styles.footer}>
              <SubmitButton
                style={styles.nextButton}
                title="Next"
                // onPress={() => {
                //   navigation.push('Fourth')
                // }}
              />
            </View>
          </View>
        )}
      </Formik>
      <ConfirmModal
        text="Are you sure you'd like to delete?"
        onBackdropPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        confirm={trashConfirm}
        deny={trashDeny}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flex: 1,
    padding: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginBottom: 30,
  },
  pageHeader: {
    fontSize: 35,
    marginVertical: 15,
  },
  formView: {
    width: '85%',
    // backgroundColor: 'green',
    flex: 1,
  },
  addedCollabsList: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'blue',
    // flex: 1,
    height: '100%',
  },
  checkView: {
    display: 'flex',
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 0.4,
    borderRadius: 50,
  },
  input: {
    width: '90%',
    backgroundColor: 'rgba(250, 250, 250, 0.8)',
    fontSize: 18,
    paddingLeft: 20,
    height: 45,
    borderRadius: 25,
  },
  footer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  iconView: {
    position: 'absolute',
    right: 10,
  },
  nextButton: {
    // marginTop: 10,
    borderRadius: 50,
    height: 45,
    backgroundColor: colors.red,
    width: '50%',
  },
})
