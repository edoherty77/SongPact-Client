import React from 'react'
import { StyleSheet, View, FlatList, ScrollView } from 'react-native'

import colors from '../../config/colors'
import Screen from '../../components/Screen'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import Separator from '../../components/Separator'
import AppProgressBar from '../../components/AppProgressBar'
import AppButton from '../../components/AppButton'
import PactModel from '../../api/pacts'
import currentPact from '../../stores/CreatePactStore'

// FORM
import { Formik, FieldArray } from 'formik'
import {
  AppFormField,
  AppFormSelect,
  AppFormPercent,
  SubmitButton,
} from '../../components/forms'

export default function ReviewData({ navigation }) {
  const createPact = async () => {
    let performArr = []
    let usersArr = [currentPact.producer.user]
    try {
      currentPact.performers.map((performer) => {
        let obj = {}
        obj['user'] = performer._id
        obj['publisherPercent'] = parseInt(performer.publisherPercent)
        obj['name'] = performer.name
        obj['companyName'] = performer.companyName
        obj['artistName'] = performer.artistName
        obj['address'] = performer.address
        obj['city'] = performer.city
        obj['state'] = performer.state
        obj['zipCode'] = performer.zipCode
        obj['email'] = performer.email
        performArr.push(obj)
        usersArr.push(performer._id)
      })
      let obj = {
        status: 1,
        users: usersArr,
        producer: currentPact.producer,
        type: currentPact.type,
        sample: currentPact.sample,
        recordLabel: currentPact.recordLabel,
        labelName: currentPact.labelName,
        recordTitle: currentPact.recordTitle,
        initBy: currentPact.initBy,
        collaborators: currentPact.collaborators,
        performers: performArr,
      }
      await PactModel.create(obj)
      currentPact.resetPact()
      navigation.navigate('New')
    } catch (error) {
      console.log(error)
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => <Header title={currentPact.recordTitle} {...props} />,
    })
  }, [navigation])

  async function nextScreen() {
    navigation.navigate('ViewContract')
  }

  return (
    <Screen>
      {/* <Header
        back={() => navigation.navigate('Dashboard')}
        icon="arrow-back"
        title={currentPact.recordTitle}
        subTitle="Accept/Counter/Decline"
      /> */}
      <Separator />
      <Formik
        initialValues={{}}
        enableReinitialize
        onSubmit={(values) => nextScreen(values)}
      >
        {({ handleSubmit }) => (
          <ScrollView
            style={styles.mainView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.btnView}>
              <AppButton
                textColor="white"
                title="Accept"
                style={styles.button}
                onPress={handleSubmit}
              />
              {/* <AppButton
                textColor="white"
                title="Counter"
                style={styles.button}
                onPress={nextScreen}
              /> */}
            </View>
            <View style={styles.infoSection}>
              <View style={styles.titleView}>
                <AppText style={styles.text}>Record Title</AppText>
                <AppFormField
                  editable={false}
                  selectTextOnFocus={false}
                  name="recordTitle"
                  style={styles.input}
                  placeholder={currentPact.recordTitle}
                  autoCorrect={false}
                  height={50}
                  placeholderTextColor="#18181b"
                />
              </View>
              <View style={styles.recordInfo}>
                <View>
                  <AppText style={styles.text}>Is this a sample?</AppText>
                  {currentPact.sample ? (
                    <AppText style={styles.answer}>Yes</AppText>
                  ) : (
                    <AppText style={styles.answer}>No</AppText>
                  )}
                </View>
                <View>
                  <AppText style={styles.text}>Label Name</AppText>
                  {currentPact.labelName ? (
                    <AppText style={styles.answer}>
                      {currentPact.labelName}
                    </AppText>
                  ) : (
                    <AppText style={styles.answer}>-</AppText>
                  )}
                </View>
              </View>
            </View>
            <Separator />
            <View style={styles.infoSection}>
              <AppText fontWeight="bold" style={styles.sectionHeader}>
                Producer Info
              </AppText>
              <AppText style={styles.text}>
                Who is the producer for this pact?
              </AppText>
              <AppFormSelect
                defaultValue={currentPact.producer.name}
                isDisabled={true}
                data={currentPact.users}
                item={currentPact.producer.name}
              />
              <AppFormPercent
                editable={false}
                selectTextOnFocus={false}
                name="advancePercent"
                title="Producer Advance"
                placeholder={currentPact.producer.advancePercent}
              />
              <AppFormPercent
                editable={false}
                selectTextOnFocus={false}
                name="royaltyPercent"
                title="Producer Royalty"
                placeholder={currentPact.producer.royaltyPercent}
              />
              <AppFormPercent
                editable={false}
                selectTextOnFocus={false}
                name="publisherPercent"
                title="Producer Publish"
                placeholder={currentPact.producer.publisherPercent}
              />
              <View style={styles.credText}>
                <AppText style={styles.text}>Producer Credit</AppText>
              </View>
              <View style={styles.credInput}>
                <AppFormField
                  editable={false}
                  selectTextOnFocus={false}
                  name="credit"
                  height={50}
                  style={styles.input}
                  placeholder={currentPact.producer.credit}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor={colors.black}
                />
              </View>
            </View>
            <Separator />
            <View style={styles.infoSection}>
              <AppText fontWeight="bold" style={styles.sectionHeader}>
                Performer Info
              </AppText>

              <FieldArray name="performers">
                {() => (
                  <FlatList
                    data={currentPact.performers}
                    keyExtractor={(performer) => performer._id}
                    renderItem={({ item, index }) => (
                      <AppFormPercent
                        editable={false}
                        selectTextOnFocus={false}
                        name={`${index}.publisherPercent`}
                        title={item.name}
                        placeholder={item.publisherPercent}
                      />
                    )}
                  />
                )}
              </FieldArray>
            </View>
          </ScrollView>
        )}
      </Formik>
    </Screen>
  )
}

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flex: 1,
    padding: 10,
    marginHorizontal: 30,
  },
  sectionHeader: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  answer: {
    fontSize: 18,
    marginTop: 8,
  },
  infoSection: {
    display: 'flex',
    marginVertical: 20,
  },
  recordInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  credText: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
    marginTop: 10,
  },
  input: {
    width: '100%',
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
    fontSize: 18,
    height: 100,
    paddingLeft: 20,
    borderRadius: 7,
    marginBottom: 5,
  },
  btnView: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    // marginBottom: 70,
    marginTop: 20,
    // flex: 1,
    borderRadius: 5,
    height: 45,
    backgroundColor: colors.green,
    width: '30%',
  },
})
