import React from 'react';
import Header from './section/Header';
import { ScrollView, StyleSheet, View } from 'react-native';
import NavBar from './navigation/NavBar';
import Constants from 'expo-constants';
import { Snackbar } from 'react-native-paper';
import Home from '../pages/Home';

export default class MainLayout extends React.Component {
  constructor (props) {
    super(props);
    this.createStyle()
    this.state = {
      page: Home,
      mainButton: 'newExpense',
      mainButtonAction: null,
      toast: {
        active: false,
        message: ''
      }
    };

    this._pageProps = {
      expenseTypeService: props.expenseTypeService,
      changeMainButton: this.changeMainButton,
      expenseService: props.expenseService,
      changePage: this.changePage,
      toast: this.toast
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
    page = this.props.routeService.getPage(page)
    this.setState({ page });
  };

  /**
   * Retorna um junção das propriedades padrão de das propriedades dinamicas
   * @return {{}}
   */
  get pageProps () {
    return {...this._pageProps, ...this._dynamicPageProps}
  }

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
      },
      snack: {
        marginBottom: 90,
        backgroundColor: 'green'
      }
    })
  }

  toast = (message) => {
    this.setState({toast: { message, active: true }})
  }

  dismissToast = () => {
    this.setState({toast: { message: '', active: false }})
  }

  render () {
    const page = React.createElement(this.state.page, this.pageProps)
    return (
      <View style={this.style.view}>
        <Header title={this.state.page.title(page.props)}/>
        <ScrollView style={this.style.main}>
          {page}
        </ScrollView>
        <Snackbar style={this.style.snack} visible={this.state.toast.active} onDismiss={() => this.dismissToast()} duration={2000}>
          {this.state.toast.message}
        </Snackbar>
        <NavBar changePage={this.changePage} dispatchMainButtonClicked={this.mainButtonClicked} mainButton={this.state.mainButton}/>
      </View>
    );
  }
}
