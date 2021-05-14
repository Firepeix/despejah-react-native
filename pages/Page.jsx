import React from 'react';
import { StyleSheet } from 'react-native';

export default class Page extends React.Component {
  constructor (props) {
    super(props);
    this.createStyle()
  }

  _getBadge() {
    return {
      textTransform: 'uppercase',
      color: 'white',
      borderRadius: 8,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
      fontSize: 24,
      paddingTop: 5,
      paddingBottom: 6,
    }
  }

  createStyle (overload = { page: { } }) {
    this.style = StyleSheet.create({
      page: {
        ...overload.page,
        paddingRight: 24,
        paddingLeft: 24,
      },
      inputWrapper: {
        paddingTop: 20,
        paddingBottom: 20
      },
      label: {
        fontWeight: '700',
        color: '#ff828b',
        fontSize: 19,
        textAlign: 'left'
      },
      error: {
        paddingTop: 3,
        color: 'red',
        textAlign: 'left'
      },
      input: {
        minHeight: 30,
        marginTop: 5,
        borderBottomWidth: 2,
        borderColor: '#ebebeb',
        backgroundColor: 'white'
      },
      section: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      },
      successBadge: {
        ...this._getBadge(),
        backgroundColor: '#7fe1ad',
      },
      negativeBadge: {
        ...this._getBadge(),
        backgroundColor: '#de4343',
      }
    })

    this.pickerStyle = StyleSheet.create({
      inputIOS: {
        minHeight: 30,
        marginTop: 5,
        borderBottomWidth: 2,
        borderColor: '#ebebeb',
        backgroundColor: 'white',
        fontSize: 16,
        paddingVertical: 12,
        color: 'black',
        paddingRight: 30,
      },
      inputAndroid: {
        minHeight: 30,
        marginTop: 5,
        borderBottomWidth: 2,
        borderColor: '#ebebeb',
        backgroundColor: 'white',
        fontSize: 16,
        paddingVertical: 8,
        color: 'black',
        paddingRight: 30
      }
    })
  }
}
