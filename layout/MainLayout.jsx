import React from 'react';
//import Header from './section/Header';
import { ScrollView, StyleSheet } from 'react-native';
import NavBar from './navigation/NavBar';
import { View } from 'react-native';
import Constants from 'expo-constants';
import { Text } from 'react-native-paper';
//import Home from '../pages/Home';

export default class MainLayout extends React.Component {
  constructor (props) {
    super(props);
    this.createStyle()
    this.state = {
     // page: Home,
      mainButton: 'newExpense',
      mainButtonAction: null
    };

    this._pageProps = {
      expenseTypeService: this.props.expenseTypeService,
      changeMainButton: this.changeMainButton,
      expenseService: this.props.expenseService,
      changePage: this.changePage
    }
    this._dynamicPageProps = {}
  }

  /**
   * Muda o botão principal da aplicação com base no evento
   * @param mainButton
   * @param mainButtonAction
   */
  changeMainButton = (mainButton, mainButtonAction = null) => {
    this.setState({ mainButton, mainButtonAction });
  };

  /**
   * Emite evento que o botão principal foi clicado
   */
  mainButtonClicked = () => {
    if (this.state.mainButtonAction !== null) {
      this.state.mainButtonAction();
    }
  };

  /**
   * Muda de paginas e adiciona as props dinamicas com base na payload do evento
   * @param page
   * @param props
   */
  changePage = (page, props = null) => {
    this._dynamicPageProps = props === null ? {} : props
    this.setState({ page });
  };

  /**
   * Retorna um junção das propriedades padrão de das propriedades dinamicas
   * @return {{}}
   */
  get pageProps () {
    return {...this._pageProps, ...this._dynamicPageProps}
  }

  //render () {
  //  const page = React.createElement(this.state.page, this.pageProps);
  //  return (
  //    <div>
  //      <Header title={this.state.page.title(page.props)}/>
  //      <main>
  //        {page}
  //      </main>
  //      <NavBar changePage={this.changePage} dispatchMainButtonClicked={this.mainButtonClicked} mainButton={this.state.mainButton}/>
  //    </div>
  //  );
  //}

  createStyle () {
    this.style = StyleSheet.create({
      view: {
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
      },
      main: {
        width: '100%',
        backgroundColor: 'rgb(255,255,255)',
      }
    })
  }

  render () {
    return (
      <View style={this.style.view}>
        <ScrollView style={this.style.main}>
          <Text style={{flex: 1}}>Teeste</Text>
        </ScrollView>
        <NavBar changePage={this.changePage} dispatchMainButtonClicked={this.mainButtonClicked} mainButton={this.state.mainButton}/>
      </View>
    );
  }
}
