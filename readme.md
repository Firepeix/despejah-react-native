# DespeJá

### Por: Arthur Henrique Machado Fernandes

---
O **DespeJá** é uma aplicação de gestão de despesas, nela você pode inserir
e gerenciar suas despesas em tres tipos de categorias: Fixas, variáveis e
eventuais. Sendo possível definir orçamentos para cada categoria e se
manter dentro de seu orçamento.

---
#### Dependências

A aplicação utiliza:

* [React Native Async Storage](https://github.com/react-native-async-storage/async-storage): Como o storage do react native está depreciado foi utilizado essa biblioteca.
* [React Native Picker](https://github.com/react-native-picker/picker/): Como o picker do react native está depreciado foi utilizado essa biblioteca.
* [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit): Biblioteca de grafico para react native.
* [React Native Svg](https://github.com/react-native-svg/react-native-svg): Biblioteca para tratamento de SVGs.
* [React Native Masked Text](https://github.com/benhurott/react-native-masked-text): Para aplicação de mascara nas inputs.
* [React Native Paper](https://callstack.github.io/react-native-paper/): Biblioteca de componentes Material para react native.

---
### Telas

#### Home

![Home](documentation/img/home.png "Home")

A Home é onde fica os resumos, aqui demostra o quanto ja gastou e o que restou de
seu orçamento assim como um link para a tela de gerenciamento de categorias.
Por fim ela mostra as tres maiores despesas cadastradas.

#### Gerenciamento de Categoria

![Gerenciamento de Categoria](documentation/img/types.png "Gerenciamento de Categoria")

A tela de gerenciamento de categoria é o lugar para você definir o
limite de cada categoria

#### Nova Despesa

![Nova Despesa](documentation/img/new-expense.png "Nova Despesa")

Na tela de nova despesa é possível inserir suas despesas na aplicação
aqui devera fornecer o nome para despesa, sua categoria, data que foi
realizada e seu valor.

#### Despesas

![Despesas](documentation/img/expenses.png "Despesas")

Na tela de despesas esta uma listagem de todas as despesas cadastradas
sendo possível através do menu tres pontos deletar ou editar uma despesa
ja cadastrada.

----

### Dados

Os dados que a aplicação armazena são os dados respectivos a cada
despesa como seu nome para identificação, data facilitar a verificação
em conjunto com faturas e etc, tipo de categoria para realizar os
relatórios e o valor para a mesma finalidade do tipo.

---

### Questionário

#### A aplicação é original e não uma cópia da aplicação de um colega ou de uma aplicação já existente?
Sim, é original.
#### A aplicação tem pelo menos duas interfaces (telas) independentes?
Sim: Home, Gerenciamento de Categoria, Nova Despesa e Despesas.
#### A aplicação armazena e usa de forma relevante dados complexos do usuário?
Sim, os dados de cada despesa que ele inserir.
#### A aplicação tem pelo menos dois componentes além do componente principal?
Sim
#### A aplicação tem um componente com rolagem?
Sim, no caso o componente Expenses na tela de despesas
#### A aplicação tem um campo de formulário que é devidamente tratado?
Sim, no caso o componente NewExpense para inserir uma despesa
#### A aplicação foi desenvolvida com o React Native?
Sim
#### O código da minha aplicação possui comentários explicando cada operação?
Sim
#### A aplicação está funcionando corretamente?
Sim
#### A aplicação está completa?
Sim



