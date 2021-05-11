import sweetAlert from 'sweetalert2'
import NumberPrimitive from './NumberPrimitive';
import SimpleMaskMoney from 'simple-mask-money'
export default class AlertPrimitive {
  /**
   * Função que exibe o SweetAlert2 para o usuario de forma generica
   */
  static alert (type, title, message, time, onClose = null) {
    sweetAlert.fire({
      title: title,
      text: message,
      showConfirmButton: false,
      icon: type,
      confirmButtonText: 'Cool',
      timer: time,
      willClose: onClose !== null ? onClose : function () {}
    });
  }

  /**
   * Função que exibe um alerta de sucesso para o usuário
   */
  static success (message, onClose = null) {
    AlertPrimitive.alert('success', 'Sucesso', message, 1800, onClose);
  }

  /**
   * Exibe o dialogo de edição de limite
   * @param limit
   * @param onClose
   */
  static updateExpenseType (limit, onClose = null) {
    sweetAlert.fire({
      title: 'Insira novo limite.',
      input: 'text',
      inputValue: NumberPrimitive.toReal(limit),
      inputAttributes: {
        inputmode: 'numeric'
      },
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
      didOpen: function () {
        SimpleMaskMoney.setMask('.swal2-input');
      }
    }).then(function (result) {
      if (result.isConfirmed) {
        if (onClose !== null) {
          onClose(NumberPrimitive.toInt(result.value))
        }
      }
    })
  }
}
