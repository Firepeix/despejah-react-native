import React from 'react';
import NumberPrimitive from '../Primitives/NumberPrimitive';
import { StyleSheet, View } from 'react-native';
import { Menu, Text, TouchableRipple, Button, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-paper/lib/module/components/Icon';
import { TextInputMask } from 'react-native-masked-text';

export default class ExpenseType extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      menuIsOpened: false,
      updateDialog: false
    };
    this.createStyle();
    this.limitInput = React.createRef();
  }

  createStyle () {
    this.style = StyleSheet.create({
      expenseType: {
        flex: 1,
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        lineHeight: 1,
        borderRadius: 8,
        marginTop: 20
      },
      section: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      },
      type: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        fontWeight: '400'
      },
      amount: {
        fontSize: 20,
        textAlign: 'right',
        color: '#ff4a57',
        fontWeight: '700'
      },
      limitInput: { borderWidth: 2,
        borderColor: '#ff828b',
        borderRadius: 8,
        padding: 10
      }
    });
  }

  /**
   * Abre ou fecha o menu com base no seu estado
   */
  toggleMenu = () => {
    this.setState({ menuIsOpened: true });
  };

  setLimit = value => {
    this.setState({
      newLimit: value
    });
  };


  /**
   * Atualiza o limite do pai com base na função prop do pai
   */
  updateTypeAmount = () => {
    this.setState({ updateDialog: true, menuIsOpened: false });
  };

  update = async () => {
    this.setState({ updateDialog: false });
    this.props.updateType(this.props.id, this.state.newLimit ? this.state.newLimit : this.props.limit)
  }

  dismiss = () => {
    this.setState({ updateDialog: false });
  }

  render () {
    return (
      <View style={this.style.expenseType}>
        <View style={this.style.section}>
          <View style={this.style.type}>
            <Icon source={this.props.icon} size={22}/>
            <Text style={{ marginLeft: 6, fontSize: 18 }}>{this.props.name}</Text>
          </View>
        </View>
        <View style={this.style.section}>
          <View style={{ ...this.style.section, justifyContent: 'flex-end' }}>
            <Text style={this.style.amount}>R$ {NumberPrimitive.toReal(this.props.limit)}</Text>
            <Menu
              visible={this.state.menuIsOpened}
              onDismiss={() => {
                this.setState({ menuIsOpened: false });
              }}
              anchor={<TouchableRipple borderless={true} onPress={this.toggleMenu} rippleColor="rgba(255, 255, 255, .32)">
                <Icon source={'dots-vertical'} size={35}/>
              </TouchableRipple>}>
              <Menu.Item icon="pencil" onPress={() => this.updateTypeAmount()} title="Editar"/>
            </Menu>
          </View>
        </View>
        <Portal>
          <Dialog visible={this.state.updateDialog} onDismiss={() => this.dismiss()}>
            <Dialog.Title>Editar Limite</Dialog.Title>
            <Dialog.Content>
              <TextInputMask ref={(ref) => {
                if (ref !== null && !ref.getElement().isFocused()) {
                  ref.getElement().focus()
                }
              }}  maxLength={10} type={'money'} value={NumberPrimitive.toReal(this.props.limit)}
                             onChangeText={value => this.setLimit(value)} options={{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: 'R$ ',
                suffixUnit: ''
              }} style={this.style.limitInput}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => this.dismiss()}>Cancelar</Button>
              <Button onPress={() => this.update()}>Salvar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}
